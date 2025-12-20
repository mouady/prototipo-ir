/**
 * Tipos para el módulo de inventario
 * Basado en el modelo conceptual (mc-ir.iuml)
 */

// ============================================
// ENUMERACIONES DE INVENTARIO
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

/**
 * FormatoPlato - Define los diferentes tamaños o presentaciones de un plato
 * Según el modelo: ESTANDAR, TAPA, MEDIA, RACION
 */
export enum FormatoPlato {
  ESTANDAR = "ESTANDAR",
  TAPA = "TAPA",
  MEDIA = "MEDIA",
  RACION = "RACION",
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
  /**
   * RN-03 / RN-19 (mc-ir.iuml):
   * - Solo se puede especificar si tipoProducto es BEBIDA
   * - litros >= 0
   *
   * En el prototipo representa el volumen del envase/formato (p. ej. 0.33L).
   */
  litros?: number;
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
 * Lote de producto
 * Según el modelo: caducidad, precio, cantidad
 * RN-18: Si el lote ha caducado no puede usarse para venderse.
 */
export interface Lote {
  id: string;
  productoId: string;
  /** Fecha de caducidad (opcional según el modelo) */
  caducidad?: Date;
  /** Precio de compra del lote */
  precio: number;
  /** Cantidad del lote */
  cantidad: number;
  /** Fecha de entrada del lote al inventario */
  fechaEntrada: Date;
}

/** Tipo para crear un nuevo lote (sin id) */
export type NuevoLote = Omit<Lote, "id">;

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
 * FormatoP - Define un formato específico de un plato
 * Según el modelo: formatoPlato, precio, tiempoPreparacion
 */
export interface FormatoP {
  id: string;
  formatoPlato: FormatoPlato;
  precio: number;
  /** Tiempo de preparación en minutos */
  tiempoPreparacion: number;
}

/**
 * Plato - extiende ProductoVendible
 * Tiene uno o más formatos (FormatoP)
 */
export interface Plato extends ProductoVendible {
  tipo: "plato";
  /** Formatos disponibles del plato (al menos uno según RN del modelo) */
  formatos: FormatoP[];
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

/** Tipo para editar un lote existente */
export type ActualizarLote = Partial<Omit<Lote, "id" | "productoId">>;

// Tipo para crear un formato (sin id, se genera automáticamente)
export type NuevoFormato = Omit<FormatoP, "id">;
