import express, { Application } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { notFoundError, serverError } from './middlewares';
import route from './routes';

const app: Application = express();

app.use([
  compression(),
  morgan('dev'),
  cookieParser(),
  express.urlencoded({ limit: '10mb', extended: true }),
  express.json({
    limit: '10mb',
  }),
]);

app.use('/api/v1/', route);
app.use(notFoundError);
app.use(serverError);

export default app;
