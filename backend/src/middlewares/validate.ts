import type { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodType } from 'zod';
import { AppError } from './errorHandler.js';

interface ValidationSchemas {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
}

declare global {
  namespace Express {
    interface Request {
      validated: {
        body?: unknown;
        query?: unknown;
        params?: unknown;
      };
    }
  }
}

/**
 * Middleware de validación con Zod.
 * Almacena los datos validados en req.validated.
 */
export const validate = (schemas: ValidationSchemas) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.validated = req.validated ?? {};

      if (schemas.body) {
        req.validated.body = schemas.body.parse(req.body);
      }
      if (schemas.query) {
        req.validated.query = schemas.query.parse(req.query);
      }
      if (schemas.params) {
        req.validated.params = schemas.params.parse(req.params);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.issues.map((issue) => issue.message).join(', ');
        throw new AppError(messages, 400);
      }
      throw error;
    }
  };
};
