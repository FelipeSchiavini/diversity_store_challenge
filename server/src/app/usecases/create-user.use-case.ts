import { User } from '@prisma/client';
import { UseCase } from './usecase.model';
import { Service } from 'typedi';
import { createUserMutation } from '../data/querys/create-user.mutation';
import { Role } from '../../utils/@types/role.types';
import { getUserByLoginQuery } from '../data/querys/get-user-by-login.query';
import { UserAlreadyExistsError } from '../../utils/errors/errors';
import bcrypt, { hash } from 'bcrypt';

type CreateUserUseCaseInput = Omit<User, 'id' | 'role'>;

@Service()
export class CreateUserUseCase implements UseCase<CreateUserUseCaseInput, any> {
	async exec(input: CreateUserUseCaseInput) {

		const { password, login } = input;

		await this.verifyIfUserLoginAlreadyExists(login);
		const passwordHashed = await bcrypt.hash(password, 10);

		return await createUserMutation({
			login,
			password: passwordHashed,
			role: Role.Client,
		});
	}

	private async verifyIfUserLoginAlreadyExists(login: string): Promise<void> {
		const user = await getUserByLoginQuery(login);

		if (user) {
			throw new UserAlreadyExistsError();
		}
	}
}
