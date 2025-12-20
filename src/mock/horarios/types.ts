/**
 * Tipos para el módulo de horarios
 * Basado en el modelo conceptual (mc-ir.iuml)
 */

import { DiaSemana, RolEmpleado } from "../shared/types";

// Re-export enums para uso en horarios
export { DiaSemana, RolEmpleado };

// ============================================
// INTERFACES: HORARIOS
// ============================================

/**
 * Horario general del restaurante según el modelo conceptual
 * Define los horarios regulares de apertura para cada día de la semana
 */
export interface Horario {
  id: string;
  diaSemana: DiaSemana;
  horaApertura: string; // Formato "HH:MM"
  horaCierre: string; // Formato "HH:MM"
}

/**
 * Asignación de empleado a un turno
 */
export interface AsignacionTurno {
  empleadoId: string;
  empleadoNombre: string; // Desnormalizado para UI
  rol: RolEmpleado;
  horaEntrada?: string; // Hora real de fichaje (opcional)
  horaSalida?: string; // Hora real de fichaje (opcional)
}

/**
 * Turno dentro de un día (puede haber varios turnos por día)
 */
export interface Turno {
  id: string;
  horaInicio: string; // Formato "HH:MM"
  horaFin: string; // Formato "HH:MM"
  asignaciones: AsignacionTurno[];
}

/**
 * HorarioEspecial según el modelo conceptual
 * Representa horarios excepcionales para fechas específicas
 * Sobrescribe el horario general para esa fecha
 */
export interface HorarioEspecial {
  id: string;
  fecha: string; // Formato "YYYY-MM-DD"
  horaApertura: string; // Formato "HH:MM"
  horaCierre: string; // Formato "HH:MM"
  turnos: Turno[];
}

/**
 * Fichaje de empleado según el modelo conceptual
 */
export interface Fichaje {
  id: string;
  empleadoId: string;
  fecha: string; // Formato "YYYY-MM-DD"
  entrada: string; // Formato "HH:MM"
  salida?: string; // Formato "HH:MM" (opcional, puede no haber fichado salida)
}

// Tipos auxiliares para horarios
export type NuevoHorario = Omit<Horario, "id">;
export type NuevoHorarioEspecial = Omit<HorarioEspecial, "id">;
export type NuevoTurno = Omit<Turno, "id">;
