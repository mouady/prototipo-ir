"use client";

import { AvisoReposicion } from "@/mock";
import { Check, User } from "lucide-react";

interface AvisoCardProps {
  aviso: AvisoReposicion;
  onMarcarAtendido?: (id: string) => void;
}

export function AvisoCard({ aviso, onMarcarAtendido }: AvisoCardProps) {
  const formatFecha = (fecha: Date) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`bg-white rounded-xl border shadow-sm p-4 transition-all ${
        aviso.atendido
          ? "border-gray-200 opacity-70"
          : "border-gray-300 hover:shadow-md"
      }`}
    >
      {/* Cabecera con avatar y nombre del cocinero */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-gray-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            De {aviso.cocineroNombre}
          </h3>
          <p className="text-xs text-gray-500">{formatFecha(aviso.fechaSolicitud)}</p>
        </div>
        {aviso.atendido && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            Atendido
          </span>
        )}
      </div>

      {/* Lista de productos que faltan */}
      <div className="mb-3">
        <p className="text-sm font-medium text-gray-700 mb-2">Falta:</p>
        <div className="flex flex-wrap gap-2">
          {aviso.lineas.map((linea) => (
            <span
              key={linea.id}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm border border-gray-300 bg-gray-50 text-gray-700"
            >
              {linea.productoNombre}
            </span>
          ))}
        </div>
      </div>

      {/* Comentarios si existen */}
      {aviso.comentario && (
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700 mb-1">Comentarios:</p>
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 italic">
            {aviso.comentario}
          </div>
        </div>
      )}

      {/* Botón de marcar como atendido */}
      {!aviso.atendido && onMarcarAtendido && (
        <div className="flex justify-end mt-2">
          <button
            onClick={() => onMarcarAtendido(aviso.id)}
            className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
            title="Marcar como atendido"
          >
            <Check className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
