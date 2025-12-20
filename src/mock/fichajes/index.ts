/**
 * Re-exports del módulo de fichajes
 */

// Types
export type {
  Fichaje,
  NuevoFichaje,
  CerrarFichaje,
  JornadaActual,
  RegistroHistorial,
} from "./types";

export { EstadoJornada } from "./types";

// Seed
export { SEED_FICHAJES } from "./seed";

// Store
export {
  getFichajes,
  getFichajesByEmpleado,
  getFichajeActivo,
  getJornadaActual,
  getHistorialFichajes,
  iniciarJornada,
  detenerJornada,
  formatearDuracionLarga,
  resetFichajesRuntime,
  getFichajesDebugInfo,
} from "./store";

// Hooks
export {
  useJornadaActual,
  useHistorialFichajes,
  useFichajes,
} from "./hooks";
