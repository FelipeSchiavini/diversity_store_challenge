import { Get, Param, Post, Body, JsonController, Authorized, CurrentUser } from 'routing-controllers';
import { getListOfProductsQuery } from '../data/query/get-list-of-products.query';
import { getProductByIdQuery } from '../data/query/get-product-by-id.query';
import { CreateStockMovementsInput, ProductWithQuantity } from '../../utils/@types/products.types';
import {  aggregateProductAndStockQuantity } from '../../utils/aggregate-product-and-stock-quantity';
import { ProductNotFoundError } from '../../utils/errors/errors';
import { Service, Container } from 'typedi';
import { Product } from '@prisma/client';
import { createProductMutation } from '../data/query/create-product.mutation';
import { PurchaseProductUseCase } from '../usecases/purchase-product.use-case';
import { createProductParser, createStockMovimentsParser, productIdParser } from '../data/model/product-controller-input-validation';
import { CreateProductUrl, ProductListUrl, ProductPathUrl, PurchaseProductUrl, UpdateStockProductUrl } from '../../utils/routes';
import { Role } from '../../utils/@types/role.types';
import { TokenUser } from '../../utils/@types/user.types';
import { AddProductToStockUseCase } from '../usecases/add-product.use-case';
import { prisma } from '../../libs/prisma';

interface ListOfProducts {
	productsList: 	ProductWithQuantity[]
	totalOfPages: number
}

@Service()
@JsonController(ProductPathUrl)
export class ProductController {
	@Get(`${ProductListUrl}/:pagination`)
	async getListOfProducts(@Param('pagination') pagination: string): Promise<ListOfProducts> {
		const productsPerPage = 10
		const skip = (Number(pagination ) - 1) * productsPerPage
		const [rows, products] = await Promise.all([
			await prisma.product.count(),
			await getListOfProductsQuery(skip)
		])
	
		const productsList = products.map((product) => {
			return aggregateProductAndStockQuantity(product);
		});

		return {
			totalOfPages: Math.ceil(rows / productsPerPage),
			productsList
		}
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
		console.log("🚀 ~ file: products.controller.ts:44 ~ ProductController ~ createProduct ~ input:", input)
		const product = createProductParser(input);
		console.log("🚀 ~ file: products.controller.ts:45 ~ ProductController ~ createProduct ~ product:", product)
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
		return await Container.get(AddProductToStockUseCase).exec(movement, user);
	}
}
