import { Router } from 'express';
import productoRoutes from './producto.routes.js';
import categoriaRoutes from './categoria.routes.js';
import marcaRoutes from './marca.routes.js';
import authRoutes from './auth.routes.js';
import uploadRoutes from './upload.routes.js';

const router = Router();

router.use('/productos', productoRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/marcas', marcaRoutes);
router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes);

export default router;
