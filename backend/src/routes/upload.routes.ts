import { Router } from 'express';
import { uploadController } from '../controllers/upload.controller.js';
import { authenticate, requireAdmin } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';

const router = Router();

router.post(
  '/imagen',
  authenticate,
  requireAdmin,
  upload.single('imagen'),
  uploadController.uploadImage
);

export default router;
