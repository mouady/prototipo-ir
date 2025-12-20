/**
 * Hooks de React para el módulo de mesas, cuentas y reservas
 * Proporcionan reactividad automática cuando los datos cambian
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getMesasConEstado,
  getMesaById,
  getCuentaActivaByMesa,
  getComandasByMesa,
  getReservasByFecha,
  getProductosVendibles,
  buscarProductosVendibles,
  crearCuenta as storeCrearCuenta,
  cerrarCuenta as storeCerrarCuenta,
  crearComandaMesa as storeCrearComandaMesa,
  marcarLineaServida as storeMarcarLineaServida,
  agregarPropina as storeAgregarPropina,
  crearReserva as storeCrearReserva,
  terminarReserva as storeTerminarReserva,
  eliminarReserva as storeEliminarReserva,
  calcularTotalesCuenta,
  getPropinaByIdCuenta,
} from "./store";
import { subscribe } from "../shared/store-base";
import type { MesaConEstado, Reserva, NuevaReserva } from "./types";
import type { ComandaMesa, ProductoVendibleSimple } from "./seed";

/**
 * Hook para acceder a las mesas con su estado actual
 */
export function useMesas() {
  const [mesas, setMesas] = useState<MesaConEstado[]>(() => getMesasConEstado());

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setMesas(getMesasConEstado());
    });
    return unsubscribe;
  }, []);

  const crearCuenta = useCallback((mesaId: string, camareroId?: string, camareroNombre?: string) => {
    return storeCrearCuenta(mesaId, camareroId, camareroNombre);
  }, []);

  return {
    mesas,
    crearCuenta,
  };
}

/**
 * Hook para gestionar una mesa específica (detalle)
 */
export function useDetalleMesa(mesaId: string) {
  const [mesa, setMesa] = useState(() => getMesaById(mesaId));
  const [cuenta, setCuenta] = useState(() => getCuentaActivaByMesa(mesaId));
  const [comandas, setComandas] = useState<ComandaMesa[]>(() => getComandasByMesa(mesaId));
  const [totales, setTotales] = useState(() => calcularTotalesCuenta(mesaId));
  const [propina, setPropina] = useState(() => {
    const c = getCuentaActivaByMesa(mesaId);
    return c ? getPropinaByIdCuenta(c.id) : null;
  });

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setMesa(getMesaById(mesaId));
      setCuenta(getCuentaActivaByMesa(mesaId));
      setComandas(getComandasByMesa(mesaId));
      setTotales(calcularTotalesCuenta(mesaId));
      const c = getCuentaActivaByMesa(mesaId);
      setPropina(c ? getPropinaByIdCuenta(c.id) : null);
    });
    return unsubscribe;
  }, [mesaId]);

  const cerrarCuenta = useCallback(() => {
    if (cuenta) {
      return storeCerrarCuenta(cuenta.id);
    }
    return null;
  }, [cuenta]);

  const marcarLineaServida = useCallback((comandaId: string, lineaId: string) => {
    return storeMarcarLineaServida(comandaId, lineaId);
  }, []);

  const agregarPropina = useCallback((abono: number) => {
    if (cuenta) {
      return storeAgregarPropina({ cuentaId: cuenta.id, abono });
    }
    return null;
  }, [cuenta]);

  // Contar platos listos para notificación
  const platosListos = comandas.reduce((total, comanda) => {
    return total + comanda.lineas.filter(
      (l) => l.esPlato && l.estado === "REALIZADO"
    ).length;
  }, 0);

  // Encontrar la comanda con platos listos para la notificación
  const comandaConPlatosListos = comandas.find((c) =>
    c.lineas.some((l) => l.esPlato && l.estado === "REALIZADO")
  );

  return {
    mesa,
    cuenta,
    comandas,
    totales,
    propina,
    platosListos,
    comandaConPlatosListos,
    cerrarCuenta,
    marcarLineaServida,
    agregarPropina,
  };
}

/**
 * Hook para crear comandas
 */
export function useCrearComanda(mesaId: string) {
  const [productos] = useState<ProductoVendibleSimple[]>(() => getProductosVendibles());
  const [busqueda, setBusquedaInternal] = useState("");
  const [resultados, setResultados] = useState<ProductoVendibleSimple[]>([]);
  const [carrito, setCarrito] = useState<Array<{ producto: ProductoVendibleSimple; cantidad: number }>>([]);

  // Función para cambiar búsqueda y actualizar resultados sincrónicamente
  const setBusqueda = useCallback((value: string) => {
    setBusquedaInternal(value);
    if (value.trim()) {
      setResultados(buscarProductosVendibles(value));
    } else {
      setResultados([]);
    }
  }, []);

  const agregarAlCarrito = useCallback((producto: ProductoVendibleSimple) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.producto.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { producto, cantidad: 1 }];
    });
    setBusquedaInternal("");
    setResultados([]);
  }, []);

  const quitarDelCarrito = useCallback((productoId: string) => {
    setCarrito((prev) => prev.filter((item) => item.producto.id !== productoId));
  }, []);

  const actualizarCantidad = useCallback((productoId: string, cantidad: number) => {
    if (cantidad < 1) {
      quitarDelCarrito(productoId);
      return;
    }
    setCarrito((prev) =>
      prev.map((item) =>
        item.producto.id === productoId ? { ...item, cantidad } : item
      )
    );
  }, [quitarDelCarrito]);

  const confirmarComanda = useCallback(() => {
    if (carrito.length === 0) return null;
    const lineas = carrito.map((item) => ({
      productoId: item.producto.id,
      cantidad: item.cantidad,
    }));
    const comanda = storeCrearComandaMesa(mesaId, lineas);
    setCarrito([]);
    return comanda;
  }, [mesaId, carrito]);

  const cancelarComanda = useCallback(() => {
    setCarrito([]);
    setBusquedaInternal("");
    setResultados([]);
  }, []);

  const totalCarrito = carrito.reduce(
    (total, item) => total + item.producto.precio * item.cantidad,
    0
  );

  return {
    productos,
    busqueda,
    setBusqueda,
    resultados,
    carrito,
    agregarAlCarrito,
    quitarDelCarrito,
    actualizarCantidad,
    confirmarComanda,
    cancelarComanda,
    totalCarrito,
  };
}

/**
 * Hook para gestionar reservas
 */
export function useReservas(fechaInicial?: Date) {
  const [fecha, setFechaInternal] = useState(fechaInicial || new Date());
  const [reservas, setReservas] = useState<Reserva[]>(() => getReservasByFecha(fechaInicial || new Date()));
  const [pagina, setPagina] = useState(1);
  const porPagina = 5;

  useEffect(() => {
    const unsubscribe = subscribe(() => {
      setReservas(getReservasByFecha(fecha));
    });
    return unsubscribe;
  }, [fecha]);

  // Función para cambiar fecha y actualizar reservas sincrónicamente
  const setFecha = useCallback((nuevaFecha: Date) => {
    setFechaInternal(nuevaFecha);
    setReservas(getReservasByFecha(nuevaFecha));
    setPagina(1);
  }, []);

  const crearReserva = useCallback((datos: Omit<NuevaReserva, "terminada">) => {
    return storeCrearReserva({ ...datos, terminada: false });
  }, []);

  const terminarReserva = useCallback((id: string) => {
    return storeTerminarReserva(id);
  }, []);

  const eliminarReserva = useCallback((id: string) => {
    return storeEliminarReserva(id);
  }, []);

  const cambiarFecha = useCallback((nuevaFecha: Date) => {
    setFecha(nuevaFecha);
  }, [setFecha]);

  const irADiaAnterior = useCallback(() => {
    setFechaInternal((prevFecha) => {
      const nuevaFecha = new Date(prevFecha);
      nuevaFecha.setDate(nuevaFecha.getDate() - 1);
      setReservas(getReservasByFecha(nuevaFecha));
      setPagina(1);
      return nuevaFecha;
    });
  }, []);

  const irADiaSiguiente = useCallback(() => {
    setFechaInternal((prevFecha) => {
      const nuevaFecha = new Date(prevFecha);
      nuevaFecha.setDate(nuevaFecha.getDate() + 1);
      setReservas(getReservasByFecha(nuevaFecha));
      setPagina(1);
      return nuevaFecha;
    });
  }, []);

  // Paginación
  const totalPaginas = Math.ceil(reservas.length / porPagina);
  const reservasPaginadas = reservas.slice(
    (pagina - 1) * porPagina,
    pagina * porPagina
  );

  return {
    fecha,
    reservas: reservasPaginadas,
    totalReservas: reservas.length,
    pagina,
    totalPaginas,
    setPagina,
    crearReserva,
    terminarReserva,
    eliminarReserva,
    cambiarFecha,
    irADiaAnterior,
    irADiaSiguiente,
  };
}
