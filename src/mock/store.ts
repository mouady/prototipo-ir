/**
 * Store en memoria para datos de runtime
 * 
 * Este store maneja los datos que se agregan durante la sesión.
 * Al reiniciar la aplicación, estos datos se pierden y solo
 * quedan los datos semilla (seed).
 * 
 * Patrón: Combina datos seed (inmutables) + datos runtime (volátiles)
 * Basado en el modelo conceptual (mc-ir.iuml)
 */

import {
  Producto,
  Plato,
  CategoriaInventario,
  Proveedor,
  NuevoProducto,
  TipoProducto,
} from "./types";
import {
  SEED_CATEGORIAS,
  SEED_PRODUCTOS,
  SEED_PLATOS,
  SEED_PROVEEDORES,
  SEED_MENU_PROVEEDORES,
} from "./seed";

// ============================================
// ESTADO EN MEMORIA (Runtime)
// Los datos aquí se pierden al reiniciar
// ============================================
let runtimeProductos: Producto[] = [];
let runtimeProveedores: Proveedor[] = [];
let nextProductoId = 1;
let nextProveedorId = 1;

// ============================================
// LISTENERS (para reactividad)
// ============================================
type Listener = () => void;
const listeners: Set<Listener> = new Set();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// ============================================
// GETTERS - Combinan seed + runtime
// ============================================

/** Obtiene todos los productos del inventario */
export function getProductos(): Producto[] {
  return [...SEED_PRODUCTOS, ...runtimeProductos];
}

/** Obtiene productos filtrados por tipo (INGREDIENTE, BEBIDA, RECURSO) */
export function getProductosByTipo(tipo: TipoProducto): Producto[] {
  return getProductos().filter((p) => p.tipoProducto === tipo);
}

/** Obtiene solo los ingredientes (alias para compatibilidad) */
export function getIngredientes(): Producto[] {
  return getProductosByTipo(TipoProducto.INGREDIENTE);
}

export function getProductoById(id: string): Producto | undefined {
  return getProductos().find((p) => p.id === id);
}

export function getProveedores(): Proveedor[] {
  return [...SEED_PROVEEDORES, ...runtimeProveedores];
}

export function getCategorias(): CategoriaInventario[] {
  return SEED_CATEGORIAS;
}

/** Obtiene los platos (ProductoVendible) */
export function getPlatos(): Plato[] {
  return SEED_PLATOS;
}

export function getMenuProveedores() {
  return SEED_MENU_PROVEEDORES;
}

// ============================================
// MUTATIONS - Solo afectan datos runtime
// ============================================

export function agregarProducto(nuevo: NuevoProducto): Producto {
  const producto: Producto = {
    ...nuevo,
    id: `runtime-${nextProductoId++}`,
  };
  runtimeProductos.push(producto);
  notifyListeners();
  return producto;
}

export function actualizarProducto(
  id: string,
  cambios: Partial<Omit<Producto, "id">>
): Producto | null {
  // Buscar en runtime primero
  const runtimeIndex = runtimeProductos.findIndex((p) => p.id === id);
  if (runtimeIndex !== -1) {
    runtimeProductos[runtimeIndex] = {
      ...runtimeProductos[runtimeIndex],
      ...cambios,
    };
    notifyListeners();
    return runtimeProductos[runtimeIndex];
  }

  // Si es un producto seed, crear una copia en runtime con los cambios
  const seedProducto = SEED_PRODUCTOS.find((p) => p.id === id);
  if (seedProducto) {
    console.warn(
      "Modificando un producto seed. Los cambios se perderán al reiniciar."
    );
    const modificado: Producto = { ...seedProducto, ...cambios };
    runtimeProductos.push(modificado);
    notifyListeners();
    return modificado;
  }

  return null;
}

export function eliminarProducto(id: string): boolean {
  // Solo se pueden eliminar productos runtime
  if (id.startsWith("runtime-")) {
    const index = runtimeProductos.findIndex((p) => p.id === id);
    if (index !== -1) {
      runtimeProductos.splice(index, 1);
      notifyListeners();
      return true;
    }
  } else {
    console.warn("No se pueden eliminar productos base (seed).");
  }
  return false;
}

export function agregarProveedor(
  datos: Omit<Proveedor, "id">
): Proveedor {
  const proveedor: Proveedor = {
    ...datos,
    id: `runtime-prov-${nextProveedorId++}`,
  };
  runtimeProveedores.push(proveedor);
  notifyListeners();
  return proveedor;
}

// ============================================
// RESET - Limpia solo datos runtime
// ============================================

export function resetRuntime(): void {
  runtimeProductos = [];
  runtimeProveedores = [];
  nextProductoId = 1;
  nextProveedorId = 1;
  notifyListeners();
}

// ============================================
// DEBUG - Útil para desarrollo
// ============================================

export function getDebugInfo() {
  return {
    seedProductos: SEED_PRODUCTOS.length,
    runtimeProductos: runtimeProductos.length,
    totalProductos: getProductos().length,
    seedProveedores: SEED_PROVEEDORES.length,
    runtimeProveedores: runtimeProveedores.length,
    totalProveedores: getProveedores().length,
  };
}
