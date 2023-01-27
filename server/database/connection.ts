import { Pool } from 'pg';
import config from '../config';

export const connection = new Pool({
  connectionString: config.database.url,
  ssl: process.env.NODE_ENV === 'production' && {
    rejectUnauthorized: false,
  },
});
