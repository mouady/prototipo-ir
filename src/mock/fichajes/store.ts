/**
 * Store del módulo de fichajes
 * Maneja el estado en memoria de fichajes de empleados
 */

import type { Fichaje, JornadaActual, RegistroHistorial } from "./types";
import { EstadoJornada } from "./types";
import { SEED_FICHAJES } from "./seed";
import { notifyListeners } from "../shared/store-base";

// ============================================
// ESTADO EN MEMORIA (Runtime)
// ============================================
let runtimeFichajes: Fichaje[] = [];
const modificacionesFichajes: Map<string, Fichaje> = new Map();
let nextFichajeId = 100; // Empezamos en 100 para evitar colisiones con seed

// ============================================
// HELPERS DE FORMATO
// ============================================

/**
 * Formatea una fecha ISO a formato YY/MM/DD
 */
function formatearFechaCorta(fechaISO: string): string {
  const fecha = new Date(fechaISO);
  const year = fecha.getFullYear().toString().slice(-2);
  const month = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const day = fecha.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${day}`;
}

/**
 * Formatea una fecha ISO a formato HH:MM
 */
function formatearHora(fechaISO: string): string {
  const fecha = new Date(fechaISO);
  const hours = fecha.getHours().toString().padStart(2, "0");
  const minutes = fecha.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Formatea una duración en milisegundos a formato Xh XXm
 */
function formatearDuracionCorta(ms: number): string {
  const totalMinutes = Math.floor(ms / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h${minutes.toString().padStart(2, "0")}m`;
}

/**
 * Formatea una duración en milisegundos a formato HH:MM:SS
 */
export function formatearDuracionLarga(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Calcula la duración entre dos fechas ISO
 */
function calcularDuracionMs(entrada: string, salida: string): number {
  return new Date(salida).getTime() - new Date(entrada).getTime();
}

/**
 * Verifica si una fecha es hoy
 */
function esHoy(fechaISO: string): boolean {
  const fecha = new Date(fechaISO);
  const hoy = new Date();
  return (
    fecha.getDate() === hoy.getDate() &&
    fecha.getMonth() === hoy.getMonth() &&
    fecha.getFullYear() === hoy.getFullYear()
  );
}

// ============================================
// GETTERS
// ============================================

/**
 * Obtiene todos los fichajes (seed + runtime + modificaciones)
 */
export function getFichajes(): Fichaje[] {
  const seedFichajes = SEED_FICHAJES.map((f) =>
    modificacionesFichajes.has(f.id) ? modificacionesFichajes.get(f.id)! : f
  );
  return [...seedFichajes, ...runtimeFichajes];
}

/**
 * Obtiene los fichajes de un empleado específico, ordenados por fecha (más reciente primero)
 */
export function getFichajesByEmpleado(empleadoId: string): Fichaje[] {
  return getFichajes()
    .filter((f) => f.empleadoId === empleadoId)
    .sort((a, b) => new Date(b.entrada).getTime() - new Date(a.entrada).getTime());
}

/**
 * Obtiene el fichaje activo (jornada en curso) de un empleado
 */
export function getFichajeActivo(empleadoId: string): Fichaje | undefined {
  return getFichajes().find(
    (f) => f.empleadoId === empleadoId && !f.salida && esHoy(f.entrada)
  );
}

/**
 * Obtiene el estado de la jornada actual de un empleado
 */
export function getJornadaActual(empleadoId: string): JornadaActual {
  const fichajeActivo = getFichajeActivo(empleadoId);

  if (fichajeActivo) {
    return {
      estado: EstadoJornada.EN_CURSO,
      fichaje: fichajeActivo,
      duracionMs: Date.now() - new Date(fichajeActivo.entrada).getTime(),
    };
  }

  // Verificar si ya finalizó la jornada hoy
  const fichajesHoy = getFichajesByEmpleado(empleadoId).filter((f) =>
    esHoy(f.entrada)
  );
  
  if (fichajesHoy.length > 0 && fichajesHoy[0].salida) {
    return {
      estado: EstadoJornada.FINALIZADA,
      fichaje: fichajesHoy[0],
    };
  }

  return {
    estado: EstadoJornada.NO_INICIADA,
  };
}

/**
 * Obtiene el historial de fichajes de un empleado formateado para UI
 * Excluye el fichaje activo (jornada en curso)
 */
export function getHistorialFichajes(
  empleadoId: string,
  pagina: number = 1,
  porPagina: number = 3
): { registros: RegistroHistorial[]; totalPaginas: number; totalRegistros: number } {
  const fichajes = getFichajesByEmpleado(empleadoId)
    .filter((f) => f.salida) // Solo fichajes completados
    .filter((f) => !esHoy(f.entrada)); // Excluir los de hoy (si acabó ya)

  const totalRegistros = fichajes.length;
  const totalPaginas = Math.ceil(totalRegistros / porPagina);
  
  const inicio = (pagina - 1) * porPagina;
  const fichajesPagina = fichajes.slice(inicio, inicio + porPagina);

  const registros: RegistroHistorial[] = fichajesPagina.map((f) => ({
    id: f.id,
    fecha: formatearFechaCorta(f.entrada),
    horaInicio: formatearHora(f.entrada),
    horaFin: formatearHora(f.salida!),
    duracion: formatearDuracionCorta(calcularDuracionMs(f.entrada, f.salida!)),
    fichajeOriginal: f,
  }));

  return { registros, totalPaginas, totalRegistros };
}

// ============================================
// ACCIONES
// ============================================

/**
 * Inicia la jornada de un empleado (crea un nuevo fichaje)
 */
export function iniciarJornada(empleadoId: string): Fichaje {
  // Verificar que no haya jornada activa
  const jornadaActual = getJornadaActual(empleadoId);
  if (jornadaActual.estado === EstadoJornada.EN_CURSO) {
    throw new Error("Ya hay una jornada en curso");
  }

  const nuevoFichaje: Fichaje = {
    id: `fic-${nextFichajeId++}`,
    empleadoId,
    entrada: new Date().toISOString(),
  };

  runtimeFichajes.push(nuevoFichaje);
  notifyListeners();
  
  return nuevoFichaje;
}

/**
 * Detiene la jornada de un empleado (cierra el fichaje activo)
 */
export function detenerJornada(empleadoId: string): Fichaje {
  const fichajeActivo = getFichajeActivo(empleadoId);
  
  if (!fichajeActivo) {
    throw new Error("No hay jornada activa para detener");
  }

  const fichajeCerrado: Fichaje = {
    ...fichajeActivo,
    salida: new Date().toISOString(),
  };

  // Actualizar en runtime o modificaciones según corresponda
  const indexRuntime = runtimeFichajes.findIndex((f) => f.id === fichajeActivo.id);
  if (indexRuntime !== -1) {
    runtimeFichajes[indexRuntime] = fichajeCerrado;
  } else {
    modificacionesFichajes.set(fichajeActivo.id, fichajeCerrado);
  }

  notifyListeners();
  
  return fichajeCerrado;
}

// ============================================
// UTILIDADES DE DEBUG/RESET
// ============================================

/**
 * Resetea los fichajes en runtime (para tests)
 */
export function resetFichajesRuntime(): void {
  runtimeFichajes = [];
  modificacionesFichajes.clear();
  nextFichajeId = 100;
  notifyListeners();
}

/**
 * Información de debug del store de fichajes
 */
export function getFichajesDebugInfo() {
  return {
    totalSeed: SEED_FICHAJES.length,
    totalRuntime: runtimeFichajes.length,
    totalModificaciones: modificacionesFichajes.size,
    nextId: nextFichajeId,
  };
}
