/**
 * Datos semilla para el módulo de comandas
 * 
 * IMPORTANTE: Estos datos están sincronizados con las comandas de mesa (SEED_COMANDAS_MESA).
 * Solo incluye las líneas que son platos (que necesitan preparación en cocina).
 * Las bebidas se sirven directamente por el camarero.
 */

import type { Comanda } from "./types";
import { Estado, FormatoPlato } from "./types";

// ============================================
// COMANDAS (sincronizadas con comandas de mesa)
// IDs coinciden para permitir sincronización bidireccional
// Los estados deben coincidir con SEED_COMANDAS_MESA en mesas/seed.ts
// ============================================
export const SEED_COMANDAS: Comanda[] = [
  // Mesa 1 - Comanda 2 (la comanda 1 solo tiene bebidas)
  {
    id: "comanda-mesa1-2",
    numComanda: 2,
    mesaId: "mesa-1",
    numMesa: 1,
    fechaCreacion: new Date("2025-12-20T09:31:00"),
    lineas: [
      {
        id: "lm-1-3",
        productoVendibleId: "pv-10",
        productoNombre: "Papas Bravas",
        cantidad: 2,
        estado: Estado.REALIZADO, // Sincronizado con mesas/seed.ts
        formato: FormatoPlato.TAPA,
      },
      {
        id: "lm-1-4",
        productoVendibleId: "pv-11",
        productoNombre: "Chocos Fritos Plato",
        cantidad: 1,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.RACION,
      },
    ],
  },
  // Mesa 3 - Comanda 1
  {
    id: "comanda-mesa3-1",
    numComanda: 1,
    mesaId: "mesa-3",
    numMesa: 3,
    fechaCreacion: new Date("2025-12-20T13:05:00"),
    lineas: [
      {
        id: "lm-3-1",
        productoVendibleId: "pv-13",
        productoNombre: "Secreto al Whisky",
        cantidad: 2,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.RACION,
      },
    ],
  },
  // Mesa 5 - Comanda 1
  {
    id: "comanda-mesa5-1",
    numComanda: 1,
    mesaId: "mesa-5",
    numMesa: 5,
    fechaCreacion: new Date("2025-12-20T13:20:00"),
    lineas: [
      {
        id: "lm-5-1",
        productoVendibleId: "pv-14",
        productoNombre: "Albóndigas",
        cantidad: 3,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.MEDIA,
      },
      {
        id: "lm-5-2",
        productoVendibleId: "pv-12",
        productoNombre: "Ensalada Mixta",
        cantidad: 1,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.RACION,
      },
    ],
  },
  // Mesa 7 - Comanda 2 (la comanda 1 solo tiene bebida)
  {
    id: "comanda-mesa7-2",
    numComanda: 2,
    mesaId: "mesa-7",
    numMesa: 7,
    fechaCreacion: new Date("2025-12-20T12:15:00"),
    lineas: [
      {
        id: "lm-7-2",
        productoVendibleId: "pv-18",
        productoNombre: "Gambas al ajillo",
        cantidad: 1,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.TAPA,
      },
      {
        id: "lm-7-3",
        productoVendibleId: "pv-19",
        productoNombre: "Tortilla española",
        cantidad: 1,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.MEDIA,
      },
    ],
  },
];
