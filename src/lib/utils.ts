import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { RolEmpleado, Genero } from "@/mock"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Genera el label del rol de un empleado considerando su género
 * 
 * @param rol - RolEmpleado.CAMARERO | RolEmpleado.COCINERO
 * @param genero - Genero.MASCULINO | Genero.FEMENINO | Genero.OTRO
 * @returns String con el label correcto (Camarero/Camarera, Cocinero/Cocinera, etc)
 */
export function getRolLabel(rol: RolEmpleado, genero: Genero): string {
  if (rol === RolEmpleado.CAMARERO) {
    return genero === Genero.FEMENINO ? "Camarera" : "Camarero"
  }
  // rol === RolEmpleado.COCINERO
  return genero === Genero.FEMENINO ? "Cocinera" : "Cocinero"
}
