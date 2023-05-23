import 'reflect-metadata';
import { PurchaseProductUseCase } from './purchase-product.use-case';
import { Container } from 'typedi';

const useCase = Container.get(PurchaseProductUseCase);

describe('BuyUseCase', () => {
	it(`should throw error if don't have enough product on stock`, async () => {
		useCase.exec({
			productId: '',
			userId: '',
			quantity: 1,
		});
	});
});
