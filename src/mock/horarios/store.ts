/**
 * Store del módulo de horarios
 * Maneja el estado en memoria de horarios
 */

import type { Horario, HorarioEspecial } from "./types";
import { DiaSemana } from "./types";
import { SEED_HORARIOS, SEED_HORARIOS_ESPECIALES, generarTurnosSemana } from "./seed";
import { notifyListeners } from "../shared/store-base";

// ============================================
// ESTADO EN MEMORIA (Runtime)
// ============================================
let runtimeHorarios: Horario[] = [];
let runtimeHorariosEspeciales: HorarioEspecial[] = [];
const modificacionesHorarios: Map<string, Horario> = new Map();
const modificacionesHorariosEspeciales: Map<string, HorarioEspecial> = new Map();
const horariosEliminados: Set<string> = new Set();
const horariosEspecialesEliminados: Set<string> = new Set();
let nextHorarioEspecialId = 10;
let nextTurnoId = 100;

// ============================================
// GETTERS
// ============================================

/** Obtiene todos los horarios generales */
export function getHorarios(): Horario[] {
  const seedHorarios = SEED_HORARIOS.filter((h) => !horariosEliminados.has(h.id))
    .map((h) =>
      modificacionesHorarios.has(h.id)
        ? modificacionesHorarios.get(h.id)!
        : h
    );
  return [...seedHorarios, ...runtimeHorarios];
}

/** Obtiene el horario de un día de la semana específico */
export function getHorarioByDia(dia: DiaSemana): Horario | undefined {
  return getHorarios().find((h) => h.diaSemana === dia);
}

/** Obtiene todos los horarios especiales */
export function getHorariosEspeciales(): HorarioEspecial[] {
  const seedEspeciales = SEED_HORARIOS_ESPECIALES.filter(
    (h) => !horariosEspecialesEliminados.has(h.id)
  ).map((h) =>
    modificacionesHorariosEspeciales.has(h.id)
      ? modificacionesHorariosEspeciales.get(h.id)!
      : h
  );
  return [...seedEspeciales, ...runtimeHorariosEspeciales];
}

/** Obtiene el horario especial de una fecha específica */
export function getHorarioEspecialByFecha(fecha: string): HorarioEspecial | undefined {
  return getHorariosEspeciales().find((h) => h.fecha === fecha);
}

/** Genera los turnos para una semana específica */
export function getTurnosSemana(fechaInicio: Date): HorarioEspecial[] {
  // Primero generamos los turnos base
  const turnosBase = generarTurnosSemana(fechaInicio);
  
  // Luego verificamos si hay horarios especiales que sobrescriban
  return turnosBase.map((turno) => {
    const especial = getHorarioEspecialByFecha(turno.fecha);
    return especial || turno;
  });
}

// ============================================
// MUTATIONS
// ============================================

/** Actualiza un horario general */
export function actualizarHorario(
  id: string,
  datos: Partial<Omit<Horario, "id">>
): Horario | null {
  const horarioExistente = getHorarios().find((h) => h.id === id);
  if (!horarioExistente) return null;

  const horarioActualizado = { ...horarioExistente, ...datos };

  // Si es un horario seed, guardamos la modificación
  if (SEED_HORARIOS.some((h) => h.id === id)) {
    modificacionesHorarios.set(id, horarioActualizado);
  } else {
    // Si es runtime, lo actualizamos directamente
    const index = runtimeHorarios.findIndex((h) => h.id === id);
    if (index !== -1) {
      runtimeHorarios[index] = horarioActualizado;
    }
  }

  notifyListeners();
  return horarioActualizado;
}

/** Agrega o actualiza un horario especial */
export function guardarHorarioEspecial(
  horarioEspecial: Omit<HorarioEspecial, "id"> & { id?: string }
): HorarioEspecial {
  const id = horarioEspecial.id || `horario-especial-${nextHorarioEspecialId++}`;
  
  // Asignar IDs a los turnos si no los tienen
  const turnos = horarioEspecial.turnos.map((turno, index) => ({
    ...turno,
    id: turno.id || `turno-${id}-${index}-${nextTurnoId++}`,
  }));

  const nuevoHorario: HorarioEspecial = {
    ...horarioEspecial,
    id,
    turnos,
  };

  // Verificar si ya existe un horario especial para esa fecha
  const existenteIndex = runtimeHorariosEspeciales.findIndex(
    (h) => h.fecha === nuevoHorario.fecha
  );
  
  if (existenteIndex !== -1) {
    runtimeHorariosEspeciales[existenteIndex] = nuevoHorario;
  } else if (SEED_HORARIOS_ESPECIALES.some((h) => h.fecha === nuevoHorario.fecha)) {
    // Si sobrescribe un seed, guardamos la modificación
    const seedHorario = SEED_HORARIOS_ESPECIALES.find(
      (h) => h.fecha === nuevoHorario.fecha
    );
    if (seedHorario) {
      modificacionesHorariosEspeciales.set(seedHorario.id, {
        ...nuevoHorario,
        id: seedHorario.id,
      });
    }
  } else {
    runtimeHorariosEspeciales.push(nuevoHorario);
  }

  notifyListeners();
  return nuevoHorario;
}

/** Elimina un horario especial */
export function eliminarHorarioEspecial(id: string): boolean {
  // Verificar si es seed
  if (SEED_HORARIOS_ESPECIALES.some((h) => h.id === id)) {
    horariosEspecialesEliminados.add(id);
    modificacionesHorariosEspeciales.delete(id);
    notifyListeners();
    return true;
  }

  // Si es runtime
  const index = runtimeHorariosEspeciales.findIndex((h) => h.id === id);
  if (index !== -1) {
    runtimeHorariosEspeciales.splice(index, 1);
    notifyListeners();
    return true;
  }

  return false;
}

// ============================================
// RESET
// ============================================

export function resetHorariosRuntime(): void {
  runtimeHorarios = [];
  runtimeHorariosEspeciales = [];
  modificacionesHorarios.clear();
  modificacionesHorariosEspeciales.clear();
  horariosEliminados.clear();
  horariosEspecialesEliminados.clear();
  nextHorarioEspecialId = 10;
  nextTurnoId = 100;
  notifyListeners();
}

// ============================================
// DEBUG
// ============================================

export function getHorariosDebugInfo() {
  return {
    seedHorarios: SEED_HORARIOS.length,
    totalHorarios: getHorarios().length,
    seedHorariosEspeciales: SEED_HORARIOS_ESPECIALES.length,
    runtimeHorariosEspeciales: runtimeHorariosEspeciales.length,
    totalHorariosEspeciales: getHorariosEspeciales().length,
  };
}
