import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Categoria } from '@/interfaces';
import { ROUTES } from '@/constants';
import { getCategoryImage } from '@/constants/images';
import { SectionHeader } from './SectionHeader';

interface CategorySectionProps {
  categorias: Categoria[];
}

/**
 * Sección de categorías con tarjetas visuales e imágenes.
 */
export const CategorySection = ({ categorias }: CategorySectionProps) => {
  if (categorias.length === 0) return null;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Explora por categoría"
        subtitle="Encuentra el componente perfecto para tu build"
        linkTo={ROUTES.PRODUCTS}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categorias.map((categoria) => {
          const imageSrc = getCategoryImage(categoria.nombre);

          return (
            <Link
              key={categoria.id}
              to={`${ROUTES.PRODUCTS}?categoriaId=${categoria.id}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-dark-200 dark:border-dark-800"
            >
              <img
                src={imageSrc}
                alt={categoria.nombre}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay: más suave en modo claro para ver mejor la foto */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-dark-900/30 to-transparent transition-opacity group-hover:opacity-100 dark:from-dark-950 dark:via-dark-950/50" />
              <div className="absolute inset-0 bg-primary-600/0 transition-colors duration-300 group-hover:bg-primary-600/10" />

              {/* Contenido */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-primary-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Ver productos
                    </p>
                    <h3 className="text-base font-bold text-white sm:text-lg">
                      {categoria.nombre}
                    </h3>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-primary-500 group-hover:scale-110">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
