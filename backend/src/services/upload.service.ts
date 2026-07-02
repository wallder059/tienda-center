import { Readable } from 'stream';
import { cloudinary } from '../config/cloudinary.js';
import { env } from '../config/env.js';
import { AppError } from '../middlewares/errorHandler.js';

/**
 * Verifica que Cloudinary esté configurado.
 */
const ensureCloudinaryConfigured = (): void => {
  if (!env.cloudinary.cloudName || !env.cloudinary.apiKey || !env.cloudinary.apiSecret) {
    throw new AppError('Cloudinary no está configurado. Agrega las credenciales en .env', 503);
  }
};

/**
 * Sube un buffer de imagen a Cloudinary.
 */
export const uploadImageToCloudinary = (buffer: Buffer, folder: string = 'tienda-center'): Promise<string> => {
  ensureCloudinaryConfigured();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error || !result) {
          reject(new AppError('Error al subir la imagen a Cloudinary', 500));
          return;
        }
        resolve(result.secure_url);
      }
    );

    const readable = Readable.from(buffer);
    readable.pipe(uploadStream);
  });
};
