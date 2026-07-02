import { MessageCircle, ShieldCheck, Headphones, BadgePercent } from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: 'Compra por WhatsApp',
    description: 'Cotiza y compra en minutos, sin pagos en línea',
  },
  {
    icon: ShieldCheck,
    title: 'Productos originales',
    description: 'Componentes de marcas reconocidas',
  },
  {
    icon: Headphones,
    title: 'Asesoría personalizada',
    description: 'Te ayudamos a elegir lo ideal para tu PC',
  },
  {
    icon: BadgePercent,
    title: 'Precios en Bolivianos',
    description: 'Transparencia total en cada producto',
  },
];

/**
 * Barra de beneficios debajo del hero.
 */
export const FeaturesBar = () => (
  <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {features.map(({ icon: Icon, title, description }) => (
      <div
        key={title}
        className="flex items-start gap-4 rounded-2xl border border-dark-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-dark-800 dark:bg-dark-900"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-dark-900 dark:text-white">{title}</h3>
          <p className="mt-0.5 text-sm text-dark-500 dark:text-dark-400">{description}</p>
        </div>
      </div>
    ))}
  </section>
);
