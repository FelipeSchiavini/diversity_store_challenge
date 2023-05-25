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
		description: z.string(),
		price: z.number(),
	});

	const parsedProductId = productParser.safeParse(input);

	if (parsedProductId.success) {
		return parsedProductId.data;
	}

	throw new InvalidInputError('Omit<Product, id>');
};

export const createStockMovimentsParser = (input: CreateStockMovementsInput) => {
	const movementsParser = z.object({
		productId: z.string(),
		quantity: z.number(),
	});

	const parsedMovementId = movementsParser.safeParse(input);

	if (parsedMovementId.success) {
		return parsedMovementId.data;
	}

	throw new InvalidInputError(movementsParser._type);
};
