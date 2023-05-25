import { Get, Param, Post, Body, JsonController, Authorized, CurrentUser } from 'routing-controllers';
import { getListOfProductsQuery } from '../data/query/get-list-of-products.query';
import { getProductByIdQuery } from '../data/query/get-product-by-id.query';
import { CreateStockMovementsInput, ProductWithQuantity } from '../../utils/@types/products.types';
import { aggregateProductAndStockQuantity } from '../../utils/aggregate-product-and-stock-quantity';
import { ProductNotFoundError } from '../../utils/errors/errors';
import { Service, Container } from 'typedi';
import { Product } from '@prisma/client';
import { createProductMutation } from '../data/query/create-product.mutation';
import { PurchaseProductUseCase } from '../usecases/purchase-product.use-case';
import { createProductParser, createStockMovimentsParser, productIdParser } from '../data/model/product-controller-input-validation';
import { CreateProductUrl, ProductListUrl, ProductPathUrl, PurchaseProductUrl, UpdateStockProductUrl } from '../../utils/routes';
import { Role } from '../../utils/@types/role.types';
import { TokenUser } from '../../utils/@types/user.types';

@Service()
@JsonController(ProductPathUrl)
export class ProductController {
	@Get(ProductListUrl)
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

	@Authorized([Role.Admin])
	@Post(CreateProductUrl)
	async createProduct(@Body() input: Omit<Product, 'id'>) {
		const product = createProductParser(input);
		return await createProductMutation(product);
	}

	@Authorized([Role.Admin, Role.Client])
	@Post(PurchaseProductUrl)
	async purchaseProductById(@Body() input: CreateStockMovementsInput, @CurrentUser() user: TokenUser) {
		const movement = createStockMovimentsParser(input);
		return await Container.get(PurchaseProductUseCase).exec(movement, user);
	}

	@Authorized([Role.Admin])
	@Post(UpdateStockProductUrl)
	async addStockProduct(@Body() input: CreateStockMovementsInput,  @CurrentUser() user: TokenUser)  {
		const movement = createStockMovimentsParser(input);
		return '';
	}
}
