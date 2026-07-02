import { api } from './api';
import type { ApiResponse } from '@/interfaces';

/**
 * Servicio de subida de imágenes a Cloudinary.
 */
export const uploadService = {
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('imagen', file);

    const response = await api.post<ApiResponse<{ url: string }>>('/upload/imagen', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (!response.data.data?.url) throw new Error('Error al subir la imagen');
    return response.data.data.url;
  },
};
