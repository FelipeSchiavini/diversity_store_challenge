import { User } from '@prisma/client';
import { UseCase } from './usecase.model';
import { Service } from 'typedi';
import { getUserByLoginQuery } from '../data/query/get-user-by-login.query';
import { UserNotFoundError } from '../../utils/errors/errors';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { userLoginParser } from '../data/model/user-controller-input-validation';

type LoginUseCaseInput = Omit<User, 'id' | 'role'>;

interface LoginUseCaseResponse {
	token: string;
}

@Service()
export class LoginUseCase implements UseCase<LoginUseCaseInput, LoginUseCaseResponse> {
	async exec(input: LoginUseCaseInput): Promise<LoginUseCaseResponse> {

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
					login: user.login,
				},
			},
			process.env.JWT_SECRET as string,
			{ expiresIn: '24h' }
		);

		return { token };


	}
}
