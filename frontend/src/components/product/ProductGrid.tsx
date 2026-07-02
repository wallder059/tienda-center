import type { Producto } from '@/interfaces';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  productos: Producto[];
}

/**
 * Grilla responsive de productos.
 */
export const ProductGrid = ({ productos }: ProductGridProps) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {productos.map((producto) => (
      <ProductCard key={producto.id} producto={producto} />
    ))}
  </div>
);
