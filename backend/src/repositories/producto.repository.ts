import type { Prisma } from '@prisma/client';
import { prisma } from '../config/database.js';
import type { ProductoFiltersInput } from '../validators/index.js';

const productoInclude = {
  categoria: { select: { id: true, nombre: true } },
  marca: { select: { id: true, nombre: true } },
} satisfies Prisma.ProductoInclude;

/**
 * Repositorio de acceso a datos para productos.
 */
export class ProductoRepository {
  private buildWhere(filters: ProductoFiltersInput): Prisma.ProductoWhereInput {
    const where: Prisma.ProductoWhereInput = {};

    if (filters.categoriaId) where.categoriaId = filters.categoriaId;
    if (filters.marcaId) where.marcaId = filters.marcaId;
    if (filters.activo !== undefined) where.activo = filters.activo;

    if (filters.precioMin !== undefined || filters.precioMax !== undefined) {
      where.precio = {};
      if (filters.precioMin !== undefined) where.precio.gte = filters.precioMin;
      if (filters.precioMax !== undefined) where.precio.lte = filters.precioMax;
    }

    if (filters.busqueda) {
      where.OR = [
        { nombre: { contains: filters.busqueda, mode: 'insensitive' } },
        { descripcion: { contains: filters.busqueda, mode: 'insensitive' } },
      ];
    }

    return where;
  }

  async findMany(filters: ProductoFiltersInput) {
    const where = this.buildWhere(filters);
    const skip = (filters.page - 1) * filters.limit;

    const [productos, total] = await Promise.all([
      prisma.producto.findMany({
        where,
        include: productoInclude,
        orderBy: { createdAt: 'desc' },
        skip,
        take: filters.limit,
      }),
      prisma.producto.count({ where }),
    ]);

    return { productos, total };
  }

  async findById(id: string) {
    return prisma.producto.findUnique({
      where: { id },
      include: productoInclude,
    });
  }

  async create(data: Prisma.ProductoCreateInput) {
    return prisma.producto.create({
      data,
      include: productoInclude,
    });
  }

  async update(id: string, data: Prisma.ProductoUpdateInput) {
    return prisma.producto.update({
      where: { id },
      data,
      include: productoInclude,
    });
  }

  async delete(id: string) {
    return prisma.producto.delete({ where: { id } });
  }
}

export const productoRepository = new ProductoRepository();
