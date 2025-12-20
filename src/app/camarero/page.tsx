"use client";

import { useState } from "react";
import Link from "next/link";
import { useComandasPendientes } from "@/mock";
import { Home, ChefHat, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function CamareroPage() {
  const { comandas, marcarComoLista } = useComandasPendientes();
  const [selectedComanda, setSelectedComanda] = useState<string | null>(null);

  const handleMarcarLista = (id: string) => {
    marcarComoLista(id);
    setSelectedComanda(null);
  };

  // Calcular tiempo de espera basado en fechaCreacion
  const getMinutosEspera = (fechaCreacion: Date) => {
    const ahora = new Date();
    const diff = ahora.getTime() - new Date(fechaCreacion).getTime();
    return Math.floor(diff / 60000); // milisegundos a minutos
  };

  const getTimeColor = (minutos: number) => {
    if (minutos <= 10) return "text-green-600 bg-green-50";
    if (minutos <= 20) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col max-w-md mx-auto">
      {/* Header móvil */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChefHat className="w-8 h-8" />
            <div>
              <h1 className="text-lg font-bold">Vista Camarero</h1>
              <p className="text-xs text-orange-100">Comandas en tiempo real</p>
            </div>
          </div>
          <Link 
            href="/"
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <Home className="w-5 h-5" />
          </Link>
        </div>
      </header>

      {/* Resumen rápido */}
      <div className="bg-white p-4 border-b shadow-sm">
        <div className="flex justify-around text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-1">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{comandas.length}</span>
            <span className="text-xs text-gray-500">Pendientes</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-1">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">0</span>
            <span className="text-xs text-gray-500">Completadas hoy</span>
          </div>
        </div>
      </div>

      {/* Lista de comandas */}
      <div className="flex-1 p-4 space-y-3 overflow-auto pb-20">
        {comandas.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <CheckCircle2 className="w-16 h-16 text-green-400 mb-4" />
            <p className="text-lg font-medium">¡Todo al día!</p>
            <p className="text-sm">No hay comandas pendientes</p>
          </div>
        ) : (
          comandas.map((comanda) => {
            const minutosEspera = getMinutosEspera(comanda.fechaCreacion);
            return (
              <div
                key={comanda.id}
                className={`bg-white rounded-xl shadow-sm border-2 transition-all ${
                  selectedComanda === comanda.id 
                    ? "border-orange-500 shadow-md" 
                    : "border-transparent"
                }`}
                onClick={() => setSelectedComanda(
                  selectedComanda === comanda.id ? null : comanda.id
                )}
              >
                {/* Cabecera de la comanda */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        {comanda.numMesa}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Mesa {comanda.numMesa}</h3>
                        <p className="text-xs text-gray-500">{comanda.lineas.length} items • #{comanda.numComanda}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getTimeColor(minutosEspera)}`}>
                      <Clock className="w-4 h-4" />
                      {minutosEspera} min
                    </div>
                  </div>
                </div>

                {/* Items de la comanda */}
                <div className="p-4">
                  <ul className="space-y-2">
                    {comanda.lineas.map((linea) => (
                      <li key={linea.id} className="flex items-center gap-2 text-sm">
                        <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                          {linea.cantidad}
                        </span>
                        <span className="text-gray-700">{linea.productoNombre}</span>
                        {linea.formato && (
                          <span className="text-xs text-gray-400">({linea.formato})</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botón de acción (visible cuando está seleccionada) */}
                {selectedComanda === comanda.id && (
                  <div className="p-4 pt-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarcarLista(comanda.id);
                      }}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Marcar como lista
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Barra inferior */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t shadow-lg p-4">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Actualización en tiempo real
        </div>
      </div>
    </div>
  );
}
