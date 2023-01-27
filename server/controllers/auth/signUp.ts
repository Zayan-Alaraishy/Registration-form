import {
  signUpIndiviualSchema,
  signUpBusinessSchema,
} from './../../validations';
import { Request, Response, NextFunction } from 'express';
import { CustomError, hashingPassword, signToken } from '../../helpers';
import { addNewUser, isEmailTaken, addBusiness } from '../../queries';

export const signUp = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { accountType, ...data } = request.body;

    const isIndividual = accountType === 'individual';

    await (isIndividual
      ? signUpIndiviualSchema
      : signUpBusinessSchema
    ).validateAsync(data);

    const { email, password, ...information } = data;

    const { rows } = await isEmailTaken(
      data.email,
      isIndividual ? 'users' : 'businesses'
    );

    if (rows.length) {
      throw CustomError('Email is already used', 400);
    }

    const hashedPassword = await hashingPassword(password);

    const { rows: InseartedData } = await (isIndividual
      ? addNewUser
      : addBusiness)(email, hashedPassword, information);
    const payload = InseartedData[0];

    const token = await signToken(payload);

    response.cookie('token', token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    response.json({ message: 'Sign up successful', payload });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      next(CustomError(error.message, 400));
    }
    next(error);
  }
};
