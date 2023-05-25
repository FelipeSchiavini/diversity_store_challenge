import { Product } from '@prisma/client';
import { prisma } from '../../../libs/prisma';

export const createProductWithStockMutation = async (input: Omit<Product, 'id'>, quantity: number, userId: string) => {
	return await prisma.product.create({
		data: {
			...input,
			StockMovements: {
				create: {
					quantity,
					userId,
				},
			},
		},
	});
};
