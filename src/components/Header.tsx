"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { label: "Horarios", href: "#" },
  { label: "Comandas", href: "#" },
  { label: "Empleados", href: "#" },
  { label: "Inventario", href: "#" },
  { label: "Estadísticas", href: "#" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/logo.svg" alt="Logo" />
            <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800">
              <svg
                className="h-5 w-5 text-zinc-600 dark:text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* User Button */}
        <Button variant="outline" size="sm" className="gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Gerente 1
        </Button>
      </div>
    </header>
  );
}
