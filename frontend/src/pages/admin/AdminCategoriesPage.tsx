import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Tags } from 'lucide-react';
import { useCategorias } from '@/hooks/useCategorias';
import { categoriaService } from '@/services/categoriaService';
import { nombreSchema, type NombreFormData } from '@/validators/adminSchemas';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { LoadingState } from '@/components/ui/Spinner';

/**
 * Gestión de categorías en el panel admin.
 */
export const AdminCategoriesPage = () => {
  const { categorias, loading, refetch } = useCategorias();
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NombreFormData>({
    resolver: zodResolver(nombreSchema),
    defaultValues: { nombre: '' },
  });

  const onSubmit = async (data: NombreFormData) => {
    setError(null);
    try {
      await categoriaService.create(data);
      reset();
      setModalOpen(false);
      refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear categoría');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Categorías</h1>
          <p className="text-dark-400">{categorias.length} categorías registradas</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Nueva categoría
        </Button>
      </div>

      {loading ? (
        <LoadingState />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-3 rounded-xl border border-dark-800 bg-dark-900 px-4 py-3"
            >
              <Tags className="h-5 w-5 text-primary-400" />
              <span className="font-medium text-white">{c.nombre}</span>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Nueva categoría">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nombre"
            placeholder="Ej: GPU, CPU, RAM..."
            error={errors.nombre?.message}
            {...register('nombre')}
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" loading={isSubmitting}>Crear</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
