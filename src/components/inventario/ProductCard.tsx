"use client";

import { Producto } from "@/mock/inventario";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface ProductCardProps {
  producto: Producto;
}

export function ProductCard({ producto }: ProductCardProps) {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3] w-full bg-gray-100">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
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
        <h4 className="font-medium text-sm text-gray-900">{producto.nombre}</h4>
        {producto.descripcion && (
          <p className="text-xs text-gray-500 mt-0.5">{producto.descripcion}</p>
        )}
      </CardContent>
    </Card>
  );
}
