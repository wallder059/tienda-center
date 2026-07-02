import { createContext, useContext } from 'react';

/**
 * Tipo de tema de la aplicación.
 */
export type Theme = 'dark' | 'light';

/**
 * Estado del contexto de tema.
 */
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

/**
 * Contexto de tema para modo oscuro/claro.
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook para acceder al contexto de tema.
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider');
  }
  return context;
};
