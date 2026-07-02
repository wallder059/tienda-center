import { WHATSAPP_NUMBER } from '@/constants';
import { formatPrice } from './format';

/**
 * Genera la URL de WhatsApp con un mensaje predefinido.
 */
export const generateWhatsAppUrl = (mensaje: string): string => {
  const encodedMessage = encodeURIComponent(mensaje);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

/**
 * Genera el mensaje de compra para un producto.
 */
export const generatePurchaseMessage = (nombre: string, precio: number): string => {
  const precioFormateado = formatPrice(precio);
  return `Hola, estoy interesado en comprar la ${nombre} de ${precioFormateado}.`;
};

/**
 * Abre WhatsApp con un mensaje de compra.
 */
export const openWhatsAppPurchase = (nombre: string, precio: number): void => {
  const mensaje = generatePurchaseMessage(nombre, precio);
  const url = generateWhatsAppUrl(mensaje);
  window.open(url, '_blank', 'noopener,noreferrer');
};
