/**
 * Hooks de React para el módulo de fichajes
 * Proporcionan reactividad automática cuando los datos cambian
 */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  getJornadaActual,
  getHistorialFichajes,
  iniciarJornada as storeIniciarJornada,
  detenerJornada as storeDetenerJornada,
  formatearDuracionLarga,
} from "./store";
import { subscribe } from "../shared/store-base";
import type { JornadaActual, RegistroHistorial } from "./types";
import { EstadoJornada } from "./types";

/**
 * Hook para manejar la jornada actual de un empleado
 * Incluye contador en tiempo real de la duración
 */
export function useJornadaActual(empleadoId: string) {
  const [jornada, setJornada] = useState<JornadaActual>(() =>
    getJornadaActual(empleadoId)
  );
  const [duracionFormateada, setDuracionFormateada] = useState<string>("00:00:00");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Actualizar jornada cuando cambia el store
  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setJornada(getJornadaActual(empleadoId));
    });
    return unsubscribe;
  }, [empleadoId]);

  // Contador en tiempo real cuando la jornada está en curso
  useEffect(() => {
    // Solo activar el intervalo cuando está en curso
    if (jornada.estado !== EstadoJornada.EN_CURSO || !jornada.fichaje) {
      return;
    }

    const actualizarDuracion = () => {
      const entrada = new Date(jornada.fichaje!.entrada).getTime();
      const ahora = Date.now();
      setDuracionFormateada(formatearDuracionLarga(ahora - entrada));
    };

    // Actualizar inmediatamente
    actualizarDuracion();

    // Actualizar cada segundo
    intervalRef.current = setInterval(actualizarDuracion, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [jornada.estado, jornada.fichaje]);

  const iniciar = useCallback(() => {
    return storeIniciarJornada(empleadoId);
  }, [empleadoId]);

  const detener = useCallback(() => {
    return storeDetenerJornada(empleadoId);
  }, [empleadoId]);

  return {
    jornada,
    duracionFormateada,
    iniciar,
    detener,
    estaEnCurso: jornada.estado === EstadoJornada.EN_CURSO,
    noIniciada: jornada.estado === EstadoJornada.NO_INICIADA,
    finalizada: jornada.estado === EstadoJornada.FINALIZADA,
  };
}

/**
 * Hook para manejar el historial de fichajes con paginación
 */
export function useHistorialFichajes(empleadoId: string, porPagina: number = 3) {
  const [pagina, setPagina] = useState(1);
  const [registros, setRegistros] = useState<RegistroHistorial[]>([]);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalRegistros, setTotalRegistros] = useState(0);

  // Cargar datos cuando cambia la página o el store
  useEffect(() => {
    const cargarHistorial = () => {
      const resultado = getHistorialFichajes(empleadoId, pagina, porPagina);
      setRegistros(resultado.registros);
      setTotalPaginas(resultado.totalPaginas);
      setTotalRegistros(resultado.totalRegistros);
    };

    cargarHistorial();

    const unsubscribe = subscribe(cargarHistorial);
    return unsubscribe;
  }, [empleadoId, pagina, porPagina]);

  const irAPagina = useCallback((nuevaPagina: number) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPagina(nuevaPagina);
    }
  }, [totalPaginas]);

  const siguiente = useCallback(() => {
    irAPagina(pagina + 1);
  }, [pagina, irAPagina]);

  const anterior = useCallback(() => {
    irAPagina(pagina - 1);
  }, [pagina, irAPagina]);

  return {
    registros,
    pagina,
    totalPaginas,
    totalRegistros,
    irAPagina,
    siguiente,
    anterior,
    haySiguiente: pagina < totalPaginas,
    hayAnterior: pagina > 1,
  };
}

/**
 * Hook combinado para toda la funcionalidad de fichajes
 */
export function useFichajes(empleadoId: string) {
  const jornadaActual = useJornadaActual(empleadoId);
  const historial = useHistorialFichajes(empleadoId);

  return {
    ...jornadaActual,
    historial,
  };
}
