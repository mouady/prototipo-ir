/**
 * Datos semilla para el módulo de inventario
 * Estos son los datos iniciales con los que se carga la aplicación.
 * Son inmutables y sirven como base.
 */

import {
  Producto,
  Plato,
  Proveedor,
  CategoriaInventario,
  MenuProveedor,
  TipoProducto,
  UnidadMedida,
  CategoriaCarta,
  FormatoPlato,
  Lote,
} from "./types";

// ============================================
// CATEGORÍAS DE NAVEGACIÓN (UI)
// ============================================
export const SEED_CATEGORIAS: CategoriaInventario[] = [
  { id: "platos", nombre: "Platos", icono: "🍽️" },
  {
    id: "ingredientes",
    nombre: "Ingredientes",
    icono: "🥬",
    alerta: "¡Falta stock en dos ingredientes!",
  },
  {
    id: "bebidas",
    nombre: "Bebidas",
    icono: "🍷",
    alerta: "¡Falta stock en una bebida!",
  },
  {
    id: "recursos",
    nombre: "Recursos",
    icono: "📦",
    alerta: "No falta stock en ningún recurso",
  },
  { id: "avisos", nombre: "Avisos", icono: "⚠️", alerta: "1 aviso por atender" },
];

// ============================================
// PLATOS (ProductoVendible)
// ============================================
export const SEED_PLATOS: Plato[] = [
  {
    id: "plato-1",
    nombre: "Papas bravas",
    tipo: "plato",
    imagen: "/platos/bravas.png",
    categoriaCarta: CategoriaCarta.CALENTITO,
    formatos: [
      { id: "formato-1-1", formatoPlato: FormatoPlato.TAPA, precio: 3.5, tiempoPreparacion: 8 },
      { id: "formato-1-2", formatoPlato: FormatoPlato.MEDIA, precio: 5.5, tiempoPreparacion: 10 },
      { id: "formato-1-3", formatoPlato: FormatoPlato.RACION, precio: 8.0, tiempoPreparacion: 12 },
    ],
  },
  {
    id: "plato-2",
    nombre: "Secreto al whisky",
    tipo: "plato",
    imagen: "/platos/whisky.png",
    categoriaCarta: CategoriaCarta.CALENTITO,
    formatos: [
      { id: "formato-2-1", formatoPlato: FormatoPlato.MEDIA, precio: 9.0, tiempoPreparacion: 15 },
      { id: "formato-2-2", formatoPlato: FormatoPlato.RACION, precio: 14.5, tiempoPreparacion: 20 },
    ],
  },
  {
    id: "plato-3",
    nombre: "Chocos Fritos",
    tipo: "plato",
    imagen: "/platos/chocos.png",
    categoriaCarta: CategoriaCarta.PESCADO_FRITO,
    formatos: [
      { id: "formato-3-1", formatoPlato: FormatoPlato.TAPA, precio: 4.0, tiempoPreparacion: 10 },
      { id: "formato-3-2", formatoPlato: FormatoPlato.MEDIA, precio: 7.0, tiempoPreparacion: 12 },
      { id: "formato-3-3", formatoPlato: FormatoPlato.RACION, precio: 11.0, tiempoPreparacion: 15 },
    ],
  },
  {
    id: "plato-4",
    nombre: "Albóndigas",
    tipo: "plato",
    imagen: "/platos/albondigas.png",
    categoriaCarta: CategoriaCarta.CALENTITO,
    formatos: [
      { id: "formato-4-1", formatoPlato: FormatoPlato.TAPA, precio: 3.0, tiempoPreparacion: 5 },
      { id: "formato-4-2", formatoPlato: FormatoPlato.MEDIA, precio: 5.0, tiempoPreparacion: 8 },
      { id: "formato-4-3", formatoPlato: FormatoPlato.RACION, precio: 8.5, tiempoPreparacion: 10 },
    ],
  },
  {
    id: "plato-5",
    nombre: "San Jacobo",
    tipo: "plato",
    imagen: "/platos/sanJacobo.png",
    categoriaCarta: CategoriaCarta.EN_FRIO,
    formatos: [
      { id: "formato-5-1", formatoPlato: FormatoPlato.ESTANDAR, precio: 6.5, tiempoPreparacion: 12 },
    ],
  },
  {
    id: "plato-6",
    nombre: "Ensalada mixta",
    tipo: "plato",
    imagen: "/platos/mixta.png",
    categoriaCarta: CategoriaCarta.ENSALADAS,
    formatos: [
      { id: "formato-6-1", formatoPlato: FormatoPlato.ESTANDAR, precio: 7.0, tiempoPreparacion: 8 },
    ],
  },
];

// ============================================
// PRODUCTOS DEL INVENTARIO (Ingredientes, Bebidas, Recursos)
// ============================================
export const SEED_PRODUCTOS: Producto[] = [
  // INGREDIENTES
  {
    id: "prod-1",
    nombre: "Pimiento Rojo",
    tipoProducto: TipoProducto.INGREDIENTE,
    unidadMedida: UnidadMedida.KG,
    stock: 12,
    umbral: 5,
    proveedor: "Pimientos Juanito",
  },
  {
    id: "prod-2",
    nombre: "Lentejas",
    tipoProducto: TipoProducto.INGREDIENTE,
    unidadMedida: UnidadMedida.KG,
    stock: 5,
    umbral: 3,
    proveedor: "CashSupremo",
  },
  {
    id: "prod-3",
    nombre: "Carne Picada",
    tipoProducto: TipoProducto.INGREDIENTE,
    unidadMedida: UnidadMedida.KG,
    stock: 21,
    umbral: 10,
    proveedor: "CashSupremo",
    destacado: true,
  },
  {
    id: "prod-4",
    nombre: "Lechuga",
    tipoProducto: TipoProducto.INGREDIENTE,
    unidadMedida: UnidadMedida.KG,
    stock: 17,
    umbral: 5,
    proveedor: "CashSupremo",
  },
  {
    id: "prod-5",
    nombre: "Salmón",
    tipoProducto: TipoProducto.INGREDIENTE,
    unidadMedida: UnidadMedida.KG,
    stock: 3,
    umbral: 5,
    proveedor: "CashSupremo",
  },
  {
    id: "prod-6",
    nombre: "Espárragos",
    tipoProducto: TipoProducto.INGREDIENTE,
    unidadMedida: UnidadMedida.KG,
    stock: 7,
    umbral: 4,
    proveedor: "CashSupremo",
  },
  {
    id: "prod-7",
    nombre: "Gambas",
    tipoProducto: TipoProducto.INGREDIENTE,
    unidadMedida: UnidadMedida.KG,
    stock: 20,
    umbral: 8,
    proveedor: "CashSupremo",
  },
  {
    id: "prod-8",
    nombre: "Huevos",
    tipoProducto: TipoProducto.INGREDIENTE,
    unidadMedida: UnidadMedida.UNIDADES,
    stock: 36,
    umbral: 12,
    proveedor: "CashSupremo",
  },
  {
    id: "prod-9",
    nombre: "Pechuga Pollo",
    tipoProducto: TipoProducto.INGREDIENTE,
    unidadMedida: UnidadMedida.KG,
    stock: 75,
    umbral: 10,
    proveedor: "CashSupremo",
  },
  {
    id: "prod-10",
    nombre: "Plátano",
    tipoProducto: TipoProducto.INGREDIENTE,
    unidadMedida: UnidadMedida.KG,
    stock: 4,
    umbral: 5,
    proveedor: "CashSupremo",
  },
  {
    id: "prod-11",
    nombre: "Harina",
    tipoProducto: TipoProducto.INGREDIENTE,
    unidadMedida: UnidadMedida.KG,
    stock: 13,
    umbral: 5,
    proveedor: "CashSupremo",
    destacado: true,
  },

  // BEBIDAS (Producto del inventario)
  {
    id: "prod-12",
    nombre: "Coca-Cola",
    tipoProducto: TipoProducto.BEBIDA,
    unidadMedida: UnidadMedida.UNIDADES,
    litros: 0.33,
    stock: 24,
    umbral: 12,
    proveedor: "CashSupremo",
  },
  {
    id: "prod-13",
    nombre: "Agua",
    tipoProducto: TipoProducto.BEBIDA,
    unidadMedida: UnidadMedida.UNIDADES,
    litros: 0.5,
    stock: 18,
    umbral: 12,
    proveedor: "CashSupremo",
  },
  {
    id: "prod-14",
    nombre: "Vino tinto (copa)",
    tipoProducto: TipoProducto.BEBIDA,
    unidadMedida: UnidadMedida.UNIDADES,
    litros: 0.15,
    stock: 40,
    umbral: 10,
    proveedor: "Mercado Central",
  },

  // RECURSOS (no vendibles, material de operación)
  {
    id: "prod-15",
    nombre: "Servilletas",
    tipoProducto: TipoProducto.RECURSO,
    unidadMedida: UnidadMedida.UNIDADES,
    stock: 200,
    umbral: 80,
    proveedor: "CashSupremo",
  },
  {
    id: "prod-16",
    nombre: "Bombona de gas",
    tipoProducto: TipoProducto.RECURSO,
    unidadMedida: UnidadMedida.UNIDADES,
    stock: 2,
    umbral: 1,
    proveedor: "Mercado Central",
    destacado: true,
  },
];

// ============================================
// PROVEEDORES (según modelo: nombre, cif, tlf, email)
// ============================================
export const SEED_PROVEEDORES: Proveedor[] = [
  {
    id: "prov-1",
    nombre: "CashSupremo",
    cif: "B12345678",
    tlf: "954123456",
    email: "pedidos@cashsupremo.es",
  },
  {
    id: "prov-2",
    nombre: "Pimientos Juanito",
    cif: "B87654321",
    tlf: "954654321",
    email: "juanito@pimientos.es",
  },
  {
    id: "prov-3",
    nombre: "Mercado Central",
    cif: "B11223344",
    tlf: "954112233",
    email: "contacto@mercadocentral.es",
  },
];

// ============================================
// MENÚ PROVEEDORES (UI)
// ============================================
export const SEED_MENU_PROVEEDORES: MenuProveedor[] = [
  { id: "listado", nombre: "Listado" },
  { id: "generador", nombre: "Generador de mensajes" },
];

// ============================================
// LOTES (según modelo: caducidad, precio, cantidad)
// ============================================
export const SEED_LOTES: Lote[] = [
  // Lotes de Pimiento Rojo (prod-1)
  {
    id: "lote-1",
    productoId: "prod-1",
    caducidad: new Date("2025-01-15"),
    precio: 2.50,
    cantidad: 5,
    fechaEntrada: new Date("2024-12-10"),
  },
  {
    id: "lote-2",
    productoId: "prod-1",
    caducidad: new Date("2025-01-20"),
    precio: 2.30,
    cantidad: 7,
    fechaEntrada: new Date("2024-12-15"),
  },
  // Lotes de Lentejas (prod-2)
  {
    id: "lote-3",
    productoId: "prod-2",
    caducidad: new Date("2026-06-01"),
    precio: 1.80,
    cantidad: 5,
    fechaEntrada: new Date("2024-11-20"),
  },
  // Lotes de Carne Picada (prod-3)
  {
    id: "lote-4",
    productoId: "prod-3",
    caducidad: new Date("2024-12-28"),
    precio: 8.50,
    cantidad: 10,
    fechaEntrada: new Date("2024-12-18"),
  },
  {
    id: "lote-5",
    productoId: "prod-3",
    caducidad: new Date("2025-01-05"),
    precio: 8.20,
    cantidad: 11,
    fechaEntrada: new Date("2024-12-20"),
  },
  // Lotes de Coca-Cola (prod-12)
  {
    id: "lote-6",
    productoId: "prod-12",
    caducidad: new Date("2025-12-01"),
    precio: 0.45,
    cantidad: 24,
    fechaEntrada: new Date("2024-12-01"),
  },
  // Lotes de Agua (prod-13)
  {
    id: "lote-7",
    productoId: "prod-13",
    precio: 0.20,
    cantidad: 18,
    fechaEntrada: new Date("2024-12-05"),
  },
  // Lotes de Servilletas (prod-15) - recurso sin caducidad
  {
    id: "lote-8",
    productoId: "prod-15",
    precio: 0.01,
    cantidad: 200,
    fechaEntrada: new Date("2024-12-01"),
  },
  // Lotes de Bombona de gas (prod-16) - recurso sin caducidad
  {
    id: "lote-9",
    productoId: "prod-16",
    precio: 25.00,
    cantidad: 2,
    fechaEntrada: new Date("2024-11-15"),
  },
  // Lotes de Salmón (prod-5)
  {
    id: "lote-10",
    productoId: "prod-5",
    caducidad: new Date("2024-12-25"),
    precio: 15.00,
    cantidad: 3,
    fechaEntrada: new Date("2024-12-19"),
  },
];
