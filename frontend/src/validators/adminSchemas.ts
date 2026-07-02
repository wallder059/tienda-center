import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export const productoSchema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres').max(200),
  descripcion: z.string().min(10, 'Mínimo 10 caracteres').max(5000),
  precio: z.number().positive('Debe ser mayor a 0'),
  stock: z.number().int().min(0, 'No puede ser negativo'),
  imagen: z.string().url('URL de imagen inválida'),
  categoriaId: z.string().uuid('Selecciona una categoría'),
  marcaId: z.string().uuid('Selecciona una marca'),
  activo: z.boolean(),
});

export const nombreSchema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres').max(100),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ProductoFormData = z.infer<typeof productoSchema>;
export type NombreFormData = z.infer<typeof nombreSchema>;
