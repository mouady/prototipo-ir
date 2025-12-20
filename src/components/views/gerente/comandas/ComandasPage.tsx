"use client";

import { useState } from "react";
import { useComandasPendientes } from "@/mock";
import { ComandaCard } from "./ComandaCard";
import { ComandasHechasModal } from "./ComandasHechasModal";

export function ComandasPage() {
  const { comandas, marcarComoLista, marcarLineaLista, desmarcarLinea } = useComandasPendientes();
  const [showHechasModal, setShowHechasModal] = useState(false);

  const handleMarcarLista = (id: string) => {
    marcarComoLista(id);
  };

  const handleMarcarLineaLista = (comandaId: string, lineaId: string) => {
    marcarLineaLista(comandaId, lineaId);
  };

  const handleDesmarcarLinea = (comandaId: string, lineaId: string) => {
    desmarcarLinea(comandaId, lineaId);
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-[calc(100vh-56px)]">
      <div className="flex gap-6 h-full">
        {/* Área principal de comandas */}
        <div className="flex-1">
          {comandas.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-500">
              No hay comandas pendientes.
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 content-start">
              {comandas.map((comanda) => (
                <ComandaCard
                  key={comanda.id}
                  comanda={comanda}
                  onMarcarLista={handleMarcarLista}
                  onMarcarLineaLista={handleMarcarLineaLista}
                  onDesmarcarLinea={handleDesmarcarLinea}
                />
              ))}
            </div>
          )}
        </div>

        {/* Panel lateral de "Hechas" */}
        <div className="w-64 flex-shrink-0">
          <button
            onClick={() => setShowHechasModal(true)}
            className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Hechas</h3>
            <p className="text-sm text-gray-500">
              Haz clic en esta ventanita para poder ver y modificar las comandas ya marcadas como listas.
            </p>
          </button>
        </div>
      </div>

      {/* Modal de comandas hechas */}
      <ComandasHechasModal
        isOpen={showHechasModal}
        onClose={() => setShowHechasModal(false)}
      />
    </div>
  );
}
