import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from './errorHandler.js';

/**
 * Payload del token JWT decodificado.
 */
export interface JwtPayload {
  userId: string;
  email: string;
  rol: string;
}

/**
 * Extiende Request de Express para incluir el usuario autenticado.
 */
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Middleware de autenticación JWT.
 * Verifica el token en el header Authorization.
 */
export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new AppError('Token de autenticación requerido', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.jwt.secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    throw new AppError('Token inválido o expirado', 401);
  }
};

/**
 * Middleware que requiere rol de administrador.
 */
export const requireAdmin = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.rol !== 'ADMIN') {
    throw new AppError('Acceso denegado. Se requiere rol de administrador.', 403);
  }
  next();
};
