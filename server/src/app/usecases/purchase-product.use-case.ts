import { prisma } from '../../libs/prisma';
import { CreateStockMovementsInput } from '../../utils/@types/products.types';
import { aggregateProductAndStockQuantity } from '../../utils/aggregate-product-and-stock-quantity';
import { NoProductInStockError, ProductNotFoundError } from '../../utils/errors/errors';
import { getProductByIdQuery } from '../data/querys/get-product-by-id.query';
import { UseCase } from './usecase.model';
import { Service } from 'typedi';

type PurchaseUseCaseInput = CreateStockMovementsInput;

@Service()
export class PurchaseProductUseCase implements UseCase<PurchaseUseCaseInput, any> {
	async exec(input: PurchaseUseCaseInput) {
		const product = await getProductByIdQuery(input.productId);

		if (!product) {
			throw new ProductNotFoundError();
		}

		const productInfo = aggregateProductAndStockQuantity(product);

		if (!this.verifyIfHasStockQuantity(productInfo.quantity, input.quantity)) {
			throw new NoProductInStockError();
		}

		return await prisma.stockMovements.create({
			data: {
				productId: input.productId,
				quantity: - input.quantity,
				userId: input.userId,
			},
		});
	}

	private async verifyIfHasStockQuantity(stockQuantity: number, purchaseQuantity: number) {
		return stockQuantity >= purchaseQuantity;
	}
}
