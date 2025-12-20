/**
 * Tipos para el módulo de avisos de reposición
 * Basado en el modelo conceptual (mc-ir.iuml)
 */

import type { Cocinero } from "../shared/types";

// Re-export Cocinero para uso en avisos
export type { Cocinero };

// ============================================
// INTERFACES: AVISOS DE REPOSICIÓN
// ============================================

/**
 * Línea de un aviso de reposición
 * Según el modelo: corresponde a un Producto
 */
export interface LineaAvisoReposicion {
  id: string;
  productoId: string;
  productoNombre: string; // Desnormalizado para facilitar UI
}

/**
 * Aviso de reposición generado por un cocinero
 * Según el modelo: fechaSolicitud, atendido, comentario
 */
export interface AvisoReposicion {
  id: string;
  fechaSolicitud: Date;
  atendido: boolean;
  comentario?: string;
  cocineroId: string;
  cocineroNombre: string; // Desnormalizado para facilitar UI
  lineas: LineaAvisoReposicion[];
}

// Tipo para crear un aviso (sin id, se genera automáticamente)
export type NuevoAvisoReposicion = Omit<AvisoReposicion, "id" | "lineas"> & {
  lineas: Omit<LineaAvisoReposicion, "id">[];
};
