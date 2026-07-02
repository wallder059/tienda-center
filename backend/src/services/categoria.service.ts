import { AppError } from '../middlewares/errorHandler.js';
import { categoriaRepository } from '../repositories/categoria.repository.js';
import type { CreateCategoriaInput } from '../validators/index.js';

/**
 * Servicio de lógica de negocio para categorías.
 */
export class CategoriaService {
  async getAll() {
    return categoriaRepository.findAll();
  }

  async create(data: CreateCategoriaInput) {
    const existing = await categoriaRepository.findByNombre(data.nombre);

    if (existing) {
      throw new AppError('Ya existe una categoría con ese nombre', 409);
    }

    return categoriaRepository.create(data.nombre);
  }

  async validateExists(id: string) {
    const categoria = await categoriaRepository.findById(id);

    if (!categoria) {
      throw new AppError('Categoría no encontrada', 404);
    }

    return categoria;
  }
}

export const categoriaService = new CategoriaService();
