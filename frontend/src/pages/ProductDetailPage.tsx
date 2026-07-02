import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Package, Tag } from 'lucide-react';
import { useProducto } from '@/hooks/useProducto';
import { LoadingState, ErrorState } from '@/components/ui/Spinner';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/utils/format';
import { openWhatsAppPurchase } from '@/utils/whatsapp';
import { ROUTES } from '@/constants';

/**
 * Página de detalle de un producto.
 */
export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { producto, loading, error } = useProducto(id);

  if (loading) return <LoadingState message="Cargando producto..." />;
  if (error || !producto) return <ErrorState message={error ?? 'Producto no encontrado'} />;

  const inStock = producto.stock > 0;

  return (
    <div className="animate-fade-in">
      <Link
        to={ROUTES.PRODUCTS}
        className="mb-6 inline-flex items-center gap-2 text-sm text-dark-500 transition-colors hover:text-primary-600 dark:text-dark-400 dark:hover:text-primary-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al catálogo
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-dark-200 bg-white dark:border-dark-800 dark:bg-dark-900">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {producto.categoria && <Badge variant="primary">{producto.categoria.nombre}</Badge>}
              {producto.marca && <Badge>{producto.marca.nombre}</Badge>}
              <Badge variant={inStock ? 'success' : 'warning'}>
                {inStock ? 'Disponible' : 'Agotado'}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold text-dark-900 dark:text-white">{producto.nombre}</h1>

            <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
              {formatPrice(producto.precio)}
            </p>
          </div>

          <div className="flex gap-6 text-sm text-dark-600 dark:text-dark-400">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span>{producto.stock} unidades en stock</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span>{producto.marca?.nombre}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-dark-200 bg-dark-50 p-5 dark:border-dark-800 dark:bg-dark-900/50">
            <h2 className="mb-2 font-semibold text-dark-900 dark:text-white">Descripción</h2>
            <p className="leading-relaxed text-dark-600 dark:text-dark-300">{producto.descripcion}</p>
          </div>

          <Button
            variant="whatsapp"
            size="lg"
            className="w-full sm:w-auto"
            disabled={!inStock}
            onClick={() => openWhatsAppPurchase(producto.nombre, producto.precio)}
          >
            <MessageCircle className="h-5 w-5" />
            Comprar por WhatsApp
          </Button>

          {!inStock && (
            <p className="text-sm text-amber-600 dark:text-amber-400">
              Este producto no tiene stock disponible. Contáctanos por WhatsApp para consultar disponibilidad.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
