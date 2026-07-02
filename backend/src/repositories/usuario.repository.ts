import { prisma } from '../config/database.js';

/**
 * Repositorio de acceso a datos para usuarios.
 */
export class UsuarioRepository {
  async findByEmail(email: string) {
    return prisma.usuario.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        createdAt: true,
      },
    });
  }
}

export const usuarioRepository = new UsuarioRepository();
