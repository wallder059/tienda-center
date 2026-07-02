import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { configureCloudinary } from './config/cloudinary.js';
import { apiRateLimiter } from './middlewares/rateLimiter.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import routes from './routes/index.js';

/**
 * Punto de entrada del servidor Express.
 */
const app = express();

configureCloudinary();

app.use(helmet());
app.use(cors({ origin: env.cors.origin, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(apiRateLimiter);

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Tienda Center API funcionando correctamente',
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = (): void => {
  app.listen(env.port, () => {
    console.log(`[Server] Tienda Center API corriendo en http://localhost:${env.port}`);
    console.log(`[Server] Entorno: ${env.nodeEnv}`);
  });
};

startServer();

export default app;
