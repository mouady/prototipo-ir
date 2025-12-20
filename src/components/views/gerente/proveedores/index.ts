/**
 * Módulo de Proveedores
 * 
 * Componentes para la gestión de proveedores del sistema de hostelería.
 * 
 * Basado en el modelo conceptual (mc-ir.iuml):
 * - Proveedor: nombre, cif, tlf, email
 * - Relación: Proveedor "1" -- "0..*" Producto : vende
 * 
 * RN-20: tlf, cif y email deben respetar formatos válidos.
 * 
 * UI/UX según especificación en proveedores.md:
 * - Vista Principal: Lista de tarjetas con información y métricas
 * - Modo Edición: Formulario en bulk para editar múltiples proveedores
 * - Modal Crear: Añadir nuevo proveedor
 * - Modal Eliminar: Confirmación con detalle de consecuencias
 */

export { ProveedoresPage } from "./ProveedoresPage";
export { ProveedorCard } from "./ProveedorCard";
export { ProveedorEditRow } from "./ProveedorEditRow";
export { ProveedorModal } from "./ProveedorModal";
export { EliminarProveedorModal } from "./EliminarProveedorModal";
export type { NuevoProveedor, ActualizarProveedor, MetricasProveedor } from "./types";
