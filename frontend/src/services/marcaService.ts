import { api } from './api';
import type { ApiResponse, Marca, CreateNombreDto } from '@/interfaces';

/**
 * Servicio de marcas.
 */
export const marcaService = {
  async getAll(): Promise<Marca[]> {
    const response = await api.get<ApiResponse<Marca[]>>('/marcas');
    return response.data.data ?? [];
  },

  async create(data: CreateNombreDto): Promise<Marca> {
    const response = await api.post<ApiResponse<Marca>>('/marcas', data);
    if (!response.data.data) throw new Error('Error al crear marca');
    return response.data.data;
  },
};
