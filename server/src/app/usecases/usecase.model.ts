import { TokenUser } from '../../utils/@types/user.types';

export interface UseCase<TRequest, TEntity> {
	exec(requestObject: TRequest, currentUser?: TokenUser): Promise<TEntity>;
}
