import { type ReactNode, useCallback, useEffect, useState } from 'react';
import { STORAGE_KEYS } from '@/constants';
import { authService } from '@/services/authService';
import type { Usuario } from '@/interfaces';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Proveedor de autenticación JWT.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Usuario | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    return stored ? (JSON.parse(stored) as Usuario) : null;
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  );
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    setToken(null);
    setUser(null);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(response.usuario));
    setToken(response.token);
    setUser(response.usuario);
  }, []);

  useEffect(() => {
    const validateSession = async (): Promise<void> => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const profile = await authService.getProfile();
        setUser(profile);
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    void validateSession();
  }, [token, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
