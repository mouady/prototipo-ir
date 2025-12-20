/**
 * Store del módulo de comandas
 * Maneja el estado en memoria de comandas
 * 
 * IMPORTANTE: Este store está sincronizado con el store de mesas.
 * Las comandas creadas desde el camarero aparecen aquí y
 * los cambios del cocinero se reflejan en las mesas.
 */

import type { Comanda } from "./types";
import { Estado } from "./types";
import { SEED_COMANDAS } from "./seed";
import { notifyListeners } from "../shared/store-base";

// ============================================
// SINCRONIZACIÓN CON MESAS
// ============================================
// Importación dinámica para evitar dependencia circular
let mesasStore: typeof import("../mesas/store") | null = null;
let pendingMesasSync = false;

async function getMesasStore() {
  if (!mesasStore) {
    mesasStore = await import("../mesas/store");
  }
  return mesasStore;
}

// Sincroniza el estado de una comanda con las comandas de mesa
async function syncComandaToMesas(comandaId: string, estado: Estado) {
  const store = await getMesasStore();
  store.sincronizarEstadoDesdeGerente(comandaId, estado);
}

// Sincroniza el estado de una línea específica con las comandas de mesa
async function syncLineaToMesas(comandaId: string, lineaId: string, estado: Estado) {
  const store = await getMesasStore();
  store.sincronizarLineaDesdeGerente(comandaId, lineaId, estado);
}

// ============================================
// ESTADO EN MEMORIA (Runtime)
// ============================================
const modificacionesComandas: Map<string, Comanda> = new Map();
const comandasFinalizadas: Set<string> = new Set();
let runtimeComandas: Comanda[] = [];
let nextComandaId = 100;

// ============================================
// GETTERS
// ============================================

/** Obtiene todas las comandas (seed + runtime) */
function getTodasLasComandas(): Comanda[] {
  const seedComandas = SEED_COMANDAS.map((c) =>
    modificacionesComandas.has(c.id) ? modificacionesComandas.get(c.id)! : c
  );
  return [...seedComandas, ...runtimeComandas];
}

/** Obtiene todas las comandas pendientes (en preparación) */
export function getComandasPendientes(): Comanda[] {
  return getTodasLasComandas().filter((c) => !comandasFinalizadas.has(c.id));
}

/** Obtiene las comandas finalizadas (hechas) */
export function getComandasHechas(): Comanda[] {
  return getTodasLasComandas().filter((c) => comandasFinalizadas.has(c.id));
}

/** Obtiene una comanda por ID */
export function getComandaById(id: string): Comanda | undefined {
  // Buscar en modificaciones
  if (modificacionesComandas.has(id)) {
    return modificacionesComandas.get(id);
  }
  // Buscar en seed
  const seedComanda = SEED_COMANDAS.find((c) => c.id === id);
  if (seedComanda) return seedComanda;
  // Buscar en runtime
  return runtimeComandas.find((c) => c.id === id);
}

// ============================================
// MUTATIONS
// ============================================

/** Marca una comanda como lista (hecha) - cambia estado de todas las líneas a REALIZADO */
export function marcarComandaComoLista(id: string): Comanda | null {
  const comanda = getComandaById(id);
  if (!comanda) return null;

  const comandaActualizada: Comanda = {
    ...comanda,
    lineas: comanda.lineas.map((linea) => ({
      ...linea,
      estado: Estado.REALIZADO,
    })),
  };

  // Guardar cambios
  const esRuntime = runtimeComandas.some((c) => c.id === id);
  if (esRuntime) {
    const idx = runtimeComandas.findIndex((c) => c.id === id);
    runtimeComandas[idx] = comandaActualizada;
  } else {
    modificacionesComandas.set(id, comandaActualizada);
  }
  comandasFinalizadas.add(id);
  
  // Sincronizar con mesas
  syncComandaToMesas(id, Estado.REALIZADO);
  
  notifyListeners();
  return comandaActualizada;
}

/** Restaura una comanda (de hechas a pendientes) */
export function restaurarComanda(id: string): Comanda | null {
  const comanda = getComandaById(id);
  if (!comanda) return null;

  const comandaRestaurada: Comanda = {
    ...comanda,
    lineas: comanda.lineas.map((linea) => ({
      ...linea,
      estado: Estado.EN_PREPARACION,
    })),
  };

  // Guardar cambios
  const esRuntime = runtimeComandas.some((c) => c.id === id);
  if (esRuntime) {
    const idx = runtimeComandas.findIndex((c) => c.id === id);
    runtimeComandas[idx] = comandaRestaurada;
  } else {
    modificacionesComandas.set(id, comandaRestaurada);
  }
  comandasFinalizadas.delete(id);
  
  // Sincronizar con mesas
  syncComandaToMesas(id, Estado.EN_PREPARACION);
  
  notifyListeners();
  return comandaRestaurada;
}

/** Agrega una comanda creada desde el camarero */
export function agregarComandaDesdeCarmarero(comanda: Comanda): void {
  runtimeComandas.push(comanda);
  notifyListeners();
}

/** 
 * Marca una línea individual como lista (REALIZADO) 
 * Si todas las líneas están listas, la comanda pasa a finalizada
 */
export function marcarLineaComoLista(comandaId: string, lineaId: string): Comanda | null {
  const comanda = getComandaById(comandaId);
  if (!comanda) return null;

  const comandaActualizada: Comanda = {
    ...comanda,
    lineas: comanda.lineas.map((linea) =>
      linea.id === lineaId ? { ...linea, estado: Estado.REALIZADO } : linea
    ),
  };

  // Guardar cambios
  const esRuntime = runtimeComandas.some((c) => c.id === comandaId);
  if (esRuntime) {
    const idx = runtimeComandas.findIndex((c) => c.id === comandaId);
    runtimeComandas[idx] = comandaActualizada;
  } else {
    modificacionesComandas.set(comandaId, comandaActualizada);
  }

  // Verificar si todas las líneas están listas
  const todasListas = comandaActualizada.lineas.every(
    (l) => l.estado === Estado.REALIZADO
  );
  if (todasListas) {
    comandasFinalizadas.add(comandaId);
  }

  // Sincronizar línea con mesas
  syncLineaToMesas(comandaId, lineaId, Estado.REALIZADO);

  notifyListeners();
  return comandaActualizada;
}

/**
 * Desmarca una línea (vuelve a EN_PREPARACION)
 * Si la comanda estaba finalizada, vuelve a pendiente
 */
export function desmarcarLinea(comandaId: string, lineaId: string): Comanda | null {
  const comanda = getComandaById(comandaId);
  if (!comanda) return null;

  const comandaActualizada: Comanda = {
    ...comanda,
    lineas: comanda.lineas.map((linea) =>
      linea.id === lineaId ? { ...linea, estado: Estado.EN_PREPARACION } : linea
    ),
  };

  // Guardar cambios
  const esRuntime = runtimeComandas.some((c) => c.id === comandaId);
  if (esRuntime) {
    const idx = runtimeComandas.findIndex((c) => c.id === comandaId);
    runtimeComandas[idx] = comandaActualizada;
  } else {
    modificacionesComandas.set(comandaId, comandaActualizada);
  }

  // Si había sido finalizada, volver a pendiente
  comandasFinalizadas.delete(comandaId);

  // Sincronizar línea con mesas
  syncLineaToMesas(comandaId, lineaId, Estado.EN_PREPARACION);

  notifyListeners();
  return comandaActualizada;
}

// ============================================
// RESET
// ============================================

export function resetComandasRuntime(): void {
  modificacionesComandas.clear();
  comandasFinalizadas.clear();
  runtimeComandas = [];
  notifyListeners();
}

// ============================================
// DEBUG
// ============================================

export function getComandasDebugInfo() {
  return {
    comandasPendientes: getComandasPendientes().length,
    comandasHechas: getComandasHechas().length,
  };
}
