"use client";

import { Comanda, LineaComanda, FormatoPlato, Estado } from "@/mock";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ComandaCardProps {
  comanda: Comanda;
  onMarcarLista?: (id: string) => void;
  onRestaurar?: (id: string) => void;
  onMarcarLineaLista?: (comandaId: string, lineaId: string) => void;
  onDesmarcarLinea?: (comandaId: string, lineaId: string) => void;
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

interface LineaComandaItemProps {
  linea: LineaComanda;
  comandaId: string;
  onToggle?: (comandaId: string, lineaId: string, isLista: boolean) => void;
  readOnly?: boolean;
}

function LineaComandaItem({ linea, comandaId, onToggle, readOnly = false }: LineaComandaItemProps) {
  const isLista = linea.estado === Estado.REALIZADO;
  
  const handleClick = () => {
    if (readOnly || !onToggle) return;
    onToggle(comandaId, linea.id, isLista);
  };

  return (
    <div 
      className={`flex items-center gap-2 text-sm ${readOnly ? '' : 'cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded'}`}
      onClick={handleClick}
    >
      {/* Checkbox */}
      <button
        type="button"
        disabled={readOnly}
        className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
          isLista 
            ? 'bg-green-500 border-green-500 text-white' 
            : 'border-gray-300 hover:border-gray-400'
        } ${readOnly ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        {isLista && <Check className="w-3 h-3" />}
      </button>
      
      {/* Nombre del producto */}
      <span className={`flex-1 ${isLista ? 'line-through text-gray-400' : 'text-gray-700'}`}>
        {linea.productoNombre}
      </span>
      
      {/* Badges */}
      <div className="flex items-center gap-1.5">
        <FormatoBadge formato={linea.formato} />
        <CantidadBadge cantidad={linea.cantidad} />
      </div>
    </div>
  );
}

export function ComandaCard({ 
  comanda, 
  onMarcarLista, 
  onRestaurar, 
  onMarcarLineaLista,
  onDesmarcarLinea,
  isHecha = false 
}: ComandaCardProps) {
  // Contar líneas completadas
  const lineasCompletadas = comanda.lineas.filter(l => l.estado === Estado.REALIZADO).length;
  const totalLineas = comanda.lineas.length;
  const todasListas = lineasCompletadas === totalLineas;

  const handleToggleLinea = (comandaId: string, lineaId: string, isCurrentlyLista: boolean) => {
    if (isCurrentlyLista) {
      onDesmarcarLinea?.(comandaId, lineaId);
    } else {
      onMarcarLineaLista?.(comandaId, lineaId);
    }
  };

  return (
    <div className={`bg-white rounded-xl border shadow-sm p-4 flex flex-col gap-3 min-w-[220px] max-w-[280px] ${
      todasListas && !isHecha ? 'border-green-300 bg-green-50' : 'border-gray-200'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Comanda {comanda.numComanda}
        </h3>
        <span className="text-xs text-gray-500">
          Mesa {comanda.numMesa}
        </span>
      </div>
      
      {/* Progreso */}
      {!isHecha && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${(lineasCompletadas / totalLineas) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-500">
            {lineasCompletadas}/{totalLineas}
          </span>
        </div>
      )}
      
      {/* Líneas de comanda */}
      <div className="flex flex-col gap-1">
        {comanda.lineas.map((linea) => (
          <LineaComandaItem 
            key={linea.id} 
            linea={linea} 
            comandaId={comanda.id}
            onToggle={isHecha ? undefined : handleToggleLinea}
            readOnly={isHecha}
          />
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
        ) : todasListas ? (
          <Button
            variant="default"
            size="sm"
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => onMarcarLista?.(comanda.id)}
          >
            ✓ Comanda lista
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onMarcarLista?.(comanda.id)}
          >
            Marcar todo como listo
          </Button>
        )}
      </div>
    </div>
  );
}
