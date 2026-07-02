import type { Request, Response } from 'express';
import { authService } from '../services/auth.service.js';
import { sendSuccess } from '../utils/response.js';
import { asyncHandler } from '../middlewares/rateLimiter.js';
import type { LoginInput } from '../validators/index.js';

/**
 * Controlador de autenticación.
 */
export class AuthController {
  login = asyncHandler(async (req: Request, res: Response) => {
    const credentials = req.validated.body as LoginInput;
    const result = await authService.login(credentials);
    sendSuccess(res, result, 'Inicio de sesión exitoso');
  });

  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const usuario = await authService.getProfile(req.user!.userId);
    sendSuccess(res, usuario);
  });
}

export const authController = new AuthController();
