/**
 * Interfaz base de producto.
 */
export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  categoriaId: string;
  marcaId: string;
  activo: boolean;
  createdAt: string;
  categoria?: Categoria;
  marca?: Marca;
}

/**
 * Interfaz de categoría.
 */
export interface Categoria {
  id: string;
  nombre: string;
}

/**
 * Interfaz de marca.
 */
export interface Marca {
  id: string;
  nombre: string;
}

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
 * Usuario autenticado.
 */
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'ADMIN' | 'USUARIO';
}

/**
 * Respuesta de autenticación.
 */
export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

/**
 * Filtros de productos.
 */
export interface ProductoFilters {
  categoriaId?: string;
  marcaId?: string;
  precioMin?: number;
  precioMax?: number;
  busqueda?: string;
  activo?: boolean;
  page?: number;
  limit?: number;
}

/**
 * Datos para crear un producto.
 */
export interface CreateProductoDto {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  categoriaId: string;
  marcaId: string;
  activo?: boolean;
}

/**
 * Datos para actualizar un producto.
 */
export interface UpdateProductoDto {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  stock?: number;
  imagen?: string;
  categoriaId?: string;
  marcaId?: string;
  activo?: boolean;
}

/**
 * Datos de login.
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Datos para crear categoría o marca.
 */
export interface CreateNombreDto {
  nombre: string;
}
