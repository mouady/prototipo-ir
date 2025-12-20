/**
 * Tipos para el módulo de estadísticas
 */

export type EstadisticaSeccion = 
  | "proveedores" 
  | "camareros" 
  | "reservas" 
  | "ticket" 
  | "platos";

export interface FiltroEstadisticas {
  mes: number;
  anio: number;
}

// Datos para gráfico de platos
export interface PlatoVendido {
  nombre: string;
  cantidad: number;
}

export interface EstadisticasPlatos {
  topPlatos: PlatoVendido[];
  totalTop5: number;
  diaConMasVentas: number;
  mediaPlotosDiaria: number;
}

// Datos para gráfico de ticket medio
export interface TicketMensual {
  mes: string;
  valor: number;
}

export interface EstadisticasTicket {
  ticketsPorMes: TicketMensual[];
  mediaAnual: number;
  mejorMes: string;
}

// Datos para camareros
export interface CamareroEstadistica {
  nombre: string;
  valor: number;
}

export type OrdenarCamareroPor = 
  | "horasTrabajadas" 
  | "mesasAtendidas" 
  | "diasTrabajados" 
  | "propinas" 
  | "importeVendido";

// Datos para proveedores
export interface ProveedorEstadistica {
  nombre: string;
  importe: number;
}

export interface EstadisticasProveedores {
  topProveedores: ProveedorEstadistica[];
  totalGastado: number;
}

// Datos para reservas
export interface ReservaDia {
  dia: number;
  reservas: number[];
}

export interface EstadisticasReservas {
  reservasPorDia: ReservaDia[];
  totalReservas: number;
  diaConMasReservas: number;
  mediaDiaria: number;
}
