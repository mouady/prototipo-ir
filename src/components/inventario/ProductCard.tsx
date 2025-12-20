"use client";

import { Plato } from "@/mock";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface ProductCardProps {
  plato: Plato;
}

export function ProductCard({ plato }: ProductCardProps) {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3] w-full bg-gray-100">
        <Image
          src={plato.imagen}
          alt={plato.nombre}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            // Fallback si la imagen no existe
            e.currentTarget.src = "/productos/placeholder.jpg";
          }}
        />
      </div>
      <CardContent className="p-3">
        <h4 className="font-medium text-sm text-gray-900">{plato.nombre}</h4>
        {plato.descripcion && (
          <p className="text-xs text-gray-500 mt-0.5">{plato.descripcion}</p>
        )}
      </CardContent>
    </Card>
  );
}
