import { connection } from '../database/connection';
interface infromation {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  birthdate: string;
  gender: string;
}
export default (
  email: string,
  hashedPassword: string,
  information: infromation
): Promise<any> => {
  const { firstName, lastName, address, phone, gender, birthdate } =
    information;
  return connection.query(
    `INSERT INTO users(first_name,last_name,email,password,address,phone,gender,birthdate) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING last_name,email,user_id,first_name,address,phone,gender,birthdate`,
    [
      firstName,
      lastName,
      email,
      hashedPassword,
      address,
      phone,
      gender,
      birthdate,
    ]
  );
};
