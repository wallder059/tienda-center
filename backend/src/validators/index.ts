import { z } from 'zod';

export const uuidSchema = z.string().uuid('ID inválido');

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const createCategoriaSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
});

export const createMarcaSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
});

export const createProductoSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(200, 'El nombre no puede exceder 200 caracteres')
    .trim(),
  descripcion: z
    .string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(5000, 'La descripción no puede exceder 5000 caracteres')
    .trim(),
  precio: z.coerce.number().positive('El precio debe ser mayor a 0'),
  stock: z.coerce.number().int('El stock debe ser un número entero').min(0, 'El stock no puede ser negativo'),
  imagen: z.string().url('La imagen debe ser una URL válida'),
  categoriaId: uuidSchema,
  marcaId: uuidSchema,
  activo: z.boolean().optional().default(true),
});

export const updateProductoSchema = z
  .object({
    nombre: z.string().min(2).max(200).trim().optional(),
    descripcion: z.string().min(10).max(5000).trim().optional(),
    precio: z.coerce.number().positive('El precio debe ser mayor a 0').optional(),
    stock: z.coerce.number().int().min(0, 'El stock no puede ser negativo').optional(),
    imagen: z.string().url('La imagen debe ser una URL válida').optional(),
    categoriaId: uuidSchema.optional(),
    marcaId: uuidSchema.optional(),
    activo: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe proporcionar al menos un campo para actualizar',
  });

export const productoFiltersSchema = z.object({
  categoriaId: uuidSchema.optional(),
  marcaId: uuidSchema.optional(),
  precioMin: z.coerce.number().min(0).optional(),
  precioMax: z.coerce.number().min(0).optional(),
  busqueda: z.string().trim().optional(),
  activo: z
    .enum(['true', 'false'])
    .transform((val) => val === 'true')
    .optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(12),
});

export const productoIdSchema = z.object({
  id: uuidSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateCategoriaInput = z.infer<typeof createCategoriaSchema>;
export type CreateMarcaInput = z.infer<typeof createMarcaSchema>;
export type CreateProductoInput = z.infer<typeof createProductoSchema>;
export type UpdateProductoInput = z.infer<typeof updateProductoSchema>;
export type ProductoFiltersInput = z.infer<typeof productoFiltersSchema>;
