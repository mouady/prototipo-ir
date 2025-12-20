"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SeccionActiva = "horarios" | "comandas" | "empleados" | "inventario" | "estadisticas";

const navItems: { label: string; id: SeccionActiva }[] = [
  { label: "Horarios", id: "horarios" },
  { label: "Comandas", id: "comandas" },
  { label: "Empleados", id: "empleados" },
  { label: "Inventario", id: "inventario" },
  { label: "Estadísticas", id: "estadisticas" },
];

interface HeaderProps {
  seccionActiva: SeccionActiva;
  onSeccionChange: (seccion: SeccionActiva) => void;
}

export function Header({ seccionActiva, onSeccionChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
              src="/logosuitepro.png"
              alt="Suite Pro Logo"
              width={55}
              height={55}
              priority
            />

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSeccionChange(item.id)}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                  seccionActiva === item.id
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* User Button */}
        <Button variant="outline" size="sm" className="gap-2 rounded-full">
          Gerente 1
        </Button>
      </div>
    </header>
  );
}
