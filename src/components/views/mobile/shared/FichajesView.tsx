"use client";

import { Clock, Play, Pause, Calendar, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { useFichajes } from "@/mock/fichajes/hooks";
import { EstadoJornada } from "@/mock/fichajes/types";

interface FichajesViewProps {
  empleadoId: string;
}

/**
 * Formatea la fecha actual para mostrar en el header de jornada
 * Ejemplo: "Viernes, 20 de diciembre"
 */
function formatearFechaCompleta(): string {
  const fecha = new Date();
  const opciones: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
  // Capitalizar primera letra
  return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
}

/**
 * Formatea la hora actual para mostrar
 * Ejemplo: "9:41"
 */
function formatearHoraActual(): string {
  const fecha = new Date();
  return `${fecha.getHours()}:${fecha.getMinutes().toString().padStart(2, "0")}`;
}

/**
 * Formatea la hora de un ISO string
 */
function formatearHoraDesdeISO(isoString: string): string {
  const fecha = new Date(isoString);
  return `${fecha.getHours()}:${fecha.getMinutes().toString().padStart(2, "0")}`;
}

export default function FichajesView({ empleadoId }: FichajesViewProps) {
  const {
    jornada,
    duracionFormateada,
    iniciar,
    detener,
    estaEnCurso,
    noIniciada,
  } = useFichajes(empleadoId);

  const historial = useFichajes(empleadoId).historial;

  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
      {/* Card 1: Jornada del día */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        {/* Cabecera: Icono + Fecha/Hora */}
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Clock className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <p className="font-bold text-gray-900">{formatearFechaCompleta()}</p>
            <p className="font-bold text-gray-900 text-lg">{formatearHoraActual()}</p>
          </div>
        </div>

        {/* Estado A: Jornada no iniciada */}
        {noIniciada && (
          <div className="space-y-4">
            <p className="text-gray-500 text-sm">No has iniciado aún tu jornada</p>
            <button
              onClick={iniciar}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-full transition-colors"
            >
              <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex items-center justify-center">
                <Play className="w-2.5 h-2.5 text-gray-600 fill-gray-600 ml-0.5" />
              </div>
              <span className="font-medium text-gray-700">Iniciar jornada</span>
            </button>
          </div>
        )}

        {/* Estado B: Jornada en curso */}
        {estaEnCurso && jornada.fichaje && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Play className="w-3 h-3 fill-gray-500" />
              <span>Jornada en curso</span>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Inicio: {formatearHoraDesdeISO(jornada.fichaje.entrada)}</p>
              <p>Duración: {duracionFormateada}</p>
            </div>
            <button
              onClick={detener}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-full transition-colors"
            >
              <div className="w-5 h-5 rounded-full border-2 border-gray-600 flex items-center justify-center">
                <Pause className="w-2.5 h-2.5 text-gray-600 fill-gray-600" />
              </div>
              <span className="font-medium text-gray-700">Detener jornada</span>
            </button>
          </div>
        )}

        {/* Estado C: Jornada finalizada hoy */}
        {jornada.estado === EstadoJornada.FINALIZADA && jornada.fichaje && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Jornada finalizada</span>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Inicio: {formatearHoraDesdeISO(jornada.fichaje.entrada)}</p>
              <p>Fin: {formatearHoraDesdeISO(jornada.fichaje.salida!)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Card 2: Historial */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        {/* Cabecera */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-700" />
          </div>
          <h2 className="font-bold text-gray-900">Historial</h2>
        </div>

        {/* Lista de registros */}
        <div className="space-y-3">
          {historial.registros.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">
              No hay registros en el historial
            </p>
          ) : (
            historial.registros.map((registro) => (
              <div
                key={registro.id}
                className="flex items-center gap-3 py-2"
              >
                {/* Indicador circular */}
                <div className="w-3 h-3 rounded-full border-2 border-gray-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                </div>

                {/* Fecha y rango horario */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{registro.fecha}</p>
                  <p className="text-xs text-gray-500">
                    {registro.horaInicio}–{registro.horaFin}
                  </p>
                </div>

                {/* Duración */}
                <span className="text-sm text-gray-500">{registro.duracion}</span>

                {/* Menú de opciones */}
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Paginación */}
        {historial.totalPaginas > 0 && (
          <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-100">
            {/* Previous */}
            <button
              onClick={historial.anterior}
              disabled={!historial.hayAnterior}
              className={`flex items-center gap-1 text-sm ${
                historial.hayAnterior
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {/* Números de página */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(historial.totalPaginas, 3) }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    onClick={() => historial.irAPagina(num)}
                    className={`w-7 h-7 rounded text-sm font-medium ${
                      historial.pagina === num
                        ? "bg-gray-800 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {num}
                  </button>
                )
              )}
              {historial.totalPaginas > 3 && (
                <>
                  <span className="text-gray-400 px-1">...</span>
                </>
              )}
            </div>

            {/* Next */}
            <button
              onClick={historial.siguiente}
              disabled={!historial.haySiguiente}
              className={`flex items-center gap-1 text-sm ${
                historial.haySiguiente
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}