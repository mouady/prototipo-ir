"use client";

import { Plus } from "lucide-react";

interface AddEmpleadoCardProps {
  onClick: () => void;
}

/**
 * Tarjeta minimalista para añadir un nuevo empleado
 * Muestra un icono + grande y texto descriptivo
 */
export function AddEmpleadoCard({ onClick }: AddEmpleadoCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center bg-white rounded-xl border-2 border-dashed border-gray-300 p-4 min-h-[160px] hover:border-gray-400 hover:bg-gray-50 transition-all group"
    >
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2 group-hover:bg-gray-200 transition-colors">
        <Plus className="h-6 w-6 text-gray-500 group-hover:text-gray-700" />
      </div>
      <span className="text-sm text-gray-500 group-hover:text-gray-700 font-medium">
        Añadir nuevo empleado
      </span>
    </button>
  );
}
