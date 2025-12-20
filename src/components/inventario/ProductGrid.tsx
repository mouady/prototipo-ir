"use client";

import { useState } from "react";
import { getPlatos } from "@/mock";
import { useIngredientes } from "@/mock/hooks";
import { ProductCard } from "./ProductCard";
import { IngredienteCard } from "./IngredienteCard";
import { AgregarIngredienteModal } from "./AgregarIngredienteModal";
import { Button } from "@/components/ui/button";
import { Filter, Plus, SquarePen } from "lucide-react";

interface ProductGridProps {
  categoriaActiva: string;
}

export function ProductGrid({ categoriaActiva }: ProductGridProps) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const { ingredientes } = useIngredientes();
  
  // Obtener platos
  const platos = getPlatos();

  // Si es la categoría de ingredientes, mostrar el nuevo diseño
  if (categoriaActiva === "ingredientes") {
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
            <Button variant="outline" size="icon" className="h-8 w-8">
              <SquarePen className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Grid de ingredientes - 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ingredientes.map((ingrediente) => (
            <IngredienteCard key={ingrediente.id} ingrediente={ingrediente} />
          ))}
        </div>

        {/* Modal para agregar ingrediente */}
        <AgregarIngredienteModal 
          open={modalAbierto} 
          onOpenChange={setModalAbierto} 
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {platos.map((plato) => (
            <ProductCard key={plato.id} plato={plato} />
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

  // Categoría vacía o no implementada
  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="text-center py-12 text-gray-500">
        Sección en desarrollo
      </div>
    </div>
  );
}
