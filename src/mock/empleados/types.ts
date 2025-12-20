/**
 * Tipos para el módulo de empleados
 * Basado en el modelo conceptual (mc-ir.iuml)
 */

import { TipoContrato, Genero, RolEmpleado, User } from "../shared/types";

// Re-export enums para uso en empleados
export { TipoContrato, Genero, RolEmpleado };
export type { User };

// ============================================
// INTERFACES: EMPLEADOS
// ============================================

/**
 * Empleado según el modelo conceptual
 * Hereda de User y añade datos laborales específicos
 * 
 * RN-05: Un empleado debe tener al menos 16 años
 * RN-06: finContrato debe ser null si y solo si tipoContrato es INDEFINIDO
 * RN-07: El dni debe ser único en todo el sistema
 * RN-08: El dni sigue el formato válido (8 números y una letra)
 */
export interface Empleado extends User {
  tipoContrato: TipoContrato;
  finContrato?: string; // Fecha en formato ISO (solo si TEMPORAL)
  fechaNacimiento: string; // Fecha en formato ISO
  dni: string;
  activo: boolean;
  genero: Genero;
  rol: RolEmpleado;
}

// Tipo para crear un empleado (sin id, se genera automáticamente)
export type NuevoEmpleado = Omit<Empleado, "id">;

// Tipo para actualizar un empleado (todos los campos opcionales excepto id)
export type ActualizarEmpleado = Partial<Omit<Empleado, "id">>;
