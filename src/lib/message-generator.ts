/**
 * Generador de mensajes para avisos de reposición
 * Basado en el modelo conceptual (mc-ir.iuml)
 * Genera mensajes formateados para diferentes canales (WhatsApp, Email, contacto directo)
 */

import { Proveedor, Producto } from "@/mock/types";

export interface LineaPedido {
  producto: Producto;
  cantidad: number;
}

export interface MensajePedido {
  proveedor: Proveedor;
  lineas: LineaPedido[];
  fechaEntrega: Date;
  horaEntrega: string;
  observaciones?: string;
  metodo: "whatsapp" | "email" | "contacto";
}

export interface MensajeFormato {
  asunto?: string;
  cuerpo: string;
  formato: "whatsapp" | "email" | "contacto";
}

/**
 * Formatea un producto con su cantidad y unidad de medida
 */
export function formatearLineaProducto(producto: Producto, cantidad: number): string {
  const unidad = producto.unidadMedida || "uds";
  return `${producto.nombre}: ${cantidad} ${unidad}`;
}

/**
 * Genera el encabezado del pedido con información del proveedor y fecha
 */
export function generarEncabezadoPedido(
  proveedor: Proveedor,
  fechaEntrega: Date,
  horaEntrega: string
): string {
  const fechaFormato = fechaEntrega.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `📋 *PEDIDO DE REPOSICIÓN*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Proveedor: ${proveedor.nombre}
📞 Teléfono: ${proveedor.tlf}
📧 Email: ${proveedor.email}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Fecha de entrega: ${fechaFormato}
⏰ Hora de entrega: ${horaEntrega}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}

/**
 * Genera la lista de ingredientes/productos a pedir
 */
export function generarListaProductos(
  lineas: LineaPedido[],
  categoria: "ingredientes" | "bebidas" | "recursos"
): string {
  const filtradas = lineas.filter((linea) => {
    const tipoProducto = linea.producto.tipoProducto?.toLowerCase();
    return tipoProducto === categoria.replace("s", "");
  });

  if (filtradas.length === 0) return "";

  const titulo =
    categoria === "ingredientes"
      ? "🥬 *INGREDIENTES*"
      : categoria === "bebidas"
        ? "🍷 *BEBIDAS*"
        : "📦 *RECURSOS*";

  const items = filtradas
    .map((linea) => `  • ${formatearLineaProducto(linea.producto, linea.cantidad)}`)
    .join("\n");

  return `\n${titulo}\n${items}`;
}

/**
 * Genera el formato WhatsApp del mensaje
 */
export function generarMensajeWhatsApp(mensaje: MensajePedido): string {
  const encabezado = generarEncabezadoPedido(
    mensaje.proveedor,
    mensaje.fechaEntrega,
    mensaje.horaEntrega
  );

  const ingredientes = generarListaProductos(mensaje.lineas, "ingredientes");
  const bebidas = generarListaProductos(mensaje.lineas, "bebidas");
  const recursos = generarListaProductos(mensaje.lineas, "recursos");

  let cuerpo = encabezado + ingredientes + bebidas + recursos;

  if (mensaje.observaciones) {
    cuerpo += `\n\n💬 *OBSERVACIONES*\n${mensaje.observaciones}`;
  }

  cuerpo += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pedido generado automáticamente por el sistema IR
${new Date().toLocaleString("es-ES")}`;

  return cuerpo;
}

/**
 * Genera el formato Email del mensaje
 */
export function generarMensajeEmail(mensaje: MensajePedido): MensajeFormato {
  const fechaFormato = mensaje.fechaEntrega.toLocaleDateString("es-ES");
  const horaEntrega = mensaje.horaEntrega;

  const asunto = `Pedido de Reposición - Fecha: ${fechaFormato}`;

  const html = `
<html>
  <body style="font-family: Arial, sans-serif; color: #333;">
    <div style="max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px;">
        📋 PEDIDO DE REPOSICIÓN
      </h1>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #2c3e50;">Información del Proveedor</h3>
        <p><strong>Nombre:</strong> ${mensaje.proveedor.nombre}</p>
        <p><strong>CIF:</strong> ${mensaje.proveedor.cif}</p>
        <p><strong>Teléfono:</strong> ${mensaje.proveedor.tlf}</p>
        <p><strong>Email:</strong> ${mensaje.proveedor.email}</p>
      </div>

      <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #ffc107;">
        <h3 style="margin-top: 0; color: #856404;">Detalles de Entrega</h3>
        <p><strong>Fecha:</strong> ${fechaFormato}</p>
        <p><strong>Hora:</strong> ${horaEntrega}</p>
      </div>

      <h3 style="color: #2c3e50; margin-top: 20px;">Productos Solicitados</h3>
      
      ${generarSeccionProductosEmail(mensaje.lineas, "ingredientes", "🥬 Ingredientes")}
      ${generarSeccionProductosEmail(mensaje.lineas, "bebidas", "🍷 Bebidas")}
      ${generarSeccionProductosEmail(mensaje.lineas, "recursos", "📦 Recursos")}

      ${
        mensaje.observaciones
          ? `
      <div style="background-color: #e7f3ff; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #2196F3;">
        <h3 style="margin-top: 0; color: #0d47a1;">Observaciones</h3>
        <p>${mensaje.observaciones}</p>
      </div>
      `
          : ""
      }

      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      
      <p style="color: #666; font-size: 12px; text-align: center;">
        Pedido generado automáticamente por el sistema IR<br>
        ${new Date().toLocaleString("es-ES")}
      </p>
    </div>
  </body>
</html>
  `;

  return {
    asunto,
    cuerpo: html,
    formato: "email",
  };
}

/**
 * Auxiliar para generar secciones de productos en HTML
 */
function generarSeccionProductosEmail(
  lineas: LineaPedido[],
  tipo: "ingredientes" | "bebidas" | "recursos",
  titulo: string
): string {
  const tipoProducto = tipo === "ingredientes" ? "INGREDIENTE" : tipo === "bebidas" ? "BEBIDA" : "RECURSO";

  const filtradas = lineas.filter(
    (linea) => linea.producto.tipoProducto?.toUpperCase() === tipoProducto
  );

  if (filtradas.length === 0) return "";

  const items = filtradas
    .map(
      (linea) =>
        `<tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${linea.producto.nombre}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">
        <strong>${linea.cantidad} ${linea.producto.unidadMedida || "uds"}</strong>
      </td>
    </tr>`
    )
    .join("");

  return `
    <details style="margin: 15px 0;">
      <summary style="cursor: pointer; font-weight: bold; padding: 10px; background-color: #f0f0f0; border-radius: 3px;">
        ${titulo}
      </summary>
      <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Producto</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          ${items}
        </tbody>
      </table>
    </details>
  `;
}

/**
 * Genera el formato para contacto directo (manager)
 */
export function generarMensajeContacto(mensaje: MensajePedido): string {
  const encabezado = generarEncabezadoPedido(
    mensaje.proveedor,
    mensaje.fechaEntrega,
    mensaje.horaEntrega
  );

  const ingredientes = generarListaProductos(mensaje.lineas, "ingredientes");
  const bebidas = generarListaProductos(mensaje.lineas, "bebidas");
  const recursos = generarListaProductos(mensaje.lineas, "recursos");

  let cuerpo = encabezado + ingredientes + bebidas + recursos;

  if (mensaje.observaciones) {
    cuerpo += `\n\nOBSERVACIONES:\n${mensaje.observaciones}`;
  }

  cuerpo += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pedido generado: ${new Date().toLocaleString("es-ES")}
Debe contactarse con el proveedor para confirmar`;

  return cuerpo;
}

/**
 * Función principal: genera el mensaje completo en el formato especificado
 */
export function generarMensaje(
  mensaje: MensajePedido
): MensajeFormato {
  switch (mensaje.metodo) {
    case "whatsapp":
      return {
        cuerpo: generarMensajeWhatsApp(mensaje),
        formato: "whatsapp",
      };
    case "email":
      return generarMensajeEmail(mensaje);
    case "contacto":
      return {
        cuerpo: generarMensajeContacto(mensaje),
        formato: "contacto",
      };
  }
}

/**
 * Genera un resumen del pedido para visualización previa
 */
export function generarResumenPedido(mensaje: MensajePedido): {
  titulo: string;
  ingredientes: Array<{ nombre: string; cantidad: number; unidad: string }>;
  bebidas: Array<{ nombre: string; cantidad: number; unidad: string }>;
  recursos: Array<{ nombre: string; cantidad: number; unidad: string }>;
  observaciones?: string;
} {
  const agrupar = (tipo: string) =>
    mensaje.lineas
      .filter((l) => l.producto.tipoProducto?.toUpperCase() === tipo.toUpperCase())
      .map((l) => ({
        nombre: l.producto.nombre,
        cantidad: l.cantidad,
        unidad: l.producto.unidadMedida || "uds",
      }));

  return {
    titulo: `Pedido para ${mensaje.proveedor.nombre}`,
    ingredientes: agrupar("INGREDIENTE"),
    bebidas: agrupar("BEBIDA"),
    recursos: agrupar("RECURSO"),
    observaciones: mensaje.observaciones,
  };
}
