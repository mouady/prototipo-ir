/**
 * Punto de entrada principal para el módulo de mocks
 * 
 * Estructura:
 * - types.ts     → Definiciones de tipos
 * - seed.ts      → Datos iniciales (inmutables, persisten al reiniciar)
 * - store.ts     → Store en memoria (datos runtime, se pierden al reiniciar)
 * - index.ts     → Re-exports para facilitar imports
 * 
 * Uso:
 * import { getIngredientes, agregarIngrediente } from "@/mock";
 */

// Re-export tipos
export type {
  Producto,
  CategoriaProducto,
  Ingrediente,
  Proveedor,
  MenuProveedor,
  NuevoIngrediente,
} from "./types";

// Re-export datos seed (solo lectura)
export {
  SEED_CATEGORIAS,
  SEED_PRODUCTOS,
  SEED_INGREDIENTES,
  SEED_PROVEEDORES,
  SEED_MENU_PROVEEDORES,
} from "./seed";

// Re-export funciones del store
export {
  // Getters
  getIngredientes,
  getIngredienteById,
  getProveedores,
  getCategorias,
  getProductos,
  getProductosByCategoria,
  getMenuProveedores,
  // Mutations
  agregarIngrediente,
  actualizarIngrediente,
  eliminarIngrediente,
  agregarProveedor,
  // Utils
  subscribe,
  resetRuntime,
  getDebugInfo,
} from "./store";

// ============================================
// EXPORTS LEGACY (para compatibilidad)
// Mantiene compatibilidad con el código existente
// TODO: Migrar gradualmente al nuevo sistema
// ============================================
import { SEED_CATEGORIAS, SEED_PRODUCTOS, SEED_MENU_PROVEEDORES } from "./seed";
import { getIngredientes } from "./store";

// Aliases para mantener compatibilidad con imports existentes
export const categoriasProductos = SEED_CATEGORIAS;
export const productos = SEED_PRODUCTOS;
export const menuProveedores = SEED_MENU_PROVEEDORES;

// Este getter se actualiza dinámicamente
// Nota: Para reactividad completa, usa el hook useIngredientes
export { getIngredientes as ingredientesGetter };
