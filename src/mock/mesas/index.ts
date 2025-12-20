/**
 * Módulo de mesas, cuentas y reservas
 * Punto de entrada principal
 */

// Types
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
} from "./types";

export {
  Zona,
  EstadoMesa,
} from "./types";

// Seed data types
export type {
  ProductoVendibleSimple,
  LineaComandaMesa,
  ComandaMesa,
} from "./seed";

// Seed data
export {
  SEED_MESAS,
  SEED_CUENTAS,
  SEED_PROPINAS,
  SEED_RESERVAS,
  SEED_COMANDAS_MESA,
  PRODUCTOS_VENDIBLES,
} from "./seed";

// Store
export {
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
} from "./store";

export type { TotalesCuenta } from "./store";

// Hooks
export {
  useMesas,
  useDetalleMesa,
  useCrearComanda,
  useReservas,
} from "./hooks";
