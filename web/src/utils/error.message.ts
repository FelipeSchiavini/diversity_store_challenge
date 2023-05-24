export enum ErrorName {
  UserNotFoundError = 'UserNotFoundError',
  ProductNotFoundError = 'ProductNotFoundError',
  NoProductInStockError = 'NoProductInStockError',
  InvalidInputError = 'InvalidInputError',
  UserAlreadyExistsError = 'UserAlreadyExistsError',
  UnauthorizedError = 'UnauthorizedError',
}

export const handleWithErrorName = (error: ErrorName) => {
  switch (error) {
    case ErrorName.InvalidInputError:
      return 'Dados Inválidos! Entre em contato com nosso suporte!'
    case ErrorName.UnauthorizedError:
      return 'Usuário não autorizado para realizar esta operação!'
    case ErrorName.UserNotFoundError:
      return 'Usuário não encontrado!'
    case ErrorName.ProductNotFoundError:
      return 'Produto não encontrado!'
    case ErrorName.NoProductInStockError:
      return 'Não existe essa quantidade de produto em estoque, tente uma quantidade menor'
    default:
      return 'Algo deu errado. Tente novamente mais tarde'
  }
}
