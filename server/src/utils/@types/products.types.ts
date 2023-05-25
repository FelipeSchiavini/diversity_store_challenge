import { Product } from '@prisma/client';

export interface CreateStockMovementsInput {
	productId: string;
	quantity: number;
}

export type ProductWithQuantity = Product & { quantity: number };
