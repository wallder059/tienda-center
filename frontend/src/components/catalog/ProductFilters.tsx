import { X } from 'lucide-react';
import type { Categoria, Marca } from '@/interfaces';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export interface FilterValues {
  categoriaId: string;
  marcaId: string;
  precioMin: string;
  precioMax: string;
}

interface ProductFiltersProps {
  categorias: Categoria[];
  marcas: Marca[];
  filters: FilterValues;
  onChange: (filters: FilterValues) => void;
  onClear: () => void;
}

/**
 * Panel de filtros para el catálogo.
 */
export const ProductFilters = ({
  categorias,
  marcas,
  filters,
  onChange,
  onClear,
}: ProductFiltersProps) => {
  const update = (key: keyof FilterValues, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const hasFilters = Object.values(filters).some((v) => v !== '');

  return (
    <aside className="space-y-4 rounded-2xl border border-dark-200 bg-white p-5 dark:border-dark-800 dark:bg-dark-900">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-dark-900 dark:text-white">Filtros</h2>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            <X className="h-4 w-4" />
            Limpiar
          </Button>
        )}
      </div>

      <Select
        label="Categoría"
        placeholder="Todas las categorías"
        value={filters.categoriaId}
        onChange={(e) => update('categoriaId', e.target.value)}
        options={categorias.map((c) => ({ value: c.id, label: c.nombre }))}
      />

      <Select
        label="Marca"
        placeholder="Todas las marcas"
        value={filters.marcaId}
        onChange={(e) => update('marcaId', e.target.value)}
        options={marcas.map((m) => ({ value: m.id, label: m.nombre }))}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Precio mín."
          type="number"
          min={0}
          placeholder="0"
          value={filters.precioMin}
          onChange={(e) => update('precioMin', e.target.value)}
        />
        <Input
          label="Precio máx."
          type="number"
          min={0}
          placeholder="99999"
          value={filters.precioMax}
          onChange={(e) => update('precioMax', e.target.value)}
        />
      </div>
    </aside>
  );
};
