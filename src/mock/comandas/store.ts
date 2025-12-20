/**
 * Store del módulo de comandas
 * Maneja el estado en memoria de comandas
 */

import type { Comanda } from "./types";
import { Estado } from "./types";
import { SEED_COMANDAS } from "./seed";
import { notifyListeners } from "../shared/store-base";

// ============================================
// ESTADO EN MEMORIA (Runtime)
// ============================================
const modificacionesComandas: Map<string, Comanda> = new Map();
const comandasFinalizadas: Set<string> = new Set();

// ============================================
// GETTERS
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
// MUTATIONS
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
// RESET
// ============================================

export function resetComandasRuntime(): void {
  modificacionesComandas.clear();
  comandasFinalizadas.clear();
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
