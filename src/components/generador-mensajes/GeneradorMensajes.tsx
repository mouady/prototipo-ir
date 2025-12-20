"use client";

import { useState } from "react";
import { Producto, Proveedor, TipoProducto } from "@/mock/types";
import {
  generarMensaje,
  generarResumenPedido,
  MensajePedido,
  LineaPedido,
  MensajeFormato,
} from "@/lib/message-generator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  MessageCircle,
  Phone,
  Copy,
  Download,
  Trash2,
  Calendar,
  Clock,
  Check,
  ShoppingBag,
  Package,
  ClipboardList,
  Send,
  Store,
} from "lucide-react";

interface GeneradorMensajesProps {
  proveedores: Proveedor[];
  productos: Producto[];
}

interface ProductoSeleccionado {
  producto: Producto;
  cantidad: number;
}

export function GeneradorMensajes({ proveedores, productos }: GeneradorMensajesProps) {
  const [step, setStep] = useState<"proveedores" | "productos" | "entrega" | "revisar" | "enviar">(
    "proveedores"
  );
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState<Proveedor | null>(null);
  const [productosSeleccionados, setProductosSeleccionados] = useState<ProductoSeleccionado[]>([]);
  const [fechaEntrega, setFechaEntrega] = useState<string>("");
  const [horaEntrega, setHoraEntrega] = useState<string>("06:30");
  const [observaciones, setObservaciones] = useState<string>("");
  const [metodoEnvio, setMetodoEnvio] = useState<"whatsapp" | "email" | "contacto">("whatsapp");
  const [mensajeGenerado, setMensajeGenerado] = useState<MensajeFormato | null>(null);

  // Agrupar productos por tipo
  const productosPorTipo = {
    ingredientes: productos.filter((p) => p.tipoProducto === TipoProducto.INGREDIENTE),
    bebidas: productos.filter((p) => p.tipoProducto === TipoProducto.BEBIDA),
    recursos: productos.filter((p) => p.tipoProducto === TipoProducto.RECURSO),
  };

  // Agregar producto a la selección
  const agregarProducto = (producto: Producto) => {
    const existe = productosSeleccionados.find((p) => p.producto.id === producto.id);
    if (existe) {
      setProductosSeleccionados(
        productosSeleccionados.map((p) =>
          p.producto.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      );
    } else {
      setProductosSeleccionados([...productosSeleccionados, { producto, cantidad: 1 }]);
    }
  };

  // Eliminar producto
  const eliminarProducto = (id: string) => {
    setProductosSeleccionados(productosSeleccionados.filter((p) => p.producto.id !== id));
  };

  // Cambiar cantidad
  const cambiarCantidad = (id: string, cantidad: number) => {
    if (cantidad <= 0) {
      eliminarProducto(id);
    } else {
      setProductosSeleccionados(
        productosSeleccionados.map((p) =>
          p.producto.id === id ? { ...p, cantidad } : p
        )
      );
    }
  };

  // Generar mensaje
  const generarPedido = () => {
    if (!proveedorSeleccionado || !fechaEntrega) return;

    const lineaPedido: LineaPedido[] = productosSeleccionados.map((ps) => ({
      producto: ps.producto,
      cantidad: ps.cantidad,
    }));

    const pedido: MensajePedido = {
      proveedor: proveedorSeleccionado,
      lineas: lineaPedido,
      fechaEntrega: new Date(fechaEntrega),
      horaEntrega,
      observaciones: observaciones || undefined,
      metodo: metodoEnvio,
    };

    const mensaje = generarMensaje(pedido);
    setMensajeGenerado(mensaje);
    setStep("enviar");
  };

  // Copiar al portapapeles
  const copiarAlPortapapeles = () => {
    if (mensajeGenerado) {
      navigator.clipboard.writeText(mensajeGenerado.cuerpo);
    }
  };

  // Descargar como archivo
  const descargarArchivo = () => {
    if (!mensajeGenerado) return;

    const elemento = document.createElement("a");
    const contenido =
      mensajeGenerado.formato === "email" ? mensajeGenerado.cuerpo : mensajeGenerado.cuerpo;
    const blob = new Blob([contenido], {
      type: mensajeGenerado.formato === "email" ? "text/html" : "text/plain",
    });

    elemento.href = URL.createObjectURL(blob);
    elemento.download = `pedido-${new Date().getTime()}.${mensajeGenerado.formato === "email" ? "html" : "txt"}`;
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);
  };

  // Resumen del pedido
  const resumen =
    proveedorSeleccionado && productosSeleccionados.length > 0
      ? generarResumenPedido({
          proveedor: proveedorSeleccionado,
          lineas: productosSeleccionados.map((ps) => ({
            producto: ps.producto,
            cantidad: ps.cantidad,
          })),
          fechaEntrega: new Date(fechaEntrega || new Date()),
          horaEntrega,
          observaciones: observaciones || undefined,
          metodo: metodoEnvio,
        })
      : null;

  // Función para determinar si un paso está completado
  const isPasoCompletado = (paso: string) => {
    const pasos = ["proveedores", "productos", "entrega", "revisar", "enviar"];
    const stepIndex = pasos.indexOf(step);
    const pasoIndex = pasos.indexOf(paso);
    return pasoIndex < stepIndex;
  };

  // Función para determinar si un paso está activo
  const isPasoActivo = (paso: string) => step === paso;

  const steps = [
    { id: "proveedores", label: "Proveedor", icon: Store },
    { id: "productos", label: "Productos", icon: ShoppingBag },
    { id: "entrega", label: "Entrega", icon: Package },
    { id: "revisar", label: "Revisar", icon: ClipboardList },
    { id: "enviar", label: "Enviar", icon: Send },
  ];

  return (
    <div className="w-full space-y-8 p-6">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Generador de Mensajes
        </h2>
        
        {/* Stepper Visual */}
        <div className="flex items-center justify-between">
          {steps.map((stepItem, index) => {
            const isActive = isPasoActivo(stepItem.id);
            const isCompletado = isPasoCompletado(stepItem.id);
            const IconComponent = stepItem.icon;

            return (
              <div key={stepItem.id} className="flex items-center flex-1">
                {/* Paso */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <button
                    onClick={() => {
                      if (isCompletado) {
                        setStep(stepItem.id as "proveedores" | "productos" | "entrega" | "revisar" | "enviar");
                      }
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg scale-110"
                        : isCompletado
                          ? "bg-primary text-primary-foreground hover:shadow-md cursor-pointer"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompletado ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                  </button>
                  <div className="mt-2 text-xs font-semibold text-center w-16">
                    <span
                      className={
                        isActive
                          ? "text-primary"
                          : isCompletado
                            ? "text-primary"
                            : "text-muted-foreground"
                      }
                    >
                      {stepItem.label}
                    </span>
                  </div>
                </div>

                {/* Línea conectora */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-2 h-1 rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isActive || isCompletado
                          ? "bg-primary w-full"
                          : "bg-muted w-0"
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* PASO 1: SELECCIONAR PROVEEDOR */}
      {step === "proveedores" && (
        <Card className="p-6">
          <h3 className=" text-lg font-semibold">Seleccionar proveedor</h3>
          <div className="grid gap-2">
            {proveedores.map((proveedor) => (
              <button
                key={proveedor.id}
                onClick={() => {
                  setProveedorSeleccionado(proveedor);
                  setStep("productos");
                }}
                className={`text-left p-4 border-2 rounded-lg transition-all ${
                  proveedorSeleccionado?.id === proveedor.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="font-semibold">{proveedor.nombre}</div>
                <div className="text-sm text-gray-600">{proveedor.email}</div>
                <div className="text-sm text-gray-600">{proveedor.tlf}</div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* PASO 2: SELECCIONAR PRODUCTOS */}
      {step === "productos" && proveedorSeleccionado && (
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Seleccionar productos</h3>
              <div className="rounded-lg border p-4 bg-blue-50">
                <div className="text-sm">
                  Proveedor seleccionado: <strong>{proveedorSeleccionado.nombre}</strong>
                </div>
              </div>
            </div>

            {/* INGREDIENTES */}
            {productosPorTipo.ingredientes.length > 0 && (
              <div>
                <h4 className="mb-3 font-semibold text-green-700">🥬 Ingredientes</h4>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {productosPorTipo.ingredientes.map((producto) => (
                    <button
                      key={producto.id}
                      onClick={() => agregarProducto(producto)}
                      className="text-left p-3 border-2 border-gray-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all"
                    >
                      <div className="font-medium">{producto.nombre}</div>
                      <div className="text-xs text-gray-600">Stock: {producto.stock}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* BEBIDAS */}
            {productosPorTipo.bebidas.length > 0 && (
              <div>
                <h4 className="mb-3 font-semibold text-purple-700">🍷 Bebidas</h4>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {productosPorTipo.bebidas.map((producto) => (
                    <button
                      key={producto.id}
                      onClick={() => agregarProducto(producto)}
                      className="text-left p-3 border-2 border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all"
                    >
                      <div className="font-medium">{producto.nombre}</div>
                      <div className="text-xs text-gray-600">Stock: {producto.stock}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* RECURSOS */}
            {productosPorTipo.recursos.length > 0 && (
              <div>
                <h4 className="mb-3 font-semibold text-orange-700">📦 Recursos</h4>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {productosPorTipo.recursos.map((producto) => (
                    <button
                      key={producto.id}
                      onClick={() => agregarProducto(producto)}
                      className="text-left p-3 border-2 border-gray-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-all"
                    >
                      <div className="font-medium">{producto.nombre}</div>
                      <div className="text-xs text-gray-600">Stock: {producto.stock}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PRODUCTOS SELECCIONADOS */}
            {productosSeleccionados.length > 0 && (
              <div className="border-t pt-6">
                <h4 className="mb-3 font-semibold">Productos seleccionados</h4>
                <div className="space-y-2">
                  {productosSeleccionados.map((ps) => (
                    <div key={ps.producto.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{ps.producto.nombre}</div>
                        <div className="text-xs text-gray-600">{ps.producto.unidadMedida || "uds"}</div>
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={ps.cantidad}
                        onChange={(e) => cambiarCantidad(ps.producto.id, parseInt(e.target.value) || 1)}
                        className="w-16 px-2 py-1 border rounded"
                      />
                      <button
                        onClick={() => eliminarProducto(ps.producto.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BOTONES DE NAVEGACIÓN */}
            <div className="flex gap-3 justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setStep("proveedores")}
              >
                ← Volver
              </Button>
              <Button
                onClick={() => setStep("entrega")}
                disabled={productosSeleccionados.length === 0}
              >
                Siguiente →
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* PASO 3: HORARIO DE ENTREGA */}
      {step === "entrega" && proveedorSeleccionado && (
        <Card className="p-6">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Horario de entrega</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">Fecha</label>
                <div className="flex gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <Input
                    type="date"
                    value={fechaEntrega}
                    onChange={(e) => setFechaEntrega(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Hora</label>
                <div className="flex gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <Input
                    type="time"
                    value={horaEntrega}
                    onChange={(e) => setHoraEntrega(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Observaciones (opcional)</label>
              <textarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                placeholder="Añadir notas especiales sobre el pedido..."
                className="w-full p-3 border rounded-lg resize-none"
                rows={4}
              />
            </div>

            <div className="flex gap-3 justify-between pt-4 border-t">
              <Button variant="outline" onClick={() => setStep("productos")}>
                ← Volver
              </Button>
              <Button
                onClick={() => setStep("revisar")}
                disabled={!fechaEntrega}
              >
                Siguiente →
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* PASO 4: REVISAR */}
      {step === "revisar" && resumen && (
        <Card className="p-6">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Revisar pedido</h3>

            <Tabs defaultValue="resumen" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="resumen">Resumen</TabsTrigger>
                <TabsTrigger value="metodo">Método de envío</TabsTrigger>
              </TabsList>

              <TabsContent value="resumen" className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{resumen.titulo}</h4>
                  <div className="text-sm space-y-1">
                    <div>
                      <strong>Fecha:</strong> {new Date(fechaEntrega).toLocaleDateString("es-ES")}
                    </div>
                    <div>
                      <strong>Hora:</strong> {horaEntrega}
                    </div>
                  </div>
                </div>

                {resumen.ingredientes.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-green-700 mb-2">🥬 Ingredientes</h5>
                    <ul className="space-y-1 text-sm">
                      {resumen.ingredientes.map((ing, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{ing.nombre}</span>
                          <strong>
                            {ing.cantidad} {ing.unidad}
                          </strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {resumen.bebidas.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-purple-700 mb-2">🍷 Bebidas</h5>
                    <ul className="space-y-1 text-sm">
                      {resumen.bebidas.map((beb, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{beb.nombre}</span>
                          <strong>
                            {beb.cantidad} {beb.unidad}
                          </strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {resumen.recursos.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-orange-700 mb-2">📦 Recursos</h5>
                    <ul className="space-y-1 text-sm">
                      {resumen.recursos.map((rec, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{rec.nombre}</span>
                          <strong>
                            {rec.cantidad} {rec.unidad}
                          </strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {resumen.observaciones && (
                  <div className="bg-yellow-50 p-3 rounded-lg text-sm">
                    <strong>Observaciones:</strong> {resumen.observaciones}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="metodo" className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400">
                    <input
                      type="radio"
                      value="whatsapp"
                      checked={metodoEnvio === "whatsapp"}
                      onChange={(e) => setMetodoEnvio(e.target.value as "whatsapp" | "email" | "contacto")}
                    />
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">WhatsApp</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400">
                    <input
                      type="radio"
                      value="email"
                      checked={metodoEnvio === "email"}
                      onChange={(e) => setMetodoEnvio(e.target.value as "whatsapp" | "email" | "contacto")}
                    />
                    <Mail className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Email</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400">
                    <input
                      type="radio"
                      value="contacto"
                      checked={metodoEnvio === "contacto"}
                      onChange={(e) => setMetodoEnvio(e.target.value as "whatsapp" | "email" | "contacto")}
                    />
                    <Phone className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">Contactar manager</span>
                  </label>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3 justify-between pt-4 border-t">
              <Button variant="outline" onClick={() => setStep("entrega")}>
                ← Volver
              </Button>
              <Button onClick={generarPedido}>
                Generar mensaje →
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* PASO 5: ENVIAR */}
      {step === "enviar" && mensajeGenerado && (
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Mensaje generado</h3>

            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Vista previa</TabsTrigger>
                <TabsTrigger value="fuente">Fuente</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="p-4 bg-gray-50 rounded-lg max-h-96 overflow-auto">
                {mensajeGenerado.formato === "email" ? (
                  <div dangerouslySetInnerHTML={{ __html: mensajeGenerado.cuerpo }} />
                ) : (
                  <pre className="whitespace-pre-wrap font-mono text-sm">{mensajeGenerado.cuerpo}</pre>
                )}
              </TabsContent>

              <TabsContent value="fuente" className="p-4">
                <textarea
                  readOnly
                  value={mensajeGenerado.cuerpo}
                  className="w-full h-96 p-3 font-mono text-sm border rounded-lg bg-gray-50"
                />
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                onClick={copiarAlPortapapeles}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copiar
              </Button>

              <Button
                variant="outline"
                onClick={descargarArchivo}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Descargar
              </Button>

              <div className="flex-1"></div>

              <Button variant="outline" onClick={() => setStep("revisar")}>
                ← Volver
              </Button>

              <Button
                onClick={() => {
                  setStep("proveedores");
                  setProveedorSeleccionado(null);
                  setProductosSeleccionados([]);
                  setFechaEntrega("");
                  setHoraEntrega("06:30");
                  setObservaciones("");
                  setMensajeGenerado(null);
                }}
              >
                ✓ Completar
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
