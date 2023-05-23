import { Action, UnauthorizedError } from 'routing-controllers';
import { Role } from '../../utils/@types/user.types';
import { JwtPayload, verify } from 'jsonwebtoken';

export const authorizationChecker = async (action: Action, roles: Role[]) => {
	const token = action?.request?.headers['authorization'];
	var decoded = verify(token, process.env.JWT_SECRET as string) as JwtPayload;
	const role = decoded.data?.role;
	if (roles.includes(role)) {
		return true;
	}

	throw new UnauthorizedError();
};
