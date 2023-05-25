import { User } from '@prisma/client';
import { Body, JsonController, Post } from 'routing-controllers';
import Container, { Service } from 'typedi';
import { CreateUserUseCase } from '../usecases/create-user.use-case';
import { LoginUseCase } from '../usecases/login.use-case';
import { CreateNewClientUrl, LoginUrl, UserPathUrl } from '../../utils/routes';

@JsonController(UserPathUrl)
@Service()
export class UserController {
	@Post(CreateNewClientUrl)
	async createUser(@Body() input: Omit<User, 'id' | 'role'>) {
		return await Container.get(CreateUserUseCase).exec(input);
	}

	@Post(LoginUrl)
	async login(@Body() input: { data: { login: string; password: string } }) {
		return await Container.get(LoginUseCase).exec(input.data);
	}
}
