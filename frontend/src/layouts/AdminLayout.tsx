import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Cpu,
  LayoutDashboard,
  Package,
  Tags,
  Award,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { APP_NAME, ROUTES } from '@/constants';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

const navItems = [
  { to: ROUTES.ADMIN, icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: ROUTES.ADMIN_PRODUCTS, icon: Package, label: 'Productos' },
  { to: ROUTES.ADMIN_CATEGORIES, icon: Tags, label: 'Categorías' },
  { to: ROUTES.ADMIN_BRANDS, icon: Award, label: 'Marcas' },
];

/**
 * Layout del panel de administración con sidebar.
 */
export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.ADMIN_LOGIN);
  };

  return (
    <div className="flex min-h-screen bg-dark-950">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-dark-800 bg-dark-900">
        <div className="flex h-16 items-center gap-2 border-b border-dark-800 px-6">
          <Cpu className="h-6 w-6 text-primary-500" />
          <div>
            <p className="text-sm font-bold text-white">{APP_NAME}</p>
            <p className="text-xs text-dark-500">Panel Admin</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-600/20 text-primary-400'
                    : 'text-dark-400 hover:bg-dark-800 hover:text-white'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-dark-800 p-4 space-y-3">
          <a
            href={ROUTES.HOME}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-dark-500 hover:text-primary-400"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Ver tienda
          </a>
          <div className="text-xs text-dark-500">
            <p className="font-medium text-dark-300">{user?.nombre}</p>
            <p>{user?.email}</p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </aside>

      <div className="ml-64 flex-1">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
