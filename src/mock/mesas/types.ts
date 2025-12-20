/**
 * Tipos para el módulo de mesas, cuentas y reservas
 * Basado en el modelo conceptual (mc-ir.iuml)
 */

import { Estado } from "../shared/types";

// Re-export Estado para uso en mesas
export { Estado };

// ============================================
// ENUMERACIONES DE MESAS
// ============================================

/**
 * Zona según el modelo conceptual
 * Indica la ubicación física de las mesas
 */
export enum Zona {
  INTERIOR = "INTERIOR",
  TERRAZA = "TERRAZA",
}

/**
 * Estado de una mesa para el UI
 */
export enum EstadoMesa {
  LIBRE = "LIBRE",
  OCUPADA = "OCUPADA",
  ATENCIÓN_REQUERIDA = "ATENCION_REQUERIDA",
}

// ============================================
// INTERFACES: MESA
// ============================================

/**
 * Mesa según el modelo conceptual
 * numMesa, capacidad, zona
 */
export interface Mesa {
  id: string;
  numMesa: number;
  capacidad: number;
  zona: Zona;
}

// ============================================
// INTERFACES: CUENTA
// ============================================

/**
 * Cuenta según el modelo conceptual
 * fecha, cobrada, cerrada
 * Contiene comandas y opcionalmente una propina
 */
export interface Cuenta {
  id: string;
  mesaId: string;
  numMesa: number; // Desnormalizado para UI
  fecha: Date;
  cobrada: boolean;
  cerrada: boolean;
  comandaIds: string[]; // IDs de las comandas asociadas
  propinaId?: string; // ID de la propina asociada
  camareroId?: string; // Camarero responsable
  camareroNombre?: string; // Desnormalizado para UI
}

/**
 * Propina según el modelo conceptual
 * abono (importe)
 */
export interface Propina {
  id: string;
  cuentaId: string;
  abono: number;
}

// ============================================
// INTERFACES: RESERVA
// ============================================

/**
 * Reserva según el modelo conceptual
 * fechaHora, anfitrion
 * RN-12: Una Mesa no puede tener más de una Reserva activa al mismo tiempo
 * RN-14: fechaHora no puede estar en el pasado
 */
export interface Reserva {
  id: string;
  mesaId: string;
  numMesa: number; // Desnormalizado para UI
  fechaHora: Date;
  anfitrion: string;
  numPersonas: number;
  terminada: boolean;
}

// ============================================
// INTERFACES: LINEA DE COMANDA EXTENDIDA
// ============================================

/**
 * Línea de comanda con precio para vistas de cuenta
 */
export interface LineaComandaConPrecio {
  id: string;
  productoNombre: string;
  cantidad: number;
  precioUnitario: number;
  precioTotal: number;
  estado: Estado;
  esPlato: boolean; // true si es plato, false si es bebida
}

/**
 * Comanda extendida con información de precios
 */
export interface ComandaConPrecios {
  id: string;
  numComanda: number;
  horaCreacion: string; // HH:MM
  estado: "EN_COCINA" | "REALIZADA" | "ENTREGADA";
  lineas: LineaComandaConPrecio[];
  total: number;
}

/**
 * Resumen de cuenta para cerrar
 */
export interface ResumenCuenta {
  subtotal: number;
  propina: number;
  total: number;
  comandas: ComandaConPrecios[];
}

// ============================================
// TIPOS: DATOS DE MESA EXTENDIDOS
// ============================================

/**
 * Mesa con estado activo para la lista de mesas
 */
export interface MesaConEstado extends Mesa {
  estado: EstadoMesa;
  cuentaActiva?: Cuenta;
  camareroResponsable?: string;
  tieneNuevosPlatosListos: boolean;
  platosListosCount: number;
}

// ============================================
// TIPOS AUXILIARES
// ============================================

export type NuevaReserva = Omit<Reserva, "id">;
export type NuevaCuenta = Omit<Cuenta, "id" | "fecha" | "cobrada" | "cerrada" | "comandaIds">;
export type NuevaPropina = Omit<Propina, "id">;
