/**
 * Tipos para el módulo de fichajes
 * Basado en el modelo conceptual (mc-ir.iuml)
 * 
 * Según el modelo: Empleado "1" -- "0..*" Fichaje : "tiene"
 * Fichaje tiene: entrada, salida
 */

// ============================================
// INTERFACES: FICHAJES
// ============================================

/**
 * Fichaje según el modelo conceptual
 * Registra la asistencia diaria de un empleado mediante la hora de entrada y salida
 */
export interface Fichaje {
  id: string;
  empleadoId: string;
  entrada: string; // Fecha/hora ISO
  salida?: string; // Fecha/hora ISO (undefined si jornada en curso)
}

/**
 * Tipo para crear un nuevo fichaje (solo necesita empleadoId, entrada se genera automáticamente)
 */
export type NuevoFichaje = Pick<Fichaje, "empleadoId">;

/**
 * Tipo para cerrar un fichaje (añadir hora de salida)
 */
export type CerrarFichaje = Pick<Fichaje, "id">;

/**
 * Estado de la jornada de un empleado
 */
export enum EstadoJornada {
  NO_INICIADA = "NO_INICIADA",
  EN_CURSO = "EN_CURSO",
  FINALIZADA = "FINALIZADA",
}

/**
 * Información resumida de la jornada actual
 */
export interface JornadaActual {
  estado: EstadoJornada;
  fichaje?: Fichaje;
  duracionMs?: number; // Duración en milisegundos (calculada en tiempo real)
}

/**
 * Registro de historial formateado para mostrar en UI
 */
export interface RegistroHistorial {
  id: string;
  fecha: string; // Formato YY/MM/DD
  horaInicio: string; // Formato HH:MM
  horaFin: string; // Formato HH:MM
  duracion: string; // Formato Xh XXm
  fichajeOriginal: Fichaje;
}
