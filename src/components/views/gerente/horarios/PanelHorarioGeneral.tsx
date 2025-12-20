"use client";

import { DiaSemana, Horario } from "@/mock";
import { Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PanelHorarioGeneralProps {
  horarios: Horario[];
  onEditDia: (dia: DiaSemana) => void;
  onAddDiaEspecial: () => void;
}

const DIAS_ORDEN: DiaSemana[] = [
  DiaSemana.LUNES,
  DiaSemana.MARTES,
  DiaSemana.MIERCOLES,
  DiaSemana.JUEVES,
  DiaSemana.VIERNES,
  DiaSemana.SABADO,
  DiaSemana.DOMINGO,
];

const DIAS_NOMBRE: Record<DiaSemana, string> = {
  [DiaSemana.LUNES]: "Lunes",
  [DiaSemana.MARTES]: "Martes",
  [DiaSemana.MIERCOLES]: "Miércoles",
  [DiaSemana.JUEVES]: "Jueves",
  [DiaSemana.VIERNES]: "Viernes",
  [DiaSemana.SABADO]: "Sábado",
  [DiaSemana.DOMINGO]: "Domingo",
};

/**
 * Panel lateral derecho que muestra el horario general del restaurante
 * 
 * Incluye:
 * - Botón para añadir día especial
 * - Lista de días con sus horarios de apertura/cierre
 * - Icono de edición por cada día
 */
export function PanelHorarioGeneral({
  horarios,
  onEditDia,
  onAddDiaEspecial,
}: PanelHorarioGeneralProps) {
  // Crear un mapa para acceso rápido
  const horariosPorDia = new Map<DiaSemana, Horario>();
  horarios.forEach((h) => horariosPorDia.set(h.diaSemana, h));

  return (
    <div className="w-64 bg-white rounded-lg border p-4 flex flex-col gap-4">
      {/* Botón añadir día especial */}
      <Button
        onClick={onAddDiaEspecial}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300"
      >
        <Plus className="h-4 w-4 mr-2" />
        Añadir día especial
      </Button>

      {/* Título */}
      <h3 className="font-semibold text-lg">Horario general</h3>

      {/* Lista de días */}
      <div className="flex flex-col gap-2">
        {DIAS_ORDEN.map((dia) => {
          const horario = horariosPorDia.get(dia);
          const rango = horario
            ? `${horario.horaApertura}-${horario.horaCierre}`
            : "Cerrado";

          return (
            <div
              key={dia}
              className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0"
            >
              <div className="flex-1">
                <span className="font-medium">{DIAS_NOMBRE[dia]}:</span>
                <span className="ml-2 text-gray-600">{rango}</span>
              </div>
              <button
                onClick={() => onEditDia(dia)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <Pencil className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
