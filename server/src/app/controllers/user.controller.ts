import { User } from '@prisma/client';
import { Authorized, Body, JsonController, Post } from 'routing-controllers';
import Container, { Service } from 'typedi';
import { CreateUserUseCase } from '../usecases/create-user.use-case';
import { getUserByLoginQuery } from '../data/querys/get-user-by-login';
import bcrypt from 'bcrypt';
import { userLoginParser } from '../data/model/product-controller-input-validation';
import { UserNotFoundError } from '../../utils/errors/errors';
import { sign, verify } from 'jsonwebtoken';
import { config } from '../../config';

@JsonController('/user')
@Service()
export class UserController {
	@Post('/create-client')
	async createUser(@Body() input: Omit<User, 'id' | 'role'>) {
		return await Container.get(CreateUserUseCase).exec(input);
	}

	@Post('/create-admin')
	async createAdmin(@Body() input: Omit<User, 'id' | 'role'>) {}

	@Authorized('user')
	@Post('/login')
	async login(@Body() input: { login: string; password: string }) {
		const { login, password } = userLoginParser(input);

		const user = await getUserByLoginQuery(login);

		if (!user) {
			throw new UserNotFoundError();
		}

		const passwordIsValid = await bcrypt.compare(password, user.password);

		if (!passwordIsValid) {
			throw new UserNotFoundError();
		}

		const token = sign(
			{
				data: {
					role: user.role,
					sub: user.id,
				},
			},
			config.jwtSecret,
			{ expiresIn: '24h' }
		);

		return { token };
	}
}
