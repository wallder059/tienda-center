import { AppError } from '../middlewares/errorHandler.js';
import { usuarioRepository } from '../repositories/usuario.repository.js';
import { comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
import type { LoginInput } from '../validators/index.js';
import type { AuthResponse } from '../interfaces/auth.interface.js';

/**
 * Servicio de autenticación.
 */
export class AuthService {
  async login(credentials: LoginInput): Promise<AuthResponse> {
    const usuario = await usuarioRepository.findByEmail(credentials.email);

    if (!usuario) {
      throw new AppError('Credenciales inválidas', 401);
    }

    const isPasswordValid = await comparePassword(credentials.password, usuario.password);

    if (!isPasswordValid) {
      throw new AppError('Credenciales inválidas', 401);
    }

    const token = generateToken({
      userId: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    });

    return {
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        createdAt: usuario.createdAt,
      },
    };
  }

  async getProfile(userId: string) {
    const usuario = await usuarioRepository.findById(userId);

    if (!usuario) {
      throw new AppError('Usuario no encontrado', 404);
    }

    return usuario;
  }
}

export const authService = new AuthService();
