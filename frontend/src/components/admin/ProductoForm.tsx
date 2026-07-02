import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productoSchema, type ProductoFormData } from '@/validators/adminSchemas';
import type { Producto, Categoria, Marca } from '@/interfaces';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { ImageUpload } from '@/components/admin/ImageUpload';

interface ProductoFormProps {
  producto?: Producto | null;
  categorias: Categoria[];
  marcas: Marca[];
  onSubmit: (data: ProductoFormData) => Promise<void>;
  onCancel: () => void;
}

/**
 * Formulario de creación/edición de productos.
 */
export const ProductoForm = ({
  producto,
  categorias,
  marcas,
  onSubmit,
  onCancel,
}: ProductoFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductoFormData>({
    resolver: zodResolver(productoSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      imagen: '',
      categoriaId: '',
      marcaId: '',
      activo: true,
    },
  });

  useEffect(() => {
    if (producto) {
      reset({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock,
        imagen: producto.imagen,
        categoriaId: producto.categoriaId,
        marcaId: producto.marcaId,
        activo: producto.activo,
      });
    }
  }, [producto, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Nombre" error={errors.nombre?.message} {...register('nombre')} />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-dark-300">Descripción</label>
        <textarea
          rows={4}
          className="rounded-xl border border-dark-600 bg-dark-900 px-4 py-2.5 text-sm text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          {...register('descripcion')}
        />
        {errors.descripcion && <p className="text-xs text-red-400">{errors.descripcion.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Precio (Bs.)"
          type="number"
          step="0.01"
          min={0}
          error={errors.precio?.message}
          {...register('precio', { valueAsNumber: true })}
        />
        <Input
          label="Stock"
          type="number"
          min={0}
          error={errors.stock?.message}
          {...register('stock', { valueAsNumber: true })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Categoría"
          placeholder="Seleccionar..."
          options={categorias.map((c) => ({ value: c.id, label: c.nombre }))}
          error={errors.categoriaId?.message}
          {...register('categoriaId')}
        />
        <Select
          label="Marca"
          placeholder="Seleccionar..."
          options={marcas.map((m) => ({ value: m.id, label: m.nombre }))}
          error={errors.marcaId?.message}
          {...register('marcaId')}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-dark-300">Imagen</label>
        <Controller
          name="imagen"
          control={control}
          render={({ field }) => (
            <ImageUpload value={field.value} onChange={field.onChange} error={errors.imagen?.message} />
          )}
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-dark-600 bg-dark-800 text-primary-600 focus:ring-primary-500"
          {...register('activo')}
        />
        <span className="text-sm text-dark-300">Producto activo (visible en la tienda)</span>
      </label>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {producto ? 'Guardar cambios' : 'Crear producto'}
        </Button>
      </div>
    </form>
  );
};
