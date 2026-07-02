import type { Producto, Categoria, Marca } from '@prisma/client';
import { decimalToNumber } from '../utils/response.js';

type ProductoWithRelations = Producto & {
  categoria?: Categoria;
  marca?: Marca;
};

/**
 * Mapea un producto de Prisma a formato de respuesta API.
 */
export const mapProductoToResponse = (producto: ProductoWithRelations) => ({
  id: producto.id,
  nombre: producto.nombre,
  descripcion: producto.descripcion,
  precio: decimalToNumber(producto.precio),
  stock: producto.stock,
  imagen: producto.imagen,
  categoriaId: producto.categoriaId,
  marcaId: producto.marcaId,
  activo: producto.activo,
  createdAt: producto.createdAt,
  ...(producto.categoria && {
    categoria: { id: producto.categoria.id, nombre: producto.categoria.nombre },
  }),
  ...(producto.marca && {
    marca: { id: producto.marca.id, nombre: producto.marca.nombre },
  }),
});

/**
 * Mapea una lista de productos a formato de respuesta API.
 */
export const mapProductosToResponse = (productos: ProductoWithRelations[]) =>
  productos.map(mapProductoToResponse);
