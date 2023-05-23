import { Product } from '@prisma/client';

export interface CreateStockMovementsInput {
	userId: string;
	productId: string;
	quantity: number;
}

export type ProductWithQuantity = Product & { quantity: number };
