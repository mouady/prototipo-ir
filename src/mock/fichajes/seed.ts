/**
 * Datos semilla para el módulo de fichajes
 * Genera un historial de fichajes para los empleados
 * Fechas basadas en diciembre 2025
 */

import type { Fichaje } from "./types";

// ============================================
// HELPERS PARA GENERAR FECHAS
// ============================================

/**
 * Genera una fecha ISO para un día específico con hora
 * Basado en la fecha actual (20 de diciembre de 2025)
 */
function crearFechaISO(diasAtras: number, hora: number, minutos: number): string {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() - diasAtras);
  fecha.setHours(hora, minutos, 0, 0);
  return fecha.toISOString();
}

// ============================================
// FICHAJES SEED
// ============================================

/**
 * Datos semilla de fichajes
 * Historial de los últimos días para varios empleados
 * Actualizado a diciembre 2025
 */
export const SEED_FICHAJES: Fichaje[] = [
  // Fichajes de María (emp-2) - Camarera
  // 19 dic (ayer)
  {
    id: "fic-1",
    empleadoId: "emp-2",
    entrada: crearFechaISO(1, 9, 22),
    salida: crearFechaISO(1, 16, 5),
  },
  // 18 dic
  {
    id: "fic-2",
    empleadoId: "emp-2",
    entrada: crearFechaISO(2, 9, 30),
    salida: crearFechaISO(2, 16, 0),
  },
  // 17 dic
  {
    id: "fic-3",
    empleadoId: "emp-2",
    entrada: crearFechaISO(3, 9, 35),
    salida: crearFechaISO(3, 16, 14),
  },
  // 16 dic
  {
    id: "fic-4",
    empleadoId: "emp-2",
    entrada: crearFechaISO(4, 9, 15),
    salida: crearFechaISO(4, 15, 45),
  },
  // 13 dic
  {
    id: "fic-5",
    empleadoId: "emp-2",
    entrada: crearFechaISO(7, 9, 0),
    salida: crearFechaISO(7, 16, 30),
  },

  // Fichajes de Antonio (emp-1) - Cocinero
  // 19 dic (ayer)
  {
    id: "fic-6",
    empleadoId: "emp-1",
    entrada: crearFechaISO(1, 8, 45),
    salida: crearFechaISO(1, 15, 30),
  },
  // 18 dic
  {
    id: "fic-7",
    empleadoId: "emp-1",
    entrada: crearFechaISO(2, 8, 50),
    salida: crearFechaISO(2, 16, 10),
  },
  // 17 dic
  {
    id: "fic-8",
    empleadoId: "emp-1",
    entrada: crearFechaISO(3, 9, 0),
    salida: crearFechaISO(3, 15, 55),
  },
  // 16 dic
  {
    id: "fic-9",
    empleadoId: "emp-1",
    entrada: crearFechaISO(4, 8, 40),
    salida: crearFechaISO(4, 16, 20),
  },

  // Fichajes de Carlos (emp-3) - Cocinero
  // 19 dic
  {
    id: "fic-10",
    empleadoId: "emp-3",
    entrada: crearFechaISO(1, 9, 10),
    salida: crearFechaISO(1, 16, 20),
  },
  // 18 dic
  {
    id: "fic-11",
    empleadoId: "emp-3",
    entrada: crearFechaISO(2, 9, 5),
    salida: crearFechaISO(2, 15, 50),
  },

  // Fichajes de Pedro (emp-5) - Camarero
  // 19 dic
  {
    id: "fic-12",
    empleadoId: "emp-5",
    entrada: crearFechaISO(1, 9, 40),
    salida: crearFechaISO(1, 16, 45),
  },
  // 18 dic
  {
    id: "fic-13",
    empleadoId: "emp-5",
    entrada: crearFechaISO(2, 9, 25),
    salida: crearFechaISO(2, 16, 15),
  },
  // 17 dic
  {
    id: "fic-14",
    empleadoId: "emp-5",
    entrada: crearFechaISO(3, 9, 30),
    salida: crearFechaISO(3, 16, 0),
  },
  // 16 dic
  {
    id: "fic-15",
    empleadoId: "emp-5",
    entrada: crearFechaISO(4, 9, 20),
    salida: crearFechaISO(4, 15, 30),
  },

  // Fichajes de Ana (emp-6) - Cocinera
  // 19 dic
  {
    id: "fic-16",
    empleadoId: "emp-6",
    entrada: crearFechaISO(1, 8, 55),
    salida: crearFechaISO(1, 15, 40),
  },
  // 18 dic
  {
    id: "fic-17",
    empleadoId: "emp-6",
    entrada: crearFechaISO(2, 9, 0),
    salida: crearFechaISO(2, 16, 5),
  },
];
