"use client";

import { Comanda, LineaComanda, FormatoPlato } from "@/mock";
import { Button } from "@/components/ui/button";

interface ComandaCardProps {
  comanda: Comanda;
  onMarcarLista?: (id: string) => void;
  onRestaurar?: (id: string) => void;
  isHecha?: boolean;
}

function FormatoBadge({ formato }: { formato?: FormatoPlato }) {
  if (!formato) return null;
  
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-900 text-white">
      {formato}
    </span>
  );
}

function CantidadBadge({ cantidad }: { cantidad: number }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
      ×{cantidad}
    </span>
  );
}

function LineaComandaItem({ linea }: { linea: LineaComanda }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <span className="flex-1">{linea.productoNombre}</span>
      <div className="flex items-center gap-1.5">
        <FormatoBadge formato={linea.formato} />
        <CantidadBadge cantidad={linea.cantidad} />
      </div>
    </div>
  );
}

export function ComandaCard({ comanda, onMarcarLista, onRestaurar, isHecha = false }: ComandaCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3 min-w-[220px] max-w-[280px]">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900">
        Comanda {comanda.numComanda}
      </h3>
      
      {/* Líneas de comanda */}
      <div className="flex flex-col gap-2">
        {comanda.lineas.map((linea) => (
          <LineaComandaItem key={linea.id} linea={linea} />
        ))}
      </div>
      
      {/* Botón de acción */}
      <div className="mt-auto pt-2">
        {isHecha ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onRestaurar?.(comanda.id)}
          >
            Restaurar
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onMarcarLista?.(comanda.id)}
          >
            Marcar como listo
          </Button>
        )}
      </div>
    </div>
  );
}
