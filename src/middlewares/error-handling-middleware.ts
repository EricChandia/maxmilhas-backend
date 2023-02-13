import { NextFunction, Request, Response } from 'express';
import { ApplicationError } from '@/errors/errors';

export function handleApplicationErrors(
  err: ApplicationError | Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err.name === 'NotFoundCpfException') {
    return res.status(404).send({
      type: err.name,
      message: err.message,
    });
  }

  if (err.name === 'InvalidCpfException') {
    return res.status(400).send({
      type: err.name,
      message: err.message,
    });
  }

  if (err.name === 'ExistsCpfException') {
    return res.status(409).send({
      type: err.name,
      message: err.message,
    });
  }

  /* eslint-disable-next-line no-console */
  console.error(err);
  res.status(500).send({
    type: 'InternalServerError',
    message: 'Internal Server Error',
  });
}
