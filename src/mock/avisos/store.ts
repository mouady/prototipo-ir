/**
 * Store del módulo de avisos de reposición
 * Maneja el estado en memoria de avisos
 */

import type { AvisoReposicion, NuevoAvisoReposicion } from "./types";
import type { Cocinero } from "../shared/types";
import { SEED_AVISOS_REPOSICION, SEED_COCINEROS } from "./seed";
import { notifyListeners } from "../shared/store-base";

// ============================================
// ESTADO EN MEMORIA (Runtime)
// ============================================
let runtimeAvisos: AvisoReposicion[] = [];
const modificacionesAvisos: Map<string, AvisoReposicion> = new Map();
const avisosEliminados: Set<string> = new Set();
let nextAvisoId = 1;
let nextLineaAvisoId = 1;

// ============================================
// GETTERS
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
// MUTATIONS
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
// RESET
// ============================================

export function resetAvisosRuntime(): void {
  runtimeAvisos = [];
  modificacionesAvisos.clear();
  avisosEliminados.clear();
  nextAvisoId = 1;
  nextLineaAvisoId = 1;
  notifyListeners();
}

// ============================================
// DEBUG
// ============================================

export function getAvisosDebugInfo() {
  return {
    seedAvisos: SEED_AVISOS_REPOSICION.length,
    runtimeAvisos: runtimeAvisos.length,
    totalAvisos: getAvisosReposicion().length,
    avisosPendientes: getAvisosPendientes().length,
  };
}
