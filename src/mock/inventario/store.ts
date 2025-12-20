/**
 * Store del módulo de inventario
 * Maneja el estado en memoria de productos, platos y proveedores
 */

import {
  Producto,
  Plato,
  CategoriaInventario,
  Proveedor,
  NuevoProducto,
  TipoProducto,
  MenuProveedor,
} from "./types";
import {
  SEED_CATEGORIAS,
  SEED_PRODUCTOS,
  SEED_PLATOS,
  SEED_PROVEEDORES,
  SEED_MENU_PROVEEDORES,
} from "./seed";
import { notifyListeners } from "../shared/store-base";

// ============================================
// ESTADO EN MEMORIA (Runtime)
// ============================================
let runtimeProductos: Producto[] = [];
let runtimeProveedores: Proveedor[] = [];
const modificacionesProductos: Map<string, Producto> = new Map();
const productosEliminados: Set<string> = new Set();
let nextProductoId = 1;
let nextProveedorId = 1;

// ============================================
// HELPERS
// ============================================

function normalizeProductoDatos<T extends Partial<Omit<Producto, "id">>>(
  datos: T
): T {
  // RN-03: Solo se pueden especificar litros si el TipoProducto es BEBIDA.
  if (datos.tipoProducto && datos.tipoProducto !== TipoProducto.BEBIDA) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { litros: _litros, ...rest } = datos as T & { litros?: number };
    return rest as T;
  }

  // RN-19: litros >= 0
  const datosConLitros = datos as T & { litros?: number };
  if (typeof datosConLitros.litros === "number") {
    const litros = datosConLitros.litros;
    if (Number.isNaN(litros) || litros < 0) {
      return { ...datos, litros: 0 };
    }
  }

  return datos;
}

// ============================================
// GETTERS
// ============================================

/** Obtiene todos los productos del inventario */
export function getProductos(): Producto[] {
  const seedProductos = SEED_PRODUCTOS.filter((p) => !productosEliminados.has(p.id))
    .map((p) => 
      modificacionesProductos.has(p.id) 
        ? modificacionesProductos.get(p.id)!
        : p
    );
  return [...seedProductos, ...runtimeProductos];
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

export function getMenuProveedores(): MenuProveedor[] {
  return SEED_MENU_PROVEEDORES;
}

// ============================================
// MUTATIONS
// ============================================

export function agregarProducto(nuevo: NuevoProducto): Producto {
  const normalizado = normalizeProductoDatos(nuevo);
  const producto: Producto = {
    ...normalizado,
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
  const cambiosNormalizados = normalizeProductoDatos(cambios);

  // Buscar en runtime primero
  const runtimeIndex = runtimeProductos.findIndex((p) => p.id === id);
  if (runtimeIndex !== -1) {
    runtimeProductos[runtimeIndex] = {
      ...runtimeProductos[runtimeIndex],
      ...cambiosNormalizados,
    };
    notifyListeners();
    return runtimeProductos[runtimeIndex];
  }

  // Si es un producto seed, guardar los cambios en el mapa
  const seedProducto = SEED_PRODUCTOS.find((p) => p.id === id);
  if (seedProducto) {
    const modificado = modificacionesProductos.get(id) || seedProducto;

    // Si el tipo cambia a no-bebida, necesitamos limpiar litros aunque no venga en cambios.
    const actualizadoBase: Producto = { ...modificado, ...cambiosNormalizados };
    const actualizado: Producto =
      actualizadoBase.tipoProducto !== TipoProducto.BEBIDA
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ? (({ litros: _litros, ...rest }) => rest)(actualizadoBase)
        : actualizadoBase;

    modificacionesProductos.set(id, actualizado);
    notifyListeners();
    return actualizado;
  }

  return null;
}

export function eliminarProducto(id: string): boolean {
  // Se pueden eliminar productos runtime
  if (id.startsWith("runtime-")) {
    const index = runtimeProductos.findIndex((p) => p.id === id);
    if (index !== -1) {
      runtimeProductos.splice(index, 1);
      notifyListeners();
      return true;
    }
  }
  // También se pueden eliminar seed marcándolos como eliminados
  else if (SEED_PRODUCTOS.find((p) => p.id === id)) {
    productosEliminados.add(id);
    notifyListeners();
    return true;
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
// RESET
// ============================================

export function resetInventarioRuntime(): void {
  runtimeProductos = [];
  runtimeProveedores = [];
  modificacionesProductos.clear();
  productosEliminados.clear();
  nextProductoId = 1;
  nextProveedorId = 1;
  notifyListeners();
}

// ============================================
// DEBUG
// ============================================

export function getInventarioDebugInfo() {
  return {
    seedProductos: SEED_PRODUCTOS.length,
    runtimeProductos: runtimeProductos.length,
    totalProductos: getProductos().length,
    seedProveedores: SEED_PROVEEDORES.length,
    runtimeProveedores: runtimeProveedores.length,
    totalProveedores: getProveedores().length,
  };
}
