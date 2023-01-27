import { connection } from './../database/connection';

export default (email: string, table: string): Promise<any> => {
  return connection.query(`SELECT * from ${table} where email= $1`, [email]);
};
