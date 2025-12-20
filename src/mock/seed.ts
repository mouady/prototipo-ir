/**
 * Datos semilla (seed data)
 * Estos son los datos iniciales con los que se carga la aplicación.
 * Son inmutables y sirven como base.
 * Al reiniciar la app, solo estos datos persistirán.
 * 
 * Basado en el modelo conceptual (mc-ir.iuml)
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
    descripcion: "Entrantes",
  },
  {
    id: "plato-2",
    nombre: "Secreto al whisky",
    tipo: "plato",
    imagen: "/platos/whisky.png",
    categoriaCarta: CategoriaCarta.CALENTITO,
    descripcion: "Carnes",
  },
  {
    id: "plato-3",
    nombre: "Chocos Fritos",
    tipo: "plato",
    imagen: "/platos/chocos.png",
    categoriaCarta: CategoriaCarta.PESCADO_FRITO,
    descripcion: "Pescados, Fritos",
  },
  {
    id: "plato-4",
    nombre: "Albóndigas",
    tipo: "plato",
    imagen: "/platos/albondigas.png",
    categoriaCarta: CategoriaCarta.CALENTITO,
    descripcion: "Carnes",
  },
  {
    id: "plato-5",
    nombre: "San Jacobo",
    tipo: "plato",
    imagen: "/platos/sanJacobo.png",
    categoriaCarta: CategoriaCarta.EN_FRIO,
    descripcion: "Entrantes",
  },
  {
    id: "plato-6",
    nombre: "Ensalada mixta",
    tipo: "plato",
    imagen: "/platos/mixta.png",
    categoriaCarta: CategoriaCarta.ENSALADAS,
    descripcion: "Ensaladas",
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
