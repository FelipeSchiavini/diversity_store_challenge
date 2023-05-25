import { prisma } from '../../../libs/prisma';

export const getUserByLoginQuery = async (login: string) => {
	return await prisma.user.findUnique({
		where: {
			login,
		},
	});
};
