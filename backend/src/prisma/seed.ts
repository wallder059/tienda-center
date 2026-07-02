import { PrismaClient, Rol } from '@prisma/client';
import { hashPassword } from '../utils/password.js';

const prisma = new PrismaClient();

/** Categorías activas de la tienda */
const CATEGORIAS_ACTIVAS = [
  'Procesador',
  'RAM',
  'Almacenamiento',
  'Placa Base',
  'CPU Completa',
] as const;

/** Categorías que se eliminan del catálogo */
const CATEGORIAS_ELIMINAR = [
  'GPU',
  'CPU',
  'Gabinete',
  'Fuente de Poder',
  'Periféricos',
] as const;

/**
 * Sincroniza categorías: renombra, crea nuevas y elimina las obsoletas.
 */
async function syncCategorias(): Promise<void> {
  const cpuExistente = await prisma.categoria.findUnique({ where: { nombre: 'CPU' } });
  const procesadorExistente = await prisma.categoria.findUnique({ where: { nombre: 'Procesador' } });

  if (cpuExistente && !procesadorExistente) {
    await prisma.categoria.update({
      where: { id: cpuExistente.id },
      data: { nombre: 'Procesador' },
    });
    console.log('[Seed] Categoría CPU renombrada a Procesador');
  } else if (cpuExistente && procesadorExistente) {
    await prisma.producto.updateMany({
      where: { categoriaId: cpuExistente.id },
      data: { categoriaId: procesadorExistente.id },
    });
    await prisma.categoria.delete({ where: { id: cpuExistente.id } });
    console.log('[Seed] Categoría CPU fusionada en Procesador');
  }

  for (const nombre of CATEGORIAS_ACTIVAS) {
    await prisma.categoria.upsert({
      where: { nombre },
      update: {},
      create: { nombre },
    });
  }

  const fallback = await prisma.categoria.findUnique({ where: { nombre: 'Procesador' } });

  for (const nombre of CATEGORIAS_ELIMINAR) {
    const categoria = await prisma.categoria.findUnique({ where: { nombre } });
    if (!categoria) continue;

    const productosCount = await prisma.producto.count({ where: { categoriaId: categoria.id } });

    if (productosCount > 0 && fallback) {
      await prisma.producto.updateMany({
        where: { categoriaId: categoria.id },
        data: { categoriaId: fallback.id },
      });
      console.log(`[Seed] ${productosCount} producto(s) movidos de "${nombre}" a "Procesador"`);
    }

    await prisma.categoria.delete({ where: { id: categoria.id } });
    console.log(`[Seed] Categoría eliminada: ${nombre}`);
  }

  console.log('[Seed] Categorías sincronizadas:', CATEGORIAS_ACTIVAS.join(', '));
}

/**
 * Seed inicial de la base de datos.
 */
async function main(): Promise<void> {
  const adminEmail = 'admin@tiendacenter.com';
  const adminPassword = 'Admin123!';

  const existingAdmin = await prisma.usuario.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await hashPassword(adminPassword);

    await prisma.usuario.create({
      data: {
        nombre: 'Administrador',
        email: adminEmail,
        password: hashedPassword,
        rol: Rol.ADMIN,
      },
    });

    console.log('[Seed] Usuario administrador creado:', adminEmail);
  } else {
    console.log('[Seed] Usuario administrador ya existe');
  }

  await syncCategorias();

  const marcas = ['ASUS', 'MSI', 'Gigabyte', 'NVIDIA', 'AMD', 'Intel', 'Corsair', 'Kingston', 'Samsung', 'EVGA'];
  for (const nombre of marcas) {
    await prisma.marca.upsert({
      where: { nombre },
      update: {},
      create: { nombre },
    });
  }
  console.log('[Seed] Marcas creadas');
}

main()
  .catch((error) => {
    console.error('[Seed] Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
