"use client";

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
        <div className="flex items-center gap-6">
          <div className="flex items-center justify-center w-10 h-10">
            <svg
              viewBox="0 0 40 40"
              className="w-10 h-10 text-gray-800"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="20" cy="20" r="16" />
              <path d="M12 20 C12 14, 20 10, 28 16" />
              <circle cx="28" cy="16" r="3" fill="currentColor" />
            </svg>
          </div>

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
