import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { JwtPayload } from './auth.js';

/**
 * Middleware de autenticación opcional.
 * Si hay token válido, adjunta el usuario; si no, continúa sin autenticar.
 */
export const optionalAuthenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    next();
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.jwt.secret) as JwtPayload;
    req.user = decoded;
  } catch {
    // Token inválido: se ignora y se trata como usuario público
  }

  next();
};

/**
 * Verifica si el usuario autenticado es administrador.
 */
export const isAdmin = (req: Request): boolean => {
  return req.user?.rol === 'ADMIN';
};
