import { Product } from '@prisma/client';
import { prisma } from '../../../libs/prisma';

export const createProductMutation = async (input: Omit<Product, 'id'>): Promise<Product> => {
	return await prisma.product.create({
		data: {
			name: input.name,
			price: input.price,
			productUrl: input.productUrl,
			description: input.description,
		},
	});
};
