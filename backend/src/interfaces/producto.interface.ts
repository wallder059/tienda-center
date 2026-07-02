import { Decimal } from '@prisma/client/runtime/library';

/**
 * Producto para respuestas públicas de la API.
 */
export interface ProductoResponse {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number | Decimal;
  stock: number;
  imagen: string;
  categoriaId: string;
  marcaId: string;
  activo: boolean;
  createdAt: Date;
  categoria?: { id: string; nombre: string };
  marca?: { id: string; nombre: string };
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
