import type { Request, Response } from 'express';
import { categoriaService } from '../services/categoria.service.js';
import { sendSuccess } from '../utils/response.js';
import { asyncHandler } from '../middlewares/rateLimiter.js';

import type { CreateCategoriaInput } from '../validators/index.js';

/**
 * Controlador de categorías.
 */
export class CategoriaController {
  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const categorias = await categoriaService.getAll();
    sendSuccess(res, categorias);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const data = req.validated.body as CreateCategoriaInput;
    const categoria = await categoriaService.create(data);
    sendSuccess(res, categoria, 'Categoría creada exitosamente', 201);
  });
}

export const categoriaController = new CategoriaController();
