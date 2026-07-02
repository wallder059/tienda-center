import { api } from './api';
import type { ApiResponse, AuthResponse, Usuario, LoginRequest } from '@/interfaces';

/**
 * Servicio de autenticación.
 */
export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    if (!response.data.data) throw new Error('Error al iniciar sesión');
    return response.data.data;
  },

  async getProfile(): Promise<Usuario> {
    const response = await api.get<ApiResponse<Usuario>>('/auth/me');
    if (!response.data.data) throw new Error('Usuario no encontrado');
    return response.data.data;
  },
};
