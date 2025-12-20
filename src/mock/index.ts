/**
 * Punto de entrada principal para el módulo de mocks
 * 
 * Estructura modular:
 * - shared/      → Tipos base, enums y utilidades compartidas
 * - inventario/  → Productos, platos, proveedores
 * - avisos/      → Avisos de reposición
 * - comandas/    → Gestión de comandas
 * - empleados/   → Gestión de empleados
 * - horarios/    → Horarios generales y especiales
 * - fichajes/    → Fichajes de empleados
 * - mesas/       → Mesas, cuentas y reservas
 * 
 * Basado en el modelo conceptual (mc-ir.iuml)
 */

// ============================================
// RE-EXPORTS: SHARED
// ============================================
export type { User, Cocinero } from "./shared";
export {
  DiaSemana,
  TipoContrato,
  Genero,
  RolEmpleado,
  Estado,
  subscribe,
} from "./shared";

// ============================================
// RE-EXPORTS: INVENTARIO
// ============================================
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
} from "./inventario";

export {
  TipoProducto,
  UnidadMedida,
  CategoriaCarta,
  SEED_CATEGORIAS,
  SEED_PRODUCTOS,
  SEED_PLATOS,
  SEED_PROVEEDORES,
  SEED_MENU_PROVEEDORES,
  getProductos,
  getProductosByTipo,
  getIngredientes,
  getProductoById,
  getProveedores,
  getCategorias,
  getPlatos,
  getMenuProveedores,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
  agregarProveedor,
  useProductos,
  useProductosByTipo,
  useIngredientes,
  useBebidas,
  useRecursos,
  useProveedores,
} from "./inventario";

// ============================================
// RE-EXPORTS: AVISOS
// ============================================
export type {
  AvisoReposicion,
  LineaAvisoReposicion,
  NuevoAvisoReposicion,
} from "./avisos";

export {
  SEED_COCINEROS,
  SEED_AVISOS_REPOSICION,
  getAvisosReposicion,
  getAvisosPendientes,
  getAvisosAtendidos,
  getAvisoById,
  getCocineros,
  agregarAvisoReposicion,
  marcarAvisoAtendido,
  eliminarAvisoReposicion,
  useAvisosReposicion,
  useAvisosPendientes,
  useAvisosAtendidos,
  useCocineros,
} from "./avisos";

// ============================================
// RE-EXPORTS: COMANDAS
// ============================================
export type {
  Comanda,
  LineaComanda,
} from "./comandas";

export {
  FormatoPlato,
  SEED_COMANDAS,
  getComandasPendientes,
  getComandasHechas,
  getComandaById,
  marcarComandaComoLista,
  restaurarComanda,
  useComandasPendientes,
  useComandasHechas,
} from "./comandas";

// ============================================
// RE-EXPORTS: EMPLEADOS
// ============================================
export type {
  Empleado,
  NuevoEmpleado,
  ActualizarEmpleado,
} from "./empleados";

export {
  SEED_EMPLEADOS,
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
  useEmpleados,
} from "./empleados";

// ============================================
// RE-EXPORTS: HORARIOS
// ============================================
export type {
  Horario,
  HorarioEspecial,
  Turno,
  AsignacionTurno,
  Fichaje,
  NuevoHorario,
  NuevoHorarioEspecial,
  NuevoTurno,
} from "./horarios";

export {
  SEED_HORARIOS,
  SEED_HORARIOS_ESPECIALES,
  generarTurnosSemana,
  getHorarios,
  getHorarioByDia,
  getHorariosEspeciales,
  getHorarioEspecialByFecha,
  getTurnosSemana,
  actualizarHorario,
  guardarHorarioEspecial,
  eliminarHorarioEspecial,
  useHorarios,
  useHorariosEspeciales,
  useTurnosSemana,
} from "./horarios";

// ============================================
// RE-EXPORTS: FICHAJES
// ============================================
export type {
  Fichaje as FichajeType,
  NuevoFichaje,
  CerrarFichaje,
  JornadaActual,
  RegistroHistorial,
} from "./fichajes";

export {
  EstadoJornada,
  SEED_FICHAJES,
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
  useJornadaActual,
  useHistorialFichajes,
  useFichajes,
} from "./fichajes";

// ============================================
// RE-EXPORTS: MESAS (Mesas, Cuentas, Reservas)
// ============================================
export type {
  Mesa,
  Cuenta,
  Propina,
  Reserva,
  MesaConEstado,
  LineaComandaConPrecio,
  ComandaConPrecios,
  ResumenCuenta,
  NuevaReserva,
  NuevaCuenta,
  NuevaPropina,
  ProductoVendibleSimple,
  LineaComandaMesa,
  ComandaMesa,
  TotalesCuenta,
} from "./mesas";

export {
  Zona,
  EstadoMesa,
  SEED_MESAS,
  SEED_CUENTAS,
  SEED_PROPINAS,
  SEED_RESERVAS,
  SEED_COMANDAS_MESA,
  PRODUCTOS_VENDIBLES,
  getMesas,
  getMesaById,
  getMesasByZona,
  getMesasConEstado,
  getCuentas,
  getCuentaActivaByMesa,
  getCuentaById,
  getComandasMesa,
  getComandasByMesa,
  getComandaMesaById,
  getPropinaByIdCuenta,
  getReservas,
  getReservasByFecha,
  getReservasActivasByFecha,
  getReservaById,
  getProductosVendibles,
  buscarProductosVendibles,
  crearCuenta,
  cerrarCuenta,
  agregarPropina,
  crearComandaMesa,
  marcarLineaServida,
  crearReserva,
  terminarReserva,
  eliminarReserva,
  calcularTotalesCuenta,
  resetMesasRuntime,
  getMesasDebugInfo,
  useMesas,
  useDetalleMesa,
  useCrearComanda,
  useReservas,
} from "./mesas";

// ============================================
// FUNCIONES GLOBALES
// ============================================
import { resetInventarioRuntime, getInventarioDebugInfo } from "./inventario";
import { resetAvisosRuntime, getAvisosDebugInfo } from "./avisos";
import { resetComandasRuntime, getComandasDebugInfo } from "./comandas";
import { resetEmpleadosRuntime, getEmpleadosDebugInfo } from "./empleados";
import { resetHorariosRuntime, getHorariosDebugInfo } from "./horarios";
import { resetFichajesRuntime, getFichajesDebugInfo } from "./fichajes";
import { resetMesasRuntime, getMesasDebugInfo } from "./mesas";
import { notifyListeners } from "./shared";

/**
 * Resetea todos los datos runtime de todos los módulos
 */
export function resetRuntime(): void {
  resetInventarioRuntime();
  resetAvisosRuntime();
  resetComandasRuntime();
  resetEmpleadosRuntime();
  resetHorariosRuntime();
  resetFichajesRuntime();
  resetMesasRuntime();
  notifyListeners();
}

/**
 * Obtiene información de debug de todos los módulos
 */
export function getDebugInfo() {
  return {
    ...getInventarioDebugInfo(),
    ...getAvisosDebugInfo(),
    ...getComandasDebugInfo(),
    ...getEmpleadosDebugInfo(),
    ...getHorariosDebugInfo(),
    ...getFichajesDebugInfo(),
    ...getMesasDebugInfo(),
  };
}
