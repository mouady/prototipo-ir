"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Plato, eliminarPlato } from "@/mock";

interface EliminarPlatoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plato: Plato | null;
  onConfirm: () => void;
}

// Función para formatear la categoría
const formatCategoria = (categoria: string) => {
  return categoria
    .split("_")
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

export function EliminarPlatoModal({
  open,
  onOpenChange,
  plato,
  onConfirm,
}: EliminarPlatoModalProps) {
  if (!plato) return null;

  const categoriaLabel = formatCategoria(plato.categoriaCarta).toLowerCase();

  const handleConfirm = () => {
    eliminarPlato(plato.id);
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
                Vas a eliminar un plato
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                ¿Deseas eliminar {plato.nombre}?
              </p>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="px-6 py-4 space-y-4">
          {/* Información del plato */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-700">
              Esta acción eliminará permanentemente{" "}
              <span className="font-semibold">{plato.nombre}</span>{" "}
              de la categoría {categoriaLabel}.
            </p>
          </div>

          {/* Advertencia */}
          <p className="text-xs text-gray-500">
            Esta acción no se puede deshacer. El plato ya no estará disponible
            en el inventario.
          </p>
        </div>

        {/* Footer con botones */}
        <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
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
