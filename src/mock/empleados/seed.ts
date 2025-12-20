/**
 * Datos semilla para el módulo de empleados
 */

import type { Empleado } from "./types";
import { TipoContrato, Genero, RolEmpleado } from "./types";

// ============================================
// EMPLEADOS (Camareros y Cocineros)
// ============================================

/**
 * Datos semilla de empleados
 * Según el modelo conceptual: Empleado hereda de User
 * Puede ser Camarero o Cocinero
 */
export const SEED_EMPLEADOS: Empleado[] = [
  {
    id: "emp-1",
    nombre: "Antonio",
    apellidos: "García López",
    imagenPerfil: "/empleados/antonio.png",
    username: "agarcia",
    dni: "12345678A",
    fechaNacimiento: "1990-05-15",
    genero: Genero.MASCULINO,
    tipoContrato: TipoContrato.TEMPORAL,
    finContrato: "2026-03-12",
    activo: true,
    rol: RolEmpleado.COCINERO,
  },
  {
    id: "emp-2",
    nombre: "María",
    apellidos: "Fernández Ruiz",
    imagenPerfil: "/empleados/maria.png",
    username: "mfernandez",
    dni: "87654321B",
    fechaNacimiento: "1988-11-22",
    genero: Genero.FEMENINO,
    tipoContrato: TipoContrato.INDEFINIDO,
    activo: true,
    rol: RolEmpleado.CAMARERO,
  },
  {
    id: "emp-3",
    nombre: "Carlos",
    apellidos: "Martínez Sánchez",
    imagenPerfil: "/empleados/jose.png",
    username: "cmartinez",
    dni: "11223344C",
    fechaNacimiento: "1995-03-08",
    genero: Genero.MASCULINO,
    tipoContrato: TipoContrato.INDEFINIDO,
    activo: true,
    rol: RolEmpleado.COCINERO,
  },
  {
    id: "emp-4",
    nombre: "Laura",
    apellidos: "Jiménez Torres",
    imagenPerfil: "/empleados/laura.png",
    username: "ljimenez",
    dni: "44332211D",
    fechaNacimiento: "1992-07-30",
    genero: Genero.FEMENINO,
    tipoContrato: TipoContrato.TEMPORAL,
    finContrato: "2025-06-30",
    activo: false,
    rol: RolEmpleado.CAMARERO,
  },
  {
    id: "emp-5",
    nombre: "Pedro",
    apellidos: "López Navarro",
    imagenPerfil: "/empleados/manuel.png",
    username: "plopez",
    dni: "55667788E",
    fechaNacimiento: "1985-12-10",
    genero: Genero.MASCULINO,
    tipoContrato: TipoContrato.INDEFINIDO,
    activo: true,
    rol: RolEmpleado.CAMARERO,
  },
  {
    id: "emp-6",
    nombre: "Ana",
    apellidos: "Rodríguez Gómez",
    imagenPerfil: "/empleados/ana.png",
    username: "arodriguez",
    dni: "99887766F",
    fechaNacimiento: "1998-09-05",
    genero: Genero.FEMENINO,
    tipoContrato: TipoContrato.TEMPORAL,
    finContrato: "2025-12-31",
    activo: true,
    rol: RolEmpleado.COCINERO,
  },
];
