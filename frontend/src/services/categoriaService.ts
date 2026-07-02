import { api } from './api';
import type { ApiResponse, Categoria, CreateNombreDto } from '@/interfaces';

/**
 * Servicio de categorías.
 */
export const categoriaService = {
  async getAll(): Promise<Categoria[]> {
    const response = await api.get<ApiResponse<Categoria[]>>('/categorias');
    return response.data.data ?? [];
  },

  async create(data: CreateNombreDto): Promise<Categoria> {
    const response = await api.post<ApiResponse<Categoria>>('/categorias', data);
    if (!response.data.data) throw new Error('Error al crear categoría');
    return response.data.data;
  },
};
