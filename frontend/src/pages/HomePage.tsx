import { HeroBanner } from '@/components/home/HeroBanner';
import { FeaturesBar } from '@/components/home/FeaturesBar';
import { CategorySection } from '@/components/home/CategorySection';
import { BrandSection } from '@/components/home/BrandSection';
import { ProductSection } from '@/components/home/ProductSection';
import { PromoBanner } from '@/components/home/PromoBanner';
import { useCategorias } from '@/hooks/useCategorias';
import { useMarcas } from '@/hooks/useMarcas';
import { useProductos } from '@/hooks/useProductos';

/**
 * Página principal de la tienda.
 */
export const HomePage = () => {
  const { categorias } = useCategorias();
  const { marcas } = useMarcas();
  const featured = useProductos({ limit: 4, page: 1 });
  const recent = useProductos({ limit: 8, page: 1 });

  return (
    <div className="space-y-16 animate-fade-in pb-8">
      <HeroBanner />
      <FeaturesBar />
      <CategorySection categorias={categorias} />
      <ProductSection
        title="Productos destacados"
        subtitle="Lo más popular de nuestro catálogo"
        productos={featured.productos}
        loading={featured.loading}
        error={featured.error}
      />
      <PromoBanner />
      <BrandSection marcas={marcas} />
      <ProductSection
        title="Recién llegados"
        subtitle="Los últimos componentes agregados a la tienda"
        productos={recent.productos}
        loading={recent.loading}
        error={recent.error}
      />
    </div>
  );
};
