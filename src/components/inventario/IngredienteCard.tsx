"use client";

import { Ingrediente } from "@/mock/inventario";
import { X, Package } from "lucide-react";

interface IngredienteCardProps {
  ingrediente: Ingrediente;
}

export function IngredienteCard({ ingrediente }: IngredienteCardProps) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg border transition-shadow hover:shadow-md ${
        ingrediente.destacado
          ? "bg-amber-50 border-amber-200"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Información del ingrediente */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-gray-900 truncate">
          {ingrediente.nombre}
        </h4>
        <p className="text-xs text-gray-500">
          Proveedor: {ingrediente.proveedor}
        </p>
      </div>

      {/* Cantidad y stock */}
      <div className="flex items-center gap-2 ml-4">
        {/* Badge de cantidad */}
        <div className="flex items-center bg-gray-800 text-white rounded-full px-2 py-1 text-xs font-medium">
          <X className="h-3 w-3 mr-0.5" />
          {ingrediente.cantidad}
        </div>

        {/* Badge de stock */}
        <div className="flex items-center bg-gray-800 text-white rounded-full px-2.5 py-1 text-xs font-medium">
          <Package className="h-3 w-3 mr-1" />
          {ingrediente.stockActual}/{ingrediente.stockTotal}{ingrediente.unidad}
        </div>
      </div>
    </div>
  );
}
