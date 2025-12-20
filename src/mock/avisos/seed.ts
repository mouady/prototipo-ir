/**
 * Datos semilla para el módulo de avisos de reposición
 * 
 * IMPORTANTE: Los cocineros referencian a los empleados del módulo de empleados.
 * Los cocineros según empleados/seed.ts son:
 * - emp-1: Antonio García López (COCINERO)
 * - emp-3: Carlos Martínez Sánchez (COCINERO)
 * - emp-6: Ana Rodríguez Gómez (COCINERO)
 */

import type { AvisoReposicion } from "./types";

// ============================================
// AVISOS DE REPOSICIÓN (según modelo: fechaSolicitud, atendido, comentario)
// Cocinero "1" -- "0..*" AvisoReposicion : "avisa"
// ============================================
export const SEED_AVISOS_REPOSICION: AvisoReposicion[] = [
  {
    id: "aviso-1",
    fechaSolicitud: new Date("2025-12-19T10:30:00"),
    atendido: false,
    comentario: "La harina es mejor adquirirla de CashAlternativo ya que la de CashSupremo es muy mala.",
    cocineroId: "emp-1", // Antonio García López
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
    cocineroId: "emp-3", // Carlos Martínez Sánchez
    cocineroNombre: "Carlos",
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
    cocineroId: "emp-6", // Ana Rodríguez Gómez
    cocineroNombre: "Ana",
    lineas: [
      { id: "linea-3-1", productoId: "prod-4", productoNombre: "Patatas" },
    ],
  },
];
