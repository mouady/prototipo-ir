"use client";

import { useComandasHechas } from "@/mock";
import { ComandaCard } from "./ComandaCard";
import { X } from "lucide-react";

interface ComandasHechasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComandasHechasModal({ isOpen, onClose }: ComandasHechasModalProps) {
  const { comandas, restaurar } = useComandasHechas();

  if (!isOpen) return null;

  const handleRestaurar = (id: string) => {
    restaurar(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Comandas Hechas</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 overflow-auto flex-1">
          {comandas.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No hay comandas marcadas como listas.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {comandas.map((comanda) => (
                <ComandaCard
                  key={comanda.id}
                  comanda={comanda}
                  onRestaurar={handleRestaurar}
                  isHecha
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
