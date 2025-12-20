/**
 * Datos semilla para el módulo de fichajes
 * Genera un historial de fichajes para los empleados
 */

import type { Fichaje } from "./types";

// ============================================
// HELPERS PARA GENERAR FECHAS
// ============================================

/**
 * Genera una fecha ISO para un día específico con hora
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
 */
export const SEED_FICHAJES: Fichaje[] = [
  // Fichajes de María (emp-2) - Camarera
  {
    id: "fic-1",
    empleadoId: "emp-2",
    entrada: crearFechaISO(3, 9, 22),
    salida: crearFechaISO(3, 16, 5),
  },
  {
    id: "fic-2",
    empleadoId: "emp-2",
    entrada: crearFechaISO(6, 9, 30),
    salida: crearFechaISO(6, 16, 0),
  },
  {
    id: "fic-3",
    empleadoId: "emp-2",
    entrada: crearFechaISO(9, 9, 35),
    salida: crearFechaISO(9, 16, 14),
  },
  {
    id: "fic-4",
    empleadoId: "emp-2",
    entrada: crearFechaISO(10, 9, 15),
    salida: crearFechaISO(10, 15, 45),
  },
  {
    id: "fic-5",
    empleadoId: "emp-2",
    entrada: crearFechaISO(13, 9, 0),
    salida: crearFechaISO(13, 16, 30),
  },

  // Fichajes de Antonio (emp-1) - Cocinero
  {
    id: "fic-6",
    empleadoId: "emp-1",
    entrada: crearFechaISO(3, 8, 45),
    salida: crearFechaISO(3, 15, 30),
  },
  {
    id: "fic-7",
    empleadoId: "emp-1",
    entrada: crearFechaISO(6, 8, 50),
    salida: crearFechaISO(6, 16, 10),
  },
  {
    id: "fic-8",
    empleadoId: "emp-1",
    entrada: crearFechaISO(9, 9, 0),
    salida: crearFechaISO(9, 15, 55),
  },

  // Fichajes de Carlos (emp-3) - Cocinero
  {
    id: "fic-9",
    empleadoId: "emp-3",
    entrada: crearFechaISO(3, 9, 10),
    salida: crearFechaISO(3, 16, 20),
  },
  {
    id: "fic-10",
    empleadoId: "emp-3",
    entrada: crearFechaISO(6, 9, 5),
    salida: crearFechaISO(6, 15, 50),
  },

  // Fichajes de Pedro (emp-5) - Camarero
  {
    id: "fic-11",
    empleadoId: "emp-5",
    entrada: crearFechaISO(3, 9, 40),
    salida: crearFechaISO(3, 16, 45),
  },
  {
    id: "fic-12",
    empleadoId: "emp-5",
    entrada: crearFechaISO(6, 9, 25),
    salida: crearFechaISO(6, 16, 15),
  },
  {
    id: "fic-13",
    empleadoId: "emp-5",
    entrada: crearFechaISO(9, 9, 30),
    salida: crearFechaISO(9, 16, 0),
  },
  {
    id: "fic-14",
    empleadoId: "emp-5",
    entrada: crearFechaISO(10, 9, 20),
    salida: crearFechaISO(10, 15, 30),
  },

  // Fichajes de Ana (emp-6) - Cocinera
  {
    id: "fic-15",
    empleadoId: "emp-6",
    entrada: crearFechaISO(3, 8, 55),
    salida: crearFechaISO(3, 15, 40),
  },
  {
    id: "fic-16",
    empleadoId: "emp-6",
    entrada: crearFechaISO(6, 9, 0),
    salida: crearFechaISO(6, 16, 5),
  },
];
