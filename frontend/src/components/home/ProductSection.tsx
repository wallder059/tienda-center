import type { Producto } from '@/interfaces';
import { ROUTES } from '@/constants';
import { ProductGrid } from '@/components/product/ProductGrid';
import { LoadingState, ErrorState } from '@/components/ui/Spinner';
import { SectionHeader } from './SectionHeader';

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  productos: Producto[];
  loading: boolean;
  error: string | null;
  viewAllLink?: string;
}

/**
 * Sección de productos en la página principal.
 */
export const ProductSection = ({
  title,
  subtitle,
  productos,
  loading,
  error,
  viewAllLink = ROUTES.PRODUCTS,
}: ProductSectionProps) => (
  <div className="space-y-6">
    <SectionHeader title={title} subtitle={subtitle} linkTo={viewAllLink} />

    {loading && <LoadingState />}
    {error && <ErrorState message={error} />}
    {!loading && !error && productos.length > 0 && <ProductGrid productos={productos} />}
    {!loading && !error && productos.length === 0 && (
      <p className="rounded-2xl border border-dashed border-dark-300 py-12 text-center text-dark-500 dark:border-dark-700 dark:text-dark-400">
        No hay productos disponibles por el momento.
      </p>
    )}
  </div>
);
