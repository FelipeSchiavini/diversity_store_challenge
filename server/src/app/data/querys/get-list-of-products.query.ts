import { prisma } from '../../../libs/prisma';

export const getListOfProductsQuery = async () => {
	return await prisma.product.findMany({
		include: {
			StockMovements: {
				select: {
					quantity: true,
				},
			},
		},
	});
};
