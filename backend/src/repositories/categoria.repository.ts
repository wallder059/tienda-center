import { prisma } from '../config/database.js';

/**
 * Repositorio de acceso a datos para categorías.
 */
export class CategoriaRepository {
  async findAll() {
    return prisma.categoria.findMany({
      orderBy: { nombre: 'asc' },
    });
  }

  async findById(id: string) {
    return prisma.categoria.findUnique({ where: { id } });
  }

  async findByNombre(nombre: string) {
    return prisma.categoria.findUnique({ where: { nombre } });
  }

  async create(nombre: string) {
    return prisma.categoria.create({ data: { nombre } });
  }
}

export const categoriaRepository = new CategoriaRepository();
