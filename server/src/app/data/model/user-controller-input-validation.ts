import { z } from 'zod';
import { InvalidInputError } from '../../../utils/errors/errors';

export const userLoginParser = (input: { password: string; login: string }) => {
	const productParser = z.object({
		login: z.string(),
		password: z.string(),
	});

	const parsedUser = productParser.safeParse(input);

	if (parsedUser.success) {
		return parsedUser.data;
	}

	throw new InvalidInputError('{login: string, password: string}');
};
