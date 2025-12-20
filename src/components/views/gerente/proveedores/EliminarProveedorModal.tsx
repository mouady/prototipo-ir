"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Proveedor, TipoProducto, useProductos } from "@/mock";

interface EliminarProveedorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proveedor: Proveedor | null;
  onConfirm: () => void;
}

/**
 * Modal de confirmación de borrado de proveedor
 * 
 * Según especificación de UI/UX en proveedores.md:
 * - Cabecera con flecha para cancelar
 * - Título dinámico con nombre del proveedor
 * - Texto explicativo con consecuencias (X bebidas, Y recursos)
 * - Botón rojo de eliminar
 */
export function EliminarProveedorModal({
  open,
  onOpenChange,
  proveedor,
  onConfirm,
}: EliminarProveedorModalProps) {
  const { productos } = useProductos();

  if (!proveedor) return null;

  // Calcular productos asociados al proveedor que se eliminarán
  const productosDelProveedor = productos.filter(p => p.proveedor === proveedor.nombre);
  const cantidadBebidas = productosDelProveedor.filter(
    p => p.tipoProducto === TipoProducto.BEBIDA
  ).length;
  const cantidadRecursos = productosDelProveedor.filter(
    p => p.tipoProducto === TipoProducto.RECURSO
  ).length;

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[400px] p-0 gap-0"
        showCloseButton={false}
      >
        {/* Header con flecha para cancelar */}
        <div className="px-4 py-3 border-b border-gray-200">
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-4 space-y-4">
          {/* Título */}
          <h2 className="text-lg font-semibold text-gray-900">
            ¿Deseas eliminar a {proveedor.nombre}?
          </h2>

          {/* Mensaje explicativo con consecuencias */}
          <p className="text-sm text-gray-600">
            Este proveedor suministra{" "}
            <span className="font-semibold">{cantidadBebidas} bebidas</span> y{" "}
            <span className="font-semibold">{cantidadRecursos} recursos</span>{" "}
            que se eliminarán del inventario.
          </p>

          {/* Botón de eliminar */}
          <div className="flex justify-end pt-2">
            <Button
              variant="destructive"
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
