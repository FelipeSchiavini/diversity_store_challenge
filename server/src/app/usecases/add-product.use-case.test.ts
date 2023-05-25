import 'reflect-metadata';
import { Container } from 'typedi';
import { TestUtils } from '../../utils/test.utils';
import { Role } from '../../utils/@types/role.types';
import { faker } from '@faker-js/faker';
import { getProductByIdQuery } from '../data/query/get-product-by-id.query';
import { aggregateProductAndStockQuantity } from '../../utils/aggregate-product-and-stock-quantity';
import { AddProductToStockUseCase } from './add-product.use-case';
import { ErrorName } from '../../utils/errors/error.name';

const useCase = Container.get(AddProductToStockUseCase);

describe('AddProductToStockUseCase', () => {
	it('should add the added quantity to the stock', async () => {
		const admin = await TestUtils.createUser(Role.Admin);
		const quantity = faker.number.int({ min: 10, max: 100 });
		const product = await TestUtils.createProductWithStock(admin.id, quantity);
		const quantityAdded = faker.number.int({ min: 1, max: 9 });

		await useCase.exec(
			{
				productId: product.id,
				quantity: quantityAdded,
			},
			{
				login: admin.login,
				role: Role.Client,
				sub: admin.id,
			}
		);

		const productInfo = await getProductByIdQuery(product.id);
		if (!productInfo) {
			throw Error();
		}
		const ProductWithQuantity = await aggregateProductAndStockQuantity(productInfo);

		expect(ProductWithQuantity.quantity).toBe(quantity + quantityAdded);
	});
	it(`should throw an error (StockCantBeNegativeError) if attempting to remove more products than are available in stock`, async () => {
		const admin = await TestUtils.createUser(Role.Admin);
		const quantity = faker.number.int({ min: 1, max: 9 });
		const product = await TestUtils.createProductWithStock(admin.id, quantity);
		const quantityToBeRemovedFromStock = faker.number.int({ min: -100, max: -10 });
		try {
			await useCase.exec(
				{
					productId: product.id,
					quantity: quantityToBeRemovedFromStock,
				},
				{
					login: admin.login,
					role: Role.Client,
					sub: admin.id,
				}
			);
		} catch (err) {
			if (err instanceof Error) {
				expect(err.name).toBe(ErrorName.StockCantBeNegativeError);
			}
		}
	});
});
