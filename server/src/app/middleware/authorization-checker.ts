import { Action, UnauthorizedError } from 'routing-controllers';
import { Role } from '../../utils/@types/role.types';
import { JwtPayload, verify } from 'jsonwebtoken';
import config from 'eslint-config-standard-with-typescript';
import { log } from 'console';

export const authorizationChecker = async (action: Action, roles: Role[]) => {
	const token = action?.request?.headers['authorization'];
	var decoded = await verify(token.replace('Bearer ', ''), process.env.JWT_SECRET as string) as JwtPayload;
	const role = decoded.data?.role;
	if (roles.includes(role)) {
		return true;
	}

	throw new UnauthorizedError();
};
