/**
 * Re-exports del módulo de inventario
 */

// Types
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
} from "./types";

export {
  TipoProducto,
  UnidadMedida,
  CategoriaCarta,
} from "./types";

// Seed
export {
  SEED_CATEGORIAS,
  SEED_PRODUCTOS,
  SEED_PLATOS,
  SEED_PROVEEDORES,
  SEED_MENU_PROVEEDORES,
} from "./seed";

// Store
export {
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
  resetInventarioRuntime,
  getInventarioDebugInfo,
} from "./store";

// Hooks
export {
  useProductos,
  useProductosByTipo,
  useIngredientes,
  useBebidas,
  useRecursos,
  useProveedores,
} from "./hooks";
