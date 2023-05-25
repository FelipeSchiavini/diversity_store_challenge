export enum ErrorName {
  UserNotFoundError = 'UserNotFound',
  ProductNotFoundError = 'ProductNotFound',
  NoProductInStockError = 'NoProductInStock',
  InvalidInputError = 'InvalidInput',
  UserAlreadyExistsError = 'UserAlreadyExists',
  UnauthorizedError = 'Unauthorized',
  StockCantBeNegativeError = 'StockCantBeNegative',
}

export const handleWithErrorName = (error: ErrorName) => {
  switch (error) {
    case ErrorName.InvalidInputError:
      return 'Invalid data! Please contact our support!'
    case ErrorName.UnauthorizedError:
      return 'User not authorized!'
    case ErrorName.UserNotFoundError:
      return 'User not found!'
    case ErrorName.ProductNotFoundError:
      return 'Product not found!'
    case ErrorName.NoProductInStockError:
      return 'There is no such quantity of product in stock, try a smaller quantity'
    default:
      return 'Something went wrong 🥹. Try again later!'
  }
}
