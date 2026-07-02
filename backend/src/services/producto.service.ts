import { AppError } from '../middlewares/errorHandler.js';
import { productoRepository } from '../repositories/producto.repository.js';
import { categoriaService } from './categoria.service.js';
import { marcaService } from './marca.service.js';
import { mapProductoToResponse, mapProductosToResponse } from '../utils/mappers.js';
import type {
  CreateProductoInput,
  UpdateProductoInput,
  ProductoFiltersInput,
} from '../validators/index.js';

/**
 * Servicio de lógica de negocio para productos.
 */
export class ProductoService {
  async getAll(filters: ProductoFiltersInput, isAdmin: boolean = false) {
    const appliedFilters: ProductoFiltersInput = { ...filters };

    if (!isAdmin) {
      appliedFilters.activo = true;
    } else if (filters.activo === undefined) {
      delete appliedFilters.activo;
    }

    const { productos, total } = await productoRepository.findMany(appliedFilters);

    return {
      productos: mapProductosToResponse(productos),
      meta: {
        total,
        page: appliedFilters.page,
        limit: appliedFilters.limit,
        totalPages: Math.ceil(total / appliedFilters.limit),
      },
    };
  }

  async getById(id: string, isAdmin: boolean = false) {
    const producto = await productoRepository.findById(id);

    if (!producto) {
      throw new AppError('Producto no encontrado', 404);
    }

    if (!isAdmin && !producto.activo) {
      throw new AppError('Producto no encontrado', 404);
    }

    return mapProductoToResponse(producto);
  }

  async create(data: CreateProductoInput) {
    await categoriaService.validateExists(data.categoriaId);
    await marcaService.validateExists(data.marcaId);

    const producto = await productoRepository.create({
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio: data.precio,
      stock: data.stock,
      imagen: data.imagen,
      activo: data.activo,
      categoria: { connect: { id: data.categoriaId } },
      marca: { connect: { id: data.marcaId } },
    });

    return mapProductoToResponse(producto);
  }

  async update(id: string, data: UpdateProductoInput) {
    await this.getById(id, true);

    if (data.categoriaId) {
      await categoriaService.validateExists(data.categoriaId);
    }

    if (data.marcaId) {
      await marcaService.validateExists(data.marcaId);
    }

    const producto = await productoRepository.update(id, {
      ...(data.nombre !== undefined && { nombre: data.nombre }),
      ...(data.descripcion !== undefined && { descripcion: data.descripcion }),
      ...(data.precio !== undefined && { precio: data.precio }),
      ...(data.stock !== undefined && { stock: data.stock }),
      ...(data.imagen !== undefined && { imagen: data.imagen }),
      ...(data.activo !== undefined && { activo: data.activo }),
      ...(data.categoriaId !== undefined && {
        categoria: { connect: { id: data.categoriaId } },
      }),
      ...(data.marcaId !== undefined && {
        marca: { connect: { id: data.marcaId } },
      }),
    });

    return mapProductoToResponse(producto);
  }

  async delete(id: string) {
    await this.getById(id, true);
    await productoRepository.delete(id);
  }
}

export const productoService = new ProductoService();
