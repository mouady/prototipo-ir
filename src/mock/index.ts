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
} from "./types";

export {
  TipoProducto,
  UnidadMedida,
  CategoriaCarta,
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
  // Mutations
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
  agregarProveedor,
  // Mutations - Avisos
  agregarAvisoReposicion,
  marcarAvisoAtendido,
  eliminarAvisoReposicion,
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
} from "./hooks";
