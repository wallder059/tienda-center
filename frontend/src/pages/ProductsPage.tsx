import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { useProductos } from '@/hooks/useProductos';
import { useCategorias } from '@/hooks/useCategorias';
import { useMarcas } from '@/hooks/useMarcas';
import { useDebounce } from '@/hooks/useDebounce';
import { ProductGrid } from '@/components/product/ProductGrid';
import { SearchBar } from '@/components/catalog/SearchBar';
import { ProductFilters, type FilterValues } from '@/components/catalog/ProductFilters';
import { Pagination } from '@/components/catalog/Pagination';
import { LoadingState, ErrorState, EmptyState } from '@/components/ui/Spinner';
import { Button } from '@/components/ui/Button';
import type { ProductoFilters } from '@/interfaces';

const EMPTY_FILTERS: FilterValues = {
  categoriaId: '',
  marcaId: '',
  precioMin: '',
  precioMax: '',
};

/**
 * Página de catálogo con filtros y búsqueda instantánea.
 */
export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [search, setSearch] = useState(searchParams.get('busqueda') ?? '');
  const debouncedSearch = useDebounce(search);

  const [filters, setFilters] = useState<FilterValues>({
    categoriaId: searchParams.get('categoriaId') ?? '',
    marcaId: searchParams.get('marcaId') ?? '',
    precioMin: searchParams.get('precioMin') ?? '',
    precioMax: searchParams.get('precioMax') ?? '',
  });

  const page = Number(searchParams.get('page') ?? '1');

  const apiFilters = useMemo<ProductoFilters>(() => {
    const result: ProductoFilters = { page, limit: 12 };
    if (debouncedSearch) result.busqueda = debouncedSearch;
    if (filters.categoriaId) result.categoriaId = filters.categoriaId;
    if (filters.marcaId) result.marcaId = filters.marcaId;
    if (filters.precioMin) result.precioMin = Number(filters.precioMin);
    if (filters.precioMax) result.precioMax = Number(filters.precioMax);
    return result;
  }, [debouncedSearch, filters, page]);

  const { productos, meta, loading, error } = useProductos(apiFilters);
  const { categorias } = useCategorias();
  const { marcas } = useMarcas();

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      if (!updates.page) params.set('page', '1');
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    updateParams({ busqueda: value, page: '1' });
  };

  const handleFiltersChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    updateParams({
      categoriaId: newFilters.categoriaId,
      marcaId: newFilters.marcaId,
      precioMin: newFilters.precioMin,
      precioMax: newFilters.precioMax,
      page: '1',
    });
  };

  const handleClearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setSearch('');
    setSearchParams({});
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: String(newPage) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Productos</h1>
        <p className="text-dark-500 dark:text-dark-400">
          Explora nuestro catálogo de componentes de PC
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="hidden w-72 shrink-0 lg:block">
          <ProductFilters
            categorias={categorias}
            marcas={marcas}
            filters={filters}
            onChange={handleFiltersChange}
            onClear={handleClearFilters}
          />
        </div>

        <div className="flex-1 space-y-6">
          <div className="flex gap-3">
            <div className="flex-1">
              <SearchBar value={search} onChange={handleSearchChange} />
            </div>
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {showMobileFilters && (
            <div className="lg:hidden">
              <ProductFilters
                categorias={categorias}
                marcas={marcas}
                filters={filters}
                onChange={handleFiltersChange}
                onClear={handleClearFilters}
              />
            </div>
          )}

          {meta && (
            <p className="text-sm text-dark-500 dark:text-dark-400">
              {meta.total} producto{meta.total !== 1 ? 's' : ''} encontrado{meta.total !== 1 ? 's' : ''}
            </p>
          )}

          {loading && <LoadingState />}
          {error && <ErrorState message={error} />}
          {!loading && !error && productos.length === 0 && (
            <EmptyState message="Intenta ajustar los filtros o la búsqueda." />
          )}
          {!loading && !error && productos.length > 0 && (
            <>
              <ProductGrid productos={productos} />
              {meta && (
                <Pagination
                  page={meta.page}
                  totalPages={meta.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
