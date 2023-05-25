import { prisma } from '../../libs/prisma';
import { CreateStockMovementsInput } from '../../utils/@types/products.types';
import { TokenUser } from '../../utils/@types/user.types';
import { aggregateProductAndStockQuantity } from '../../utils/aggregate-product-and-stock-quantity';
import {  ProductNotFoundError } from '../../utils/errors/errors';
import { getProductByIdQuery } from '../data/query/get-product-by-id.query';
import { UseCase } from './usecase.model';
import { Service } from 'typedi';

type PurchaseUseCaseInput = CreateStockMovementsInput;

@Service()
export class AddProductToStockUseCase implements UseCase<PurchaseUseCaseInput, any> {
	async exec(input: PurchaseUseCaseInput, CurrentUser: TokenUser) {
		const product = await getProductByIdQuery(input.productId);
		console.log("🚀 ~ file: add-product.use-case.ts:16 ~ AddProductToStockUseCase ~ exec ~ product:", product)

		if (!product) {
			throw new ProductNotFoundError();
		}

		return await prisma.stockMovements.create({
			data: {
				productId: product.id,
				quantity: input.quantity,
				userId: CurrentUser.sub,
			},
		});
	}

}
