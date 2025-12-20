/**
 * Hooks de React para el módulo de empleados
 * Proporcionan reactividad automática cuando los datos cambian
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getEmpleados,
  agregarEmpleado as storeAgregarEmpleado,
  actualizarEmpleado as storeActualizarEmpleado,
  eliminarEmpleado as storeEliminarEmpleado,
  toggleEmpleadoActivo as storeToggleEmpleadoActivo,
} from "./store";
import { subscribe } from "../shared/store-base";
import type { Empleado, NuevoEmpleado, ActualizarEmpleado } from "./types";

/**
 * Hook para acceder a los empleados con reactividad y funciones CRUD
 */
export function useEmpleados() {
  const [empleados, setEmpleados] = useState<Empleado[]>(() => getEmpleados());

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setEmpleados(getEmpleados());
    });
    return unsubscribe;
  }, []);

  const agregar = useCallback((nuevo: NuevoEmpleado) => {
    return storeAgregarEmpleado(nuevo);
  }, []);

  const actualizar = useCallback((id: string, datos: ActualizarEmpleado) => {
    return storeActualizarEmpleado(id, datos);
  }, []);

  const eliminar = useCallback((id: string) => {
    return storeEliminarEmpleado(id);
  }, []);

  const toggleActivo = useCallback((id: string) => {
    return storeToggleEmpleadoActivo(id);
  }, []);

  return {
    empleados,
    agregar,
    actualizar,
    eliminar,
    toggleActivo,
  };
}
