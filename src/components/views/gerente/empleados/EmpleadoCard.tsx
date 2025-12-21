"use client";

import Image from "next/image";
import { Empleado } from "@/mock";
import { getRolLabel } from "@/lib/utils";
import { getPublicPath } from "@/lib/path";

interface EmpleadoCardProps {
  empleado: Empleado;
  onClick?: (empleado: Empleado) => void;
}

/**
 * Tarjeta de empleado que muestra:
 * - Foto de perfil
 * - Indicador de estado (activo/inactivo)
 * - Nombre completo
 * - Rol (Camarero/Camarera, Cocinero/Cocinera)
 */
export function EmpleadoCard({ empleado, onClick }: EmpleadoCardProps) {
  const nombreCompleto = `${empleado.nombre} ${empleado.apellidos}`;
  const rolLabel = getRolLabel(empleado.rol, empleado.genero);

  const handleClick = () => {
    onClick?.(empleado);
  };

  return (
    <div
      className="relative bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all cursor-pointer group"
      onClick={handleClick}
    >
      {/* Contenido principal */}
      <div className="flex flex-col items-center text-center">
        {/* Avatar con indicador de estado */}
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
            {empleado.imagenPerfil ? (
              <Image
                src={getPublicPath(empleado.imagenPerfil)}
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
