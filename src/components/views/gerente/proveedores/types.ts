/**
 * Tipos para el módulo de proveedores
 * Basado en el modelo conceptual (mc-ir.iuml)
 */

import { Proveedor } from "@/mock";

// Re-export del tipo Proveedor
export type { Proveedor };

/**
 * Tipo para crear un proveedor (sin id, se genera automáticamente)
 * 
 * RN-20: tlf, cif y email deben respetar formatos válidos.
 */
export type NuevoProveedor = Omit<Proveedor, "id">;

/**
 * Tipo para actualizar un proveedor (todos los campos opcionales excepto id)
 */
export type ActualizarProveedor = Partial<Omit<Proveedor, "id">>;

/**
 * Métricas de productos asociados a un proveedor
 * Para mostrar en las badges de las tarjetas
 */
export interface MetricasProveedor {
  pedidos: number;
  bebidas: number;
  recursos: number;
}
