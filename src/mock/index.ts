/**
 * Punto de entrada principal para el módulo de mocks
 * 
 * Estructura:
 * - types.ts     → Definiciones de tipos y enums
 * - seed.ts      → Datos iniciales (inmutables, persisten al reiniciar)
 * - store.ts     → Store en memoria (datos runtime, se pierden al reiniciar)
 * - hooks.ts     → Hooks de React para reactividad
 * - index.ts     → Re-exports para facilitar imports
 * 
 * Basado en el modelo conceptual (mc-ir.iuml)
 */

// Re-export tipos y enums
export type {
  Producto,
  Plato,
  BebidaVendible,
  ProductoVendible,
  CategoriaInventario,
  Proveedor,
  Lote,
  MenuProveedor,
  NuevoProducto,
  // Avisos de reposición
  Cocinero,
  AvisoReposicion,
  LineaAvisoReposicion,
  NuevoAvisoReposicion,
  // Comandas
  Comanda,
  LineaComanda,
  // Empleados
  User,
  Empleado,
  NuevoEmpleado,
  ActualizarEmpleado,
  // Horarios
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
  TipoProducto,
  UnidadMedida,
  CategoriaCarta,
  Estado,
  FormatoPlato,
  // Empleados
  TipoContrato,
  Genero,
  RolEmpleado,
  // Horarios
  DiaSemana,
} from "./types";

// Re-export datos seed (solo lectura)
export {
  SEED_CATEGORIAS,
  SEED_PRODUCTOS,
  SEED_PLATOS,
  SEED_PROVEEDORES,
  SEED_MENU_PROVEEDORES,
  SEED_COCINEROS,
  SEED_AVISOS_REPOSICION,
  SEED_COMANDAS,
  SEED_EMPLEADOS,
  // Horarios
  SEED_HORARIOS,
  SEED_HORARIOS_ESPECIALES,
  generarTurnosSemana,
} from "./seed";

// Re-export funciones del store
export {
  // Getters
  getProductos,
  getProductosByTipo,
  getIngredientes,
  getProductoById,
  getProveedores,
  getCategorias,
  getPlatos,
  getMenuProveedores,
  // Getters - Avisos
  getAvisosReposicion,
  getAvisosPendientes,
  getAvisosAtendidos,
  getAvisoById,
  getCocineros,
  // Getters - Comandas
  getComandasPendientes,
  getComandasHechas,
  getComandaById,
  // Getters - Empleados
  getEmpleados,
  getEmpleadosByRol,
  getCamareros,
  getCocinerosEmpleados,
  getEmpleadoById,
  getEmpleadosActivos,
  getEmpleadosInactivos,
  // Getters - Horarios
  getHorarios,
  getHorarioByDia,
  getHorariosEspeciales,
  getHorarioEspecialByFecha,
  getTurnosSemana,
  // Mutations
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
  agregarProveedor,
  // Mutations - Avisos
  agregarAvisoReposicion,
  marcarAvisoAtendido,
  eliminarAvisoReposicion,
  // Mutations - Comandas
  marcarComandaComoLista,
  restaurarComanda,
  // Mutations - Empleados
  agregarEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
  toggleEmpleadoActivo,
  // Mutations - Horarios
  actualizarHorario,
  guardarHorarioEspecial,
  eliminarHorarioEspecial,
  // Utils
  subscribe,
  resetRuntime,
  getDebugInfo,
} from "./store";

// Re-export hooks
export { 
  useProductos, 
  useProductosByTipo, 
  useIngredientes, 
  useBebidas, 
  useRecursos, 
  useProveedores,
  // Hooks - Avisos
  useAvisosReposicion,
  useAvisosPendientes,
  useAvisosAtendidos,
  useCocineros,
  // Hooks - Comandas
  useComandasPendientes,
  useComandasHechas,
  // Hooks - Empleados
  useEmpleados,
  // Hooks - Horarios
  useHorarios,
  useHorariosEspeciales,
  useTurnosSemana,
} from "./hooks";
