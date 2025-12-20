/**
 * Tests para el generador de mensajes
 * Valida la generación de mensajes en diferentes formatos
 * 
 * Nota: Estos tests sirven como documentación y validación.
 * Para ejecutar, instala Jest: npm install --save-dev jest @types/jest ts-jest
 * Y configura jest.config.js adecuadamente.
 */

import {
  generarMensajeWhatsApp,
  generarMensajeEmail,
  formatearLineaProducto,
  MensajePedido,
  LineaPedido,
} from "@/lib/message-generator";
import { Proveedor, Producto, TipoProducto, UnidadMedida } from "@/mock/types";

// Datos de prueba
const proveedorTest: Proveedor = {
  id: "1",
  nombre: "Heineken España",
  cif: "ES1234567890",
  tlf: "+34 900 123 456",
  email: "pedidos@heineken.es",
};

const productosTest: Producto[] = [
  {
    id: "1",
    nombre: "Lentejas",
    tipoProducto: TipoProducto.INGREDIENTE,
    unidadMedida: UnidadMedida.KG,
    stock: 10,
  },
  {
    id: "2",
    nombre: "Espárragos",
    tipoProducto: TipoProducto.INGREDIENTE,
    unidadMedida: UnidadMedida.KG,
    stock: 5,
  },
  {
    id: "3",
    nombre: "Heineken 0.33L",
    tipoProducto: TipoProducto.BEBIDA,
    unidadMedida: UnidadMedida.UNIDADES,
    litros: 0.33,
    stock: 100,
  },
  {
    id: "4",
    nombre: "Servilletas",
    tipoProducto: TipoProducto.RECURSO,
    unidadMedida: UnidadMedida.UNIDADES,
    stock: 500,
  },
];

const lineaTest: LineaPedido[] = [
  { producto: productosTest[0], cantidad: 5 },
  { producto: productosTest[1], cantidad: 3 },
  { producto: productosTest[2], cantidad: 24 },
  { producto: productosTest[3], cantidad: 10 },
];

const mensajePrueba: MensajePedido = {
  proveedor: proveedorTest,
  lineas: lineaTest,
  fechaEntrega: new Date("2025-01-20"),
  horaEntrega: "06:30",
  observaciones: "Entrega en puerta trasera",
  metodo: "whatsapp",
};

// Función de validación alternativa (sin necesidad de Jest)
function validarMensajeWhatsApp(): boolean {
  const mensaje = generarMensajeWhatsApp(mensajePrueba);
  
  const validaciones = [
    mensaje.includes("PEDIDO DE REPOSICIÓN"),
    mensaje.includes("Heineken España"),
    mensaje.includes("pedidos@heineken.es"),
    mensaje.includes("+34 900 123 456"),
    mensaje.includes("06:30"),
    mensaje.includes("Entrega en puerta trasera"),
    mensaje.includes("INGREDIENTES"),
    mensaje.includes("BEBIDAS"),
    mensaje.includes("RECURSOS"),
  ];

  return validaciones.every(v => v === true);
}

function validarMensajeEmail(): boolean {
  const resultado = generarMensajeEmail(mensajePrueba);
  
  const validaciones = [
    resultado.formato === "email",
    resultado.asunto ? resultado.asunto.includes("Pedido de Reposición") : false,
    resultado.asunto ? resultado.asunto.includes("2025-01-20") : false,
    resultado.cuerpo.includes("<html>"),
    resultado.cuerpo.includes("</html>"),
    resultado.cuerpo.includes("Heineken España"),
    resultado.cuerpo.includes("ES1234567890"),
  ];

  return validaciones.every(v => v === true);
}

function validarFormateoLinea(): boolean {
  const resultado = formatearLineaProducto(productosTest[0], 5);
  
  return (
    resultado.includes("Lentejas") &&
    resultado.includes("5") &&
    resultado.includes("kg")
  );
}

// Ejecutar validaciones
export function ejecutarValidaciones(): { exito: boolean; resultados: Record<string, boolean> } {
  const resultados = {
    "Formateo de línea": validarFormateoLinea(),
    "Mensaje WhatsApp": validarMensajeWhatsApp(),
    "Mensaje Email": validarMensajeEmail(),
  };

  const exito = Object.values(resultados).every(r => r === true);

  return { exito, resultados };
}
