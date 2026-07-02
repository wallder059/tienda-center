import { Link } from 'react-router-dom';
import type { Marca } from '@/interfaces';
import { ROUTES } from '@/constants';
import { SectionHeader } from './SectionHeader';

interface BrandSectionProps {
  marcas: Marca[];
}

/**
 * Sección de marcas con diseño visual tipo showcase.
 */
export const BrandSection = ({ marcas }: BrandSectionProps) => {
  if (marcas.length === 0) return null;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Marcas que confiamos"
        subtitle="Trabajamos con los mejores fabricantes del mercado"
        linkTo={ROUTES.PRODUCTS}
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {marcas.map((marca) => (
          <Link
            key={marca.id}
            to={`${ROUTES.PRODUCTS}?marcaId=${marca.id}`}
            className="group flex h-20 items-center justify-center rounded-2xl border border-dark-200 bg-white px-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-500/40 hover:shadow-lg hover:shadow-primary-500/5 dark:border-dark-800 dark:bg-dark-900"
          >
            <span className="text-center text-sm font-bold uppercase tracking-wide text-dark-600 transition-colors group-hover:text-primary-600 dark:text-dark-300 dark:group-hover:text-primary-400">
              {marca.nombre}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
