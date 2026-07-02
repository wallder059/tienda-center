import { useEffect, useState } from 'react';
import type { Producto, ProductoFilters, PaginationMeta } from '@/interfaces';
import { productoService } from '@/services/productoService';

interface UseProductosResult {
  productos: Producto[];
  meta: PaginationMeta | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook para obtener productos con filtros.
 */
export const useProductos = (filters: ProductoFilters = {}): UseProductosResult => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchKey, setRefetchKey] = useState(0);

  const filtersKey = JSON.stringify(filters);

  useEffect(() => {
    const fetchProductos = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const response = await productoService.getAll(filters);
        setProductos(response.data);
        setMeta(response.meta);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar productos');
        setProductos([]);
        setMeta(null);
      } finally {
        setLoading(false);
      }
    };

    void fetchProductos();
  }, [filtersKey, refetchKey]);

  return {
    productos,
    meta,
    loading,
    error,
    refetch: () => setRefetchKey((k) => k + 1),
  };
};
