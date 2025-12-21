"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComandasPage } from "@/components/views/gerente/comandas/ComandasPage";
import { getPublicPath } from "@/lib/path";

export default function CocineroDesktopPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      {/* Header simplificado para cocinero */}
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

            {/* Título de la sección */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-2 text-sm font-medium bg-gray-900 text-white rounded-md">
                Comandas
              </span>
            </div>
          </div>

          {/* User Button */}
          <Button variant="outline" size="sm" className="gap-2 rounded-full">
            Cocinero
          </Button>
        </div>
      </header>

      {/* Contenido: Solo la página de comandas */}
      <ComandasPage />
    </div>
  );
}
