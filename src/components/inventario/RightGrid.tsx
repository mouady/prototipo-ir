"use client";

import { useState } from "react";
import { getPlatos, eliminarProducto, Producto, TipoProducto, useProductosByTipo } from "@/mock";
import { PlatoCard } from "./cards/PlatoCard";
import { ElementCard } from "./cards/ElementCard";
import { AgregarProductoModal } from "./modales/AddModal";
import { DeleteModal } from "./modales/DeleteModal";
import { AvisosPage } from "@/components/avisos";
import { GeneradorMensajes } from "@/components/generador-mensajes";
import { SEED_PROVEEDORES, SEED_PRODUCTOS } from "@/mock/seed";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";

interface ProductGridProps {
  categoriaActiva: string;
}

export function RightGrid({ categoriaActiva }: ProductGridProps) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoParaEditar, setProductoParaEditar] = useState<Producto | undefined>();
  const [productoParaEliminar, setProductoParaEliminar] = useState<Producto | null>(null);
  const [modalEliminacionAbierto, setModalEliminacionAbierto] = useState(false);

  const tipoActivo: TipoProducto =
    categoriaActiva === "bebidas"
      ? TipoProducto.BEBIDA
      : categoriaActiva === "recursos"
        ? TipoProducto.RECURSO
        : TipoProducto.INGREDIENTE;

  const { productos: productosInventario } = useProductosByTipo(tipoActivo);
  
  // Obtener platos
  const platos = getPlatos();

  const handleEdit = (producto: Producto) => {
    setProductoParaEditar(producto);
    setModalAbierto(true);
  };

  const handleDelete = (id: string) => {
    const producto = productosInventario.find((p) => p.id === id);
    if (producto) {
      setProductoParaEliminar(producto);
      setModalEliminacionAbierto(true);
    }
  };

  const handleConfirmDelete = () => {
    if (productoParaEliminar) {
      eliminarProducto(productoParaEliminar.id);
      setProductoParaEliminar(null);
    }
  };

  const handleCloseModal = (open: boolean) => {
    setModalAbierto(open);
    if (!open) {
      setProductoParaEditar(undefined);
    }
  };

  // Categorías de inventario (ingredientes/bebidas/recursos)
  if (categoriaActiva === "ingredientes" || categoriaActiva === "bebidas" || categoriaActiva === "recursos") {
    return (
      <div className="flex-1 p-6 bg-gray-50">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => setModalAbierto(true)}
            >
              <Plus className="h-4 w-4" />
              Crear
            </Button>
          </div>
        </div>

        {/* Grid de ingredientes - 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {productosInventario.map((ingrediente) => (
            <ElementCard
              key={ingrediente.id} 
              ingrediente={ingrediente}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Modal para agregar/editar producto */}
        <AgregarProductoModal 
          open={modalAbierto} 
          onOpenChange={handleCloseModal}
          tipoProducto={tipoActivo}
          productoParaEditar={productoParaEditar}
        />

        {/* Modal de confirmación de eliminación */}
        <DeleteModal
          open={modalEliminacionAbierto}
          onOpenChange={setModalEliminacionAbierto}
          producto={productoParaEliminar}
          onConfirm={handleConfirmDelete}
        />
      </div>
    );
  }

  // Para la categoría de platos
  if (categoriaActiva === "platos") {
    return (
      <div className="flex-1 p-6 bg-gray-50">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Crear
          </Button>
        </div>

        {/* Grid de platos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {platos.map((plato) => (
            <PlatoCard key={plato.id} plato={plato} />
          ))}
        </div>

        {platos.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No hay platos disponibles
          </div>
        )}
      </div>
    );
  }

  // Para la categoría de avisos
  if (categoriaActiva === "avisos") {
    return <AvisosPage />;
  }

  // Para el generador de mensajes
  if (categoriaActiva === "generador") {
    return (
      <div className="flex-1 bg-gray-100">
        <GeneradorMensajes 
          proveedores={SEED_PROVEEDORES}
          productos={SEED_PRODUCTOS}
        />
      </div>
    );
  }

  // Categoría vacía o no implementada
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="text-center py-12 text-gray-500">
        Sección en desarrollo
      </div>
    </div>
  );
}
