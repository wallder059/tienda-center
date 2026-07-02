import { Router } from 'express';
import { categoriaController } from '../controllers/categoria.controller.js';
import { authenticate, requireAdmin } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createCategoriaSchema } from '../validators/index.js';

const router = Router();

router.get('/', categoriaController.getAll);

router.post(
  '/',
  authenticate,
  requireAdmin,
  validate({ body: createCategoriaSchema }),
  categoriaController.create
);

export default router;
