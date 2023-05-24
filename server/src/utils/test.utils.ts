import { createUserMutation } from '../app/data/querys/create-user.mutation';
import { faker } from '@faker-js/faker';
import { Role } from './@types/role.types';
import { createProductMutation } from '../app/data/querys/create-product.mutation';
import { createProductStockMovimentationMutation } from '../app/data/querys/create-product-stock-movement.mutation';
import { Product, StockMovements, User } from '@prisma/client';

interface ITestUtils {
	createUser: (role: Role) => Promise<User>;
	createProduct: (name?: string, price?: number, productUrl?: string) => Promise<Product>;
	createStockMoviments: (productId: string, userId: string, quantity?: number) => Promise<StockMovements>;
}

export const TestUtils: ITestUtils = {
	createUser: async (role: Role = Role.Client) => {
		return await createUserMutation({
			login: faker.internet.email(),
			password: faker.internet.password(),
			role,
		});
	},

	createProduct: async (name?: string, price?: number, productUrl?: string) => {
		return await createProductMutation({
			name: name ?? faker.commerce.product(),
			price: price ?? parseFloat(faker.commerce.price()),
			productUrl: productUrl ?? faker.image.dataUri(),
		});
	},

	createStockMoviments: async (productId: string, userId: string, quantity?: number) => {
		return await createProductStockMovimentationMutation({
			productId,
			userId,
			quantity: quantity ?? faker.number.int(),
		});
	},
};
