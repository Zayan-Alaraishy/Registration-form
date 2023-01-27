import dotenv from 'dotenv';
import path from 'path';
import { database } from './database';
import { system } from './system';

if (!process.env.NODE_ENV) throw new Error('NODE_ENV is not defined');

dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

export default {
  database: database(),
  system: system(),
};
