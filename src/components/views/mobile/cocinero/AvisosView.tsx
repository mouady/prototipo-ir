"use client";

import { useState, useMemo } from "react";
import { Search, Plus, X, Check, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProductos } from "@/mock/inventario/hooks";
import { useAvisosReposicion } from "@/mock/avisos/hooks";
import type { Producto } from "@/mock/inventario/types";

/**
 * Vista de Avisos para el Cocinero (móvil)
 * 
 * Permite al cocinero crear avisos de reposición cuando detecta
 * productos con stock bajo en el inventario.
 * 
 * Según el modelo conceptual (mc-ir.iuml):
 * - AvisoReposicion: fechaSolicitud, atendido, comentario
 * - LineaAvisoReposicion: corresponde a un Producto
 * - Cocinero "1" -- "0..*" AvisoReposicion : "avisa"
 */
export default function AvisosView() {
  const { productos } = useProductos();
  const { avisos, agregar } = useAvisosReposicion();

  // Estado del buscador
  const [busqueda, setBusqueda] = useState("");
  
  // Productos seleccionados para el aviso (multi-selección)
  const [productosSeleccionados, setProductosSeleccionados] = useState<Producto[]>([]);
  
  // Comentario del aviso
  const [comentario, setComentario] = useState("");

  // Tab activa: "crear" o "enviados"
  const [tabActiva, setTabActiva] = useState<"crear" | "enviados">("crear");

  // Filtrar productos según búsqueda
  const productosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return [];
    const query = busqueda.toLowerCase();
    return productos.filter((p) =>
      p.nombre.toLowerCase().includes(query)
    );
  }, [productos, busqueda]);

  // Avisos ordenados por fecha (más recientes primero)
  const avisosOrdenados = useMemo(() => {
    return [...avisos].sort(
      (a, b) => new Date(b.fechaSolicitud).getTime() - new Date(a.fechaSolicitud).getTime()
    );
  }, [avisos]);

  // Toggle selección de producto
  const toggleProducto = (producto: Producto) => {
    setProductosSeleccionados((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.filter((p) => p.id !== producto.id);
      }
      return [...prev, producto];
    });
  };

  // Eliminar producto de selección (desde chip)
  const eliminarSeleccion = (productoId: string) => {
    setProductosSeleccionados((prev) =>
      prev.filter((p) => p.id !== productoId)
    );
  };

  // Verificar si un producto está seleccionado
  const estaSeleccionado = (productoId: string) => {
    return productosSeleccionados.some((p) => p.id === productoId);
  };

  // Confirmar avisos - crea el aviso de reposición
  const confirmarAvisos = () => {
    if (productosSeleccionados.length === 0) return;

    agregar({
      fechaSolicitud: new Date(),
      atendido: false,
      comentario: comentario.trim() || undefined,
      cocineroId: "cocinero-1", // En producción vendría del contexto de auth
      cocineroNombre: "Cocinero",
      lineas: productosSeleccionados.map((p) => ({
        productoId: p.id,
        productoNombre: p.nombre,
      })),
    });

    // Limpiar formulario
    setBusqueda("");
    setProductosSeleccionados([]);
    setComentario("");
    
    // Cambiar a pestaña de enviados para ver el aviso creado
    setTabActiva("enviados");
  };

  // Cancelar - limpiar selección
  const cancelarAvisos = () => {
    setProductosSeleccionados([]);
    setComentario("");
  };

  // Formatear fecha
  const formatearFecha = (fecha: Date) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col flex-1 bg-white overflow-hidden">
      {/* Tabs de navegación */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setTabActiva("crear")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            tabActiva === "crear"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Crear aviso
        </button>
        <button
          onClick={() => setTabActiva("enviados")}
          className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
            tabActiva === "enviados"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Avisos enviados
          {avisos.filter((a) => !a.atendido).length > 0 && (
            <span className="absolute top-2 right-4 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {avisos.filter((a) => !a.atendido).length}
            </span>
          )}
        </button>
      </div>

      {/* Contenido según tab activa */}
      {tabActiva === "crear" ? (
        /* Tab: Crear aviso */
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 p-4 overflow-y-auto">
            {/* Campo de búsqueda */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 bg-gray-100 border-0 rounded-full"
              />
            </div>

            {/* Lista de productos filtrados (multi-selección) */}
            {productosFiltrados.length > 0 && (
              <div className="space-y-2 mb-4">
                {productosFiltrados.map((producto) => (
                  <button
                    key={producto.id}
                    onClick={() => toggleProducto(producto)}
                    className="w-full flex items-center justify-between p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors"
                  >
                    <span className="text-gray-800">{producto.nombre}</span>
                    {estaSeleccionado(producto.id) && (
                      <Check className="h-5 w-5 text-green-600" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Mensaje cuando no hay resultados */}
            {busqueda.trim() && productosFiltrados.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No se encontraron productos
              </p>
            )}

            {/* Chips de productos seleccionados */}
            {productosSeleccionados.length > 0 && (
              <div className="space-y-2 mb-4">
                {productosSeleccionados.map((producto) => (
                  <div
                    key={producto.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white"
                  >
                    <span className="text-gray-800">{producto.nombre}</span>
                    <button
                      onClick={() => eliminarSeleccion(producto.id)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label={`Eliminar ${producto.nombre}`}
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Sección de comentarios */}
            {productosSeleccionados.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm text-gray-500 mb-2">
                  Comentarios:
                </label>
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder="Añade un comentario opcional..."
                  className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
                  rows={4}
                />
              </div>
            )}

            {/* Estado vacío */}
            {productosSeleccionados.length === 0 && !busqueda.trim() && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-2">
                  Busca productos para crear un aviso de reposición
                </p>
                <p className="text-sm text-gray-400">
                  Selecciona los productos que necesitan reponerse
                </p>
              </div>
            )}
          </div>

          {/* Botones de acción dentro del contenedor */}
          {productosSeleccionados.length > 0 && (
            <div className="p-4 bg-white border-t border-gray-200 flex gap-3">
              <Button
                onClick={confirmarAvisos}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Confirmar avisos
              </Button>
              <Button
                onClick={cancelarAvisos}
                variant="outline"
                className="flex-1 border-gray-200 text-gray-800 rounded-full hover:bg-gray-100"
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar avisos
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* Tab: Avisos enviados */
        <div className="flex-1 p-4 overflow-y-auto">
          {avisosOrdenados.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">No hay avisos enviados</p>
              <p className="text-sm text-gray-400">
                Crea un aviso de reposición desde la pestaña &quot;Crear aviso&quot;
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {avisosOrdenados.map((aviso) => (
                <div
                  key={aviso.id}
                  className={`p-4 rounded-lg border ${
                    aviso.atendido
                      ? "bg-green-50 border-green-200"
                      : "bg-orange-50 border-orange-200"
                  }`}
                >
                  {/* Cabecera del aviso */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {aviso.atendido ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-orange-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          aviso.atendido ? "text-green-700" : "text-orange-700"
                        }`}
                      >
                        {aviso.atendido ? "Atendido" : "Pendiente"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatearFecha(aviso.fechaSolicitud)}
                    </span>
                  </div>

                  {/* Productos del aviso */}
                  <div className="mb-2">
                    <p className="text-xs text-gray-500 mb-1">Productos:</p>
                    <div className="flex flex-wrap gap-1">
                      {aviso.lineas.map((linea) => (
                        <span
                          key={linea.id}
                          className="inline-block px-2 py-1 bg-white rounded text-xs text-gray-700"
                        >
                          {linea.productoNombre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Comentario si existe */}
                  {aviso.comentario && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Comentario:</p>
                      <p className="text-sm text-gray-700">{aviso.comentario}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}