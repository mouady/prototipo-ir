"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Edit2, Trash2, Package, Calendar, DollarSign, AlertTriangle } from "lucide-react";
import { Producto, Lote, useLotesByProducto } from "@/mock";

interface LotesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  producto: Producto;
}

interface LoteFormData {
  cantidad: string;
  precio: string;
  caducidad: string;
  fechaEntrada: string;
}

const initialFormData: LoteFormData = {
  cantidad: "",
  precio: "",
  caducidad: "",
  fechaEntrada: new Date().toISOString().split("T")[0],
};

function formatDate(date: Date | undefined): string {
  if (!date) return "Sin caducidad";
  return new Date(date).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

function isExpired(date: Date | undefined): boolean {
  if (!date) return false;
  return new Date(date) < new Date();
}

function isExpiringSoon(date: Date | undefined): boolean {
  if (!date) return false;
  const today = new Date();
  const expDate = new Date(date);
  const daysUntilExpiry = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return daysUntilExpiry > 0 && daysUntilExpiry <= 7;
}

export function LotesModal({ open, onOpenChange, producto }: LotesModalProps) {
  const { lotes, agregar, actualizar, eliminar } = useLotesByProducto(producto.id);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [loteEditando, setLoteEditando] = useState<Lote | null>(null);
  const [formData, setFormData] = useState<LoteFormData>(initialFormData);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleOpenForm = (lote?: Lote) => {
    if (lote) {
      setLoteEditando(lote);
      setFormData({
        cantidad: lote.cantidad.toString(),
        precio: lote.precio.toString(),
        caducidad: lote.caducidad 
          ? new Date(lote.caducidad).toISOString().split("T")[0] 
          : "",
        fechaEntrada: new Date(lote.fechaEntrada).toISOString().split("T")[0],
      });
    } else {
      setLoteEditando(null);
      setFormData(initialFormData);
    }
    setMostrarFormulario(true);
  };

  const handleCloseForm = () => {
    setMostrarFormulario(false);
    setLoteEditando(null);
    setFormData(initialFormData);
  };

  const handleSubmit = () => {
    const cantidad = Number(formData.cantidad);
    const precio = Number(formData.precio);

    if (cantidad <= 0 || precio < 0) {
      return;
    }

    const caducidad = formData.caducidad 
      ? new Date(formData.caducidad) 
      : undefined;
    const fechaEntrada = new Date(formData.fechaEntrada);

    if (loteEditando) {
      actualizar(loteEditando.id, {
        cantidad,
        precio,
        caducidad,
        fechaEntrada,
      });
    } else {
      agregar({
        cantidad,
        precio,
        caducidad,
        fechaEntrada,
      });
    }

    handleCloseForm();
  };

  const handleDelete = (id: string) => {
    eliminar(id);
    setConfirmDelete(null);
  };

  // Ordenar lotes: primero los que caducan antes, luego los sin caducidad
  const lotesSorted = [...lotes].sort((a, b) => {
    if (!a.caducidad && !b.caducidad) return 0;
    if (!a.caducidad) return 1;
    if (!b.caducidad) return -1;
    return new Date(a.caducidad).getTime() - new Date(b.caducidad).getTime();
  });

  const stockTotal = lotes.reduce((acc, l) => acc + l.cantidad, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[500px] p-0 gap-0 max-h-[85vh] overflow-hidden flex flex-col"
        showCloseButton={false}
      >
        {/* Header */}
        <div className="p-4 border-b bg-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenChange(false)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">
                Lotes de {producto.nombre}
              </h2>
              <p className="text-sm text-gray-500">
                Stock total: {stockTotal} {producto.unidadMedida}
              </p>
            </div>
            {!mostrarFormulario && (
              <Button
                size="sm"
                onClick={() => handleOpenForm()}
                className="gap-1"
              >
                <Plus className="h-4 w-4" />
                Nuevo lote
              </Button>
            )}
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto">
          {mostrarFormulario ? (
            /* Formulario de lote */
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={handleCloseForm}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <h3 className="font-medium">
                  {loteEditando ? "Editar lote" : "Nuevo lote"}
                </h3>
              </div>

              {/* Cantidad */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Cantidad *
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    min="1"
                    placeholder="Ej: 10"
                    value={formData.cantidad}
                    onChange={(e) =>
                      setFormData({ ...formData, cantidad: e.target.value })
                    }
                    className="h-11 bg-gray-50 border-gray-200 pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    {producto.unidadMedida}
                  </span>
                </div>
              </div>

              {/* Precio de compra */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Precio de compra *
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Ej: 2.50"
                    value={formData.precio}
                    onChange={(e) =>
                      setFormData({ ...formData, precio: e.target.value })
                    }
                    className="h-11 bg-gray-50 border-gray-200 pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    €
                  </span>
                </div>
              </div>

              {/* Fecha de entrada */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Fecha de entrada *
                </label>
                <Input
                  type="date"
                  value={formData.fechaEntrada}
                  onChange={(e) =>
                    setFormData({ ...formData, fechaEntrada: e.target.value })
                  }
                  className="h-11 bg-gray-50 border-gray-200"
                />
              </div>

              {/* Fecha de caducidad (opcional) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">
                  Fecha de caducidad
                  <span className="text-gray-400 font-normal ml-1">(opcional)</span>
                </label>
                <Input
                  type="date"
                  value={formData.caducidad}
                  onChange={(e) =>
                    setFormData({ ...formData, caducidad: e.target.value })
                  }
                  className="h-11 bg-gray-50 border-gray-200"
                />
              </div>

              {/* Botones */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={handleCloseForm}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1"
                  disabled={!formData.cantidad || !formData.precio || Number(formData.cantidad) <= 0}
                >
                  {loteEditando ? "Guardar" : "Añadir lote"}
                </Button>
              </div>
            </div>
          ) : (
            /* Lista de lotes */
            <div className="p-4">
              {lotesSorted.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No hay lotes registrados</p>
                  <p className="text-sm mt-1">
                    Añade un lote para empezar a gestionar el stock
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {lotesSorted.map((lote) => {
                    const expired = isExpired(lote.caducidad);
                    const expiringSoon = isExpiringSoon(lote.caducidad);

                    return (
                      <div
                        key={lote.id}
                        className={`p-3 rounded-lg border ${
                          expired
                            ? "bg-red-50 border-red-200"
                            : expiringSoon
                            ? "bg-amber-50 border-amber-200"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        {/* Confirmación de eliminación */}
                        {confirmDelete === lote.id ? (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">
                              ¿Eliminar este lote?
                            </span>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setConfirmDelete(null)}
                              >
                                Cancelar
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(lote.id)}
                              >
                                Eliminar
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              {/* Cantidad y estado */}
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">
                                  {lote.cantidad} {producto.unidadMedida}
                                </span>
                                {expired && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                    <AlertTriangle className="h-3 w-3" />
                                    Caducado
                                  </span>
                                )}
                                {expiringSoon && !expired && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                    <AlertTriangle className="h-3 w-3" />
                                    Por caducar
                                  </span>
                                )}
                              </div>

                              {/* Detalles */}
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <DollarSign className="h-3.5 w-3.5" />
                                  {formatCurrency(lote.precio)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  Entrada: {formatDate(lote.fechaEntrada)}
                                </span>
                                {lote.caducidad && (
                                  <span className={`flex items-center gap-1 ${expired ? "text-red-600" : expiringSoon ? "text-amber-600" : ""}`}>
                                    <Calendar className="h-3.5 w-3.5" />
                                    Caduca: {formatDate(lote.caducidad)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Acciones */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleOpenForm(lote)}
                                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                                title="Editar"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setConfirmDelete(lote.id)}
                                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer con resumen */}
        {!mostrarFormulario && lotes.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {lotes.length} lote{lotes.length !== 1 ? "s" : ""} registrado{lotes.length !== 1 ? "s" : ""}
              </span>
              <span className="text-gray-600">
                Coste medio:{" "}
                <span className="font-medium text-gray-900">
                  {formatCurrency(
                    lotes.reduce((acc, l) => acc + l.precio * l.cantidad, 0) /
                      stockTotal || 0
                  )}
                  /{producto.unidadMedida}
                </span>
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
