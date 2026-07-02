import { useEffect, useState } from 'react';
import type { Marca } from '@/interfaces';
import { marcaService } from '@/services/marcaService';

/**
 * Hook para obtener marcas.
 */
export const useMarcas = () => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [refetchKey, setRefetchKey] = useState(0);

  useEffect(() => {
    const fetchMarcas = async (): Promise<void> => {
      try {
        const data = await marcaService.getAll();
        setMarcas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar marcas');
      } finally {
        setLoading(false);
      }
    };

    void fetchMarcas();
  }, [refetchKey]);

  return {
    marcas,
    loading,
    error,
    refetch: () => setRefetchKey((k) => k + 1),
  };
};
