"use client";

import { cn } from "@/lib/utils";
import type { EstadisticaSeccion } from "./types";

interface LeftMenuProps {
  seccionActiva: EstadisticaSeccion;
  onSeccionChange: (seccion: EstadisticaSeccion) => void;
}

const menuItems: { id: EstadisticaSeccion; label: string }[] = [
  { id: "proveedores", label: "Proveedores" },
  { id: "camareros", label: "Camareros" },
  { id: "reservas", label: "Reservas" },
  { id: "ticket", label: "Ticket" },
  { id: "platos", label: "Platos" },
];

export function LeftMenu({ seccionActiva, onSeccionChange }: LeftMenuProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
      <h2 className="font-semibold text-gray-900 text-lg mb-4">Estadísticas</h2>
      
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSeccionChange(item.id)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
              seccionActiva === item.id
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
