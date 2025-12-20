"use client";

import { useMemo } from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react";
import { HorarioEspecial } from "@/mock";
import { TurnoBlock } from "./TurnoBlock";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CalendarioSemanalProps {
  turnosSemana: HorarioEspecial[];
  fechaInicio: Date;
  onFechaInicioChange: (fecha: Date) => void;
  onDiaClick: (fecha: string) => void;
  diaSeleccionado?: string;
  vistaActiva: "Year" | "Week" | "Month" | "Day";
  onVistaChange: (vista: "Year" | "Week" | "Month" | "Day") => void;
  showFichajes?: boolean;
}

const HORAS = Array.from({ length: 24 }, (_, i) => i);

const DIAS_SEMANA = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

/**
 * Calendario semanal con rejilla horaria
 * 
 * Muestra:
 * - Navegación de semanas (flechas izquierda/derecha)
 * - Selector de vistas (Year, Week, Month, Day)
 * - Botón "Today"
 * - 7 columnas (días de la semana)
 * - Filas horarias (0:00 - 23:00)
 * - Turnos como bloques dentro de cada día
 */
export function CalendarioSemanal({
  turnosSemana,
  fechaInicio,
  onFechaInicioChange,
  onDiaClick,
  diaSeleccionado,
  vistaActiva,
  onVistaChange,
  showFichajes = false,
}: CalendarioSemanalProps) {
  // Calcular fechas de la semana
  const fechasSemana = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(fechaInicio, i));
  }, [fechaInicio]);

  // Formatear rango de fechas para el título
  const rangoFechas = useMemo(() => {
    const inicio = fechasSemana[0];
    const fin = fechasSemana[6];
    return `${format(inicio, "MMM d", { locale: es })} – ${format(fin, "d, yyyy", { locale: es })}`;
  }, [fechasSemana]);

  // Navegación
  const irSemanaAnterior = () => {
    onFechaInicioChange(addDays(fechaInicio, -7));
  };

  const irSemanaSiguiente = () => {
    onFechaInicioChange(addDays(fechaInicio, 7));
  };

  const irHoy = () => {
    const hoy = new Date();
    const inicioSemana = startOfWeek(hoy, { weekStartsOn: 1 });
    onFechaInicioChange(inicioSemana);
  };

  // Calcular posición vertical de un turno basándose en sus horas
  const calcularPosicionTurno = (horaInicio: string, horaFin: string) => {
    const [inicioH] = horaInicio.split(":").map(Number);
    let [finH] = horaFin.split(":").map(Number);
    
    // Si el fin es menor que el inicio, asumimos que cruza medianoche
    if (finH <= inicioH && horaFin !== "00:00") {
      finH = 24;
    } else if (horaFin === "00:00") {
      finH = 24;
    }

    const top = (inicioH / 24) * 100;
    const height = ((finH - inicioH) / 24) * 100;

    return { top: `${top}%`, height: `${Math.max(height, 5)}%` };
  };

  return (
    <div className="flex-1 bg-white rounded-lg border flex flex-col overflow-hidden">
      {/* Header del calendario */}
      <div className="flex items-center justify-between p-4 border-b">
        {/* Botón Today */}
        <Button
          variant="outline"
          size="sm"
          onClick={irHoy}
          className="rounded-full"
        >
          Today
        </Button>

        {/* Navegación y título */}
        <div className="flex items-center gap-4">
          <button
            onClick={irSemanaAnterior}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="font-medium text-lg min-w-[200px] text-center">
            {rangoFechas}
          </span>
          <button
            onClick={irSemanaSiguiente}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Selector de vistas */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {(["Year", "Week", "Month", "Day"] as const).map((vista) => (
            <button
              key={vista}
              onClick={() => onVistaChange(vista)}
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                vistaActiva === vista
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {vista}
            </button>
          ))}
        </div>
      </div>

      {/* Rejilla del calendario */}
      <div className="flex-1 flex overflow-hidden">
        {/* Columna de horas */}
        <div className="w-16 flex-shrink-0 border-r">
          <div className="h-12 border-b" /> {/* Espacio para cabeceras */}
          <div className="relative" style={{ height: "calc(100% - 48px)" }}>
            {HORAS.map((hora) => (
              <div
                key={hora}
                className="absolute w-full text-xs text-gray-500 text-right pr-2"
                style={{ top: `${(hora / 24) * 100}%`, transform: "translateY(-50%)" }}
              >
                {hora}:00
              </div>
            ))}
          </div>
        </div>

        {/* Columnas de días */}
        <div className="flex-1 flex">
          {fechasSemana.map((fecha, index) => {
            const fechaStr = format(fecha, "yyyy-MM-dd");
            const turnosDia = turnosSemana.find((t) => t.fecha === fechaStr);
            const isSelected = diaSeleccionado === fechaStr;
            const isHoy = isSameDay(fecha, new Date());

            return (
              <div
                key={fechaStr}
                className={cn(
                  "flex-1 border-r last:border-r-0 flex flex-col",
                  isSelected && "bg-red-50"
                )}
              >
                {/* Cabecera del día */}
                <div
                  className={cn(
                    "h-12 border-b flex items-center justify-between px-2",
                    isSelected && "bg-red-500 text-white",
                    isHoy && !isSelected && "bg-blue-50"
                  )}
                >
                  <span className="font-medium text-sm">
                    {DIAS_SEMANA[index]}
                  </span>
                  <button
                    onClick={() => onDiaClick(fechaStr)}
                    className={cn(
                      "p-1 rounded hover:bg-black/10",
                      isSelected && "hover:bg-white/20"
                    )}
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                </div>

                {/* Área de turnos */}
                <div
                  className="flex-1 relative"
                  style={{ minHeight: "600px" }}
                >
                  {/* Líneas horizontales de horas */}
                  {HORAS.map((hora) => (
                    <div
                      key={hora}
                      className="absolute w-full border-t border-gray-100"
                      style={{ top: `${(hora / 24) * 100}%` }}
                    />
                  ))}

                  {/* Turnos del día */}
                  {turnosDia?.turnos.map((turno) => {
                    const { top, height } = calcularPosicionTurno(
                      turno.horaInicio,
                      turno.horaFin
                    );
                    return (
                      <div
                        key={turno.id}
                        className="absolute left-1 right-1"
                        style={{ top, height }}
                      >
                        <TurnoBlock
                          turno={turno}
                          isSelected={isSelected}
                          showFichajes={showFichajes}
                          onClick={() => onDiaClick(fechaStr)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
