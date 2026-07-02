import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { APP_NAME, ROUTES } from '@/constants';
import { generateWhatsAppUrl } from '@/utils/whatsapp';
import { Button } from '@/components/ui/Button';

const promoWhatsAppUrl = generateWhatsAppUrl('Hola, necesito ayuda para elegir un componente.');

/**
 * Banner promocional con CTA a WhatsApp.
 * Adaptado a modo claro y oscuro.
 */
export const PromoBanner = () => (
  <section className="relative overflow-hidden rounded-3xl border border-dark-200 dark:border-dark-800">
    <img
      src="/images/hero-secondary.png"
      alt="Componentes de computadora"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70 dark:from-dark-950/95 dark:via-dark-950/80 dark:to-dark-950/60" />

    <div className="relative flex flex-col items-start gap-6 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-lg space-y-3">
        <h2 className="text-2xl font-bold text-dark-900 sm:text-3xl dark:text-white">
          ¿No encuentras lo que buscas?
        </h2>
        <p className="text-dark-600 dark:text-dark-300">
          Escríbenos por WhatsApp y te ayudamos a conseguir el componente que necesitas para tu PC en {APP_NAME}.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <a href={promoWhatsAppUrl} target="_blank" rel="noopener noreferrer">
          <Button size="lg" variant="whatsapp">
            <MessageCircle className="h-5 w-5" />
            Consultar ahora
          </Button>
        </a>
        <Link to={ROUTES.PRODUCTS}>
          <Button size="lg" variant="outline">
            Ver catálogo
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  </section>
);
