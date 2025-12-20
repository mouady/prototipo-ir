/**
 * Datos semilla para el módulo de avisos de reposición
 */

import type { AvisoReposicion } from "./types";
import type { Cocinero } from "../shared/types";

// ============================================
// COCINEROS (según modelo: Empleado con especialización)
// ============================================
export const SEED_COCINEROS: Cocinero[] = [
  {
    id: "cocinero-1",
    nombre: "Antonio",
    apellidos: "García López",
    imagenPerfil: undefined,
  },
  {
    id: "cocinero-2",
    nombre: "María",
    apellidos: "Fernández Ruiz",
    imagenPerfil: undefined,
  },
  {
    id: "cocinero-3",
    nombre: "Pedro",
    apellidos: "Martínez Sánchez",
    imagenPerfil: undefined,
  },
];

// ============================================
// AVISOS DE REPOSICIÓN (según modelo: fechaSolicitud, atendido, comentario)
// ============================================
export const SEED_AVISOS_REPOSICION: AvisoReposicion[] = [
  {
    id: "aviso-1",
    fechaSolicitud: new Date("2025-12-19T10:30:00"),
    atendido: false,
    comentario: "La harina es mejor adquirirla de CashAlternativo ya que la de CashSupremo es muy mala.",
    cocineroId: "cocinero-1",
    cocineroNombre: "Antonio",
    lineas: [
      { id: "linea-1-1", productoId: "prod-1", productoNombre: "Harina" },
      { id: "linea-1-2", productoId: "prod-6", productoNombre: "Espárragos" },
      { id: "linea-1-3", productoId: "prod-7", productoNombre: "Salmón" },
    ],
  },
  {
    id: "aviso-2",
    fechaSolicitud: new Date("2025-12-18T14:15:00"),
    atendido: true,
    comentario: undefined,
    cocineroId: "cocinero-2",
    cocineroNombre: "María",
    lineas: [
      { id: "linea-2-1", productoId: "prod-2", productoNombre: "Aceite de oliva" },
      { id: "linea-2-2", productoId: "prod-3", productoNombre: "Tomate triturado" },
    ],
  },
  {
    id: "aviso-3",
    fechaSolicitud: new Date("2025-12-17T09:00:00"),
    atendido: true,
    comentario: "Urgente para el servicio de mediodía.",
    cocineroId: "cocinero-3",
    cocineroNombre: "Pedro",
    lineas: [
      { id: "linea-3-1", productoId: "prod-4", productoNombre: "Patatas" },
    ],
  },
];
