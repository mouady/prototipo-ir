"use client";
import Link from "next/link";

import { Menu } from "lucide-react";

export default function CamareroPage() {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col max-w-md mx-auto">
      {/* Header móvil */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
            href="/"
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </Link>
            <div>
              <h1 className="text-lg font-bold">Titulo Apartado</h1>
            </div>
          </div>
          
        </div>
      </header>
    </div>
  );
}
