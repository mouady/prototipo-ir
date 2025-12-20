/**
 * Store en memoria para datos de runtime
 * 
 * Este store maneja los datos que se agregan durante la sesión.
 * Al reiniciar la aplicación, estos datos se pierden y solo
 * quedan los datos semilla (seed).
 * 
 * Patrón: Combina datos seed (inmutables) + datos runtime (volátiles)
 */

import {
  Producto,
  CategoriaProducto,
  Ingrediente,
  Proveedor,
  NuevoIngrediente,
} from "./types";
import {
  SEED_CATEGORIAS,
  SEED_PRODUCTOS,
  SEED_INGREDIENTES,
  SEED_PROVEEDORES,
  SEED_MENU_PROVEEDORES,
} from "./seed";

// ============================================
// ESTADO EN MEMORIA (Runtime)
// Los datos aquí se pierden al reiniciar
// ============================================
let runtimeIngredientes: Ingrediente[] = [];
let runtimeProveedores: Proveedor[] = [];
let nextIngredienteId = 1;
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

export function getIngredientes(): Ingrediente[] {
  return [...SEED_INGREDIENTES, ...runtimeIngredientes];
}

export function getIngredienteById(id: string): Ingrediente | undefined {
  return getIngredientes().find((i) => i.id === id);
}

export function getProveedores(): Proveedor[] {
  return [...SEED_PROVEEDORES, ...runtimeProveedores];
}

export function getCategorias(): CategoriaProducto[] {
  return SEED_CATEGORIAS;
}

export function getProductos(): Producto[] {
  return SEED_PRODUCTOS;
}

export function getProductosByCategoria(categoria: string): Producto[] {
  return SEED_PRODUCTOS.filter((p) => p.categoria === categoria);
}

export function getMenuProveedores() {
  return SEED_MENU_PROVEEDORES;
}

// ============================================
// MUTATIONS - Solo afectan datos runtime
// ============================================

export function agregarIngrediente(nuevo: NuevoIngrediente): Ingrediente {
  const ingrediente: Ingrediente = {
    ...nuevo,
    id: `runtime-${nextIngredienteId++}`,
  };
  runtimeIngredientes.push(ingrediente);
  notifyListeners();
  return ingrediente;
}

export function actualizarIngrediente(
  id: string,
  cambios: Partial<Omit<Ingrediente, "id">>
): Ingrediente | null {
  // Buscar en runtime primero
  const runtimeIndex = runtimeIngredientes.findIndex((i) => i.id === id);
  if (runtimeIndex !== -1) {
    runtimeIngredientes[runtimeIndex] = {
      ...runtimeIngredientes[runtimeIndex],
      ...cambios,
    };
    notifyListeners();
    return runtimeIngredientes[runtimeIndex];
  }

  // Si es un ingrediente seed, crear una copia en runtime con los cambios
  const seedIngrediente = SEED_INGREDIENTES.find((i) => i.id === id);
  if (seedIngrediente) {
    // Para datos seed, creamos una versión modificada en runtime
    // (opcional: podrías manejar esto diferente según tu lógica de negocio)
    console.warn(
      "Modificando un ingrediente seed. Los cambios se perderán al reiniciar."
    );
    const modificado: Ingrediente = { ...seedIngrediente, ...cambios };
    // Guardamos la versión modificada
    runtimeIngredientes.push(modificado);
    notifyListeners();
    return modificado;
  }

  return null;
}

export function eliminarIngrediente(id: string): boolean {
  // Solo se pueden eliminar ingredientes runtime
  if (id.startsWith("runtime-")) {
    const index = runtimeIngredientes.findIndex((i) => i.id === id);
    if (index !== -1) {
      runtimeIngredientes.splice(index, 1);
      notifyListeners();
      return true;
    }
  } else {
    console.warn("No se pueden eliminar ingredientes base (seed).");
  }
  return false;
}

export function agregarProveedor(nombre: string): Proveedor {
  const proveedor: Proveedor = {
    id: `runtime-prov-${nextProveedorId++}`,
    nombre,
  };
  runtimeProveedores.push(proveedor);
  notifyListeners();
  return proveedor;
}

// ============================================
// RESET - Limpia solo datos runtime
// ============================================

export function resetRuntime(): void {
  runtimeIngredientes = [];
  runtimeProveedores = [];
  nextIngredienteId = 1;
  nextProveedorId = 1;
  notifyListeners();
}

// ============================================
// DEBUG - Útil para desarrollo
// ============================================

export function getDebugInfo() {
  return {
    seedIngredientes: SEED_INGREDIENTES.length,
    runtimeIngredientes: runtimeIngredientes.length,
    totalIngredientes: getIngredientes().length,
    seedProveedores: SEED_PROVEEDORES.length,
    runtimeProveedores: runtimeProveedores.length,
    totalProveedores: getProveedores().length,
  };
}
