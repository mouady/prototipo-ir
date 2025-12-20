"use client";

import { useState } from "react";
import { Plato } from "@/mock";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { PlatoModal } from "../modals";

interface ProductCardProps {
  plato: Plato;
}

// Función para formatear la categoría
const formatCategoria = (categoria: string) => {
  return categoria
    .split("_")
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

export function PlatoCard({ plato }: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 h-full flex flex-col">
        <div className="relative w-full overflow-hidden flex-shrink-0" style={{ aspectRatio: '1' }}>
          <Image
            src={plato.imagen}
            alt={plato.nombre}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <CardContent className="p-3 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base text-gray-900 line-clamp-1">{plato.nombre}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{formatCategoria(plato.categoriaCarta)}</p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <Pencil className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </CardContent>
      </Card>

      <PlatoModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        platoParaEditar={plato}
      />
    </>
  );
}
