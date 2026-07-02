import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { loginSchema, type LoginFormData } from '@/validators/adminSchemas';
import { ROUTES } from '@/constants';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LoadingState } from '@/components/ui/Spinner';

/**
 * Página de inicio de sesión del administrador.
 */
export const AdminLoginPage = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      await login(data.email, data.password);
      navigate(ROUTES.ADMIN);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-950">
        <LoadingState message="Verificando sesión..." />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.ADMIN} replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-950 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-dark-800 bg-dark-900 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
          <p className="mt-2 text-sm text-dark-400">Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-[38px] h-4 w-4 text-dark-500" />
            <Input
              label="Email"
              type="email"
              placeholder="admin@tiendacenter.com"
              className="pl-10"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-[38px] h-4 w-4 text-dark-500" />
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400">{error}</p>
          )}

          <Button type="submit" className="w-full" loading={isSubmitting}>
            Iniciar sesión
          </Button>
        </form>
      </div>
    </div>
  );
};
