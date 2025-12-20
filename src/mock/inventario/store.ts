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
let runtimePlatos: Plato[] = [];
const modificacionesProductos: Map<string, Producto> = new Map();
const productosEliminados: Set<string> = new Set();
const modificacionesPlatos: Map<string, Plato> = new Map();
const platosEliminados: Set<string> = new Set();
let nextProductoId = 1;
let nextProveedorId = 1;
let nextPlatoId = 1;

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

export function getCategorias(): CategoriaInventario[] {
  return SEED_CATEGORIAS;
}

/** Obtiene los platos (ProductoVendible) */
export function getPlatos(): Plato[] {
  const seedPlatos = SEED_PLATOS.filter((p) => !platosEliminados.has(p.id))
    .map((p) =>
      modificacionesPlatos.has(p.id)
        ? modificacionesPlatos.get(p.id)!
        : p
    );
  return [...seedPlatos, ...runtimePlatos];
}

export function getPlatoById(id: string): Plato | undefined {
  return getPlatos().find((p) => p.id === id);
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

// Estado adicional para modificaciones y eliminaciones de proveedores
const modificacionesProveedores: Map<string, Proveedor> = new Map();
const proveedoresEliminados: Set<string> = new Set();

/** Actualiza la función getProveedores para considerar modificaciones y eliminaciones */
export function getProveedores(): Proveedor[] {
  const seedProveedores = SEED_PROVEEDORES.filter((p) => !proveedoresEliminados.has(p.id))
    .map((p) =>
      modificacionesProveedores.has(p.id)
        ? modificacionesProveedores.get(p.id)!
        : p
    );
  return [...seedProveedores, ...runtimeProveedores.filter((p) => !proveedoresEliminados.has(p.id))];
}

export function actualizarProveedor(
  id: string,
  cambios: Partial<Omit<Proveedor, "id">>
): Proveedor | null {
  // Buscar en runtime primero
  const runtimeIndex = runtimeProveedores.findIndex((p) => p.id === id);
  if (runtimeIndex !== -1) {
    runtimeProveedores[runtimeIndex] = {
      ...runtimeProveedores[runtimeIndex],
      ...cambios,
    };
    notifyListeners();
    return runtimeProveedores[runtimeIndex];
  }

  // Si es un proveedor seed, guardar los cambios en el mapa
  const seedProveedor = SEED_PROVEEDORES.find((p) => p.id === id);
  if (seedProveedor) {
    const modificado = modificacionesProveedores.get(id) || seedProveedor;
    const actualizado: Proveedor = { ...modificado, ...cambios };
    modificacionesProveedores.set(id, actualizado);
    notifyListeners();
    return actualizado;
  }

  return null;
}

export function eliminarProveedor(id: string): boolean {
  // Se pueden eliminar proveedores runtime
  if (id.startsWith("runtime-prov-")) {
    const index = runtimeProveedores.findIndex((p) => p.id === id);
    if (index !== -1) {
      runtimeProveedores.splice(index, 1);
      notifyListeners();
      return true;
    }
  }
  // También se pueden eliminar seed marcándolos como eliminados
  else if (SEED_PROVEEDORES.find((p) => p.id === id)) {
    proveedoresEliminados.add(id);
    notifyListeners();
    return true;
  }
  
  return false;
}

export function getProveedorById(id: string): Proveedor | undefined {
  return getProveedores().find((p) => p.id === id);
}

// ============================================
// MUTATIONS - PLATOS
// ============================================

export function agregarPlato(datos: Omit<Plato, "id">): Plato {
  const plato: Plato = {
    ...datos,
    id: `runtime-plato-${nextPlatoId++}`,
  };
  runtimePlatos.push(plato);
  notifyListeners();
  return plato;
}

export function actualizarPlato(
  id: string,
  cambios: Partial<Omit<Plato, "id">>
): Plato | null {
  // Buscar en runtime primero
  const runtimeIndex = runtimePlatos.findIndex((p) => p.id === id);
  if (runtimeIndex !== -1) {
    runtimePlatos[runtimeIndex] = {
      ...runtimePlatos[runtimeIndex],
      ...cambios,
    };
    notifyListeners();
    return runtimePlatos[runtimeIndex];
  }

  // Si es un plato seed, guardar los cambios en el mapa
  const seedPlato = SEED_PLATOS.find((p) => p.id === id);
  if (seedPlato) {
    const modificado = modificacionesPlatos.get(id) || seedPlato;
    const actualizado: Plato = { ...modificado, ...cambios };
    modificacionesPlatos.set(id, actualizado);
    notifyListeners();
    return actualizado;
  }

  return null;
}

export function eliminarPlato(id: string): boolean {
  // Se pueden eliminar platos runtime
  if (id.startsWith("runtime-plato-")) {
    const index = runtimePlatos.findIndex((p) => p.id === id);
    if (index !== -1) {
      runtimePlatos.splice(index, 1);
      notifyListeners();
      return true;
    }
  }
  // También se pueden eliminar seed marcándolos como eliminados
  else if (SEED_PLATOS.find((p) => p.id === id)) {
    platosEliminados.add(id);
    notifyListeners();
    return true;
  }
  
  return false;
}

// ============================================
// RESET
// ============================================

export function resetInventarioRuntime(): void {
  runtimeProductos = [];
  runtimeProveedores = [];
  runtimePlatos = [];
  modificacionesProductos.clear();
  productosEliminados.clear();
  modificacionesProveedores.clear();
  proveedoresEliminados.clear();
  modificacionesPlatos.clear();
  platosEliminados.clear();
  nextProductoId = 1;
  nextProveedorId = 1;
  nextPlatoId = 1;
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
