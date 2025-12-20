"use client";

import { Turno, RolEmpleado } from "@/mock";
import { ChipEmpleado } from "./ChipEmpleado";
import { cn } from "@/lib/utils";

interface TurnoBlockProps {
  turno: Turno;
  isSelected?: boolean;
  showFichajes?: boolean;
  onClick?: () => void;
}

/**
 * Bloque que representa un turno dentro del calendario semanal
 * 
 * Muestra:
 * - Chips de empleados asignados (verde para camareros, naranja para cocineros)
 * - Opcionalmente, las horas de fichaje de cada empleado
 * 
 * Si isSelected es true, el bloque tiene un fondo rojizo
 */
export function TurnoBlock({
  turno,
  isSelected = false,
  showFichajes = false,
  onClick,
}: TurnoBlockProps) {
  // Separar por rol para mostrar organizadamente
  const cocineros = turno.asignaciones.filter(
    (a) => a.rol === RolEmpleado.COCINERO
  );
  const camareros = turno.asignaciones.filter(
    (a) => a.rol === RolEmpleado.CAMARERO
  );

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-lg border-2 p-2 transition-all cursor-pointer",
        "hover:shadow-md",
        isSelected
          ? "bg-red-50 border-red-300"
          : "bg-gray-50 border-gray-800"
      )}
    >
      <div className="flex flex-col gap-1">
        {/* Cocineros (naranja) */}
        {cocineros.map((asignacion) => (
          <ChipEmpleado
            key={asignacion.empleadoId}
            nombre={asignacion.empleadoNombre.split(" ")[0]} // Solo primer nombre
            rol={asignacion.rol}
            horaEntrada={showFichajes ? asignacion.horaEntrada : undefined}
            horaSalida={showFichajes ? asignacion.horaSalida : undefined}
            tieneAlerta={
              showFichajes &&
              !!asignacion.horaEntrada &&
              asignacion.horaEntrada > turno.horaInicio
            }
            size="sm"
          />
        ))}
        {/* Camareros (verde) */}
        {camareros.map((asignacion) => (
          <ChipEmpleado
            key={asignacion.empleadoId}
            nombre={asignacion.empleadoNombre.split(" ")[0]} // Solo primer nombre
            rol={asignacion.rol}
            horaEntrada={showFichajes ? asignacion.horaEntrada : undefined}
            horaSalida={showFichajes ? asignacion.horaSalida : undefined}
            tieneAlerta={
              showFichajes &&
              !!asignacion.horaEntrada &&
              asignacion.horaEntrada > turno.horaInicio
            }
            size="sm"
          />
        ))}
      </div>
    </div>
  );
}
