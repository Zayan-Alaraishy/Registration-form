import { ModifiedError } from './../../interfaces';
import { Request, Response, NextFunction } from 'express';

export const serverError = (
  error: ModifiedError.CustomeError,
  request: Request,
  response: Response,
  _next: NextFunction
): Response => {
  return response.status(error.statusCode || 500).json({
    status: error.statusCode || 500,
    message: error.message,
  });
};
