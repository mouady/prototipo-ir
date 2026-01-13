"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getPublicPath } from "@/lib/path";

export type SeccionActiva = "horarios" | "comandas" | "empleados" | "inventario" | "estadisticas";

const navItems: { label: string; id: SeccionActiva; href: string }[] = [
  { label: "Horarios", id: "horarios", href: "/desktop/gerente/horarios" },
  { label: "Comandas", id: "comandas", href: "/desktop/gerente/comandas" },
  { label: "Empleados", id: "empleados", href: "/desktop/gerente/empleados" },
  { label: "Inventario", id: "inventario", href: "/desktop/gerente/inventario" },
  { label: "Estadísticas", id: "estadisticas", href: "/desktop/gerente/estadisticas" },
];

interface HeaderProps {
  seccionActiva?: SeccionActiva;
}

export function Header({ seccionActiva }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Determinar la sección activa desde la ruta si no se proporciona
  const currentSeccion = seccionActiva || navItems.find(item => pathname?.includes(item.id))?.id;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Logo y Botón Atrás */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 rounded-md hover:bg-gray-100 transition-colors"
              title="Volver a la página principal"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          
          <Image
              src={getPublicPath("/logosuite.png")}
              alt="Suite Pro Logo"
              width={55}
              height={55}
              priority
            />

          {/* Navigation */}
          <nav className="flex items-center gap-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => router.push(item.href)}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                  currentSeccion === item.id
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
