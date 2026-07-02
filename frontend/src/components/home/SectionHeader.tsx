import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  linkTo?: string;
  linkLabel?: string;
}

/**
 * Encabezado reutilizable para secciones de la home.
 */
export const SectionHeader = ({
  title,
  subtitle,
  linkTo,
  linkLabel = 'Ver todos',
}: SectionHeaderProps) => (
  <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h2 className="text-2xl font-bold text-dark-900 dark:text-white sm:text-3xl">{title}</h2>
      {subtitle && (
        <p className="mt-1 text-sm text-dark-500 dark:text-dark-400">{subtitle}</p>
      )}
    </div>
    {linkTo && (
      <Link
        to={linkTo}
        className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 sm:mt-0"
      >
        {linkLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    )}
  </div>
);

interface SectionWrapperProps {
  children: ReactNode;
  variant?: 'default' | 'muted';
}

/**
 * Contenedor de sección con fondo opcional.
 */
export const SectionWrapper = ({ children, variant = 'default' }: SectionWrapperProps) => (
  <section
    className={
      variant === 'muted'
        ? 'rounded-3xl bg-dark-50 p-6 dark:bg-dark-900/50 sm:p-8'
        : 'space-y-6'
    }
  >
    {children}
  </section>
);
