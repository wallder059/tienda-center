import { MessageCircle } from 'lucide-react';
import { generateWhatsAppUrl } from '@/utils/whatsapp';
import { APP_NAME } from '@/constants';

/**
 * Botón flotante de WhatsApp.
 */
export const WhatsAppButton = () => {
  const mensaje = `Hola, me interesa conocer los productos de ${APP_NAME}.`;
  const url = generateWhatsAppUrl(mensaje);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110 hover:bg-green-400 hover:shadow-xl hover:shadow-green-500/40"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
};
