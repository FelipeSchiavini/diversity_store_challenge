import { prisma } from '../../../libs/prisma';

export const getListOfProductsQuery = async (skip: number = 0) => {
	return await prisma.product.findMany({
		skip,
		take: 10,
		include: {
			StockMovements: {
				select: {
					quantity: true,
				},
			},
		},
	});
};20
