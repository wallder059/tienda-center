import type { Response } from 'express';
import type { ApiResponse, PaginationMeta } from '../types/index.js';

/**
 * Envía una respuesta exitosa estandarizada.
 */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message?: string,
  statusCode: number = 200
): void => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  res.status(statusCode).json(response);
};

/**
 * Envía una respuesta exitosa con metadatos de paginación.
 */
export const sendPaginatedSuccess = <T>(
  res: Response,
  data: T,
  meta: PaginationMeta,
  message?: string
): void => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    meta,
  };
  res.status(200).json(response);
};

/**
 * Convierte un valor Decimal de Prisma a número.
 */
export const decimalToNumber = (value: { toNumber(): number } | number): number => {
  return typeof value === 'number' ? value : value.toNumber();
};
