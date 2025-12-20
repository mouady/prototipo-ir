/**
 * Hooks de React para el store de inventario
 * Proporcionan reactividad automática cuando los datos cambian
 * Basado en el modelo conceptual (mc-ir.iuml)
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getProductos,
  getIngredientes,
  getProductosByTipo,
  getProveedores,
  getAvisosReposicion,
  getAvisosPendientes,
  getAvisosAtendidos,
  getCocineros,
  getComandasPendientes,
  getComandasHechas,
  agregarProducto as storeAgregarProducto,
  eliminarProducto as storeEliminarProducto,
  agregarAvisoReposicion as storeAgregarAviso,
  marcarAvisoAtendido as storeMarcarAvisoAtendido,
  eliminarAvisoReposicion as storeEliminarAviso,
  marcarComandaComoLista as storeMarcarComandaLista,
  restaurarComanda as storeRestaurarComanda,
  subscribe,
} from "./store";
import type { Producto, NuevoProducto, Proveedor, AvisoReposicion, NuevoAvisoReposicion, Cocinero, Comanda } from "./types";
import { TipoProducto } from "./types";

/**
 * Hook para acceder a los productos con reactividad
 */
export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>(() => getProductos());

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setProductos(getProductos());
    });
    return unsubscribe;
  }, []);

  const agregar = useCallback((nuevo: NuevoProducto) => {
    return storeAgregarProducto(nuevo);
  }, []);

  const eliminar = useCallback((id: string) => {
    return storeEliminarProducto(id);
  }, []);

  return {
    productos,
    agregar,
    eliminar,
  };
}

/**
 * Hook para acceder a productos por tipo con reactividad
 */
export function useProductosByTipo(tipo: TipoProducto) {
  const [productos, setProductos] = useState<Producto[]>(() =>
    getProductosByTipo(tipo)
  );

  useEffect(() => {
    // Refrescar inmediatamente al cambiar el tipo activo.
    setProductos(getProductosByTipo(tipo));

    const unsubscribe = subscribe(() => {
      setProductos(getProductosByTipo(tipo));
    });
    return unsubscribe;
  }, [tipo]);

  const agregar = useCallback((nuevo: NuevoProducto) => {
    return storeAgregarProducto(nuevo);
  }, []);

  const eliminar = useCallback((id: string) => {
    return storeEliminarProducto(id);
  }, []);

  return {
    productos,
    agregar,
    eliminar,
  };
}

/**
 * Hook para acceder solo a los ingredientes con reactividad
 */
export function useIngredientes() {
  const [ingredientes, setIngredientes] = useState<Producto[]>(() => getIngredientes());

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setIngredientes(getIngredientes());
    });
    return unsubscribe;
  }, []);

  const agregar = useCallback((nuevo: NuevoProducto) => {
    return storeAgregarProducto(nuevo);
  }, []);

  const eliminar = useCallback((id: string) => {
    return storeEliminarProducto(id);
  }, []);

  return {
    ingredientes,
    agregar,
    eliminar,
  };
}

export function useBebidas() {
  return useProductosByTipo(TipoProducto.BEBIDA);
}

export function useRecursos() {
  return useProductosByTipo(TipoProducto.RECURSO);
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

// ============================================
// HOOKS: AVISOS DE REPOSICIÓN
// ============================================

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

// ============================================
// HOOKS: COMANDAS
// ============================================

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

// ============================================
// HOOKS: EMPLEADOS
// ============================================

import {
  getEmpleados,
  agregarEmpleado as storeAgregarEmpleado,
  actualizarEmpleado as storeActualizarEmpleado,
  eliminarEmpleado as storeEliminarEmpleado,
  toggleEmpleadoActivo as storeToggleEmpleadoActivo,
} from "./store";
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
