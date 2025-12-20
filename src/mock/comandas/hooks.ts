/**
 * Hooks de React para el módulo de comandas
 * Proporcionan reactividad automática cuando los datos cambian
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getComandasPendientes,
  getComandasHechas,
  marcarComandaComoLista as storeMarcarComandaLista,
  restaurarComanda as storeRestaurarComanda,
} from "./store";
import { subscribe } from "../shared/store-base";
import type { Comanda } from "./types";

/**
 * Hook para acceder a las comandas pendientes (en preparación) con reactividad
 */
export function useComandasPendientes() {
  const [comandas, setComandas] = useState<Comanda[]>(() => getComandasPendientes());

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setComandas(getComandasPendientes());
    });
    return unsubscribe;
  }, []);

  const marcarComoLista = useCallback((id: string) => {
    return storeMarcarComandaLista(id);
  }, []);

  return {
    comandas,
    marcarComoLista,
  };
}

/**
 * Hook para acceder a las comandas hechas (finalizadas) con reactividad
 */
export function useComandasHechas() {
  const [comandas, setComandas] = useState<Comanda[]>(() => getComandasHechas());

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setComandas(getComandasHechas());
    });
    return unsubscribe;
  }, []);

  const restaurar = useCallback((id: string) => {
    return storeRestaurarComanda(id);
  }, []);

  return {
    comandas,
    restaurar,
  };
}
