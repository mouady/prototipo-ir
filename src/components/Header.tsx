"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Horarios", href: "#", active: false },
  { label: "Comandas", href: "#", active: false },
  { label: "Empleados", href: "#", active: false },
  { label: "Inventario", href: "#", active: true },
  { label: "Estadísticas", href: "#", active: false },
];

export function Header() {
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
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                  item.active
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                {item.label}
              </a>
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
