import { hash } from 'bcryptjs';
export const hashingPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
};
