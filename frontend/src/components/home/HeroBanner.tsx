import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Zap } from 'lucide-react';
import { ROUTES } from '@/constants';
import { STORE_IMAGES } from '@/constants/images';
import { generateWhatsAppUrl } from '@/utils/whatsapp';
import { Button } from '@/components/ui/Button';

const heroWhatsAppUrl = generateWhatsAppUrl('Hola, quiero información sobre sus productos.');

/**
 * Banner principal con imagen de PC gaming.
 * Adaptado a modo claro y oscuro.
 */
export const HeroBanner = () => (
  <section className="relative overflow-hidden rounded-3xl border border-dark-200 bg-white shadow-sm dark:border-dark-800 dark:bg-dark-900">
    <div className="grid min-h-[520px] lg:grid-cols-2">
      {/* Contenido */}
      <div className="relative z-10 flex flex-col justify-center gap-6 bg-gradient-to-br from-slate-50 via-white to-primary-50/40 p-8 sm:p-12 lg:p-14 dark:from-dark-950 dark:via-dark-900 dark:to-dark-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent dark:from-primary-600/20" />

        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700 ring-1 ring-primary-200 dark:bg-primary-500/15 dark:text-primary-300 dark:ring-primary-500/25">
            <Zap className="h-4 w-4" />
            Tienda de componentes · Bolivia
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight text-dark-900 sm:text-4xl lg:text-5xl dark:text-white">
            Arma la PC de tus{' '}
            <span className="bg-gradient-to-r from-primary-600 to-cyan-600 bg-clip-text text-transparent dark:from-primary-400 dark:to-cyan-400">
              sueños
            </span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-dark-600 sm:text-lg dark:text-dark-300">
            Procesadores, memoria RAM, almacenamiento y más. Elige tu hardware ideal y compra al instante por WhatsApp.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to={ROUTES.PRODUCTS}>
              <Button size="lg">
                Explorar catálogo
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href={heroWhatsAppUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="whatsapp">
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Imagen PC */}
      <div className="relative min-h-[280px] lg:min-h-full">
        <img
          src={STORE_IMAGES.hero.src}
          alt={STORE_IMAGES.hero.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Overlay: claro suave / oscuro intenso */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/30 to-transparent lg:from-white/70 lg:via-transparent dark:from-dark-950/90 dark:via-dark-950/40 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent lg:hidden dark:from-dark-950/70" />

        {/* Tarjeta flotante */}
        <div className="absolute bottom-6 right-6 hidden rounded-2xl border border-dark-200/80 bg-white/90 p-4 shadow-lg backdrop-blur-md sm:block dark:border-white/10 dark:bg-dark-950/80">
          <div className="flex items-center gap-3">
            <img
              src={STORE_IMAGES.heroSecondary.src}
              alt=""
              className="h-14 w-14 rounded-xl object-cover ring-2 ring-primary-500/30"
            />
            <div>
              <p className="text-sm font-semibold text-dark-900 dark:text-white">Hardware premium</p>
              <p className="text-xs text-dark-500 dark:text-dark-400">Componentes originales</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
