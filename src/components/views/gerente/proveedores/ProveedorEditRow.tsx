"use client";

import { Proveedor } from "@/mock";
import { Input } from "@/components/ui/input";
import { Phone, Mail, X } from "lucide-react";

interface ProveedorEditRowProps {
  proveedor: Proveedor;
  valores: {
    nombre: string;
    cif: string;
    tlf: string;
    email: string;
  };
  onChange: (campo: keyof Omit<Proveedor, "id">, valor: string) => void;
  onDelete: () => void;
  modificado?: boolean;
}

/**
 * Fila editable de proveedor para el modo de edición en bulk
 * 
 * Según especificación de UI/UX en proveedores.md:
 * - Botón de eliminar (círculo rojo con X)
 * - Input nombre
 * - Input CIF (con fondo amarillo si modificado)
 * - Input teléfono con icono
 * - Input email con icono
 */
export function ProveedorEditRow({
  valores,
  onChange,
  onDelete,
  modificado = false,
}: ProveedorEditRowProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Botón Eliminar */}
        <button
          onClick={onDelete}
          className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors flex-shrink-0"
          title="Eliminar proveedor"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Input Nombre */}
        <Input
          value={valores.nombre}
          onChange={(e) => onChange("nombre", e.target.value)}
          placeholder="Nombre"
          className="flex-1 min-w-[120px]"
        />

        {/* Input CIF */}
        <Input
          value={valores.cif}
          onChange={(e) => onChange("cif", e.target.value)}
          placeholder="CIF"
          className={`w-28 ${modificado ? "bg-yellow-50" : ""}`}
        />

        {/* Input Teléfono */}
        <div className="relative flex-1 min-w-[140px]">
          <Input
            value={valores.tlf}
            onChange={(e) => onChange("tlf", e.target.value)}
            placeholder="Teléfono"
            className="pr-8"
          />
          <Phone className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        {/* Input Email */}
        <div className="relative flex-1 min-w-[180px]">
          <Input
            type="email"
            value={valores.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="Email"
            className="pr-8"
          />
          <Mail className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
