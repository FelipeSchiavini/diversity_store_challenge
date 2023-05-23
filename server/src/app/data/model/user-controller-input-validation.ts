import { z } from 'zod';
import { Product } from '@prisma/client';
import { CreateStockMovementsInput } from '../../../utils/@types/products.types';
import { InvalidInputError } from '../../../utils/errors/errors';

export const productIdParser = (productId: string) => {
	const productParser = z.string();
	const parsedProductId = productParser.safeParse(productId);

	if (parsedProductId.success) {
		return parsedProductId.data;
	}

	throw new InvalidInputError('productId: string');
};

export const createProductParser = (input: Omit<Product, 'id'>) => {
	const productParser = z.object({
		name: z.string(),
		productUrl: z.string().url(),
		price: z.number(),
	});

	const parsedProductId = productParser.safeParse(input);

	if (parsedProductId.success) {
		return parsedProductId.data;
	}

	throw new InvalidInputError('Omit<Product, id>');
};

export const createStockMovementsParser = (input: CreateStockMovementsInput) => {
	const movementsParser = z.object({
		userId: z.string(),
		productId: z.string(),
		quantity: z.number(),
	});

	const parsedMovimentId = movementsParser.safeParse(input);

	if (parsedMovimentId.success) {
		return parsedMovimentId.data;
	}

	throw new InvalidInputError(movementsParser._type);
};
