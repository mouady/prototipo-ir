/**
 * Datos semilla para el módulo de horarios
 */

import type { Horario, HorarioEspecial } from "./types";
import { DiaSemana, RolEmpleado } from "./types";

// ============================================
// HORARIOS GENERALES
// ============================================

/**
 * Horarios generales del restaurante
 * Define el horario de apertura y cierre para cada día de la semana
 */
export const SEED_HORARIOS: Horario[] = [
  {
    id: "horario-1",
    diaSemana: DiaSemana.LUNES,
    horaApertura: "08:00",
    horaCierre: "00:00",
  },
  {
    id: "horario-2",
    diaSemana: DiaSemana.MARTES,
    horaApertura: "08:00",
    horaCierre: "00:00",
  },
  {
    id: "horario-3",
    diaSemana: DiaSemana.MIERCOLES,
    horaApertura: "08:00",
    horaCierre: "00:00",
  },
  {
    id: "horario-4",
    diaSemana: DiaSemana.JUEVES,
    horaApertura: "08:00",
    horaCierre: "00:00",
  },
  {
    id: "horario-5",
    diaSemana: DiaSemana.VIERNES,
    horaApertura: "08:00",
    horaCierre: "00:00",
  },
  {
    id: "horario-6",
    diaSemana: DiaSemana.SABADO,
    horaApertura: "10:00",
    horaCierre: "02:00", // Cierra a las 2am del día siguiente
  },
  {
    id: "horario-7",
    diaSemana: DiaSemana.DOMINGO,
    horaApertura: "10:00",
    horaCierre: "18:00",
  },
];

// ============================================
// HORARIOS ESPECIALES (días concretos)
// ============================================

/**
 * Horarios especiales para días concretos
 * Sobrescriben el horario general del día de la semana correspondiente
 */
export const SEED_HORARIOS_ESPECIALES: HorarioEspecial[] = [
  {
    id: "especial-1",
    fecha: "2024-12-24", // Nochebuena
    horaApertura: "09:00",
    horaCierre: "16:00",
    turnos: [
      {
        id: "turno-esp-1-1",
        horaInicio: "09:00",
        horaFin: "16:00",
        asignaciones: [
          { empleadoId: "emp-1", empleadoNombre: "Antonio García López", rol: RolEmpleado.COCINERO },
          { empleadoId: "emp-3", empleadoNombre: "Carlos Martínez Sánchez", rol: RolEmpleado.COCINERO },
          { empleadoId: "emp-2", empleadoNombre: "María Fernández Ruiz", rol: RolEmpleado.CAMARERO },
          { empleadoId: "emp-5", empleadoNombre: "Pedro López Navarro", rol: RolEmpleado.CAMARERO },
        ],
      },
    ],
  },
  {
    id: "especial-2",
    fecha: "2024-12-31", // Nochevieja
    horaApertura: "10:00",
    horaCierre: "04:00",
    turnos: [
      {
        id: "turno-esp-2-1",
        horaInicio: "10:00",
        horaFin: "17:00",
        asignaciones: [
          { empleadoId: "emp-1", empleadoNombre: "Antonio García López", rol: RolEmpleado.COCINERO },
          { empleadoId: "emp-6", empleadoNombre: "Ana Rodríguez Gómez", rol: RolEmpleado.COCINERO },
          { empleadoId: "emp-2", empleadoNombre: "María Fernández Ruiz", rol: RolEmpleado.CAMARERO },
        ],
      },
      {
        id: "turno-esp-2-2",
        horaInicio: "17:00",
        horaFin: "04:00",
        asignaciones: [
          { empleadoId: "emp-3", empleadoNombre: "Carlos Martínez Sánchez", rol: RolEmpleado.COCINERO },
          { empleadoId: "emp-1", empleadoNombre: "Antonio García López", rol: RolEmpleado.COCINERO },
          { empleadoId: "emp-5", empleadoNombre: "Pedro López Navarro", rol: RolEmpleado.CAMARERO },
          { empleadoId: "emp-2", empleadoNombre: "María Fernández Ruiz", rol: RolEmpleado.CAMARERO },
        ],
      },
    ],
  },
];

// ============================================
// TURNOS PARA LA SEMANA ACTUAL (ejemplo de vista semanal)
// ============================================

/**
 * Genera turnos de ejemplo para una semana
 * Estos representan las asignaciones "por defecto" de cada día
 */
export function generarTurnosSemana(fechaInicio: Date): HorarioEspecial[] {
  const turnos: HorarioEspecial[] = [];
  const diasSemana = [
    DiaSemana.LUNES,
    DiaSemana.MARTES,
    DiaSemana.MIERCOLES,
    DiaSemana.JUEVES,
    DiaSemana.VIERNES,
    DiaSemana.SABADO,
    DiaSemana.DOMINGO,
  ];

  for (let i = 0; i < 7; i++) {
    const fecha = new Date(fechaInicio);
    fecha.setDate(fecha.getDate() + i);
    const fechaStr = fecha.toISOString().split("T")[0];
    const dia = diasSemana[i];

    // Turnos diferentes según el día
    const esFindeSemana = dia === DiaSemana.SABADO || dia === DiaSemana.DOMINGO;

    const turnosDia: HorarioEspecial["turnos"] = esFindeSemana
      ? [
          {
            id: `turno-${fechaStr}-1`,
            horaInicio: "10:00",
            horaFin: "16:00",
            asignaciones: [
              { empleadoId: "emp-1", empleadoNombre: "Antonio García López", rol: RolEmpleado.COCINERO },
              { empleadoId: "emp-3", empleadoNombre: "Carlos Martínez Sánchez", rol: RolEmpleado.COCINERO },
              { empleadoId: "emp-2", empleadoNombre: "María Fernández Ruiz", rol: RolEmpleado.CAMARERO },
              { empleadoId: "emp-5", empleadoNombre: "Pedro López Navarro", rol: RolEmpleado.CAMARERO },
            ],
          },
          {
            id: `turno-${fechaStr}-2`,
            horaInicio: "16:00",
            horaFin: dia === DiaSemana.SABADO ? "02:00" : "18:00",
            asignaciones: [
              { empleadoId: "emp-6", empleadoNombre: "Ana Rodríguez Gómez", rol: RolEmpleado.COCINERO },
              { empleadoId: "emp-1", empleadoNombre: "Antonio García López", rol: RolEmpleado.COCINERO },
              { empleadoId: "emp-2", empleadoNombre: "María Fernández Ruiz", rol: RolEmpleado.CAMARERO },
            ],
          },
        ]
      : [
          {
            id: `turno-${fechaStr}-1`,
            horaInicio: "08:00",
            horaFin: "15:00",
            asignaciones: [
              { empleadoId: "emp-1", empleadoNombre: "Antonio García López", rol: RolEmpleado.COCINERO },
              { empleadoId: "emp-6", empleadoNombre: "Ana Rodríguez Gómez", rol: RolEmpleado.COCINERO },
              { empleadoId: "emp-2", empleadoNombre: "María Fernández Ruiz", rol: RolEmpleado.CAMARERO },
              { empleadoId: "emp-5", empleadoNombre: "Pedro López Navarro", rol: RolEmpleado.CAMARERO },
            ],
          },
          {
            id: `turno-${fechaStr}-2`,
            horaInicio: "15:00",
            horaFin: "00:00",
            asignaciones: [
              { empleadoId: "emp-3", empleadoNombre: "Carlos Martínez Sánchez", rol: RolEmpleado.COCINERO },
              { empleadoId: "emp-1", empleadoNombre: "Antonio García López", rol: RolEmpleado.COCINERO },
              { empleadoId: "emp-2", empleadoNombre: "María Fernández Ruiz", rol: RolEmpleado.CAMARERO },
            ],
          },
        ];

    turnos.push({
      id: `semana-${fechaStr}`,
      fecha: fechaStr,
      horaApertura: esFindeSemana ? "10:00" : "08:00",
      horaCierre: dia === DiaSemana.SABADO ? "02:00" : dia === DiaSemana.DOMINGO ? "18:00" : "00:00",
      turnos: turnosDia,
    });
  }

  return turnos;
}
