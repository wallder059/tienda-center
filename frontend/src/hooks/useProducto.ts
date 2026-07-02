import { useEffect, useState } from 'react';
import type { Producto } from '@/interfaces';
import { productoService } from '@/services/productoService';

interface UseProductoResult {
  producto: Producto | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook para obtener un producto por ID.
 */
export const useProducto = (id: string | undefined): UseProductoResult => {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('Producto no encontrado');
      return;
    }

    const fetchProducto = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const data = await productoService.getById(id);
        setProducto(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el producto');
        setProducto(null);
      } finally {
        setLoading(false);
      }
    };

    void fetchProducto();
  }, [id]);

  return { producto, loading, error };
};
