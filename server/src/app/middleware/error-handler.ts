
import { Request, Response, NextFunction } from 'express';
import { ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers';

export const errorHandler = (error: Error , request:Request, response: Response, next: NextFunction) => {
  if (error instanceof HttpError) {
    
    console.log("🚀 ~ file: error-handler.ts:190 ~ errorHandler ~ error:", error)
    console.log("🚀 ~ file: error-handler.ts:19 ~ errorHandler ~ error:", error.name)
    console.log("🚀 ~ file: error-handler.ts:19 ~ errorHandler ~ error:", error)


  }
  const statusCode = response.statusCode === 200 ? 500 : response.statusCode;
  console.log("🚀 ~ file: error-handler.ts:8 ~ errorHandler ~ statusCode:", statusCode)

  response.status(statusCode).json({message: 'error.message', name: 'error.name'})
}

