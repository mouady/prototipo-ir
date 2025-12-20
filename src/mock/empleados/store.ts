/**
 * Store del módulo de empleados
 * Maneja el estado en memoria de empleados
 */

import type { Empleado, NuevoEmpleado, ActualizarEmpleado } from "./types";
import { TipoContrato, RolEmpleado } from "./types";
import { SEED_EMPLEADOS } from "./seed";
import { notifyListeners } from "../shared/store-base";

// ============================================
// ESTADO EN MEMORIA (Runtime)
// ============================================
let runtimeEmpleados: Empleado[] = [];
const modificacionesEmpleados: Map<string, Empleado> = new Map();
const empleadosEliminados: Set<string> = new Set();
let nextEmpleadoId = 7; // Empezamos en 7 porque hay 6 empleados seed

// ============================================
// GETTERS
// ============================================

/** Obtiene todos los empleados */
export function getEmpleados(): Empleado[] {
  const seedEmpleados = SEED_EMPLEADOS.filter((e) => !empleadosEliminados.has(e.id))
    .map((e) =>
      modificacionesEmpleados.has(e.id)
        ? modificacionesEmpleados.get(e.id)!
        : e
    );
  return [...seedEmpleados, ...runtimeEmpleados];
}

/** Obtiene empleados filtrados por rol */
export function getEmpleadosByRol(rol: RolEmpleado): Empleado[] {
  return getEmpleados().filter((e) => e.rol === rol);
}

/** Obtiene solo los camareros */
export function getCamareros(): Empleado[] {
  return getEmpleadosByRol(RolEmpleado.CAMARERO);
}

/** Obtiene solo los cocineros empleados (con todos sus datos) */
export function getCocinerosEmpleados(): Empleado[] {
  return getEmpleadosByRol(RolEmpleado.COCINERO);
}

/** Obtiene un empleado por ID */
export function getEmpleadoById(id: string): Empleado | undefined {
  return getEmpleados().find((e) => e.id === id);
}

/** Obtiene empleados activos */
export function getEmpleadosActivos(): Empleado[] {
  return getEmpleados().filter((e) => e.activo);
}

/** Obtiene empleados inactivos */
export function getEmpleadosInactivos(): Empleado[] {
  return getEmpleados().filter((e) => !e.activo);
}

// ============================================
// HELPERS
// ============================================

/** Helper para normalizar datos de empleado según reglas de negocio */
function normalizarDatosEmpleado(datos: ActualizarEmpleado, empleadoActual: Empleado): ActualizarEmpleado {
  const resultado = { ...datos };
  
  // RN-06: finContrato debe ser null si y solo si tipoContrato es INDEFINIDO
  const tipoContratoFinal = datos.tipoContrato ?? empleadoActual.tipoContrato;
  if (tipoContratoFinal === TipoContrato.INDEFINIDO) {
    resultado.finContrato = undefined;
  }
  
  return resultado;
}

// ============================================
// MUTATIONS
// ============================================

/**
 * Agrega un nuevo empleado
 * RN-06: Si tipoContrato es INDEFINIDO, finContrato debe ser undefined
 */
export function agregarEmpleado(datos: NuevoEmpleado): Empleado {
  // Normalizar datos según reglas de negocio
  const datosNormalizados = { ...datos };
  
  // RN-06: finContrato debe ser null si y solo si tipoContrato es INDEFINIDO
  if (datosNormalizados.tipoContrato === TipoContrato.INDEFINIDO) {
    datosNormalizados.finContrato = undefined;
  }

  const nuevoEmpleado: Empleado = {
    ...datosNormalizados,
    id: `emp-runtime-${nextEmpleadoId++}`,
  };

  runtimeEmpleados.push(nuevoEmpleado);
  notifyListeners();
  return nuevoEmpleado;
}

/**
 * Actualiza un empleado existente
 * RN-06: Si tipoContrato es INDEFINIDO, finContrato debe ser undefined
 */
export function actualizarEmpleado(id: string, datos: ActualizarEmpleado): Empleado | null {
  // Buscar en runtime primero
  const runtimeIndex = runtimeEmpleados.findIndex((e) => e.id === id);
  if (runtimeIndex !== -1) {
    const empleadoActual = runtimeEmpleados[runtimeIndex];
    const datosNormalizados = normalizarDatosEmpleado(datos, empleadoActual);
    
    runtimeEmpleados[runtimeIndex] = {
      ...empleadoActual,
      ...datosNormalizados,
    };
    notifyListeners();
    return runtimeEmpleados[runtimeIndex];
  }

  // Buscar en seed
  const seedEmpleado = SEED_EMPLEADOS.find((e) => e.id === id);
  if (seedEmpleado && !empleadosEliminados.has(id)) {
    const empleadoActual = modificacionesEmpleados.get(id) || seedEmpleado;
    const datosNormalizados = normalizarDatosEmpleado(datos, empleadoActual);
    
    const empleadoActualizado: Empleado = {
      ...empleadoActual,
      ...datosNormalizados,
    };
    modificacionesEmpleados.set(id, empleadoActualizado);
    notifyListeners();
    return empleadoActualizado;
  }

  return null;
}

/** Elimina un empleado */
export function eliminarEmpleado(id: string): boolean {
  // Buscar en runtime primero
  const runtimeIndex = runtimeEmpleados.findIndex((e) => e.id === id);
  if (runtimeIndex !== -1) {
    runtimeEmpleados.splice(runtimeIndex, 1);
    notifyListeners();
    return true;
  }

  // Buscar en seed
  const seedEmpleado = SEED_EMPLEADOS.find((e) => e.id === id);
  if (seedEmpleado) {
    empleadosEliminados.add(id);
    modificacionesEmpleados.delete(id);
    notifyListeners();
    return true;
  }

  return false;
}

/** Cambia el estado activo/inactivo de un empleado */
export function toggleEmpleadoActivo(id: string): Empleado | null {
  const empleado = getEmpleadoById(id);
  if (!empleado) return null;
  
  return actualizarEmpleado(id, { activo: !empleado.activo });
}

// ============================================
// RESET
// ============================================

export function resetEmpleadosRuntime(): void {
  runtimeEmpleados = [];
  modificacionesEmpleados.clear();
  empleadosEliminados.clear();
  nextEmpleadoId = 7;
  notifyListeners();
}

// ============================================
// DEBUG
// ============================================

export function getEmpleadosDebugInfo() {
  return {
    seedEmpleados: SEED_EMPLEADOS.length,
    runtimeEmpleados: runtimeEmpleados.length,
    totalEmpleados: getEmpleados().length,
    empleadosActivos: getEmpleadosActivos().length,
  };
}
