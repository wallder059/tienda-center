import { Router } from 'express';
import { productoController } from '../controllers/producto.controller.js';
import { authenticate, requireAdmin } from '../middlewares/auth.js';
import { optionalAuthenticate } from '../middlewares/optionalAuth.js';
import { validate } from '../middlewares/validate.js';
import {
  createProductoSchema,
  updateProductoSchema,
  productoFiltersSchema,
  productoIdSchema,
} from '../validators/index.js';

const router = Router();

router.get(
  '/',
  optionalAuthenticate,
  validate({ query: productoFiltersSchema }),
  productoController.getAll
);

router.get(
  '/:id',
  optionalAuthenticate,
  validate({ params: productoIdSchema }),
  productoController.getById
);

router.post(
  '/',
  authenticate,
  requireAdmin,
  validate({ body: createProductoSchema }),
  productoController.create
);

router.put(
  '/:id',
  authenticate,
  requireAdmin,
  validate({ params: productoIdSchema, body: updateProductoSchema }),
  productoController.update
);

router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  validate({ params: productoIdSchema }),
  productoController.delete
);

export default router;
