/**
 * Re-exports del módulo de empleados
 */

// Types
export type {
  User,
  Empleado,
  NuevoEmpleado,
  ActualizarEmpleado,
} from "./types";

export {
  TipoContrato,
  Genero,
  RolEmpleado,
} from "./types";

// Seed
export {
  SEED_EMPLEADOS,
} from "./seed";

// Store
export {
  getEmpleados,
  getEmpleadosByRol,
  getCamareros,
  getCocinerosEmpleados,
  getEmpleadoById,
  getEmpleadosActivos,
  getEmpleadosInactivos,
  agregarEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
  toggleEmpleadoActivo,
  resetEmpleadosRuntime,
  getEmpleadosDebugInfo,
} from "./store";

// Hooks
export {
  useEmpleados,
} from "./hooks";
