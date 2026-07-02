/**
 * Respuesta estándar de la API.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: PaginationMeta;
}

/**
 * Metadatos de paginación.
 */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Parámetros de paginación para consultas.
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Parámetros de filtrado de productos.
 */
export interface ProductoFilters {
  categoriaId?: string;
  marcaId?: string;
  precioMin?: number;
  precioMax?: number;
  busqueda?: string;
  activo?: boolean;
}
