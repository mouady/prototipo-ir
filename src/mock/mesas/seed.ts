/**
 * Datos semilla para el módulo de mesas, cuentas y reservas
 */

import type { Mesa, Cuenta, Propina, Reserva } from "./types";
import { Zona } from "./types";

// ============================================
// MESAS
// ============================================

export const SEED_MESAS: Mesa[] = [
  { id: "mesa-1", numMesa: 1, capacidad: 4, zona: Zona.INTERIOR },
  { id: "mesa-2", numMesa: 2, capacidad: 2, zona: Zona.INTERIOR },
  { id: "mesa-3", numMesa: 3, capacidad: 6, zona: Zona.INTERIOR },
  { id: "mesa-4", numMesa: 4, capacidad: 4, zona: Zona.INTERIOR },
  { id: "mesa-5", numMesa: 5, capacidad: 8, zona: Zona.INTERIOR },
  { id: "mesa-6", numMesa: 6, capacidad: 4, zona: Zona.TERRAZA },
  { id: "mesa-7", numMesa: 7, capacidad: 2, zona: Zona.TERRAZA },
  { id: "mesa-8", numMesa: 8, capacidad: 6, zona: Zona.TERRAZA },
  { id: "mesa-9", numMesa: 9, capacidad: 4, zona: Zona.TERRAZA },
  { id: "mesa-10", numMesa: 10, capacidad: 4, zona: Zona.TERRAZA },
  { id: "mesa-11", numMesa: 11, capacidad: 2, zona: Zona.INTERIOR },
  { id: "mesa-12", numMesa: 12, capacidad: 8, zona: Zona.INTERIOR },
];

// ============================================
// CUENTAS ACTIVAS (para demostración)
// ============================================

export const SEED_CUENTAS: Cuenta[] = [
  {
    id: "cuenta-1",
    mesaId: "mesa-1",
    numMesa: 1,
    fecha: new Date("2025-12-20T12:30:00"),
    cobrada: false,
    cerrada: false,
    comandaIds: ["comanda-mesa1-1", "comanda-mesa1-2"],
    camareroId: "emp-2",
    camareroNombre: "María",
  },
  {
    id: "cuenta-3",
    mesaId: "mesa-3",
    numMesa: 3,
    fecha: new Date("2025-12-20T13:00:00"),
    cobrada: false,
    cerrada: false,
    comandaIds: ["comanda-mesa3-1"],
    camareroId: "emp-5",
    camareroNombre: "Pedro",
  },
  {
    id: "cuenta-5",
    mesaId: "mesa-5",
    numMesa: 5,
    fecha: new Date("2025-12-20T13:15:00"),
    cobrada: false,
    cerrada: false,
    comandaIds: ["comanda-mesa5-1"],
    camareroId: "emp-2",
    camareroNombre: "María",
  },
  {
    id: "cuenta-7",
    mesaId: "mesa-7",
    numMesa: 7,
    fecha: new Date("2025-12-20T12:00:00"),
    cobrada: false,
    cerrada: false,
    comandaIds: ["comanda-mesa7-1", "comanda-mesa7-2"],
    camareroId: "emp-5",
    camareroNombre: "Pedro",
  },
];

// ============================================
// PROPINAS
// ============================================

export const SEED_PROPINAS: Propina[] = [];

// ============================================
// RESERVAS
// ============================================

export const SEED_RESERVAS: Reserva[] = [
  {
    id: "reserva-1",
    mesaId: "mesa-2",
    numMesa: 2,
    fechaHora: new Date(`${new Date().toISOString().split('T')[0]}T14:00:00`),
    anfitrion: "García Pérez",
    numPersonas: 2,
    terminada: false,
  },
  {
    id: "reserva-2",
    mesaId: "mesa-4",
    numMesa: 4,
    fechaHora: new Date(`${new Date().toISOString().split('T')[0]}T14:30:00`),
    anfitrion: "López Martín",
    numPersonas: 4,
    terminada: false,
  },
  {
    id: "reserva-3",
    mesaId: "mesa-6",
    numMesa: 6,
    fechaHora: new Date(`${new Date().toISOString().split('T')[0]}T21:00:00`),
    anfitrion: "Fernández Ruiz",
    numPersonas: 3,
    terminada: false,
  },
  {
    id: "reserva-4",
    mesaId: "mesa-8",
    numMesa: 8,
    fechaHora: new Date(`${new Date().toISOString().split('T')[0]}T13:00:00`),
    anfitrion: "Sánchez Torres",
    numPersonas: 5,
    terminada: true,
  },
  {
    id: "reserva-5",
    mesaId: "mesa-10",
    numMesa: 10,
    fechaHora: new Date(`${new Date().toISOString().split('T')[0]}T21:30:00`),
    anfitrion: "Rodríguez Vila",
    numPersonas: 4,
    terminada: false,
  },
];

// ============================================
// PRODUCTOS VENDIBLES CON PRECIOS (para comandas)
// Simplificación de los platos/bebidas con precios directos
// ============================================

export interface ProductoVendibleSimple {
  id: string;
  nombre: string;
  precio: number;
  esPlato: boolean;
  categoria: string;
}

export const PRODUCTOS_VENDIBLES: ProductoVendibleSimple[] = [
  // Bebidas
  { id: "pv-1", nombre: "Cocacola 50 cl", precio: 2.5, esPlato: false, categoria: "REFRESCOS" },
  { id: "pv-2", nombre: "Botellín Cruzcampo", precio: 1.4, esPlato: false, categoria: "CERVEZAS" },
  { id: "pv-3", nombre: "Tercio Cruzcampo", precio: 2.0, esPlato: false, categoria: "CERVEZAS" },
  { id: "pv-4", nombre: "Fanta Naranja", precio: 2.5, esPlato: false, categoria: "REFRESCOS" },
  { id: "pv-5", nombre: "Agua 1L", precio: 1.5, esPlato: false, categoria: "AGUA" },
  { id: "pv-6", nombre: "Café solo", precio: 1.2, esPlato: false, categoria: "INFUSIONES_Y_CAFE" },
  { id: "pv-7", nombre: "Café con leche", precio: 1.5, esPlato: false, categoria: "INFUSIONES_Y_CAFE" },
  { id: "pv-8", nombre: "Vino tinto copa", precio: 2.0, esPlato: false, categoria: "VINOS" },
  // Platos
  { id: "pv-10", nombre: "Papas Bravas", precio: 4.5, esPlato: true, categoria: "CALENTITO" },
  { id: "pv-11", nombre: "Chocos Fritos Plato", precio: 9.0, esPlato: true, categoria: "PESCADO_FRITO" },
  { id: "pv-12", nombre: "Ensalada Mixta", precio: 6.5, esPlato: true, categoria: "ENSALADAS" },
  { id: "pv-13", nombre: "Secreto al Whisky", precio: 12.0, esPlato: true, categoria: "CALENTITO" },
  { id: "pv-14", nombre: "Albóndigas", precio: 7.5, esPlato: true, categoria: "CALENTITO" },
  { id: "pv-15", nombre: "Tapa Lagrimitas de pollo", precio: 5.0, esPlato: true, categoria: "CALENTITO" },
  { id: "pv-16", nombre: "Tapa Carrillera", precio: 6.0, esPlato: true, categoria: "CALENTITO" },
  { id: "pv-17", nombre: "San Jacobo", precio: 8.0, esPlato: true, categoria: "EN_FRIO" },
  { id: "pv-18", nombre: "Gambas al ajillo", precio: 10.0, esPlato: true, categoria: "CALENTITO" },
  { id: "pv-19", nombre: "Tortilla española", precio: 5.5, esPlato: true, categoria: "CALENTITO" },
  { id: "pv-20", nombre: "Jamón ibérico", precio: 15.0, esPlato: true, categoria: "EN_FRIO" },
];

// ============================================
// COMANDAS POR MESA (estructura para el camarero)
// ============================================

// Re-export FormatoPlato como tipo de string para compatibilidad con datos existentes
export type FormatoPlato = "ESTANDAR" | "TAPA" | "MEDIA" | "RACION";

// Estado de línea de comanda - usa los valores del enum Estado
export type EstadoLineaMesa = "EN_PREPARACION" | "REALIZADO" | "SERVIDO";

/**
 * Estado de la comanda completa (calculado/derivado)
 * EN_COCINA: Hay líneas en preparación
 * REALIZADA: Todas las líneas están listas (REALIZADO) pero no servidas
 * ENTREGADA: Todas las líneas han sido servidas
 */
export type EstadoComanda = "EN_COCINA" | "REALIZADA" | "ENTREGADA";

export interface LineaComandaMesa {
  id: string;
  productoId: string;
  productoNombre: string;
  cantidad: number;
  precioUnitario: number;
  estado: EstadoLineaMesa; // Valores compatibles con enum Estado
  esPlato: boolean;
  formato?: FormatoPlato; // Solo aplica a platos
}

export interface ComandaMesa {
  id: string;
  numComanda: number;
  mesaId: string;
  horaCreacion: string;
  estado: EstadoComanda; // Estado derivado de las líneas
  lineas: LineaComandaMesa[];
}

export const SEED_COMANDAS_MESA: ComandaMesa[] = [
  // Mesa 1 - 2 comandas
  {
    id: "comanda-mesa1-1",
    numComanda: 1,
    mesaId: "mesa-1",
    horaCreacion: "9:23",
    estado: "ENTREGADA",
    lineas: [
      { id: "lm-1-1", productoId: "pv-1", productoNombre: "Cocacola 50 cl", cantidad: 1, precioUnitario: 2.5, estado: "SERVIDO", esPlato: false },
      { id: "lm-1-2", productoId: "pv-2", productoNombre: "Botellín Cruzcampo", cantidad: 2, precioUnitario: 1.4, estado: "SERVIDO", esPlato: false },
    ],
  },
  {
    id: "comanda-mesa1-2",
    numComanda: 2,
    mesaId: "mesa-1",
    horaCreacion: "9:31",
    estado: "EN_COCINA", // Una línea está lista (REALIZADO), otra en preparación
    lineas: [
      { id: "lm-1-3", productoId: "pv-10", productoNombre: "Papas Bravas", cantidad: 2, precioUnitario: 4.5, estado: "REALIZADO", esPlato: true, formato: "TAPA" },
      { id: "lm-1-4", productoId: "pv-11", productoNombre: "Chocos Fritos Plato", cantidad: 1, precioUnitario: 9.0, estado: "EN_PREPARACION", esPlato: true, formato: "RACION" },
    ],
  },
  // Mesa 3 - 1 comanda
  {
    id: "comanda-mesa3-1",
    numComanda: 1,
    mesaId: "mesa-3",
    horaCreacion: "13:05",
    estado: "EN_COCINA",
    lineas: [
      { id: "lm-3-1", productoId: "pv-13", productoNombre: "Secreto al Whisky", cantidad: 2, precioUnitario: 12.0, estado: "EN_PREPARACION", esPlato: true, formato: "RACION" },
      { id: "lm-3-2", productoId: "pv-3", productoNombre: "Tercio Cruzcampo", cantidad: 2, precioUnitario: 2.0, estado: "SERVIDO", esPlato: false },
    ],
  },
  // Mesa 5 - 1 comanda
  {
    id: "comanda-mesa5-1",
    numComanda: 1,
    mesaId: "mesa-5",
    horaCreacion: "13:20",
    estado: "EN_COCINA",
    lineas: [
      { id: "lm-5-1", productoId: "pv-14", productoNombre: "Albóndigas", cantidad: 3, precioUnitario: 7.5, estado: "EN_PREPARACION", esPlato: true, formato: "MEDIA" },
      { id: "lm-5-2", productoId: "pv-12", productoNombre: "Ensalada Mixta", cantidad: 1, precioUnitario: 6.5, estado: "EN_PREPARACION", esPlato: true, formato: "RACION" },
    ],
  },
  // Mesa 7 - 2 comandas  
  {
    id: "comanda-mesa7-1",
    numComanda: 1,
    mesaId: "mesa-7",
    horaCreacion: "12:05",
    estado: "ENTREGADA",
    lineas: [
      { id: "lm-7-1", productoId: "pv-5", productoNombre: "Agua 1L", cantidad: 1, precioUnitario: 1.5, estado: "SERVIDO", esPlato: false },
    ],
  },
  {
    id: "comanda-mesa7-2",
    numComanda: 2,
    mesaId: "mesa-7",
    horaCreacion: "12:15",
    estado: "REALIZADA",
    lineas: [
      { id: "lm-7-2", productoId: "pv-18", productoNombre: "Gambas al ajillo", cantidad: 1, precioUnitario: 10.0, estado: "REALIZADO", esPlato: true, formato: "TAPA" },
      { id: "lm-7-3", productoId: "pv-19", productoNombre: "Tortilla española", cantidad: 1, precioUnitario: 5.5, estado: "REALIZADO", esPlato: true, formato: "MEDIA" },
    ],
  },
];
