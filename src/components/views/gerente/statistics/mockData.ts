/**
 * Datos mock para estadísticas del restaurante
 */

import type {
  EstadisticasPlatos,
  EstadisticasTicket,
  CamareroEstadistica,
  EstadisticasProveedores,
  EstadisticasReservas,
} from "./types";

// Estadísticas de Platos - Agosto 2025
export const estadisticasPlatos: EstadisticasPlatos = {
  topPlatos: [
    { nombre: "Papas bravas", cantidad: 234 },
    { nombre: "Croquetas caseras", cantidad: 208 },
    { nombre: "Tortillita de camarones", cantidad: 197 },
    { nombre: "Gambas al ajillo", cantidad: 169 },
    { nombre: "Ensaladilla de pulpo", cantidad: 155 },
  ],
  totalTop5: 963,
  diaConMasVentas: 9,
  mediaPlotosDiaria: 28.4,
};

// Estadísticas de Ticket Medio - 2024
export const estadisticasTicket: EstadisticasTicket = {
  ticketsPorMes: [
    { mes: "Ene", valor: 21.66 },
    { mes: "Feb", valor: 20.5 },
    { mes: "Mar", valor: 24.78 },
    { mes: "Abr", valor: 22.65 },
    { mes: "May", valor: 27.32 },
    { mes: "Jun", valor: 32.8 },
    { mes: "Jul", valor: 44.9 },
    { mes: "Ago", valor: 45.45 },
    { mes: "Sep", valor: 38.32 },
    { mes: "Oct", valor: 31.12 },
    { mes: "Nov", valor: 28.67 },
    { mes: "Dic", valor: 19.78 },
  ],
  mediaAnual: 29.83,
  mejorMes: "Agosto",
};

// Estadísticas de Camareros - Agosto 2025
export const estadisticasCamareros: Record<string, CamareroEstadistica[]> = {
  horasTrabajadas: [
    { nombre: "Alba Martín", valor: 124 },
    { nombre: "Juan Ferrol", valor: 118 },
    { nombre: "Pedro López", valor: 107 },
    { nombre: "Rocío Vélez", valor: 102 },
    { nombre: "Ana Carrasco", valor: 101 },
  ],
  mesasAtendidas: [
    { nombre: "Juan Ferrol", valor: 89 },
    { nombre: "Alba Martín", valor: 85 },
    { nombre: "Ana Carrasco", valor: 78 },
    { nombre: "Pedro López", valor: 72 },
    { nombre: "Rocío Vélez", valor: 68 },
  ],
  diasTrabajados: [
    { nombre: "Alba Martín", valor: 26 },
    { nombre: "Juan Ferrol", valor: 24 },
    { nombre: "Pedro López", valor: 23 },
    { nombre: "Ana Carrasco", valor: 22 },
    { nombre: "Rocío Vélez", valor: 21 },
  ],
  propinas: [
    { nombre: "Juan Ferrol", valor: 245 },
    { nombre: "Alba Martín", valor: 198 },
    { nombre: "Rocío Vélez", valor: 187 },
    { nombre: "Ana Carrasco", valor: 156 },
    { nombre: "Pedro López", valor: 134 },
  ],
  importeVendido: [
    { nombre: "Alba Martín", valor: 8934 },
    { nombre: "Juan Ferrol", valor: 8567 },
    { nombre: "Ana Carrasco", valor: 7823 },
    { nombre: "Rocío Vélez", valor: 7456 },
    { nombre: "Pedro López", valor: 6987 },
  ],
};

// Estadísticas de Proveedores - Agosto 2025
export const estadisticasProveedores: EstadisticasProveedores = {
  topProveedores: [
    { nombre: "LasRefrescosas", importe: 1244.78 },
    { nombre: "Heineken España", importe: 1176.32 },
    { nombre: "CashSupremo", importe: 1049.66 },
    { nombre: "CashAlternativo", importe: 987.65 },
    { nombre: "Pimientos Juanito", importe: 910.22 },
  ],
  totalGastado: 6132.43,
};

// Estadísticas de Reservas - Agosto 2025
export const estadisticasReservas: EstadisticasReservas = {
  reservasPorDia: [
    { dia: 1, reservas: [4, 6, 5] },
    { dia: 2, reservas: [3, 2] },
    { dia: 5, reservas: [2, 4, 3] },
    { dia: 8, reservas: [3, 7, 6, 1] },
    { dia: 10, reservas: [2, 3] },
    { dia: 12, reservas: [1, 2] },
    { dia: 15, reservas: [4, 5, 3] },
    { dia: 17, reservas: [5, 4, 9] },
    { dia: 20, reservas: [3, 2, 4] },
    { dia: 22, reservas: [2, 1, 7, 8] },
    { dia: 25, reservas: [3, 4, 2] },
    { dia: 27, reservas: [2, 1] },
    { dia: 30, reservas: [9, 10, 8] },
  ],
  totalReservas: 106,
  diaConMasReservas: 31,
  mediaDiaria: 3.4,
};

// Nombres de meses para los selectores
export const meses = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

// Años disponibles para los selectores
export const anios = [2025, 2024, 2023, 2022, 2021];

// Opciones de ordenación para camareros
export const opcionesOrdenCamareros = [
  { value: "horasTrabajadas", label: "Horas trabajadas" },
  { value: "mesasAtendidas", label: "Mesas atendidas" },
  { value: "diasTrabajados", label: "Nº de días trabajados" },
  { value: "propinas", label: "Propinas" },
  { value: "importeVendido", label: "Importe vendido" },
];
