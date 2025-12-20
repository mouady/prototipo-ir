"use client";

import { useState } from "react";
import { AvisoCard } from "./AvisoCard";
import { useAvisosReposicion } from "@/mock";

type FiltroAviso = "pendientes" | "atendidos" | "todos";

export function AvisosPage() {
  const { avisos, marcarAtendido } = useAvisosReposicion();
  const [filtro, setFiltro] = useState<FiltroAviso>("pendientes");

  const avisosFiltrados = avisos.filter((aviso) => {
    if (filtro === "pendientes") return !aviso.atendido;
    if (filtro === "atendidos") return aviso.atendido;
    return true;
  });

  // Ordenar por fecha (más recientes primero)
  const avisosOrdenados = [...avisosFiltrados].sort(
    (a, b) => new Date(b.fechaSolicitud).getTime() - new Date(a.fechaSolicitud).getTime()
  );

  const contadorPendientes = avisos.filter((a) => !a.atendido).length;
  const contadorAtendidos = avisos.filter((a) => a.atendido).length;

  return (
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      {/* Cabecera */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Avisos de Reposición</h1>
        <p className="text-sm text-gray-500 mt-1">
          Avisos generados por los cocineros cuando faltan productos
        </p>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFiltro("pendientes")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filtro === "pendientes"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Pendientes
          {contadorPendientes > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {contadorPendientes}
            </span>
          )}
        </button>
        <button
          onClick={() => setFiltro("atendidos")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filtro === "atendidos"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Atendidos
          <span className="ml-2 text-xs opacity-70">({contadorAtendidos})</span>
        </button>
        <button
          onClick={() => setFiltro("todos")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filtro === "todos"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Todos
          <span className="ml-2 text-xs opacity-70">({avisos.length})</span>
        </button>
      </div>

      {/* Lista de avisos */}
      {avisosOrdenados.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-500">
            {filtro === "pendientes"
              ? "No hay avisos pendientes"
              : filtro === "atendidos"
              ? "No hay avisos atendidos"
              : "No hay avisos"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {avisosOrdenados.map((aviso) => (
            <AvisoCard
              key={aviso.id}
              aviso={aviso}
              onMarcarAtendido={marcarAtendido}
            />
          ))}
        </div>
      )}
    </div>
  );
}
