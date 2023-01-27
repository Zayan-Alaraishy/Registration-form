import { connection } from '../database/connection';

export default (
  email: string,
  hashedPassword: string,
  information: any
): Promise<any> => {
  const { businessName, businessAdrdress, businessPhone } = information;
  return connection.query(
    `INSERT INTO businesses(business_name,email,password,address,phone) VALUES($1,$2,$3,$4,$5) RETURNING business_name,email,business_id,address,phone`,
    [businessName, email, hashedPassword, businessAdrdress, businessPhone]
  );
};
