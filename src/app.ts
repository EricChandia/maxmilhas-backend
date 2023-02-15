import express, { Express } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { connectDb, disconnectDB } from '@/config';
import router from './routes';
import { handleApplicationErrors } from './middlewares/errorHandlerMiddleware';

const app = express();
// eslint-disable-next-line prettier/prettier
app
    .use(cors())
    .use(express.json())
    .use(router)
    .use(handleApplicationErrors);

export async function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
