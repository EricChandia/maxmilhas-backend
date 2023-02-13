import { invalidDataError } from '@/errors/errors';
import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export function validateBody<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, 'body');
}

export function validateParams<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, 'params');
}

function validate(schema: ObjectSchema, type: 'body' | 'params') {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).send(invalidDataError(error.details.map((d) => d.message)));
    }

    next();
  };
}

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;
