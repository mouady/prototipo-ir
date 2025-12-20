/**
 * Ejemplos de integración del Generador de Mensajes
 * Demuestra cómo usar el generador en diferentes contextos
 */

import {
  generarMensaje,
  generarResumenPedido,
  generarMensajeWhatsApp,
  generarMensajeEmail,
  generarMensajeContacto,
  MensajePedido,
  LineaPedido,
} from "@/lib/message-generator";
import { Producto, Proveedor, TipoProducto, UnidadMedida } from "@/mock/types";

/**
 * Ejemplo 1: Generar un pedido simple para WhatsApp
 */
export function ejemplo1_PedidoWhatsApp() {
  const proveedor: Proveedor = {
    id: "1",
    nombre: "Heineken España",
    cif: "ES1234567890",
    tlf: "+34 900 123 456",
    email: "pedidos@heineken.es",
  };

  const producto: Producto = {
    id: "1",
    nombre: "Heineken 0.33L",
    tipoProducto: TipoProducto.BEBIDA,
    unidadMedida: UnidadMedida.UNIDADES,
    litros: 0.33,
    stock: 100,
  };

  const pedido: MensajePedido = {
    proveedor,
    lineas: [{ producto, cantidad: 48 }],
    fechaEntrega: new Date("2025-01-20"),
    horaEntrega: "06:30",
    metodo: "whatsapp",
  };

  const mensaje = generarMensaje(pedido);
  console.log(mensaje.cuerpo);
  // Salida: Mensaje WhatsApp formateado
}

/**
 * Ejemplo 2: Generar un pedido complejo para Email
 */
export function ejemplo2_PedidoEmail() {
  const proveedor: Proveedor = {
    id: "2",
    nombre: "CashAlternativo",
    cif: "ES9876543210",
    tlf: "+34 901 234 567",
    email: "ventas@cashalternativo.es",
  };

  const productos: Producto[] = [
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
      nombre: "Servilletas",
      tipoProducto: TipoProducto.RECURSO,
      unidadMedida: UnidadMedida.UNIDADES,
      stock: 500,
    },
  ];

  const lineas: LineaPedido[] = [
    { producto: productos[0], cantidad: 10 },
    { producto: productos[1], cantidad: 8 },
    { producto: productos[2], cantidad: 5 },
  ];

  const pedido: MensajePedido = {
    proveedor,
    lineas,
    fechaEntrega: new Date("2025-01-21"),
    horaEntrega: "08:00",
    observaciones: "Por favor, entrega en puerta trasera. Horario de muelle: 8-10.",
    metodo: "email",
  };

  const mensaje = generarMensajeEmail(pedido);
  console.log("Asunto:", mensaje.asunto);
  console.log("HTML:", mensaje.cuerpo);
  // Salida: Email HTML profesional
}

/**
 * Ejemplo 3: Usar el resumen para previsualización
 */
export function ejemplo3_ResumenPedido() {
  const proveedor: Proveedor = {
    id: "3",
    nombre: "Pimientos Juanito",
    cif: "ES1111111111",
    tlf: "+34 902 345 678",
    email: "info@pimientos.es",
  };

  const productos: Producto[] = [
    {
      id: "1",
      nombre: "Pimientos rojos",
      tipoProducto: TipoProducto.INGREDIENTE,
      unidadMedida: UnidadMedida.KG,
      stock: 20,
    },
    {
      id: "2",
      nombre: "Pimientos verdes",
      tipoProducto: TipoProducto.INGREDIENTE,
      unidadMedida: UnidadMedida.KG,
      stock: 15,
    },
  ];

  const lineas: LineaPedido[] = [
    { producto: productos[0], cantidad: 15 },
    { producto: productos[1], cantidad: 10 },
  ];

  const pedido: MensajePedido = {
    proveedor,
    lineas,
    fechaEntrega: new Date("2025-01-22"),
    horaEntrega: "07:00",
    metodo: "contacto",
  };

  const resumen = generarResumenPedido(pedido);

  console.log(`Título: ${resumen.titulo}`);
  console.log(`Ingredientes: ${resumen.ingredientes.length}`);
  resumen.ingredientes.forEach((ing) => {
    console.log(`  - ${ing.nombre}: ${ing.cantidad} ${ing.unidad}`);
  });
  // Salida:
  // Título: Pedido para Pimientos Juanito
  // Ingredientes: 2
  //   - Pimientos rojos: 15 kg
  //   - Pimientos verdes: 10 kg
}

/**
 * Ejemplo 4: Generar múltiples formatos del mismo pedido
 */
export function ejemplo4_MultiplesFormatos() {
  const proveedor: Proveedor = {
    id: "4",
    nombre: "Suministros Varios",
    cif: "ES2222222222",
    tlf: "+34 903 456 789",
    email: "admin@suministros.es",
  };

  const producto: Producto = {
    id: "1",
    nombre: "Papel de aluminio",
    tipoProducto: TipoProducto.RECURSO,
    unidadMedida: UnidadMedida.UNIDADES,
    stock: 20,
  };

  const pedido: MensajePedido = {
    proveedor,
    lineas: [{ producto, cantidad: 6 }],
    fechaEntrega: new Date("2025-01-23"),
    horaEntrega: "09:00",
    metodo: "whatsapp",
  };

  // Generar todos los formatos
  const whatsapp = generarMensajeWhatsApp(pedido);
  const email = generarMensajeEmail({ ...pedido, metodo: "email" });
  const contacto = generarMensajeContacto({ ...pedido, metodo: "contacto" });

  console.log("=== WhatsApp ===");
  console.log(whatsapp);
  console.log("\n=== Email (HTML) ===");
  console.log(email.asunto);
  console.log(email.cuerpo.substring(0, 200) + "...");
  console.log("\n=== Contacto ===");
  console.log(contacto);
}

/**
 * Ejemplo 5: Integración con un hook de React
 */
export function useGeneradorPedidos() {
  const generarPedidoCompleto = (
    proveedor: Proveedor,
    productos: LineaPedido[],
    fecha: Date,
    hora: string,
    observaciones?: string,
    metodo: "whatsapp" | "email" | "contacto" = "whatsapp"
  ) => {
    const pedido: MensajePedido = {
      proveedor,
      lineas: productos,
      fechaEntrega: fecha,
      horaEntrega: hora,
      observaciones,
      metodo,
    };

    return {
      mensaje: generarMensaje(pedido),
      resumen: generarResumenPedido(pedido),
    };
  };

  const descargarMensaje = (mensaje: string, formato: string) => {
    const elemento = document.createElement("a");
    const blob = new Blob([mensaje], { type: "text/plain" });
    elemento.href = URL.createObjectURL(blob);
    elemento.download = `pedido-${new Date().getTime()}.${formato}`;
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);
  };

  const copiarAlPortapapeles = async (texto: string) => {
    try {
      await navigator.clipboard.writeText(texto);
      return true;
    } catch {
      return false;
    }
  };

  return {
    generarPedidoCompleto,
    descargarMensaje,
    copiarAlPortapapeles,
  };
}

/**
 * Ejemplo 6: Validar un pedido antes de generar
 */
export function validarPedido(pedido: MensajePedido): {
  valido: boolean;
  errores: string[];
} {
  const errores: string[] = [];

  if (!pedido.proveedor) {
    errores.push("Proveedor no especificado");
  }

  if (!pedido.lineas || pedido.lineas.length === 0) {
    errores.push("No hay productos en el pedido");
  }

  if (!pedido.fechaEntrega) {
    errores.push("Fecha de entrega no especificada");
  } else if (pedido.fechaEntrega < new Date()) {
    errores.push("La fecha de entrega no puede ser en el pasado");
  }

  if (!pedido.horaEntrega) {
    errores.push("Hora de entrega no especificada");
  }

  if (!pedido.metodo) {
    errores.push("Método de envío no especificado");
  }

  // Validar que los productos tengan cantidad > 0
  pedido.lineas.forEach((linea, index) => {
    if (linea.cantidad <= 0) {
      errores.push(`Línea ${index + 1}: cantidad debe ser mayor a 0`);
    }
  });

  return {
    valido: errores.length === 0,
    errores,
  };
}

/**
 * Ejemplo 7: Usar en un componente React
 */
// Ejemplo de uso en componente React:
/*
"use client";

import { useState } from "react";
import { generarMensaje } from "@/lib/message-generator";
import { Button } from "@/components/ui/button";

export function MiComponente() {
  const [mensaje, setMensaje] = useState("");

  const handleGenerar = async (pedido) => {
    const validation = validarPedido(pedido);
    if (!validation.valido) {
      console.error("Errores en el pedido:", validation.errores);
      return;
    }

    const result = generarMensaje(pedido);
    setMensaje(result.cuerpo);
  };

  return (
    <div>
      <Button onClick={() => handleGenerar(miPedido)}>
        Generar mensaje
      </Button>
      {mensaje && <pre>{mensaje}</pre>}
    </div>
  );
}
*/

const ejemplos = {
  ejemplo1_PedidoWhatsApp,
  ejemplo2_PedidoEmail,
  ejemplo3_ResumenPedido,
  ejemplo4_MultiplesFormatos,
  useGeneradorPedidos,
  validarPedido,
};

export default ejemplos;
