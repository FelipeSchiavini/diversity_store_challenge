import { createUserMutation } from '../app/data/query/create-user.mutation';
import { faker } from '@faker-js/faker';
import { Role } from './@types/role.types';
import { createProductMutation } from '../app/data/query/create-product.mutation';
import { createProductStockMovimentationMutation } from '../app/data/query/create-product-stock-movement.mutation';
import { Product, StockMovements, User } from '@prisma/client';
import { createProductWithStockMutation } from '../app/data/query/create-product-with-stock';
import { hash } from 'bcrypt';

interface ITestUtils {
	createUser: (role: Role) => Promise<User>;
	createProduct: (name?: string, price?: number, productUrl?: string, description?: string) => Promise<Product>;
	createStockMoviments: (productId: string, userId: string, quantity?: number) => Promise<StockMovements>;
	createProductWithStock: (userId: string, quantity: number) => Promise<any>;
}

export const TestUtils: ITestUtils = {
	createUser: async (role: Role = Role.Client) => {
		const passwordHashed = await hash(faker.internet.password(), 10);
		return await createUserMutation({
			login: faker.internet.email(),
			password: passwordHashed,
			role,
		});
	},

	createProduct: async (name?: string, price?: number, productUrl?: string, description?: string) => {
		return await createProductMutation({
			name: name ?? faker.commerce.product(),
			price: price ?? parseFloat(faker.commerce.price()),
			productUrl: productUrl ?? faker.image.urlPicsumPhotos(),
			description: description ?? faker.commerce.productDescription(),
		});
	},

	createStockMoviments: async (productId: string, userId: string, quantity?: number) => {
		return await createProductStockMovimentationMutation({
			productId,
			userId,
			quantity: quantity ?? faker.number.int(),
		});
	},

	createProductWithStock: async (userId: string, quantity: number) => {
		return await createProductWithStockMutation(
			{
				name: faker.commerce.product(),
				price: parseFloat(faker.commerce.price()),
				productUrl: faker.image.urlPicsumPhotos(),
				description: faker.commerce.productDescription(),
			},
			quantity,
			userId
		);
	},
};
