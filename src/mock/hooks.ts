/**
 * Hooks de React para el store de inventario
 * Proporcionan reactividad automática cuando los datos cambian
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getIngredientes,
  getProveedores,
  agregarIngrediente as storeAgregarIngrediente,
  eliminarIngrediente as storeEliminarIngrediente,
  subscribe,
} from "./store";
import type { Ingrediente, NuevoIngrediente, Proveedor } from "./types";

/**
 * Hook para acceder a los ingredientes con reactividad
 */
export function useIngredientes() {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>(() =>
    getIngredientes()
  );

  useEffect(() => {
    // Suscribirse a cambios
    const unsubscribe = subscribe(() => {
      setIngredientes(getIngredientes());
    });

    return unsubscribe;
  }, []);

  const agregar = useCallback((nuevo: NuevoIngrediente) => {
    return storeAgregarIngrediente(nuevo);
  }, []);

  const eliminar = useCallback((id: string) => {
    return storeEliminarIngrediente(id);
  }, []);

  return {
    ingredientes,
    agregar,
    eliminar,
  };
}

/**
 * Hook para acceder a los proveedores con reactividad
 */
export function useProveedores() {
  const [proveedores, setProveedores] = useState<Proveedor[]>(() =>
    getProveedores()
  );

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setProveedores(getProveedores());
    });

    return unsubscribe;
  }, []);

  return { proveedores };
}
