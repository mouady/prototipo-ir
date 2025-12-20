/**
 * Datos semilla (seed data)
 * Estos son los datos iniciales con los que se carga la aplicación.
 * Son inmutables y sirven como base.
 * Al reiniciar la app, solo estos datos persistirán.
 */

import {
  Producto,
  CategoriaProducto,
  Ingrediente,
  Proveedor,
  MenuProveedor,
} from "./types";

// ============================================
// CATEGORÍAS
// ============================================
export const SEED_CATEGORIAS: CategoriaProducto[] = [
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
// PRODUCTOS (PLATOS)
// ============================================
export const SEED_PRODUCTOS: Producto[] = [
  {
    id: "1",
    nombre: "Papas bravas",
    categoria: "platos",
    imagen: "/productos/papas-bravas.jpg",
    descripcion: "Entrantes",
  },
  {
    id: "2",
    nombre: "Secreto al whisky",
    categoria: "platos",
    imagen: "/productos/secreto-whisky.jpg",
    descripcion: "Carnes",
  },
  {
    id: "3",
    nombre: "Chocos Fritos",
    categoria: "platos",
    imagen: "/productos/chocos-fritos.jpg",
    descripcion: "Pescados, Fritos",
  },
  {
    id: "4",
    nombre: "Alcachofas en salsa",
    categoria: "platos",
    imagen: "/productos/alcachofas-salsa.jpg",
    descripcion: "Verduras",
  },
  {
    id: "5",
    nombre: "Con Jamón",
    categoria: "platos",
    imagen: "/productos/con-jamon.jpg",
    descripcion: "Entrantes",
  },
  {
    id: "6",
    nombre: "Ensalada mixta",
    categoria: "platos",
    imagen: "/productos/ensalada-mixta.jpg",
    descripcion: "Ensaladas",
  },
];

// ============================================
// INGREDIENTES
// ============================================
export const SEED_INGREDIENTES: Ingrediente[] = [
  {
    id: "seed-1",
    nombre: "Pimiento Rojo",
    proveedor: "Pimientos Juanito",
    cantidad: 4,
    stockActual: 12,
    stockTotal: 2,
    unidad: "kg",
  },
  {
    id: "seed-2",
    nombre: "Lentejas",
    proveedor: "CashSupremo",
    cantidad: 3,
    stockActual: 5,
    stockTotal: 3,
    unidad: "kg",
  },
  {
    id: "seed-3",
    nombre: "Carne Picada",
    proveedor: "CashSupremo",
    cantidad: 6,
    stockActual: 21,
    stockTotal: 33,
    unidad: "kg",
    destacado: true,
  },
  {
    id: "seed-4",
    nombre: "Lechuga",
    proveedor: "CashSupremo",
    cantidad: 1,
    stockActual: 17,
    stockTotal: 2,
    unidad: "kg",
  },
  {
    id: "seed-5",
    nombre: "Salmón",
    proveedor: "CashSupremo",
    cantidad: 4,
    stockActual: 3,
    stockTotal: 0,
    unidad: "kg",
  },
  {
    id: "seed-6",
    nombre: "Espárragos",
    proveedor: "CashSupremo",
    cantidad: 8,
    stockActual: 7,
    stockTotal: 5,
    unidad: "kg",
  },
  {
    id: "seed-7",
    nombre: "Gambas",
    proveedor: "CashSupremo",
    cantidad: 6,
    stockActual: 20,
    stockTotal: 20,
    unidad: "kg",
  },
  {
    id: "seed-8",
    nombre: "Huevos",
    proveedor: "CashSupremo",
    cantidad: 11,
    stockActual: 36,
    stockTotal: 34,
    unidad: "uds",
  },
  {
    id: "seed-9",
    nombre: "Pechuga Pollo",
    proveedor: "CashSupremo",
    cantidad: 2,
    stockActual: 75,
    stockTotal: 60,
    unidad: "kg",
  },
  {
    id: "seed-10",
    nombre: "Plátano",
    proveedor: "CashSupremo",
    cantidad: 0,
    stockActual: 4,
    stockTotal: 3,
    unidad: "kg",
  },
  {
    id: "seed-11",
    nombre: "Harina",
    proveedor: "CashSupremo",
    cantidad: 3,
    stockActual: 13,
    stockTotal: 14,
    unidad: "kg",
    destacado: true,
  },
];

// ============================================
// PROVEEDORES
// ============================================
export const SEED_PROVEEDORES: Proveedor[] = [
  { id: "cashsupremo", nombre: "CashSupremo" },
  { id: "pimientos-juanito", nombre: "Pimientos Juanito" },
  { id: "mercado-central", nombre: "Mercado Central" },
];

// ============================================
// MENÚ PROVEEDORES
// ============================================
export const SEED_MENU_PROVEEDORES: MenuProveedor[] = [
  { id: "listado", nombre: "Listado" },
  { id: "generador", nombre: "Generador de mensajes" },
];
