import multer from 'multer';

/**
 * Configuración de Multer para almacenamiento en memoria.
 */
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});
