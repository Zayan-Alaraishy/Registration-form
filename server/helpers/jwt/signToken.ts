import { Auth } from '../../interfaces';
import { sign } from 'jsonwebtoken';
import config from '../../config';

const {
  system: { secretKey },
} = config;
export const signToken = (
  payload: Auth.Payload
): Promise<string | Error | undefined> => {
  return new Promise((resolve, reject) => {
    sign(payload, secretKey, (error, token) => {
      if (error) {
        reject(error);
      }
      resolve(token);
    });
  });
};
