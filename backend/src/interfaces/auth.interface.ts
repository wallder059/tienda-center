import type { Rol } from '@prisma/client';

/**
 * Usuario sin contraseña para respuestas de la API.
 */
export interface UsuarioResponse {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
  createdAt: Date;
}

/**
 * Datos de login.
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Respuesta de autenticación exitosa.
 */
export interface AuthResponse {
  token: string;
  usuario: UsuarioResponse;
}
