import { prisma } from '../../../libs/prisma';

export const getProductByIdQuery = async (id: string) => {
	return await prisma.product.findUnique({
		where: { id },
		include: {
			StockMovements: {
				select: {
					quantity: true,
				},
			},
		},
	});
};
