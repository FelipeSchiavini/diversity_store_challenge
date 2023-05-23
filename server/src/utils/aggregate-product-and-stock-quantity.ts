import { Product } from '@prisma/client';
import { ProductWithQuantity } from './@types/products.types';

type ProductFromDb = Product & {
	StockMovements: {
		quantity: number;
	}[];
};

export const aggregateProductAndStockQuantity = (product: ProductFromDb): ProductWithQuantity => {
	const { id, name, productUrl, price } = product;

	const quantity = product.StockMovements.reduce((acc, curr) => {
		return acc + curr.quantity;
	}, 0);
	return {
		id,
		name,
		productUrl,
		price,
		quantity,
	};
};
