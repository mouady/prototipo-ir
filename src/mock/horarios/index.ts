/**
 * Re-exports del módulo de horarios
 */

// Types
export type {
  Horario,
  HorarioEspecial,
  Turno,
  AsignacionTurno,
  Fichaje,
  NuevoHorario,
  NuevoHorarioEspecial,
  NuevoTurno,
} from "./types";

export {
  DiaSemana,
  RolEmpleado,
} from "./types";

// Seed
export {
  SEED_HORARIOS,
  SEED_HORARIOS_ESPECIALES,
  generarTurnosSemana,
} from "./seed";

// Store
export {
  getHorarios,
  getHorarioByDia,
  getHorariosEspeciales,
  getHorarioEspecialByFecha,
  getTurnosSemana,
  actualizarHorario,
  guardarHorarioEspecial,
  eliminarHorarioEspecial,
  resetHorariosRuntime,
  getHorariosDebugInfo,
} from "./store";

// Hooks
export {
  useHorarios,
  useHorariosEspeciales,
  useTurnosSemana,
} from "./hooks";
