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
  FormatoP,
  NuevoFormato,
  NuevoLote,
  ActualizarLote,
} from "./types";

export {
  TipoProducto,
  UnidadMedida,
  CategoriaCarta,
  FormatoPlato,
} from "./types";

// Seed
export {
  SEED_CATEGORIAS,
  SEED_PRODUCTOS,
  SEED_PLATOS,
  SEED_PROVEEDORES,
  SEED_MENU_PROVEEDORES,
  SEED_LOTES,
} from "./seed";

// Store
export {
  getProductos,
  getProductosByTipo,
  getIngredientes,
  getProductoById,
  getProveedores,
  getProveedorById,
  getCategorias,
  getPlatos,
  getPlatoById,
  getMenuProveedores,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
  agregarProveedor,
  actualizarProveedor,
  eliminarProveedor,
  agregarPlato,
  actualizarPlato,
  eliminarPlato,
  agregarFormatoPlato,
  actualizarFormatoPlato,
  eliminarFormatoPlato,
  getFormatoById,
  getLotes,
  getLotesByProductoId,
  getLoteById,
  getLotesValidosByProductoId,
  agregarLote,
  actualizarLote,
  eliminarLote,
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
  useLotes,
  useLotesByProducto,
  useLotesValidos,
} from "./hooks";
