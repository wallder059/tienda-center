import { api } from './api';
import type {
  ApiResponse,
  Producto,
  ProductoFilters,
  PaginationMeta,
  CreateProductoDto,
  UpdateProductoDto,
} from '@/interfaces';

interface ProductosResponse {
  data: Producto[];
  meta: PaginationMeta;
}

/**
 * Servicio de productos.
 */
export const productoService = {
  async getAll(filters: ProductoFilters = {}): Promise<ProductosResponse> {
    const response = await api.get<ApiResponse<Producto[]>>('/productos', { params: filters });
    return {
      data: response.data.data ?? [],
      meta: response.data.meta ?? { total: 0, page: 1, limit: 12, totalPages: 0 },
    };
  },

  async getById(id: string): Promise<Producto> {
    const response = await api.get<ApiResponse<Producto>>(`/productos/${id}`);
    if (!response.data.data) throw new Error('Producto no encontrado');
    return response.data.data;
  },

  async create(data: CreateProductoDto): Promise<Producto> {
    const response = await api.post<ApiResponse<Producto>>('/productos', data);
    if (!response.data.data) throw new Error('Error al crear producto');
    return response.data.data;
  },

  async update(id: string, data: UpdateProductoDto): Promise<Producto> {
    const response = await api.put<ApiResponse<Producto>>(`/productos/${id}`, data);
    if (!response.data.data) throw new Error('Error al actualizar producto');
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/productos/${id}`);
  },
};
