import { StockMovements } from '@prisma/client';
import { prisma } from '../../../libs/prisma';

export const createProductStockMovimentationMutation = async (input: Omit<StockMovements, 'id'>): Promise<StockMovements> => {
	return await prisma.stockMovements.create({
		data: {
			productId: input.productId,
			userId: input.userId,
			quantity: input.quantity,
		},
	});
};
