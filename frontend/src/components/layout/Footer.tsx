import { Cpu } from 'lucide-react';
import { APP_NAME } from '@/constants';

/**
 * Pie de página de la tienda.
 */
export const Footer = () => (
  <footer className="border-t border-dark-200 bg-dark-50 dark:border-dark-800 dark:bg-dark-900/50">
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-primary-500" />
          <span className="font-semibold text-dark-900 dark:text-white">{APP_NAME}</span>
        </div>
        <p className="text-center text-sm text-dark-500 dark:text-dark-400">
          Componentes de PC · Compra por WhatsApp
        </p>
        <p className="text-sm text-dark-500 dark:text-dark-400">
          &copy; {new Date().getFullYear()} {APP_NAME}
        </p>
      </div>
    </div>
  </footer>
);
