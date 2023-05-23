import { HttpError } from 'routing-controllers';
import { ErrorName } from './error.name';


export class InvalidInputError extends HttpError {
	constructor(input?: unknown) {
		super(400, `Invalid Input it should be: ${input}`);
		this.name = ErrorName.InvalidInputError;
	}
}

export class UnauthorizedError extends HttpError {
	constructor() {
		super(401, 'User not found!');
		this.name = ErrorName.UnauthorizedError;
	}
}

export class UserNotFoundError extends HttpError {
	constructor() {
		super(404, 'User not found!');
		this.name = ErrorName.UserNotFoundError;
	}
}

export class ProductNotFoundError extends HttpError {
	constructor() {
		super(404, 'Product not found!');
		this.name = ErrorName.ProductNotFoundError;
	}
}

export class NoProductInStockError extends HttpError {
	constructor() {
		super(406, 'There is not enough product in stock. Please reduce the quantity or choose a different product.');
		this.name = ErrorName.NoProductInStockError;
	}
}

export class UserAlreadyExistsError extends HttpError {
	constructor() {
		super(409, `User Login already exists!`);
		this.name = ErrorName.UserAlreadyExistsError;
	}
}
