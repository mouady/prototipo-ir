/**
 * Hooks de React para el módulo de avisos de reposición
 * Proporcionan reactividad automática cuando los datos cambian
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getAvisosReposicion,
  getAvisosPendientes,
  getAvisosAtendidos,
  getCocineros,
  agregarAvisoReposicion as storeAgregarAviso,
  marcarAvisoAtendido as storeMarcarAvisoAtendido,
  eliminarAvisoReposicion as storeEliminarAviso,
} from "./store";
import { subscribe } from "../shared/store-base";
import type { AvisoReposicion, NuevoAvisoReposicion } from "./types";
import type { Cocinero } from "../shared/types";

/**
 * Hook para acceder a los avisos de reposición con reactividad
 */
export function useAvisosReposicion() {
  const [avisos, setAvisos] = useState<AvisoReposicion[]>(() => getAvisosReposicion());

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setAvisos(getAvisosReposicion());
    });
    return unsubscribe;
  }, []);

  const agregar = useCallback((nuevo: NuevoAvisoReposicion) => {
    return storeAgregarAviso(nuevo);
  }, []);

  const marcarAtendido = useCallback((id: string) => {
    return storeMarcarAvisoAtendido(id);
  }, []);

  const eliminar = useCallback((id: string) => {
    return storeEliminarAviso(id);
  }, []);

  return {
    avisos,
    agregar,
    marcarAtendido,
    eliminar,
  };
}

/**
 * Hook para acceder solo a los avisos pendientes con reactividad
 */
export function useAvisosPendientes() {
  const [avisos, setAvisos] = useState<AvisoReposicion[]>(() => getAvisosPendientes());

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setAvisos(getAvisosPendientes());
    });
    return unsubscribe;
  }, []);

  const marcarAtendido = useCallback((id: string) => {
    return storeMarcarAvisoAtendido(id);
  }, []);

  return {
    avisos,
    marcarAtendido,
  };
}

/**
 * Hook para acceder solo a los avisos atendidos con reactividad
 */
export function useAvisosAtendidos() {
  const [avisos, setAvisos] = useState<AvisoReposicion[]>(() => getAvisosAtendidos());

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setAvisos(getAvisosAtendidos());
    });
    return unsubscribe;
  }, []);

  return { avisos };
}

/**
 * Hook para acceder a los cocineros
 */
export function useCocineros() {
  const [cocineros] = useState<Cocinero[]>(() => getCocineros());
  return { cocineros };
}
