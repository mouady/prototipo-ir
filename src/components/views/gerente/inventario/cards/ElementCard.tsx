"use client";

import { Producto, TipoProducto } from "@/mock";
import { X, Package, Edit2, Trash2, Layers } from "lucide-react";

interface IngredienteCardProps {
  ingrediente: Producto;
  onEdit?: (ingrediente: Producto) => void;
  onDelete?: (id: string) => void;
  onViewLotes?: (ingrediente: Producto) => void;
}

export function ElementCard({ ingrediente, onEdit, onDelete, onViewLotes }: IngredienteCardProps) {
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
          Proveedor: {ingrediente.proveedor || "Sin proveedor"}
        </p>
      </div>

      {/* Stock */}
      <div className="flex items-center gap-2 ml-4">
        {/* Badge de formato (bebidas) o umbral (otros) */}
        {ingrediente.tipoProducto === TipoProducto.BEBIDA && ingrediente.litros !== undefined ? (
          <div className="flex items-center bg-gray-800 text-white rounded-full px-2 py-1 text-xs font-medium">
            <X className="h-3 w-3 mr-0.5" />
            {ingrediente.litros}L
          </div>
        ) : ingrediente.tipoProducto !== TipoProducto.RECURSO && ingrediente.umbral ? (
          <div className="flex items-center bg-gray-800 text-white rounded-full px-2 py-1 text-xs font-medium">
            <X className="h-3 w-3 mr-0.5" />
            {ingrediente.umbral}
          </div>
        ) : null}

        {/* Badge de stock */}
        <div className="flex items-center bg-gray-800 text-white rounded-full px-2.5 py-1 text-xs font-medium">
          <Package className="h-3 w-3 mr-1" />
          {ingrediente.stock}{ingrediente.unidadMedida}
        </div>

        {/* Botones de acción */}
        <div className="flex items-center gap-1 ml-2">
          {onViewLotes && (
            <button
              onClick={() => onViewLotes(ingrediente)}
              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
              title="Ver lotes"
            >
              <Layers className="h-4 w-4" />
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(ingrediente)}
              className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
              title="Editar"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(ingrediente.id)}
              className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
              title="Eliminar"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
