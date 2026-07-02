import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cpu, Menu, Search, X } from 'lucide-react';
import { APP_NAME, ROUTES } from '@/constants';
import { ThemeToggle } from './ThemeToggle';
import { SearchBar } from '@/components/catalog/SearchBar';

/**
 * Barra de navegación principal.
 */
export const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const submitSearch = () => {
    if (search.trim()) {
      navigate(`${ROUTES.PRODUCTS}?busqueda=${encodeURIComponent(search.trim())}`);
      setMobileOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-dark-200 bg-white/80 backdrop-blur-md dark:border-dark-800 dark:bg-dark-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to={ROUTES.HOME} className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80">
            <Cpu className="h-7 w-7 text-primary-500" />
            <span className="text-lg font-bold text-dark-900 dark:text-white">{APP_NAME}</span>
          </Link>

          <div className="hidden flex-1 max-w-md md:block">
            <div onKeyDown={(e) => e.key === 'Enter' && submitSearch()}>
              <SearchBar value={search} onChange={handleSearch} />
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            <Link
              to={ROUTES.PRODUCTS}
              className="rounded-lg px-3 py-2 text-sm font-medium text-dark-600 transition-colors hover:bg-dark-100 hover:text-dark-900 dark:text-dark-300 dark:hover:bg-dark-800 dark:hover:text-white"
            >
              Productos
            </Link>
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-dark-600 hover:bg-dark-100 dark:text-dark-300 dark:hover:bg-dark-800"
              aria-label="Menú"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="space-y-4 border-t border-dark-200 py-4 dark:border-dark-800 md:hidden">
            <div onKeyDown={(e) => e.key === 'Enter' && submitSearch()}>
              <SearchBar value={search} onChange={handleSearch} />
            </div>
            <button
              onClick={submitSearch}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-medium text-white"
            >
              <Search className="h-4 w-4" />
              Buscar
            </button>
            <Link
              to={ROUTES.PRODUCTS}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-dark-600 dark:text-dark-300"
            >
              Productos
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
