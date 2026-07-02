import type { Request, Response } from 'express';
import { marcaService } from '../services/marca.service.js';
import { sendSuccess } from '../utils/response.js';
import { asyncHandler } from '../middlewares/rateLimiter.js';

import type { CreateMarcaInput } from '../validators/index.js';

/**
 * Controlador de marcas.
 */
export class MarcaController {
  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const marcas = await marcaService.getAll();
    sendSuccess(res, marcas);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const data = req.validated.body as CreateMarcaInput;
    const marca = await marcaService.create(data);
    sendSuccess(res, marca, 'Marca creada exitosamente', 201);
  });
}

export const marcaController = new MarcaController();
