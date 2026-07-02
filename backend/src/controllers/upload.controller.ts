import type { Request, Response } from 'express';
import { uploadImageToCloudinary } from '../services/upload.service.js';
import { sendSuccess } from '../utils/response.js';
import { asyncHandler } from '../middlewares/rateLimiter.js';
import { AppError } from '../middlewares/errorHandler.js';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Controlador de subida de archivos.
 */
export class UploadController {
  uploadImage = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
      throw new AppError('No se proporcionó ninguna imagen', 400);
    }

    if (!ALLOWED_MIME_TYPES.includes(req.file.mimetype)) {
      throw new AppError('Formato de imagen no permitido. Usa JPG, PNG, WEBP o GIF', 400);
    }

    if (req.file.size > MAX_FILE_SIZE) {
      throw new AppError('La imagen no puede superar 5MB', 400);
    }

    const url = await uploadImageToCloudinary(req.file.buffer);
    sendSuccess(res, { url }, 'Imagen subida exitosamente', 201);
  });
}

export const uploadController = new UploadController();
