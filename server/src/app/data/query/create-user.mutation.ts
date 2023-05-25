import { User } from '@prisma/client';
import { prisma } from '../../../libs/prisma';
import { Role } from '../../../utils/@types/role.types';

export const createUserMutation = async (input: Omit<User, 'id'>): Promise<User> => {
	return await prisma.user.create({
		data: {
			login: input.login,
			password: input.password,
			role: input?.role ? input.role : Role.Client,
		},
	});
};
