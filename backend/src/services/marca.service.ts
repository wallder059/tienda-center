import { AppError } from '../middlewares/errorHandler.js';
import { marcaRepository } from '../repositories/marca.repository.js';
import type { CreateMarcaInput } from '../validators/index.js';

/**
 * Servicio de lógica de negocio para marcas.
 */
export class MarcaService {
  async getAll() {
    return marcaRepository.findAll();
  }

  async create(data: CreateMarcaInput) {
    const existing = await marcaRepository.findByNombre(data.nombre);

    if (existing) {
      throw new AppError('Ya existe una marca con ese nombre', 409);
    }

    return marcaRepository.create(data.nombre);
  }

  async validateExists(id: string) {
    const marca = await marcaRepository.findById(id);

    if (!marca) {
      throw new AppError('Marca no encontrada', 404);
    }

    return marca;
  }
}

export const marcaService = new MarcaService();
