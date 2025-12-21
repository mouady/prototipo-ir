"use client";

import { useState } from "react";
import { ArrowLeft, Bell, Plus, X, Check, Clock, CheckCircle2 } from "lucide-react";
import { useDetalleMesa, ComandaMesa, LineaComandaMesa, FormatoPlato } from "@/mock/mesas";

type VistaDetalle = "comandas" | "resumen";

interface DetalleMesaViewProps {
  mesaId: string;
  onBack: () => void;
  onCrearComanda: () => void;
}

/**
 * Badge de estado de comanda
 */
function BadgeEstadoComanda({ estado }: { estado: ComandaMesa["estado"] }) {
  const estilos = {
    EN_COCINA: "bg-yellow-100 text-yellow-700",
    REALIZADA: "bg-gray-200 text-gray-700",
    ENTREGADA: "bg-green-100 text-green-700",
  };
  const textos = {
    EN_COCINA: "En cocina",
    REALIZADA: "Realizada",
    ENTREGADA: "Entregada",
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${estilos[estado]}`}>
      {textos[estado]}
    </span>
  );
}

/**
 * Badge de formato de plato
 */
function BadgeFormato({ formato }: { formato?: FormatoPlato }) {
  if (!formato) return null;
  
  const textos: Record<FormatoPlato, string> = {
    ESTANDAR: "Estándar",
    TAPA: "Tapa",
    MEDIA: "1/2",
    RACION: "Entera",
  };

  return (
    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-900 text-white">
      {textos[formato]}
    </span>
  );
}

/**
 * Icono de estado de línea
 */
function IconoEstadoLinea({ estado, esPlato }: { estado: LineaComandaMesa["estado"]; esPlato: boolean }) {
  if (estado === "SERVIDO") {
    return <CheckCircle2 className="w-5 h-5 text-green-500" />;
  }
  if (estado === "REALIZADO" && esPlato) {
    return <Check className="w-5 h-5 text-gray-700" />;
  }
  if (estado === "EN_PREPARACION" && esPlato) {
    return <Clock className="w-5 h-5 text-gray-400" />;
  }
  return <div className="w-5 h-5 border-2 border-gray-300 rounded" />;
}

/**
 * Línea de comanda individual
 */
function LineaComandaItem({
  linea,
  onMarcarServida,
}: {
  linea: LineaComandaMesa;
  onMarcarServida?: () => void;
}) {
  const requiereAtencion = linea.esPlato && linea.estado === "REALIZADO";
  const total = linea.cantidad * linea.precioUnitario;

  return (
    <div
      className={`flex items-center gap-3 py-2 ${
        linea.estado === "SERVIDO" ? "opacity-50" : ""
      }`}
    >
      {/* Checkbox/Icono de estado */}
      <button
        onClick={onMarcarServida}
        disabled={linea.estado === "SERVIDO" || linea.estado === "EN_PREPARACION"}
        className="flex-shrink-0"
      >
        <IconoEstadoLinea estado={linea.estado} esPlato={linea.esPlato} />
      </button>

      {/* Nombre del producto y formato */}
      <div className="flex-1 flex items-center gap-2">
        <span
          className={`text-sm ${
            requiereAtencion ? "text-red-600 font-medium" : "text-gray-900"
          } ${linea.estado === "SERVIDO" ? "line-through" : ""}`}
        >
          {linea.productoNombre}
        </span>
        {linea.esPlato && <BadgeFormato formato={linea.formato} />}
      </div>

      {/* Cantidad */}
      <span className="text-sm text-gray-600 w-8 text-center">{linea.cantidad}</span>

      {/* Precio unitario */}
      <span className="text-sm text-gray-500 w-14 text-right">
        {linea.precioUnitario.toFixed(2)}€
      </span>

      {/* Precio total */}
      <span className="text-sm font-medium text-gray-900 w-16 text-right">
        {total.toFixed(2)}€
      </span>
    </div>
  );
}

/**
 * Sección de una comanda
 */
function ComandaSection({
  comanda,
  onMarcarLineaServida,
}: {
  comanda: ComandaMesa;
  onMarcarLineaServida: (lineaId: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
      {/* Cabecera de comanda */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">Comanda {comanda.numComanda}</h3>
          <BadgeEstadoComanda estado={comanda.estado} />
        </div>
        <span className="text-sm text-gray-500">{comanda.horaCreacion}</span>
      </div>

      {/* Lista de líneas */}
      <div className="divide-y divide-gray-100">
        {comanda.lineas.map((linea) => (
          <LineaComandaItem
            key={linea.id}
            linea={linea}
            onMarcarServida={() => onMarcarLineaServida(linea.id)}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Vista de resumen de cuenta para cerrar
 */
function VistaResumenCuenta({
  comandas,
  totales,
  propina,
  onAgregarPropina,
  onConfirmarCierre,
}: {
  comandas: ComandaMesa[];
  totales: { subtotal: number; propina: number; total: number };
  propina: number;
  onAgregarPropina: () => void;
  onConfirmarCierre: () => void;
}) {
  // Agrupar todas las líneas para resumen
  const todasLasLineas = comandas.flatMap((c) => c.lineas);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        {/* Cabeceras de columnas */}
        <div className="flex items-center gap-3 py-2 text-xs text-gray-500 border-b border-gray-200">
          <span className="flex-1">Producto</span>
          <span className="w-8 text-center">Ud.</span>
          <span className="w-14 text-right">P/U</span>
          <span className="w-16 text-right">Total</span>
        </div>

        {/* Lista de items */}
        <div className="divide-y divide-gray-100">
          {todasLasLineas.map((linea) => (
            <div key={linea.id} className="flex items-center gap-3 py-2">
              <span className="flex-1 text-sm text-gray-900">{linea.productoNombre}</span>
              <span className="text-sm text-gray-600 w-8 text-center">{linea.cantidad}</span>
              <span className="text-sm text-gray-500 w-14 text-right">
                {linea.precioUnitario.toFixed(2)}€
              </span>
              <span className="text-sm font-medium text-gray-900 w-16 text-right">
                {(linea.cantidad * linea.precioUnitario).toFixed(2)}€
              </span>
            </div>
          ))}
        </div>

        {/* Separador y totales */}
        <div className="border-t-2 border-dashed border-gray-300 mt-4 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Cuenta</span>
            <span className="font-medium">{totales.subtotal.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Propina</span>
            <span className="font-medium">{propina.toFixed(2)} €</span>
          </div>
          <div className="border-t-2 border-dashed border-gray-300 pt-2">
            <div className="flex justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-gray-900">{totales.total.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={onAgregarPropina}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-xl border border-gray-200 transition-colors"
        >
          <Plus className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-700">Añadir Propina</span>
        </button>
        <button
          onClick={onConfirmarCierre}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-red-100 hover:bg-red-200 rounded-xl border border-red-200 transition-colors"
        >
          <X className="w-5 h-5 text-red-600" />
          <span className="font-medium text-red-700">Confirmar cierre</span>
        </button>
      </div>
    </div>
  );
}

/**
 * Modal de propina
 */
function ModalPropina({
  onAgregar,
  onCancelar,
}: {
  onAgregar: (cantidad: number) => void;
  onCancelar: () => void;
}) {
  const [valor, setValor] = useState("2.50");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cantidad = parseFloat(valor.replace(",", "."));
    if (!isNaN(cantidad) && cantidad > 0) {
      onAgregar(cantidad);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-end justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-t-2xl p-6 space-y-4">
        <h3 className="font-bold text-lg text-gray-900">Añadir propina</h3>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm text-gray-600 mb-2">Importe:</label>
          <div className="relative">
            <input
              type="text"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
              autoFocus
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">€</span>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onCancelar}
              className="flex-1 py-3 px-4 bg-gray-100 rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-gray-900 rounded-lg font-medium text-white hover:bg-gray-800 transition-colors"
            >
              Agregar propina
            </button>
          </div>
          {/* Espacio inferior para evitar solapamiento con el bisel */}
          <div className="h-[34px]" />
        </form>
      </div>
    </div>
  );
}

/**
 * Vista principal de detalle de mesa
 * Combina specs 2.1, 2.2, 2.3, 2.4
 */
export default function DetalleMesaView({ mesaId, onBack, onCrearComanda }: DetalleMesaViewProps) {
  const {
    mesa,
    comandas,
    totales,
    propina,
    platosListos,
    comandaConPlatosListos,
    cerrarCuenta,
    marcarLineaServida,
    agregarPropina,
  } = useDetalleMesa(mesaId);

  const [vista, setVista] = useState<VistaDetalle>("comandas");
  const [mostrarModalPropina, setMostrarModalPropina] = useState(false);

  if (!mesa) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Mesa no encontrada</p>
      </div>
    );
  }

  const handleMarcarLineaServida = (comandaId: string, lineaId: string) => {
    marcarLineaServida(comandaId, lineaId);
  };

  const handleAgregarPropina = (cantidad: number) => {
    agregarPropina(cantidad);
    setMostrarModalPropina(false);
  };

  const handleConfirmarCierre = () => {
    cerrarCuenta();
    onBack();
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Header con botón atrás */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-1 -ml-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Mesa {mesa.numMesa}</h1>
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex gap-0">
          <button
            onClick={() => setVista("comandas")}
            className={`flex-1 py-4 px-4 text-base font-semibold border-b-2 transition-colors text-center ${
              vista === "comandas"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Comandas
          </button>
          <button
            onClick={() => setVista("resumen")}
            className={`flex-1 py-4 px-4 text-base font-semibold border-b-2 transition-colors text-center ${
              vista === "resumen"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Resumen y cierre
          </button>
        </div>
      </div>

      {/* Contenido según vista */}
      {vista === "comandas" ? (
        <div className="flex-1 overflow-y-auto p-4">
          {/* Lista de comandas */}
          {comandas.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No hay comandas aún
            </div>
          ) : (
            comandas.map((comanda) => (
              <ComandaSection
                key={comanda.id}
                comanda={comanda}
                onMarcarLineaServida={(lineaId) =>
                  handleMarcarLineaServida(comanda.id, lineaId)
                }
              />
            ))
          )}
        </div>
      ) : (
        <VistaResumenCuenta
          comandas={comandas}
          totales={totales}
          propina={propina?.abono || 0}
          onAgregarPropina={() => setMostrarModalPropina(true)}
          onConfirmarCierre={handleConfirmarCierre}
        />
      )}

      {/* Footer con acciones (solo en vista comandas) */}
      {vista === "comandas" && (
        <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200">
          <button
            onClick={onCrearComanda}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-xl border border-gray-200 transition-colors"
          >
            <Plus className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Añadir comanda</span>
          </button>
          {/* Espacio inferior para evitar solapamiento con el bisel */}
          <div className="h-[34px]" />
        </div>
        
      )}

      {/* Modal de propina */}
      {mostrarModalPropina && (
        <ModalPropina
          onAgregar={handleAgregarPropina}
          onCancelar={() => setMostrarModalPropina(false)}
        />
      )}
    </div>
  );
}
