import { Link } from 'react-router-dom';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import type { Producto } from '@/interfaces';
import { formatPrice } from '@/utils/format';
import { openWhatsAppPurchase } from '@/utils/whatsapp';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants';

interface ProductCardProps {
  producto: Producto;
}

/**
 * Tarjeta de producto para catálogo y listados.
 */
export const ProductCard = ({ producto }: ProductCardProps) => {
  const inStock = producto.stock > 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-dark-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/5 dark:border-dark-800 dark:bg-dark-900">
      <Link to={`${ROUTES.PRODUCTS}/${producto.id}`} className="relative aspect-square overflow-hidden bg-dark-100 dark:bg-dark-800">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {producto.categoria && (
            <Badge variant="primary">{producto.categoria.nombre}</Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          {producto.marca && (
            <p className="text-xs font-medium uppercase tracking-wider text-dark-500 dark:text-dark-400">
              {producto.marca.nombre}
            </p>
          )}
          <Link to={`${ROUTES.PRODUCTS}/${producto.id}`}>
            <h3 className="mt-1 line-clamp-2 font-semibold text-dark-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
              {producto.nombre}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
              {formatPrice(producto.precio)}
            </p>
            <Badge variant={inStock ? 'success' : 'warning'}>
              {inStock ? `${producto.stock} en stock` : 'Agotado'}
            </Badge>
          </div>
        </div>

        <Button
          variant="whatsapp"
          size="sm"
          className="w-full"
          disabled={!inStock}
          onClick={() => openWhatsAppPurchase(producto.nombre, producto.precio)}
        >
          <MessageCircle className="h-4 w-4" />
          Comprar por WhatsApp
        </Button>

        <Link
          to={`${ROUTES.PRODUCTS}/${producto.id}`}
          className="flex items-center justify-center gap-1 text-xs text-dark-500 transition-colors hover:text-primary-600 dark:text-dark-400 dark:hover:text-primary-400"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Ver detalle
        </Link>
      </div>
    </article>
  );
};
