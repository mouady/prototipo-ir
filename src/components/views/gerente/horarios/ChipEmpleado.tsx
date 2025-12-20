"use client";

import { RolEmpleado } from "@/mock";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ChipEmpleadoProps {
  nombre: string;
  rol: RolEmpleado;
  horaEntrada?: string;
  horaSalida?: string;
  tieneAlerta?: boolean;
  showRemove?: boolean;
  onRemove?: () => void;
  size?: "sm" | "md";
}

/**
 * Chip que muestra el nombre de un empleado asignado a un turno
 * 
 * Colores según rol:
 * - Verde: Cocinero
 * - Naranja: Camarero
 * 
 * Si se incluyen horas de fichaje, se muestra el rango horario
 * Si tieneAlerta es true, el texto de las horas aparece en rojo
 */
export function ChipEmpleado({
  nombre,
  rol,
  horaEntrada,
  horaSalida,
  tieneAlerta = false,
  showRemove = false,
  onRemove,
  size = "md",
}: ChipEmpleadoProps) {
  const isCocinero = rol === RolEmpleado.COCINERO;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium transition-colors",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        isCocinero
          ? "bg-orange-100 text-orange-800 border border-orange-200"
          : "bg-green-100 text-green-800 border border-green-200"
      )}
    >
      {showRemove && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={cn(
            "hover:bg-black/10 rounded-full p-0.5",
            isCocinero ? "hover:text-orange-900" : "hover:text-green-900"
          )}
        >
          <X className="h-3 w-3" />
        </button>
      )}
      <span>{nombre}</span>
      {horaEntrada && horaSalida && (
        <span
          className={cn(
            "ml-1 text-xs opacity-75",
            tieneAlerta && "text-red-600 font-semibold opacity-100"
          )}
        >
          {horaEntrada}-{horaSalida}
        </span>
      )}
    </div>
  );
}
