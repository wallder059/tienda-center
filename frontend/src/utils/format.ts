/**
 * Formatea un precio en Bolivianos.
 */
export const formatPrice = (precio: number): string => {
  return `Bs. ${precio.toLocaleString('es-BO', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};

/**
 * Trunca un texto a una longitud máxima.
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};
