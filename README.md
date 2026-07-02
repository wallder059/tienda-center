# Tienda Center

Tienda de componentes de PC con arquitectura Full Stack profesional.

## Stack

| Capa | Tecnologías |
|------|-------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, React Router, Axios, React Hook Form, Zod, Lucide React |
| Backend | Node.js, Express, TypeScript, Prisma, PostgreSQL, JWT, bcrypt, Helmet, CORS, Rate Limit |
| Imágenes | Cloudinary |

## Estructura del proyecto

```
Tienda Center/
├── frontend/          # Aplicación React
└── backend/           # API REST Express
```

## Requisitos previos

- Node.js 20+
- PostgreSQL 14+
- Cuenta en Cloudinary (para imágenes)

## Configuración

### 1. Base de datos

Crear la base de datos en PostgreSQL:

```sql
CREATE DATABASE tienda_center;
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# Editar .env con tus credenciales

npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

El servidor estará en `http://localhost:3001`

### 3. Frontend

```bash
cd frontend
cp .env.example .env
# Editar .env con la URL de la API y número de WhatsApp

npm install
npm run dev
```

La aplicación estará en `http://localhost:5173`

## Scripts disponibles

### Backend

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor en modo desarrollo |
| `npm run build` | Compilar TypeScript |
| `npm run start` | Servidor en producción |
| `npm run prisma:generate` | Generar cliente Prisma |
| `npm run prisma:migrate` | Ejecutar migraciones |
| `npm run prisma:seed` | Poblar datos iniciales |
| `npm run prisma:studio` | Abrir Prisma Studio |

### Frontend

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Vista previa del build |

## Usuario administrador por defecto

- **Email:** admin@tiendacenter.com
- **Password:** Admin123!

> Cambiar estas credenciales en producción.

## API REST

### Públicos (sin autenticación)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Estado del servidor |
| GET | `/api/productos` | Listar productos activos (filtros y paginación) |
| GET | `/api/productos/:id` | Detalle de producto |
| GET | `/api/categorias` | Listar categorías |
| GET | `/api/marcas` | Listar marcas |
| POST | `/api/auth/login` | Iniciar sesión |

**Filtros de productos:** `categoriaId`, `marcaId`, `precioMin`, `precioMax`, `busqueda`, `page`, `limit`

### Protegidos (requieren JWT de admin)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/auth/me` | Perfil del usuario autenticado |
| POST | `/api/productos` | Crear producto |
| PUT | `/api/productos/:id` | Actualizar producto |
| DELETE | `/api/productos/:id` | Eliminar producto |
| POST | `/api/categorias` | Crear categoría |
| POST | `/api/marcas` | Crear marca |
| POST | `/api/upload/imagen` | Subir imagen a Cloudinary (admin) |

## Panel de administración

Acceso: `http://localhost:5173/admin/login`

| Credencial | Valor |
|------------|-------|
| Email | `admin@tiendacenter.com` |
| Password | `Admin123!` |

Funciones: CRUD de productos, crear categorías/marcas, activar/desactivar productos, subir imágenes a Cloudinary.

## API Health Check

```
GET http://localhost:3001/api/health
```

## Próximos pasos

- [x] Implementar API REST completa (productos, categorías, marcas, auth)
- [x] Páginas públicas (catálogo, detalle, filtros)
- [x] Panel de administración
- [x] Integración con Cloudinary (subida de imágenes)
- [ ] Botón flotante de WhatsApp
