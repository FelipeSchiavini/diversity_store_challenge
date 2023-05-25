import 'reflect-metadata';
import { PurchaseProductUseCase } from './purchase-product.use-case';
import { Container } from 'typedi';
import { TestUtils } from '../../utils/test.utils';
import { Role } from '../../utils/@types/role.types';
import { ErrorName } from '../../utils/errors/error.name';
import { faker } from '@faker-js/faker';
import { getProductByIdQuery } from '../data/query/get-product-by-id.query';
import { aggregateProductAndStockQuantity } from '../../utils/aggregate-product-and-stock-quantity';

const useCase = Container.get(PurchaseProductUseCase);

describe('PurchaseProductUseCase', () => {
	it('should subtract the purchased quantity from the stock', async () => {
		const admin = await TestUtils.createUser(Role.Admin);
		const quantity = faker.number.int({ min: 10, max: 100 });
		const product = await TestUtils.createProductWithStock(admin.id, quantity);
		const quantityBought = faker.number.int({ min: 1, max: 9 });

		await useCase.exec(
			{
				productId: product.id,
				quantity: quantityBought,
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

		expect(ProductWithQuantity.quantity).toBe(quantity - quantityBought);
	}),
		it(`should throw error(NoProductInStockError) if don't have enough product on stock`, async () => {
			const admin = await TestUtils.createUser(Role.Admin);
			const quantity = faker.number.int({ min: 1, max: 100 });
			const product = await TestUtils.createProductWithStock(admin.id, quantity);

			try {
				await useCase.exec(
					{
						productId: product.id,
						quantity: quantity + 1,
					},
					{
						login: admin.login,
						role: Role.Client,
						sub: admin.id,
					}
				);
			} catch (err) {
				if (err instanceof Error) {
					expect(err.name).toBe(ErrorName.NoProductInStockError);
				}
			}
		});
	it(`should throw error(ProductNotFoundError) if don't productId is wrong`, async () => {
		const admin = await TestUtils.createUser(Role.Admin);
		const quantity = faker.number.int({ min: 1, max: 100 });

		try {
			await useCase.exec(
				{
					productId: faker.string.uuid(),
					quantity: quantity + 1,
				},
				{
					login: admin.login,
					role: Role.Client,
					sub: admin.id,
				}
			);
		} catch (err) {
			if (err instanceof Error) {
				expect(err.name).toBe(ErrorName.ProductNotFoundError);
			}
		}
	});
});
