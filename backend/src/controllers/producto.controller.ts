import type { Request, Response } from 'express';
import { productoService } from '../services/producto.service.js';
import { sendSuccess, sendPaginatedSuccess } from '../utils/response.js';
import { asyncHandler } from '../middlewares/rateLimiter.js';
import { isAdmin } from '../middlewares/optionalAuth.js';
import type { ProductoFiltersInput, UpdateProductoInput, CreateProductoInput } from '../validators/index.js';

/**
 * Controlador de productos.
 */
export class ProductoController {
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const filters = req.validated.query as ProductoFiltersInput;
    const { productos, meta } = await productoService.getAll(filters, isAdmin(req));
    sendPaginatedSuccess(res, productos, meta);
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.validated.params as { id: string };
    const producto = await productoService.getById(id, isAdmin(req));
    sendSuccess(res, producto);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const data = req.validated.body as CreateProductoInput;
    const producto = await productoService.create(data);
    sendSuccess(res, producto, 'Producto creado exitosamente', 201);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.validated.params as { id: string };
    const data = req.validated.body as UpdateProductoInput;
    const producto = await productoService.update(id, data);
    sendSuccess(res, producto, 'Producto actualizado exitosamente');
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.validated.params as { id: string };
    await productoService.delete(id);
    sendSuccess(res, null, 'Producto eliminado exitosamente');
  });
}

export const productoController = new ProductoController();
