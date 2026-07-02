import { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { useProductos } from '@/hooks/useProductos';
import { useCategorias } from '@/hooks/useCategorias';
import { useMarcas } from '@/hooks/useMarcas';
import { productoService } from '@/services/productoService';
import type { Producto } from '@/interfaces';
import type { ProductoFormData } from '@/validators/adminSchemas';
import { formatPrice } from '@/utils/format';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { LoadingState, ErrorState } from '@/components/ui/Spinner';
import { ProductoForm } from '@/components/admin/ProductoForm';
import { SearchBar } from '@/components/catalog/SearchBar';
import { useDebounce } from '@/hooks/useDebounce';

/**
 * Gestión de productos en el panel admin.
 */
export const AdminProductsPage = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const { productos, loading, error, refetch } = useProductos({
    busqueda: debouncedSearch || undefined,
    limit: 50,
  });
  const { categorias } = useCategorias();
  const { marcas } = useMarcas();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Producto | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Producto | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (producto: Producto) => {
    setEditing(producto);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const handleSubmit = async (data: ProductoFormData) => {
    if (editing) {
      await productoService.update(editing.id, data);
    } else {
      await productoService.create(data);
    }
    closeModal();
    refetch();
  };

  const handleToggleActive = async (producto: Producto) => {
    setActionLoading(true);
    try {
      await productoService.update(producto.id, { activo: !producto.activo });
      refetch();
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setActionLoading(true);
    try {
      await productoService.delete(deleteConfirm.id);
      setDeleteConfirm(null);
      refetch();
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Productos</h1>
          <p className="text-dark-400">Gestiona el catálogo de la tienda</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Nuevo producto
        </Button>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Buscar productos..." />

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}

      {!loading && !error && (
        <div className="overflow-hidden rounded-2xl border border-dark-800">
          <table className="w-full text-sm">
            <thead className="border-b border-dark-800 bg-dark-900">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-dark-400">Producto</th>
                <th className="px-4 py-3 text-left font-medium text-dark-400">Categoría</th>
                <th className="px-4 py-3 text-left font-medium text-dark-400">Precio</th>
                <th className="px-4 py-3 text-left font-medium text-dark-400">Stock</th>
                <th className="px-4 py-3 text-left font-medium text-dark-400">Estado</th>
                <th className="px-4 py-3 text-right font-medium text-dark-400">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800 bg-dark-900/50">
              {productos.map((p) => (
                <tr key={p.id} className="hover:bg-dark-800/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.imagen} alt={p.nombre} className="h-10 w-10 rounded-lg object-cover" />
                      <span className="font-medium text-white">{p.nombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-dark-400">{p.categoria?.nombre}</td>
                  <td className="px-4 py-3 font-medium text-primary-400">{formatPrice(p.precio)}</td>
                  <td className="px-4 py-3 text-dark-300">{p.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${p.activo ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {p.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => handleToggleActive(p)}
                        disabled={actionLoading}
                        className="rounded-lg p-2 text-dark-400 hover:bg-dark-800 hover:text-white"
                        title={p.activo ? 'Desactivar' : 'Activar'}
                      >
                        {p.activo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => openEdit(p)}
                        className="rounded-lg p-2 text-dark-400 hover:bg-dark-800 hover:text-primary-400"
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(p)}
                        className="rounded-lg p-2 text-dark-400 hover:bg-dark-800 hover:text-red-400"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {productos.length === 0 && (
            <p className="py-12 text-center text-dark-500">No hay productos</p>
          )}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editing ? 'Editar producto' : 'Nuevo producto'}
        size="xl"
      >
        <ProductoForm
          producto={editing}
          categorias={categorias}
          marcas={marcas}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>

      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Confirmar eliminación"
        size="md"
      >
        <p className="text-dark-300">
          ¿Eliminar <strong className="text-white">{deleteConfirm?.nombre}</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancelar</Button>
          <Button variant="secondary" loading={actionLoading} onClick={handleDelete} className="!bg-red-600 hover:!bg-red-500">
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  );
};
