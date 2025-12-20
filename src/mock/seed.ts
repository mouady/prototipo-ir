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
  Cocinero,
  AvisoReposicion,
  Comanda,
  Estado,
  FormatoPlato,
  // Horarios
  DiaSemana,
  Horario,
  HorarioEspecial,
  RolEmpleado,
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

// ============================================
// COCINEROS (según modelo: Empleado con especialización)
// ============================================
export const SEED_COCINEROS: Cocinero[] = [
  {
    id: "cocinero-1",
    nombre: "Antonio",
    apellidos: "García López",
    imagenPerfil: undefined,
  },
  {
    id: "cocinero-2",
    nombre: "María",
    apellidos: "Fernández Ruiz",
    imagenPerfil: undefined,
  },
  {
    id: "cocinero-3",
    nombre: "Pedro",
    apellidos: "Martínez Sánchez",
    imagenPerfil: undefined,
  },
];

// ============================================
// AVISOS DE REPOSICIÓN (según modelo: fechaSolicitud, atendido, comentario)
// ============================================
export const SEED_AVISOS_REPOSICION: AvisoReposicion[] = [
  {
    id: "aviso-1",
    fechaSolicitud: new Date("2025-12-19T10:30:00"),
    atendido: false,
    comentario: "La harina es mejor adquirirla de CashAlternativo ya que la de CashSupremo es muy mala.",
    cocineroId: "cocinero-1",
    cocineroNombre: "Antonio",
    lineas: [
      { id: "linea-1-1", productoId: "prod-1", productoNombre: "Harina" },
      { id: "linea-1-2", productoId: "prod-6", productoNombre: "Espárragos" },
      { id: "linea-1-3", productoId: "prod-7", productoNombre: "Salmón" },
    ],
  },
  {
    id: "aviso-2",
    fechaSolicitud: new Date("2025-12-18T14:15:00"),
    atendido: true,
    comentario: undefined,
    cocineroId: "cocinero-2",
    cocineroNombre: "María",
    lineas: [
      { id: "linea-2-1", productoId: "prod-2", productoNombre: "Aceite de oliva" },
      { id: "linea-2-2", productoId: "prod-3", productoNombre: "Tomate triturado" },
    ],
  },
  {
    id: "aviso-3",
    fechaSolicitud: new Date("2025-12-17T09:00:00"),
    atendido: true,
    comentario: "Urgente para el servicio de mediodía.",
    cocineroId: "cocinero-3",
    cocineroNombre: "Pedro",
    lineas: [
      { id: "linea-3-1", productoId: "prod-4", productoNombre: "Patatas" },
    ],
  },
];

// ============================================
// COMANDAS (según modelo: LineaComanda con estado, cantidad, ProductoVendible)
// ============================================
export const SEED_COMANDAS: Comanda[] = [
  {
    id: "comanda-1",
    numComanda: 1,
    mesaId: "mesa-1",
    numMesa: 1,
    fechaCreacion: new Date("2025-12-20T13:00:00"),
    lineas: [
      {
        id: "lc-1-1",
        productoVendibleId: "plato-carne-toro",
        productoNombre: "Carne al toro",
        cantidad: 1,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.TAPA,
      },
      {
        id: "lc-1-2",
        productoVendibleId: "plato-albondigas",
        productoNombre: "Albondigas en salsa",
        cantidad: 2,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.MEDIA,
      },
      {
        id: "lc-1-3",
        productoVendibleId: "plato-croquetas",
        productoNombre: "Croquetas caseras",
        cantidad: 1,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.RACION,
      },
    ],
  },
  {
    id: "comanda-4",
    numComanda: 4,
    mesaId: "mesa-4",
    numMesa: 4,
    fechaCreacion: new Date("2025-12-20T13:15:00"),
    lineas: [
      {
        id: "lc-4-1",
        productoVendibleId: "plato-mini-hamburguesa",
        productoNombre: "Mini hamburguesa de atún",
        cantidad: 2,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.MEDIA,
      },
      {
        id: "lc-4-2",
        productoVendibleId: "plato-brocheta",
        productoNombre: "Brocheta de solomillo",
        cantidad: 1,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.ESTANDAR,
      },
    ],
  },
  {
    id: "comanda-5",
    numComanda: 5,
    mesaId: "mesa-5",
    numMesa: 5,
    fechaCreacion: new Date("2025-12-20T13:20:00"),
    lineas: [
      {
        id: "lc-5-1",
        productoVendibleId: "plato-solomillo",
        productoNombre: "Solomillo de cerdo",
        cantidad: 3,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.TAPA,
      },
      {
        id: "lc-5-2",
        productoVendibleId: "plato-chocos",
        productoNombre: "Chocos",
        cantidad: 2,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.RACION,
      },
    ],
  },
  {
    id: "comanda-7",
    numComanda: 7,
    mesaId: "mesa-7",
    numMesa: 7,
    fechaCreacion: new Date("2025-12-20T13:30:00"),
    lineas: [
      {
        id: "lc-7-1",
        productoVendibleId: "plato-cazon",
        productoNombre: "Cazón en adobo",
        cantidad: 2,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.RACION,
      },
      {
        id: "lc-7-2",
        productoVendibleId: "plato-calamares",
        productoNombre: "Calamares",
        cantidad: 1,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.MEDIA,
      },
    ],
  },
  {
    id: "comanda-9",
    numComanda: 9,
    mesaId: "mesa-9",
    numMesa: 9,
    fechaCreacion: new Date("2025-12-20T13:45:00"),
    lineas: [
      {
        id: "lc-9-1",
        productoVendibleId: "plato-carne-toro",
        productoNombre: "Carne al toro",
        cantidad: 2,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.RACION,
      },
      {
        id: "lc-9-2",
        productoVendibleId: "plato-hamburguesa-retinto",
        productoNombre: "Hamburguesa de retinto con queso de cabra y cebolla caramelizada",
        cantidad: 1,
        estado: Estado.EN_PREPARACION,
        formato: FormatoPlato.MEDIA,
      },
    ],
  },
];

// ============================================
// EMPLEADOS (Camareros y Cocineros)
// ============================================

import { TipoContrato, Genero, Empleado } from "./types";

/**
 * Datos semilla de empleados
 * Según el modelo conceptual: Empleado hereda de User
 * Puede ser Camarero o Cocinero
 */
export const SEED_EMPLEADOS: Empleado[] = [
  {
    id: "emp-1",
    nombre: "Antonio",
    apellidos: "García López",
    imagenPerfil: "/empleados/antonio.png",
    username: "agarcia",
    dni: "12345678A",
    fechaNacimiento: "1990-05-15",
    genero: Genero.MASCULINO,
    tipoContrato: TipoContrato.TEMPORAL,
    finContrato: "2026-03-12",
    activo: true,
    rol: RolEmpleado.COCINERO,
  },
  {
    id: "emp-2",
    nombre: "María",
    apellidos: "Fernández Ruiz",
    imagenPerfil: "/empleados/maria.png",
    username: "mfernandez",
    dni: "87654321B",
    fechaNacimiento: "1988-11-22",
    genero: Genero.FEMENINO,
    tipoContrato: TipoContrato.INDEFINIDO,
    activo: true,
    rol: RolEmpleado.CAMARERO,
  },
  {
    id: "emp-3",
    nombre: "Carlos",
    apellidos: "Martínez Sánchez",
    imagenPerfil: "/empleados/jose.png",
    username: "cmartinez",
    dni: "11223344C",
    fechaNacimiento: "1995-03-08",
    genero: Genero.MASCULINO,
    tipoContrato: TipoContrato.INDEFINIDO,
    activo: true,
    rol: RolEmpleado.COCINERO,
  },
  {
    id: "emp-4",
    nombre: "Laura",
    apellidos: "Jiménez Torres",
    imagenPerfil: "/empleados/carmen.png",
    username: "ljimenez",
    dni: "44332211D",
    fechaNacimiento: "1992-07-30",
    genero: Genero.FEMENINO,
    tipoContrato: TipoContrato.TEMPORAL,
    finContrato: "2025-06-30",
    activo: false,
    rol: RolEmpleado.CAMARERO,
  },
  {
    id: "emp-5",
    nombre: "Pedro",
    apellidos: "López Navarro",
    imagenPerfil: "/empleados/manuel.png",
    username: "plopez",
    dni: "55667788E",
    fechaNacimiento: "1985-12-10",
    genero: Genero.MASCULINO,
    tipoContrato: TipoContrato.INDEFINIDO,
    activo: true,
    rol: RolEmpleado.CAMARERO,
  },
  {
    id: "emp-6",
    nombre: "Ana",
    apellidos: "Rodríguez Gómez",
    imagenPerfil: "/empleados/carmen.png",
    username: "arodriguez",
    dni: "99887766F",
    fechaNacimiento: "1998-09-05",
    genero: Genero.FEMENINO,
    tipoContrato: TipoContrato.TEMPORAL,
    finContrato: "2025-12-31",
    activo: true,
    rol: RolEmpleado.COCINERO,
  },
];

// ============================================
// HORARIOS GENERALES
// ============================================

/**
 * Horarios generales del restaurante
 * Define el horario de apertura y cierre para cada día de la semana
 */
export const SEED_HORARIOS: Horario[] = [
  {
    id: "horario-1",
    diaSemana: DiaSemana.LUNES,
    horaApertura: "08:00",
    horaCierre: "00:00",
  },
  {
    id: "horario-2",
    diaSemana: DiaSemana.MARTES,
    horaApertura: "08:00",
    horaCierre: "00:00",
  },
  {
    id: "horario-3",
    diaSemana: DiaSemana.MIERCOLES,
    horaApertura: "08:00",
    horaCierre: "00:00",
  },
  {
    id: "horario-4",
    diaSemana: DiaSemana.JUEVES,
    horaApertura: "08:00",
    horaCierre: "00:00",
  },
  {
    id: "horario-5",
    diaSemana: DiaSemana.VIERNES,
    horaApertura: "08:00",
    horaCierre: "00:00",
  },
  {
    id: "horario-6",
    diaSemana: DiaSemana.SABADO,
    horaApertura: "10:00",
    horaCierre: "02:00", // Cierra a las 2am del día siguiente
  },
  {
    id: "horario-7",
    diaSemana: DiaSemana.DOMINGO,
    horaApertura: "10:00",
    horaCierre: "18:00",
  },
];

// ============================================
// HORARIOS ESPECIALES (días concretos)
// ============================================

/**
 * Horarios especiales para días concretos
 * Sobrescriben el horario general del día de la semana correspondiente
 */
export const SEED_HORARIOS_ESPECIALES: HorarioEspecial[] = [
  {
    id: "especial-1",
    fecha: "2024-12-24", // Nochebuena
    horaApertura: "09:00",
    horaCierre: "16:00",
    turnos: [
      {
        id: "turno-esp-1-1",
        horaInicio: "09:00",
        horaFin: "16:00",
        asignaciones: [
          { empleadoId: "emp-1", empleadoNombre: "Antonio García López", rol: RolEmpleado.COCINERO },
          { empleadoId: "emp-3", empleadoNombre: "Carlos Martínez Sánchez", rol: RolEmpleado.COCINERO },
          { empleadoId: "emp-2", empleadoNombre: "María Fernández Ruiz", rol: RolEmpleado.CAMARERO },
          { empleadoId: "emp-5", empleadoNombre: "Pedro López Navarro", rol: RolEmpleado.CAMARERO },
        ],
      },
    ],
  },
  {
    id: "especial-2",
    fecha: "2024-12-31", // Nochevieja
    horaApertura: "10:00",
    horaCierre: "04:00",
    turnos: [
      {
        id: "turno-esp-2-1",
        horaInicio: "10:00",
        horaFin: "17:00",
        asignaciones: [
          { empleadoId: "emp-1", empleadoNombre: "Antonio García López", rol: RolEmpleado.COCINERO },
          { empleadoId: "emp-6", empleadoNombre: "Ana Rodríguez Gómez", rol: RolEmpleado.COCINERO },
          { empleadoId: "emp-2", empleadoNombre: "María Fernández Ruiz", rol: RolEmpleado.CAMARERO },
        ],
      },
      {
        id: "turno-esp-2-2",
        horaInicio: "17:00",
        horaFin: "04:00",
        asignaciones: [
          { empleadoId: "emp-3", empleadoNombre: "Carlos Martínez Sánchez", rol: RolEmpleado.COCINERO },
          { empleadoId: "emp-1", empleadoNombre: "Antonio García López", rol: RolEmpleado.COCINERO },
          { empleadoId: "emp-5", empleadoNombre: "Pedro López Navarro", rol: RolEmpleado.CAMARERO },
          { empleadoId: "emp-2", empleadoNombre: "María Fernández Ruiz", rol: RolEmpleado.CAMARERO },
        ],
      },
    ],
  },
];

// ============================================
// TURNOS PARA LA SEMANA ACTUAL (ejemplo de vista semanal)
// ============================================

/**
 * Genera turnos de ejemplo para una semana
 * Estos representan las asignaciones "por defecto" de cada día
 */
export function generarTurnosSemana(fechaInicio: Date): HorarioEspecial[] {
  const turnos: HorarioEspecial[] = [];
  const diasSemana = [
    DiaSemana.LUNES,
    DiaSemana.MARTES,
    DiaSemana.MIERCOLES,
    DiaSemana.JUEVES,
    DiaSemana.VIERNES,
    DiaSemana.SABADO,
    DiaSemana.DOMINGO,
  ];

  for (let i = 0; i < 7; i++) {
    const fecha = new Date(fechaInicio);
    fecha.setDate(fecha.getDate() + i);
    const fechaStr = fecha.toISOString().split("T")[0];
    const dia = diasSemana[i];

    // Turnos diferentes según el día
    const esFindeSemana = dia === DiaSemana.SABADO || dia === DiaSemana.DOMINGO;

    const turnosDia: HorarioEspecial["turnos"] = esFindeSemana
      ? [
          {
            id: `turno-${fechaStr}-1`,
            horaInicio: "10:00",
            horaFin: "16:00",
            asignaciones: [
              { empleadoId: "emp-1", empleadoNombre: "Antonio García López", rol: RolEmpleado.COCINERO },
              { empleadoId: "emp-3", empleadoNombre: "Carlos Martínez Sánchez", rol: RolEmpleado.COCINERO },
              { empleadoId: "emp-2", empleadoNombre: "María Fernández Ruiz", rol: RolEmpleado.CAMARERO },
              { empleadoId: "emp-5", empleadoNombre: "Pedro López Navarro", rol: RolEmpleado.CAMARERO },
            ],
          },
          {
            id: `turno-${fechaStr}-2`,
            horaInicio: "16:00",
            horaFin: dia === DiaSemana.SABADO ? "02:00" : "18:00",
            asignaciones: [
              { empleadoId: "emp-6", empleadoNombre: "Ana Rodríguez Gómez", rol: RolEmpleado.COCINERO },
              { empleadoId: "emp-1", empleadoNombre: "Antonio García López", rol: RolEmpleado.COCINERO },
              { empleadoId: "emp-2", empleadoNombre: "María Fernández Ruiz", rol: RolEmpleado.CAMARERO },
            ],
          },
        ]
      : [
          {
            id: `turno-${fechaStr}-1`,
            horaInicio: "08:00",
            horaFin: "15:00",
            asignaciones: [
              { empleadoId: "emp-1", empleadoNombre: "Antonio García López", rol: RolEmpleado.COCINERO },
              { empleadoId: "emp-6", empleadoNombre: "Ana Rodríguez Gómez", rol: RolEmpleado.COCINERO },
              { empleadoId: "emp-2", empleadoNombre: "María Fernández Ruiz", rol: RolEmpleado.CAMARERO },
              { empleadoId: "emp-5", empleadoNombre: "Pedro López Navarro", rol: RolEmpleado.CAMARERO },
            ],
          },
          {
            id: `turno-${fechaStr}-2`,
            horaInicio: "15:00",
            horaFin: "00:00",
            asignaciones: [
              { empleadoId: "emp-3", empleadoNombre: "Carlos Martínez Sánchez", rol: RolEmpleado.COCINERO },
              { empleadoId: "emp-1", empleadoNombre: "Antonio García López", rol: RolEmpleado.COCINERO },
              { empleadoId: "emp-2", empleadoNombre: "María Fernández Ruiz", rol: RolEmpleado.CAMARERO },
            ],
          },
        ];

    turnos.push({
      id: `semana-${fechaStr}`,
      fecha: fechaStr,
      horaApertura: esFindeSemana ? "10:00" : "08:00",
      horaCierre: dia === DiaSemana.SABADO ? "02:00" : dia === DiaSemana.DOMINGO ? "18:00" : "00:00",
      turnos: turnosDia,
    });
  }

  return turnos;
}