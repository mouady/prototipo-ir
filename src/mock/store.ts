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
  AvisoReposicion,
  NuevoAvisoReposicion,
  Cocinero,
  Comanda,
  Estado,
} from "./types";
import {
  SEED_CATEGORIAS,
  SEED_PRODUCTOS,
  SEED_PLATOS,
  SEED_PROVEEDORES,
  SEED_MENU_PROVEEDORES,
  SEED_AVISOS_REPOSICION,
  SEED_COCINEROS,
  SEED_COMANDAS,
} from "./seed";

// ============================================
// ESTADO EN MEMORIA (Runtime)
// Los datos aquí se pierden al reiniciar
// ============================================
let runtimeProductos: Producto[] = [];
let runtimeProveedores: Proveedor[] = [];
let runtimeAvisos: AvisoReposicion[] = [];
let modificacionesProductos: Map<string, Producto> = new Map(); // Para rastrear cambios a seed
let modificacionesAvisos: Map<string, AvisoReposicion> = new Map(); // Para rastrear cambios a seed avisos
let modificacionesComandas: Map<string, Comanda> = new Map(); // Para rastrear cambios a seed comandas
let productosEliminados: Set<string> = new Set(); // Para rastrear seed eliminados
let avisosEliminados: Set<string> = new Set(); // Para rastrear avisos seed eliminados
let comandasFinalizadas: Set<string> = new Set(); // Para rastrear comandas marcadas como listas
let nextProductoId = 1;
let nextProveedorId = 1;
let nextAvisoId = 1;
let nextLineaAvisoId = 1;

// ============================================
// LISTENERS (para reactividad)
// ============================================
type Listener = () => void;
const listeners: Set<Listener> = new Set();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function normalizeProductoDatos<T extends Partial<Omit<Producto, "id">>>(
  datos: T
): T {
  // RN-03: Solo se pueden especificar litros si el TipoProducto es BEBIDA.
  if (datos.tipoProducto && datos.tipoProducto !== TipoProducto.BEBIDA) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { litros, ...rest } = datos as any;
    return rest;
  }

  // RN-19: litros >= 0
  if (typeof (datos as any).litros === "number") {
    const litros = (datos as any).litros;
    if (Number.isNaN(litros) || litros < 0) {
      return { ...(datos as any), litros: 0 };
    }
  }

  return datos;
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

export function getMenuProveedores() {
  return SEED_MENU_PROVEEDORES;
}

// ============================================
// GETTERS - Avisos de Reposición
// ============================================

/** Obtiene todos los avisos de reposición */
export function getAvisosReposicion(): AvisoReposicion[] {
  const seedAvisos = SEED_AVISOS_REPOSICION.filter((a) => !avisosEliminados.has(a.id))
    .map((a) =>
      modificacionesAvisos.has(a.id)
        ? modificacionesAvisos.get(a.id)!
        : a
    );
  return [...seedAvisos, ...runtimeAvisos];
}

/** Obtiene avisos pendientes (no atendidos) */
export function getAvisosPendientes(): AvisoReposicion[] {
  return getAvisosReposicion().filter((a) => !a.atendido);
}

/** Obtiene avisos atendidos */
export function getAvisosAtendidos(): AvisoReposicion[] {
  return getAvisosReposicion().filter((a) => a.atendido);
}

/** Obtiene un aviso por ID */
export function getAvisoById(id: string): AvisoReposicion | undefined {
  return getAvisosReposicion().find((a) => a.id === id);
}

/** Obtiene los cocineros */
export function getCocineros(): Cocinero[] {
  return SEED_COCINEROS;
}

// ============================================
// GETTERS - Comandas
// ============================================

/** Obtiene todas las comandas pendientes (en preparación) */
export function getComandasPendientes(): Comanda[] {
  return SEED_COMANDAS
    .filter((c) => !comandasFinalizadas.has(c.id))
    .map((c) =>
      modificacionesComandas.has(c.id)
        ? modificacionesComandas.get(c.id)!
        : c
    );
}

/** Obtiene las comandas finalizadas (hechas) */
export function getComandasHechas(): Comanda[] {
  return SEED_COMANDAS
    .filter((c) => comandasFinalizadas.has(c.id))
    .map((c) =>
      modificacionesComandas.has(c.id)
        ? modificacionesComandas.get(c.id)!
        : c
    );
}

/** Obtiene una comanda por ID */
export function getComandaById(id: string): Comanda | undefined {
  const comanda = SEED_COMANDAS.find((c) => c.id === id);
  if (!comanda) return undefined;
  return modificacionesComandas.get(id) || comanda;
}

// ============================================
// MUTATIONS - Solo afectan datos runtime
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
        ? (({ litros, ...rest }) => rest)(actualizadoBase)
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
// MUTATIONS - Avisos de Reposición
// ============================================

/** Crea un nuevo aviso de reposición */
export function agregarAvisoReposicion(nuevo: NuevoAvisoReposicion): AvisoReposicion {
  const aviso: AvisoReposicion = {
    ...nuevo,
    id: `runtime-aviso-${nextAvisoId++}`,
    lineas: nuevo.lineas.map((linea) => ({
      ...linea,
      id: `runtime-linea-${nextLineaAvisoId++}`,
    })),
  };
  runtimeAvisos.push(aviso);
  notifyListeners();
  return aviso;
}

/** Marca un aviso como atendido */
export function marcarAvisoAtendido(id: string): AvisoReposicion | null {
  // Buscar en runtime primero
  const runtimeIndex = runtimeAvisos.findIndex((a) => a.id === id);
  if (runtimeIndex !== -1) {
    runtimeAvisos[runtimeIndex] = {
      ...runtimeAvisos[runtimeIndex],
      atendido: true,
    };
    notifyListeners();
    return runtimeAvisos[runtimeIndex];
  }

  // Si es un aviso seed, guardar los cambios en el mapa
  const seedAviso = SEED_AVISOS_REPOSICION.find((a) => a.id === id);
  if (seedAviso) {
    const modificado = modificacionesAvisos.get(id) || seedAviso;
    const actualizado: AvisoReposicion = { ...modificado, atendido: true };
    modificacionesAvisos.set(id, actualizado);
    notifyListeners();
    return actualizado;
  }

  return null;
}

/** Elimina un aviso de reposición */
export function eliminarAvisoReposicion(id: string): boolean {
  // Se pueden eliminar avisos runtime
  if (id.startsWith("runtime-aviso-")) {
    const index = runtimeAvisos.findIndex((a) => a.id === id);
    if (index !== -1) {
      runtimeAvisos.splice(index, 1);
      notifyListeners();
      return true;
    }
  }
  // También se pueden eliminar seed marcándolos como eliminados
  else if (SEED_AVISOS_REPOSICION.find((a) => a.id === id)) {
    avisosEliminados.add(id);
    notifyListeners();
    return true;
  }

  return false;
}

// ============================================
// MUTATIONS - Comandas
// ============================================

/** Marca una comanda como lista (hecha) - cambia estado de todas las líneas a REALIZADO */
export function marcarComandaComoLista(id: string): Comanda | null {
  const comanda = SEED_COMANDAS.find((c) => c.id === id);
  if (!comanda) return null;

  const comandaActual = modificacionesComandas.get(id) || comanda;
  const comandaActualizada: Comanda = {
    ...comandaActual,
    lineas: comandaActual.lineas.map((linea) => ({
      ...linea,
      estado: Estado.REALIZADO,
    })),
  };

  modificacionesComandas.set(id, comandaActualizada);
  comandasFinalizadas.add(id);
  notifyListeners();
  return comandaActualizada;
}

/** Restaura una comanda (de hechas a pendientes) */
export function restaurarComanda(id: string): Comanda | null {
  const comanda = SEED_COMANDAS.find((c) => c.id === id);
  if (!comanda) return null;

  const comandaActual = modificacionesComandas.get(id) || comanda;
  const comandaRestaurada: Comanda = {
    ...comandaActual,
    lineas: comandaActual.lineas.map((linea) => ({
      ...linea,
      estado: Estado.EN_PREPARACION,
    })),
  };

  modificacionesComandas.set(id, comandaRestaurada);
  comandasFinalizadas.delete(id);
  notifyListeners();
  return comandaRestaurada;
}

// ============================================
// RESET - Limpia solo datos runtime
// ============================================

export function resetRuntime(): void {
  runtimeProductos = [];
  runtimeProveedores = [];
  runtimeAvisos = [];
  modificacionesProductos.clear();
  modificacionesAvisos.clear();
  modificacionesComandas.clear();
  productosEliminados.clear();
  avisosEliminados.clear();
  comandasFinalizadas.clear();
  nextProductoId = 1;
  nextProveedorId = 1;
  nextAvisoId = 1;
  nextLineaAvisoId = 1;
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
    seedAvisos: SEED_AVISOS_REPOSICION.length,
    runtimeAvisos: runtimeAvisos.length,
    totalAvisos: getAvisosReposicion().length,
    avisosPendientes: getAvisosPendientes().length,
    comandasPendientes: getComandasPendientes().length,
    comandasHechas: getComandasHechas().length,
  };
}
