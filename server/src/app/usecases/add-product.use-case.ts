import { prisma } from '../../libs/prisma';
import { CreateStockMovementsInput } from '../../utils/@types/products.types';
import { TokenUser } from '../../utils/@types/user.types';
import { aggregateProductAndStockQuantity } from '../../utils/aggregate-product-and-stock-quantity';
import { ProductNotFoundError, StockCantBeNegativeError } from '../../utils/errors/errors';
import { getProductByIdQuery } from '../data/query/get-product-by-id.query';
import { UseCase } from './usecase.model';
import { Service } from 'typedi';

type AddProductToStockUseCaseInput = CreateStockMovementsInput;

@Service()
export class AddProductToStockUseCase implements UseCase<AddProductToStockUseCaseInput, any> {
	async exec(input: AddProductToStockUseCaseInput, CurrentUser: TokenUser) {
		const product = await getProductByIdQuery(input.productId);

		if (!product) {
			throw new ProductNotFoundError();
		}

		const productInfo = aggregateProductAndStockQuantity(product);

		if (productInfo.quantity < -input.quantity) {
			throw new StockCantBeNegativeError();
		}

		return await prisma.stockMovements.create({
			data: {
				productId: input.productId,
				quantity: input.quantity,
				userId: CurrentUser.sub,
			},
		});
	}
}
