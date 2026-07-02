/**
 * Constantes globales de la aplicación.
 */
export const APP_NAME = import.meta.env.VITE_STORE_NAME || 'Tienda Center';
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '59170000000';

/**
 * Rutas de la aplicación.
 */
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/productos',
  PRODUCT_DETAIL: '/productos/:id',
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_PRODUCTS: '/admin/productos',
  ADMIN_CATEGORIES: '/admin/categorias',
  ADMIN_BRANDS: '/admin/marcas',
} as const;

/**
 * Claves de almacenamiento local.
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'tienda_center_token',
  AUTH_USER: 'tienda_center_user',
  THEME: 'tienda_center_theme',
} as const;
