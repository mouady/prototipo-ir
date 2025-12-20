"use client";

import { categoriasProductos, menuProveedores } from "@/mock/inventario";
import { cn } from "@/lib/utils";

interface SidebarProps {
  categoriaActiva: string;
  onCategoriaChange: (id: string) => void;
}

export function Sidebar({ categoriaActiva, onCategoriaChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col gap-6">
      {/* Productos Section */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Productos</h3>
        <ul className="space-y-1">
          {categoriasProductos.map((categoria) => (
            <li key={categoria.id}>
              <button
                onClick={() => onCategoriaChange(categoria.id)}
                className={cn(
                  "w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors",
                  categoriaActiva === categoria.id
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-2">
                  <span>{categoria.icono}</span>
                  <span>{categoria.nombre}</span>
                </div>
                {categoria.alerta && (
                  <p className="text-xs text-gray-500 ml-6 mt-0.5">
                    {categoria.alerta}
                  </p>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Proveedores Section */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Proveedores</h3>
        <ul className="space-y-1">
          {menuProveedores.map((item) => (
            <li key={item.id}>
              <button className="w-full text-left px-2 py-1.5 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                {item.nombre}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
