import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

/**
 * Layout principal de la tienda pública.
 */
export const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-dark-950">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
