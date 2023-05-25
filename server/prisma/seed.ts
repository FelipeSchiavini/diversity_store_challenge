import { createUserMutation } from '../src/app/data/query/create-user.mutation';
import { Role } from '../src/utils/@types/role.types';
import { hash } from 'bcrypt';
import { createProductWithStockMutation } from '../src/app/data/query/create-product-with-stock';
import { TestUtils } from '../src/utils/test.utils';
import { faker } from '@faker-js/faker';

const seed = async () => {
	const adminPasswordHashed = await hash('felipe123', 10);
	const clientPasswordHashed = await hash('comuniki123', 10);

	const [admin] = await Promise.all([
		createUserMutation({
			login: 'felipe',
			password: adminPasswordHashed,
			role: Role.Admin,
		}),
		createUserMutation({
			login: 'comuniki',
			password: clientPasswordHashed,
			role: Role.Client,
		}),
	]);

	await Promise.allSettled(
		Array.from({ length: 20 }).map((n) => 
			TestUtils.createProductWithStock(admin.id, faker.number.int(100))
		)
	);
};

seed();
