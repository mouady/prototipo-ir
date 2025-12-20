/**
 * Tipos compartidos para todo el sistema de inventario
 * Basado en el modelo conceptual (mc-ir.iuml)
 */

// ============================================
// ENUMERACIONES (del modelo conceptual)
// ============================================

export enum TipoProducto {
  INGREDIENTE = "INGREDIENTE",
  BEBIDA = "BEBIDA",
  RECURSO = "RECURSO",
}

export enum UnidadMedida {
  KG = "kg",
  UNIDADES = "uds",
  LITROS = "l",
  GRAMOS = "g",
}

export enum CategoriaCarta {
  ENSALADAS = "ENSALADAS",
  EN_FRIO = "EN_FRIO",
  CALENTITO = "CALENTITO",
  PESCADO_FRITO = "PESCADO_FRITO",
  SUGERENCIAS = "SUGERENCIAS",
  REFRESCOS = "REFRESCOS",
  AGUA = "AGUA",
  CERVEZAS = "CERVEZAS",
  VINOS = "VINOS",
  INFUSIONES_Y_CAFE = "INFUSIONES_Y_CAFE",
  OTROS = "OTROS",
}

// ============================================
// INTERFACES: INVENTARIO
// ============================================

/**
 * Producto del inventario (ingredientes, bebidas, recursos)
 * Según el modelo: nombre, umbral, litros, unidadMedida, TipoProducto
 * 
 * Simplificación para mocks: incluimos stock directamente
 * en lugar de manejarlo a través de Lotes
 */
export interface Producto {
  id: string;
  nombre: string;
  tipoProducto: TipoProducto;
  unidadMedida: UnidadMedida;
  umbral?: number; // Umbral de alerta de stock bajo
  stock: number; // Simplificación: stock directo en lugar de Lotes
  proveedor?: string; // Referencia al proveedor (simplificado como string)
  destacado?: boolean; // Para UI: resaltar en amarillo
}

/**
 * Proveedor según el modelo: nombre, cif, tlf, email
 */
export interface Proveedor {
  id: string;
  nombre: string;
  cif: string;
  tlf: string;
  email: string;
}

/**
 * Lote de producto (simplificado para mocks)
 * Según el modelo: caducidad, precio, cantidad
 */
export interface Lote {
  id: string;
  productoId: string;
  caducidad?: Date;
  precio: number;
  cantidad: number;
}

// ============================================
// INTERFACES: PRODUCTOS VENDIBLES (Platos/Bebidas)
// ============================================

/**
 * ProductoVendible (abstracto en el modelo)
 * Según el modelo: nombre, imagen, categoriaCarta
 */
export interface ProductoVendible {
  id: string;
  nombre: string;
  imagen: string;
  categoriaCarta: CategoriaCarta;
}

/**
 * Plato - extiende ProductoVendible
 * Tiene uno o más formatos (FormatoP)
 */
export interface Plato extends ProductoVendible {
  tipo: "plato";
  descripcion?: string;
}

/**
 * Bebida vendible - extiende ProductoVendible  
 * Según el modelo: precio, litros
 */
export interface BebidaVendible extends ProductoVendible {
  tipo: "bebida";
  precio: number;
  litros: number;
}

// ============================================
// INTERFACES: UI / NAVEGACIÓN
// ============================================

/**
 * Categoría para la navegación del inventario (UI)
 */
export interface CategoriaInventario {
  id: string;
  nombre: string;
  icono: string;
  alerta?: string;
}

export interface MenuProveedor {
  id: string;
  nombre: string;
}

// ============================================
// TIPOS AUXILIARES
// ============================================

// Tipo para crear un producto (sin id, se genera automáticamente)
export type NuevoProducto = Omit<Producto, "id">;

