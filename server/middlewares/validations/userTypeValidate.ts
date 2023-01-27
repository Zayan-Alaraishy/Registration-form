import { Request, Response, NextFunction } from 'express';
export const userTypeValidate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const {
    body: { accountType },
  } = request;
  if (accountType === 'individual' || accountType === 'business') {
    next();
  } else {
    response.status(400).send({ error: 'Invalid user type' });
  }
};
