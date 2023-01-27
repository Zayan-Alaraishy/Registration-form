import { Request, Response } from 'express';

export const notFoundError = (
  request: Request,
  response: Response
): Response => {
  return response.status(404).send({
    message: 'Page not found',
  });
};
