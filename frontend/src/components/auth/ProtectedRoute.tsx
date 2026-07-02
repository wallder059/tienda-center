import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/constants';
import { LoadingState } from '@/components/ui/Spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Ruta protegida que requiere autenticación de administrador.
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingState message="Verificando sesión..." />
      </div>
    );
  }

  if (!isAuthenticated || user?.rol !== 'ADMIN') {
    return <Navigate to={ROUTES.ADMIN_LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
