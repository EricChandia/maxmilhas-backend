import express, { Express } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { loadEnv } from '@/config';

loadEnv();

const app = express();
// eslint-disable-next-line prettier/prettier
app
    .use(cors)
    .use(express.json());

export async function init(): Promise<Express> {
  return Promise.resolve(app);
}

export default app;
