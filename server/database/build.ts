import { readFileSync } from 'fs';
import path from 'path';
import { connection } from './connection';

export const build = (): void => {
  const data = readFileSync(path.join(__dirname, './init.sql')).toString();
  connection.query(data);
};
if (process.env.NODE_ENV === 'dev') {
  build();
}
