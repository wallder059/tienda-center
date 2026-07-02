import { useEffect, useState } from 'react';
import type { Categoria } from '@/interfaces';
import { categoriaService } from '@/services/categoriaService';

/**
 * Hook para obtener categorías.
 */
export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [refetchKey, setRefetchKey] = useState(0);

  useEffect(() => {
    const fetchCategorias = async (): Promise<void> => {
      try {
        const data = await categoriaService.getAll();
        setCategorias(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar categorías');
      } finally {
        setLoading(false);
      }
    };

    void fetchCategorias();
  }, [refetchKey]);

  return {
    categorias,
    loading,
    error,
    refetch: () => setRefetchKey((k) => k + 1),
  };
};
