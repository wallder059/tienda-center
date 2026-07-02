import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'primary';
}

const variants = {
  default: 'bg-dark-200 text-dark-700 dark:bg-dark-700 dark:text-dark-200',
  success: 'bg-green-500/10 text-green-600 dark:text-green-400 ring-1 ring-green-500/20',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20',
  primary: 'bg-primary-500/10 text-primary-600 dark:text-primary-400 ring-1 ring-primary-500/20',
};

/**
 * Etiqueta de estado reutilizable.
 */
export const Badge = ({ children, variant = 'default' }: BadgeProps) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}>
    {children}
  </span>
);
