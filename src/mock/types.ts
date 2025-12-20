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
// INTERFACES: USUARIOS (simplificado para mocks)
// ============================================

/**
 * Cocinero según el modelo: hereda de Empleado
 * Simplificado para el prototipo
 */
export interface Cocinero {
  id: string;
  nombre: string;
  apellidos: string;
  imagenPerfil?: string;
}

// ============================================
// INTERFACES: AVISOS DE REPOSICIÓN
// ============================================

/**
 * Línea de un aviso de reposición
 * Según el modelo: corresponde a un Producto
 */
export interface LineaAvisoReposicion {
  id: string;
  productoId: string;
  productoNombre: string; // Desnormalizado para facilitar UI
}

/**
 * Aviso de reposición generado por un cocinero
 * Según el modelo: fechaSolicitud, atendido, comentario
 */
export interface AvisoReposicion {
  id: string;
  fechaSolicitud: Date;
  atendido: boolean;
  comentario?: string;
  cocineroId: string;
  cocineroNombre: string; // Desnormalizado para facilitar UI
  lineas: LineaAvisoReposicion[];
}

// Tipo para crear un aviso (sin id, se genera automáticamente)
export type NuevoAvisoReposicion = Omit<AvisoReposicion, "id" | "lineas"> & {
  lineas: Omit<LineaAvisoReposicion, "id">[];
};

// ============================================
// ENUMERACIONES: COMANDAS
// ============================================

export enum Estado {
  EN_PREPARACION = "EN_PREPARACION",
  REALIZADO = "REALIZADO",
  SERVIDO = "SERVIDO",
  FINALIZADO = "FINALIZADO",
}

export enum FormatoPlato {
  ESTANDAR = "Estándar",
  TAPA = "Tapa",
  MEDIA = "1/2",
  RACION = "Entera",
}

// ============================================
// INTERFACES: COMANDAS
// ============================================

/**
 * Línea de comanda según el modelo
 * Según el modelo: estado, cantidad, corresponde a ProductoVendible
 */
export interface LineaComanda {
  id: string;
  productoVendibleId: string;
  productoNombre: string; // Desnormalizado para facilitar UI
  cantidad: number;
  estado: Estado;
  formato?: FormatoPlato; // Solo para platos
}

/**
 * Comanda según el modelo
 * Contiene líneas de comanda y está asociada a una mesa
 */
export interface Comanda {
  id: string;
  numComanda: number;
  mesaId: string;
  numMesa: number; // Desnormalizado para UI
  lineas: LineaComanda[];
  fechaCreacion: Date;
}

// ============================================
// TIPOS AUXILIARES
// ============================================

// Tipo para crear un producto (sin id, se genera automáticamente)
export type NuevoProducto = Omit<Producto, "id">;

