import { Get, Param, Post, Body, JsonController } from 'routing-controllers';
import { getListOfProductsQuery } from '../data/querys/get-list-of-products.query';
import { getProductByIdQuery } from '../data/querys/get-product-by-id.query';
import { CreateStockMovementsInput, ProductWithQuantity } from '../../utils/@types/products.types';
import { aggregateProductAndStockQuantity } from '../../utils/aggregate-product-and-stock-quantity';
import { ProductNotFoundError } from '../../utils/errors/errors';
import { Service, Container } from 'typedi';
import { Product } from '@prisma/client';
import { createProductMutation } from '../data/querys/create-product.mutation';
import { PurchaseProductUseCase } from '../usecases/purchase-product.use-case';
import { createProductParser, createStockMovementsParser, productIdParser } from '../data/model/user-controller-input-validation';

@JsonController('/product')
@Service()
export class ProductController {
	@Get('/list')
	async getListOfProducts(): Promise<ProductWithQuantity[]> {
		const products = await getListOfProductsQuery();

		return products.map((product) => {
			return aggregateProductAndStockQuantity(product);
		});
	}

	@Get('/:productId')
	async getProductById(@Param('productId') productId: string): Promise<ProductWithQuantity> {
		const parsedProductId = productIdParser(productId);
		const product = await getProductByIdQuery(parsedProductId);

		if (!product) {
			throw new ProductNotFoundError();
		}

		return aggregateProductAndStockQuantity(product);
	}

	@Post('/create')
	async createProduct(@Body() input: Omit<Product, 'id'>) {
		const product = createProductParser(input);
		return await createProductMutation(product);
	}

	@Post('/purchase')
	async purchaseProductById(@Body() input: CreateStockMovementsInput) {
		const movement = createStockMovementsParser(input);
		return await Container.get(PurchaseProductUseCase).exec(movement);
	}

	@Post('/add')
	async addStockProduct(@Body() input: CreateStockMovementsInput) {
		const movement = createStockMovementsParser(input);
		return '';
	}
}
