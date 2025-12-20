/**
 * Hooks de React para el módulo de inventario
 * Proporcionan reactividad automática cuando los datos cambian
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getProductos,
  getIngredientes,
  getProductosByTipo,
  getProveedores,
  agregarProducto as storeAgregarProducto,
  eliminarProducto as storeEliminarProducto,
} from "./store";
import { subscribe } from "../shared/store-base";
import type { Producto, NuevoProducto, Proveedor } from "./types";
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

  // Actualizar cuando cambia el tipo
  useEffect(() => {
    setProductos(getProductosByTipo(tipo));
  }, [tipo]);

  // Suscribirse a cambios del store
  useEffect(() => {
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
