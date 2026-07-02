import { Package, Tags, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useProductos } from '@/hooks/useProductos';
import { useCategorias } from '@/hooks/useCategorias';
import { useMarcas } from '@/hooks/useMarcas';
import { formatPrice } from '@/utils/format';

/**
 * Dashboard del panel de administración.
 */
export const AdminDashboardPage = () => {
  const { productos, meta } = useProductos({ limit: 5, page: 1 });
  const { categorias } = useCategorias();
  const { marcas } = useMarcas();

  const stats = [
    { label: 'Productos', value: meta?.total ?? 0, icon: Package, to: ROUTES.ADMIN_PRODUCTS, color: 'text-primary-400' },
    { label: 'Categorías', value: categorias.length, icon: Tags, to: ROUTES.ADMIN_CATEGORIES, color: 'text-green-400' },
    { label: 'Marcas', value: marcas.length, icon: Award, to: ROUTES.ADMIN_BRANDS, color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-dark-400">Resumen general de la tienda</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, to, color }) => (
          <Link
            key={label}
            to={to}
            className="rounded-2xl border border-dark-800 bg-dark-900 p-6 transition-colors hover:border-dark-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-400">{label}</p>
                <p className="mt-1 text-3xl font-bold text-white">{value}</p>
              </div>
              <Icon className={`h-8 w-8 ${color}`} />
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-dark-800 bg-dark-900">
        <div className="flex items-center gap-2 border-b border-dark-800 px-6 py-4">
          <TrendingUp className="h-5 w-5 text-primary-400" />
          <h2 className="font-semibold text-white">Productos recientes</h2>
        </div>
        <div className="divide-y divide-dark-800">
          {productos.map((p) => (
            <div key={p.id} className="flex items-center gap-4 px-6 py-4">
              <img src={p.imagen} alt={p.nombre} className="h-12 w-12 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium text-white">{p.nombre}</p>
                <p className="text-xs text-dark-500">{p.categoria?.nombre} · {p.marca?.nombre}</p>
              </div>
              <p className="font-semibold text-primary-400">{formatPrice(p.precio)}</p>
              <span className={`rounded-full px-2 py-0.5 text-xs ${p.activo ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                {p.activo ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          ))}
          {productos.length === 0 && (
            <p className="px-6 py-8 text-center text-dark-500">No hay productos aún</p>
          )}
        </div>
      </div>
    </div>
  );
};
