"use client";

import { Producto, TipoProducto, getPlatos } from "@/mock";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ConfirmarEliminacionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  producto: Producto | null;
  onConfirm: () => void;
}

export function DeleteModal({
  open,
  onOpenChange,
  producto,
  onConfirm,
}: ConfirmarEliminacionModalProps) {
  if (!producto) return null;

  const esIngrediente = producto.tipoProducto === TipoProducto.INGREDIENTE;

  // Obtener platos que usan este ingrediente (heurística del prototipo)
  const platos = getPlatos();
  const platosQueUsan = esIngrediente
    ? platos.filter(
        (plato) =>
          plato.nombre.toLowerCase().includes(producto.nombre.toLowerCase())
      )
    : [];

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-0 gap-0">
        {/* Header con icono de alerta */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-200">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-red-100 p-2 flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                ¿Deseas eliminar {producto.nombre}?
              </h2>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="px-6 py-4 space-y-4">
          {/* Información de cantidad */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-700">
              Eliminarías{" "}
              <span className="font-semibold">
                {producto.stock} {producto.unidadMedida}
              </span>{" "}
              de {producto.nombre.toLowerCase()}
            </p>
          </div>

          {/* Información de platos afectados */}
          {platosQueUsan.length > 0 && (
            <div className="bg-amber-50 rounded-lg p-3">
              <p className="text-sm text-amber-900">
                Este ingrediente se usa en{" "}
                <span className="font-semibold">{platosQueUsan.length}</span>{" "}
                plato{platosQueUsan.length !== 1 ? "s" : ""} distinto
                {platosQueUsan.length !== 1 ? "s" : ""}:
              </p>
              <ul className="mt-2 text-sm text-amber-800 space-y-1">
                {platosQueUsan.slice(0, 3).map((plato) => (
                  <li key={plato.id} className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{plato.nombre}</span>
                  </li>
                ))}
                {platosQueUsan.length > 3 && (
                  <li className="text-amber-700 italic">
                    +{platosQueUsan.length - 3} más...
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Advertencia */}
          <p className="text-xs text-gray-500">
            Esta acción no se puede deshacer.
          </p>
        </div>

        {/* Botones */}
        <div className="px-6 pb-6 flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            Eliminar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
