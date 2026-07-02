import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

/**
 * Configuración de Cloudinary para almacenamiento de imágenes.
 */
export const configureCloudinary = (): void => {
  if (!env.cloudinary.cloudName || !env.cloudinary.apiKey || !env.cloudinary.apiSecret) {
    console.warn('[Cloudinary] Credenciales no configuradas. La subida de imágenes no estará disponible.');
    return;
  }

  cloudinary.config({
    cloud_name: env.cloudinary.cloudName,
    api_key: env.cloudinary.apiKey,
    api_secret: env.cloudinary.apiSecret,
    secure: true,
  });
};

export { cloudinary };
