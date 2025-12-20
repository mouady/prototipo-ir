"use client";

import { Plato } from "@/mock";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface ProductCardProps {
  plato: Plato;
}

export function PlatoCard({ plato }: ProductCardProps) {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="relative w-full bg-gray-100 flex-shrink-0" style={{ aspectRatio: '1' }}>
        <Image
          src={plato.imagen}
          alt={plato.nombre}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <CardContent className="p-2 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-medium text-xs text-gray-900 line-clamp-1">{plato.nombre}</h4>
          {plato.descripcion && (
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{plato.descripcion}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
