import express, { Express } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { connectDb, disconnectDB } from '@/config';

const app = express();
// eslint-disable-next-line prettier/prettier
app
    .use(cors)
    .use(express.json());

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
