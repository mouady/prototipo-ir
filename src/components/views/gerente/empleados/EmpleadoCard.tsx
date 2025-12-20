"use client";

import Image from "next/image";
import { Empleado, RolEmpleado } from "@/mock";
import { Edit2 } from "lucide-react";

interface EmpleadoCardProps {
  empleado: Empleado;
  onClick?: (empleado: Empleado) => void;
  onEdit?: (empleado: Empleado) => void;
}

/**
 * Tarjeta de empleado que muestra:
 * - Foto de perfil
 * - Indicador de estado (activo/inactivo)
 * - Nombre completo
 * - Rol (Camarero/Cocinero)
 * - Botón de edición
 */
export function EmpleadoCard({ empleado, onClick, onEdit }: EmpleadoCardProps) {
  const nombreCompleto = `${empleado.nombre} ${empleado.apellidos}`;
  const rolLabel = empleado.rol === RolEmpleado.CAMARERO ? "Camarero" : "Cocinero";

  const handleClick = () => {
    onClick?.(empleado);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(empleado);
  };

  return (
    <div
      className="relative bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group"
      onClick={handleClick}
    >
      {/* Botón de edición */}
      <button
        onClick={handleEdit}
        className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        title="Editar empleado"
      >
        <Edit2 className="h-4 w-4" />
      </button>

      {/* Contenido principal */}
      <div className="flex flex-col items-center text-center">
        {/* Avatar con indicador de estado */}
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
            {empleado.imagenPerfil ? (
              <Image
                src={empleado.imagenPerfil}
                alt={nombreCompleto}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-2xl font-semibold">
                {empleado.nombre.charAt(0)}{empleado.apellidos.charAt(0)}
              </div>
            )}
          </div>
          
          {/* Indicador de estado (punto verde/rojo) */}
          <div
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              empleado.activo ? "bg-green-500" : "bg-red-500"
            }`}
            title={empleado.activo ? "Activo" : "Inactivo"}
          />
        </div>

        {/* Nombre y rol */}
        <h3 className="font-medium text-gray-900 text-sm truncate max-w-full">
          {nombreCompleto}
        </h3>
        <p className="text-gray-500 text-xs mt-0.5">{rolLabel}</p>
      </div>
    </div>
  );
}
