/**
 * Imágenes de la tienda (archivos en /public/images/).
 */
export const STORE_IMAGES = {
  hero: {
    src: '/images/hero-pc.png',
    alt: 'PC gaming con iluminación RGB',
  },
  heroSecondary: {
    src: '/images/hero-secondary.png',
    alt: 'Procesador AMD Ryzen de alto rendimiento',
  },
  defaultCategory: {
    src: '/images/categorias/default.png',
    alt: 'Componente de PC',
  },
} as const;

/** Imagen por categoría */
export const CATEGORY_IMAGE_FILES: Record<string, string> = {
  Procesador: 'procesador.png',
  RAM: 'ram.png',
  Almacenamiento: 'almacenamiento.png',
  'Placa Base': 'placa-base.png',
  'CPU Completa': 'cpu-completa.png',
};

export const getCategoryImage = (nombre: string): string => {
  const file = CATEGORY_IMAGE_FILES[nombre];
  if (file) return `/images/categorias/${file}`;
  return STORE_IMAGES.defaultCategory.src;
};
