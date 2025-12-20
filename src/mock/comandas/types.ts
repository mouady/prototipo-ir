/**
 * Tipos para el módulo de comandas
 * Basado en el modelo conceptual (mc-ir.iuml)
 */

import { Estado } from "../shared/types";

// Re-export Estado para uso en comandas
export { Estado };

// ============================================
// ENUMERACIONES DE COMANDAS
// ============================================

export enum FormatoPlato {
  ESTANDAR = "Estándar",
  TAPA = "Tapa",
  MEDIA = "1/2",
  RACION = "Entera",
}

// ============================================
// INTERFACES: COMANDAS
// ============================================

/**
 * Línea de comanda según el modelo
 * Según el modelo: estado, cantidad, corresponde a ProductoVendible
 */
export interface LineaComanda {
  id: string;
  productoVendibleId: string;
  productoNombre: string; // Desnormalizado para facilitar UI
  cantidad: number;
  estado: Estado;
  formato?: FormatoPlato; // Solo para platos
}

/**
 * Comanda según el modelo
 * Contiene líneas de comanda y está asociada a una mesa
 */
export interface Comanda {
  id: string;
  numComanda: number;
  mesaId: string;
  numMesa: number; // Desnormalizado para UI
  lineas: LineaComanda[];
  fechaCreacion: Date;
}
