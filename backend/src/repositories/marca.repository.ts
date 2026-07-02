import { prisma } from '../config/database.js';

/**
 * Repositorio de acceso a datos para marcas.
 */
export class MarcaRepository {
  async findAll() {
    return prisma.marca.findMany({
      orderBy: { nombre: 'asc' },
    });
  }

  async findById(id: string) {
    return prisma.marca.findUnique({ where: { id } });
  }

  async findByNombre(nombre: string) {
    return prisma.marca.findUnique({ where: { nombre } });
  }

  async create(nombre: string) {
    return prisma.marca.create({ data: { nombre } });
  }
}

export const marcaRepository = new MarcaRepository();
