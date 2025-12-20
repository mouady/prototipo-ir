/**
 * Tipos y enumeraciones compartidas entre todos los módulos
 * Basado en el modelo conceptual (mc-ir.iuml)
 */

// ============================================
// ENUMERACIONES GLOBALES
// ============================================

/**
 * DiaSemana según el modelo conceptual
 * Enumeración de los siete días de la semana
 */
export enum DiaSemana {
  LUNES = "LUNES",
  MARTES = "MARTES",
  MIERCOLES = "MIERCOLES",
  JUEVES = "JUEVES",
  VIERNES = "VIERNES",
  SABADO = "SABADO",
  DOMINGO = "DOMINGO",
}

/**
 * TipoContrato según el modelo conceptual
 * Define los tipos de contrato laboral (RN-06)
 */
export enum TipoContrato {
  INDEFINIDO = "INDEFINIDO",
  TEMPORAL = "TEMPORAL",
}

/**
 * Género según el modelo conceptual
 * Representa el género de un empleado
 */
export enum Genero {
  MASCULINO = "MASCULINO",
  FEMENINO = "FEMENINO",
  OTRO = "OTRO",
}

/**
 * Rol del empleado en el restaurante
 */
export enum RolEmpleado {
  CAMARERO = "CAMARERO",
  COCINERO = "COCINERO",
}

/**
 * Estados de una línea de comanda
 */
export enum Estado {
  EN_PREPARACION = "EN_PREPARACION",
  REALIZADO = "REALIZADO",
  SERVIDO = "SERVIDO",
  FINALIZADO = "FINALIZADO",
}

// ============================================
// INTERFACES BASE DE USUARIOS
// ============================================

/**
 * User base según el modelo conceptual
 * Contiene información común a todos los usuarios
 */
export interface User {
  id: string;
  nombre: string;
  apellidos: string;
  imagenPerfil?: string;
  email?: string;
  username: string;
  password?: string;
}

// NOTA: Cocinero ya no se define aquí de forma simplificada.
// Los cocineros son Empleados con rol COCINERO (ver empleados/types.ts).
// Para obtener datos de cocineros, usar el módulo de empleados filtrando por RolEmpleado.COCINERO.
