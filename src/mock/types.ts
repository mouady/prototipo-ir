/**
 * Tipos compartidos para todo el sistema de inventario
 */

export interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  imagen: string;
  descripcion?: string;
}

export interface CategoriaProducto {
  id: string;
  nombre: string;
  icono: string;
  alerta?: string;
}

export interface Ingrediente {
  id: string;
  nombre: string;
  proveedor: string;
  cantidad: number;
  stockActual: number;
  stockTotal: number;
  unidad: string;
  umbral?: number;
  destacado?: boolean;
}

export interface Proveedor {
  id: string;
  nombre: string;
}

export interface MenuProveedor {
  id: string;
  nombre: string;
}

// Tipo para crear un ingrediente (sin id, se genera automáticamente)
export type NuevoIngrediente = Omit<Ingrediente, "id">;
