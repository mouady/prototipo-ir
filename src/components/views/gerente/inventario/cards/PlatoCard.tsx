"use client";

import { useState } from "react";
import { Plato, FormatoPlato } from "@/mock";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { PlatoModal } from "../modals";
import { getPublicPath } from "@/lib/path";

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

// Labels para mostrar FormatoPlato en español (abreviado)
const FORMATO_SHORT_LABELS: Record<FormatoPlato, string> = {
  [FormatoPlato.ESTANDAR]: "Est",
  [FormatoPlato.TAPA]: "Tapa",
  [FormatoPlato.MEDIA]: "1/2",
  [FormatoPlato.RACION]: "Ración",
};

export function PlatoCard({ plato }: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  // Obtener el rango de precios
  const precios = plato.formatos?.map(f => f.precio) || [];
  const precioMin = precios.length > 0 ? Math.min(...precios) : 0;
  const precioMax = precios.length > 0 ? Math.max(...precios) : 0;
  const precioDisplay = precioMin === precioMax 
    ? `${precioMin.toFixed(2)}€`
    : `${precioMin.toFixed(2)}€ - ${precioMax.toFixed(2)}€`;

  return (
    <>
      <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 h-full flex flex-col">
        <div className="relative w-full overflow-hidden flex-shrink-0" style={{ aspectRatio: '1' }}>
          <Image
            src={getPublicPath(plato.imagen)}
            alt={plato.nombre}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <CardContent className="p-3 flex-1 flex flex-col">
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
          
          {/* Formatos y precio */}
          {plato.formatos && plato.formatos.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 flex-wrap">
                  {plato.formatos.map((formato) => (
                    <span
                      key={formato.id}
                      className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded"
                    >
                      {FORMATO_SHORT_LABELS[formato.formatoPlato]}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {precioDisplay}
                </span>
              </div>
            </div>
          )}
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
