import { Router } from 'express';
import { marcaController } from '../controllers/marca.controller.js';
import { authenticate, requireAdmin } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createMarcaSchema } from '../validators/index.js';

const router = Router();

router.get('/', marcaController.getAll);

router.post(
  '/',
  authenticate,
  requireAdmin,
  validate({ body: createMarcaSchema }),
  marcaController.create
);

export default router;
