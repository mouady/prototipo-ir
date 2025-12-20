"use client";

import { ArrowLeft, Search, Trash2, Plus, X } from "lucide-react";
import { useCrearComanda, ProductoVendibleSimple } from "@/mock/mesas";

interface CrearComandaViewProps {
  mesaId: string;
  numMesa: number;
  onBack: () => void;
  onConfirmar: () => void;
}

/**
 * Item del carrito de comanda
 */
function CarritoItem({
  producto,
  cantidad,
  onEliminar,
  onCambiarCantidad,
}: {
  producto: ProductoVendibleSimple;
  cantidad: number;
  onEliminar: () => void;
  onCambiarCantidad: (cantidad: number) => void;
}) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100">
      {/* Botón eliminar */}
      <button
        onClick={onEliminar}
        className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      {/* Nombre del producto */}
      <span className="flex-1 text-sm text-gray-900">{producto.nombre}</span>

      {/* Precio unitario */}
      <span className="text-sm text-gray-500 w-16 text-right">
        {producto.precio.toFixed(2)}€
      </span>

      {/* Input de cantidad */}
      <input
        type="number"
        min="1"
        value={cantidad}
        onChange={(e) => onCambiarCantidad(parseInt(e.target.value) || 1)}
        className="w-12 h-8 text-center border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
    </div>
  );
}

/**
 * Resultado de búsqueda
 */
function ResultadoBusqueda({
  producto,
  onSeleccionar,
}: {
  producto: ProductoVendibleSimple;
  onSeleccionar: () => void;
}) {
  return (
    <button
      onClick={onSeleccionar}
      className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 transition-colors text-left"
    >
      <span className="text-sm text-gray-900">{producto.nombre}</span>
      <span className="text-sm text-gray-500">{producto.precio.toFixed(2)}€</span>
    </button>
  );
}

/**
 * Vista para crear una nueva comanda
 * Según specs 2.6 y 2.7
 */
export default function CrearComandaView({
  mesaId,
  numMesa,
  onBack,
  onConfirmar,
}: CrearComandaViewProps) {
  const {
    busqueda,
    setBusqueda,
    resultados,
    carrito,
    agregarAlCarrito,
    quitarDelCarrito,
    actualizarCantidad,
    confirmarComanda,
    cancelarComanda,
    totalCarrito,
  } = useCrearComanda(mesaId);

  const handleConfirmar = () => {
    const comanda = confirmarComanda();
    if (comanda) {
      onConfirmar();
    }
  };

  const handleCancelar = () => {
    cancelarComanda();
    onBack();
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-1 -ml-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Mesa {numMesa} - Crear comanda</h1>
      </div>

      {/* Barra de búsqueda */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar producto..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        {/* Dropdown de resultados */}
        {resultados.length > 0 && (
          <div className="absolute left-0 right-0 top-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-10 max-h-48 overflow-y-auto mx-4">
            {resultados.map((producto) => (
              <ResultadoBusqueda
                key={producto.id}
                producto={producto}
                onSeleccionar={() => agregarAlCarrito(producto)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lista del carrito */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="px-4">
          {carrito.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-sm">Busca productos para añadirlos a la comanda</p>
            </div>
          ) : (
            <>
              {carrito.map((item) => (
                <CarritoItem
                  key={item.producto.id}
                  producto={item.producto}
                  cantidad={item.cantidad}
                  onEliminar={() => quitarDelCarrito(item.producto.id)}
                  onCambiarCantidad={(cantidad) =>
                    actualizarCantidad(item.producto.id, cantidad)
                  }
                />
              ))}

              {/* Total */}
              <div className="flex justify-between items-center py-4 border-t border-gray-200 mt-2">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-lg text-gray-900">
                  {totalCarrito.toFixed(2)}€
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer con acciones */}
      <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200">
        <div className="flex gap-3">
          <button
            onClick={handleConfirmar}
            disabled={carrito.length === 0}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-colors ${
              carrito.length === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Confirmar comanda</span>
          </button>
          <button
            onClick={handleCancelar}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Cancelar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
