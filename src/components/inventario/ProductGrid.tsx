"use client";

import { productos, ingredientes } from "@/mock/inventario";
import { ProductCard } from "./ProductCard";
import { IngredienteCard } from "./IngredienteCard";
import { Button } from "@/components/ui/button";
import { Filter, Plus, SquarePen } from "lucide-react";

interface ProductGridProps {
  categoriaActiva: string;
}

export function ProductGrid({ categoriaActiva }: ProductGridProps) {
  const productosFiltrados = productos.filter(
    (p) => p.categoria === categoriaActiva
  );

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
            <Button variant="outline" size="sm" className="gap-2">
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
      </div>
    );
  }

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

      {/* Grid de productos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productosFiltrados.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No hay productos en esta categoría
        </div>
      )}
    </div>
  );
}
