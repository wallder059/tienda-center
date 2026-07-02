import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };

/**
 * Indicador de carga.
 */
export const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => (
  <Loader2 className={`animate-spin text-primary-500 ${sizeMap[size]} ${className}`} />
);

/**
 * Contenedor de carga centrado.
 */
export const LoadingState = ({ message = 'Cargando...' }: { message?: string }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-16">
    <Spinner size="lg" />
    <p className="text-sm text-dark-500 dark:text-dark-400">{message}</p>
  </div>
);

/**
 * Estado de error.
 */
export const ErrorState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
    <p className="text-lg font-medium text-red-500">Algo salió mal</p>
    <p className="text-sm text-dark-500 dark:text-dark-400">{message}</p>
  </div>
);

/**
 * Estado vacío.
 */
export const EmptyState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
    <p className="text-lg font-medium text-dark-700 dark:text-dark-300">Sin resultados</p>
    <p className="text-sm text-dark-500 dark:text-dark-400">{message}</p>
  </div>
);
