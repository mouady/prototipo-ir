/**
 * Hooks de React para el módulo de horarios
 * Proporcionan reactividad automática cuando los datos cambian
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getHorarios,
  getHorarioByDia,
  getHorariosEspeciales,
  getHorarioEspecialByFecha,
  getTurnosSemana,
  actualizarHorario as storeActualizarHorario,
  guardarHorarioEspecial as storeGuardarHorarioEspecial,
  eliminarHorarioEspecial as storeEliminarHorarioEspecial,
} from "./store";
import { subscribe } from "../shared/store-base";
import type { Horario, HorarioEspecial } from "./types";
import type { DiaSemana } from "./types";

/**
 * Hook para acceder a los horarios generales con reactividad
 */
export function useHorarios() {
  const [horarios, setHorarios] = useState<Horario[]>(() => getHorarios());

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setHorarios(getHorarios());
    });
    return unsubscribe;
  }, []);

  const getByDia = useCallback((dia: DiaSemana) => {
    return getHorarioByDia(dia);
  }, []);

  const actualizar = useCallback(
    (id: string, datos: Partial<Omit<Horario, "id">>) => {
      return storeActualizarHorario(id, datos);
    },
    []
  );

  return {
    horarios,
    getByDia,
    actualizar,
  };
}

/**
 * Hook para acceder a los horarios especiales con reactividad
 */
export function useHorariosEspeciales() {
  const [horariosEspeciales, setHorariosEspeciales] = useState<HorarioEspecial[]>(
    () => getHorariosEspeciales()
  );

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setHorariosEspeciales(getHorariosEspeciales());
    });
    return unsubscribe;
  }, []);

  const getByFecha = useCallback((fecha: string) => {
    return getHorarioEspecialByFecha(fecha);
  }, []);

  const guardar = useCallback(
    (horario: Omit<HorarioEspecial, "id"> & { id?: string }) => {
      return storeGuardarHorarioEspecial(horario);
    },
    []
  );

  const eliminar = useCallback((id: string) => {
    return storeEliminarHorarioEspecial(id);
  }, []);

  return {
    horariosEspeciales,
    getByFecha,
    guardar,
    eliminar,
  };
}

/**
 * Hook para acceder a los turnos de una semana específica
 */
export function useTurnosSemana(fechaInicio: Date) {
  const [turnos, setTurnos] = useState<HorarioEspecial[]>(() =>
    getTurnosSemana(fechaInicio)
  );

  // Actualizar cuando cambia la fecha de inicio
  useEffect(() => {
    setTurnos(getTurnosSemana(fechaInicio));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fechaInicio.getTime()]);

  // Suscribirse a cambios del store
  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setTurnos(getTurnosSemana(fechaInicio));
    });
    return unsubscribe;
  }, [fechaInicio]);

  return { turnos };
}
