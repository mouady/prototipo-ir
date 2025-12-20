"use client";

import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { useCocineros, useIngredientes, NuevoAvisoReposicion, Producto, Cocinero } from "@/mock";

interface NuevoAvisoModalProps {
  abierto: boolean;
  onCerrar: () => void;
  onGuardar: (aviso: NuevoAvisoReposicion) => void;
}

export function NuevoAvisoModal({ abierto, onCerrar, onGuardar }: NuevoAvisoModalProps) {
  const { cocineros } = useCocineros();
  const { ingredientes } = useIngredientes();

  const [cocineroSeleccionado, setCocineroSeleccionado] = useState<Cocinero | null>(null);
  const [productosSeleccionados, setProductosSeleccionados] = useState<Producto[]>([]);
  const [comentario, setComentario] = useState("");
  const [productoActual, setProductoActual] = useState<string>("");

  const handleAgregarProducto = () => {
    if (!productoActual) return;
    
    const producto = ingredientes.find((p) => p.id === productoActual);
    if (producto && !productosSeleccionados.find((p) => p.id === producto.id)) {
      setProductosSeleccionados([...productosSeleccionados, producto]);
      setProductoActual("");
    }
  };

  const handleEliminarProducto = (id: string) => {
    setProductosSeleccionados(productosSeleccionados.filter((p) => p.id !== id));
  };

  const handleGuardar = () => {
    if (!cocineroSeleccionado || productosSeleccionados.length === 0) return;

    const nuevoAviso: NuevoAvisoReposicion = {
      fechaSolicitud: new Date(),
      atendido: false,
      comentario: comentario.trim() || undefined,
      cocineroId: cocineroSeleccionado.id,
      cocineroNombre: cocineroSeleccionado.nombre,
      lineas: productosSeleccionados.map((p) => ({
        productoId: p.id,
        productoNombre: p.nombre,
      })),
    };

    onGuardar(nuevoAviso);
    handleCerrar();
  };

  const handleCerrar = () => {
    setCocineroSeleccionado(null);
    setProductosSeleccionados([]);
    setComentario("");
    setProductoActual("");
    onCerrar();
  };

  if (!abierto) return null;

  const productosDisponibles = ingredientes.filter(
    (i) => !productosSeleccionados.find((p) => p.id === i.id)
  );

  const formularioValido = cocineroSeleccionado && productosSeleccionados.length > 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Cabecera */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Nuevo Aviso de Reposición</h2>
          <button
            onClick={handleCerrar}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-auto p-6 space-y-4">
          {/* Selector de cocinero */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cocinero
            </label>
            <select
              value={cocineroSeleccionado?.id || ""}
              onChange={(e) => {
                const cocinero = cocineros.find((c) => c.id === e.target.value);
                setCocineroSeleccionado(cocinero || null);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none"
            >
              <option value="">Seleccionar cocinero...</option>
              {cocineros.map((cocinero) => (
                <option key={cocinero.id} value={cocinero.id}>
                  {cocinero.nombre} {cocinero.apellidos}
                </option>
              ))}
            </select>
          </div>

          {/* Productos que faltan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Productos que faltan
            </label>
            <div className="flex gap-2 mb-2">
              <select
                value={productoActual}
                onChange={(e) => setProductoActual(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none"
              >
                <option value="">Seleccionar producto...</option>
                {productosDisponibles.map((producto) => (
                  <option key={producto.id} value={producto.id}>
                    {producto.nombre}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAgregarProducto}
                disabled={!productoActual}
                className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Lista de productos seleccionados */}
            {productosSeleccionados.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {productosSeleccionados.map((producto) => (
                  <span
                    key={producto.id}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border border-gray-300 bg-gray-50 text-gray-700"
                  >
                    {producto.nombre}
                    <button
                      onClick={() => handleEliminarProducto(producto.id)}
                      className="p-0.5 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Comentario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comentario (opcional)
            </label>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows={3}
              placeholder="Añadir observaciones sobre los productos..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-transparent outline-none resize-none"
            />
          </div>
        </div>

        {/* Pie del modal */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={handleCerrar}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            disabled={!formularioValido}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Crear aviso
          </button>
        </div>
      </div>
    </div>
  );
}
