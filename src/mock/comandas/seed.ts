/**
 * Datos semilla para el módulo de comandas
 */

import type { Comanda } from "./types";
import { Estado, FormatoPlato } from "./types";

// ============================================
// COMANDAS (según modelo: LineaComanda con estado, cantidad, ProductoVendible)
// ============================================
export const SEED_COMANDAS: Comanda[] = [
  {
    id: "comanda-1",
    numComanda: 1,
    mesaId: "mesa-1",
    numMesa: 1,
    fechaCreacion: new Date("2025-12-20T13:00:00"),
    lineas: [
      {
        id: "lc-1-1",
        productoVendibleId: "plato-carne-toro",
        productoNombre: "Carne al toro",
        cantidad: 1,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.TAPA,
      },
      {
        id: "lc-1-2",
        productoVendibleId: "plato-albondigas",
        productoNombre: "Albondigas en salsa",
        cantidad: 2,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.MEDIA,
      },
      {
        id: "lc-1-3",
        productoVendibleId: "plato-croquetas",
        productoNombre: "Croquetas caseras",
        cantidad: 1,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.RACION,
      },
    ],
  },
  {
    id: "comanda-4",
    numComanda: 4,
    mesaId: "mesa-4",
    numMesa: 4,
    fechaCreacion: new Date("2025-12-20T13:15:00"),
    lineas: [
      {
        id: "lc-4-1",
        productoVendibleId: "plato-mini-hamburguesa",
        productoNombre: "Mini hamburguesa de atún",
        cantidad: 2,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.MEDIA,
      },
      {
        id: "lc-4-2",
        productoVendibleId: "plato-brocheta",
        productoNombre: "Brocheta de solomillo",
        cantidad: 1,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.ESTANDAR,
      },
    ],
  },
  {
    id: "comanda-5",
    numComanda: 5,
    mesaId: "mesa-5",
    numMesa: 5,
    fechaCreacion: new Date("2025-12-20T13:20:00"),
    lineas: [
      {
        id: "lc-5-1",
        productoVendibleId: "plato-solomillo",
        productoNombre: "Solomillo de cerdo",
        cantidad: 3,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.TAPA,
      },
      {
        id: "lc-5-2",
        productoVendibleId: "plato-chocos",
        productoNombre: "Chocos",
        cantidad: 2,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.RACION,
      },
    ],
  },
  {
    id: "comanda-7",
    numComanda: 7,
    mesaId: "mesa-7",
    numMesa: 7,
    fechaCreacion: new Date("2025-12-20T13:30:00"),
    lineas: [
      {
        id: "lc-7-1",
        productoVendibleId: "plato-cazon",
        productoNombre: "Cazón en adobo",
        cantidad: 2,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.RACION,
      },
      {
        id: "lc-7-2",
        productoVendibleId: "plato-calamares",
        productoNombre: "Calamares",
        cantidad: 1,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.MEDIA,
      },
    ],
  },
  {
    id: "comanda-9",
    numComanda: 9,
    mesaId: "mesa-9",
    numMesa: 9,
    fechaCreacion: new Date("2025-12-20T13:45:00"),
    lineas: [
      {
        id: "lc-9-1",
        productoVendibleId: "plato-carne-toro",
        productoNombre: "Carne al toro",
        cantidad: 2,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.RACION,
      },
      {
        id: "lc-9-2",
        productoVendibleId: "plato-hamburguesa-retinto",
        productoNombre: "Hamburguesa de retinto con queso de cabra y cebolla caramelizada",
        cantidad: 1,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.MEDIA,
      },
    ],
  },
];
