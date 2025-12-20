"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Empleado, RolEmpleado } from "@/mock";

interface EliminarEmpleadoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  empleado: Empleado | null;
  onConfirm: () => void;
}

/**
 * Modal de confirmación de eliminación de empleado
 * Muestra un diálogo de alerta con el rol y nombre del empleado
 */
export function EliminarEmpleadoModal({
  open,
  onOpenChange,
  empleado,
  onConfirm,
}: EliminarEmpleadoModalProps) {
  if (!empleado) return null;

  const nombreCompleto = `${empleado.nombre} ${empleado.apellidos}`;
  const rolLabel = empleado.rol === RolEmpleado.CAMARERO ? "camarero" : "cocinero";

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
                Vas a eliminar a un {rolLabel}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                ¿Deseas eliminar a {nombreCompleto}?
              </p>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="px-6 py-4 space-y-4">
          {/* Información del empleado */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-700">
              Esta acción eliminará permanentemente el registro de{" "}
              <span className="font-semibold">{nombreCompleto}</span>{" "}
              del sistema.
            </p>
          </div>

          {/* Advertencia */}
          <p className="text-xs text-gray-500">
            Esta acción no se puede deshacer. Se perderán todos los datos
            asociados a este empleado.
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
            variant="destructive"
            onClick={handleConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            Eliminar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
