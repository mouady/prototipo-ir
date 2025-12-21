"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Edit2, Trash2, Copy, X } from "lucide-react";
import { Empleado, RolEmpleado, TipoContrato, Genero } from "@/mock";
import { useState } from "react";
import { getPublicPath } from "@/lib/path";
import { getRolLabel } from "@/lib/utils";

interface DetalleEmpleadoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  empleado: Empleado | null;
  onEdit?: (empleado: Empleado) => void;
  onDelete?: (empleado: Empleado) => void;
}

// Mapeo de géneros para mostrar en español
const GENERO_LABELS: Record<Genero, string> = {
  [Genero.MASCULINO]: "Masculino",
  [Genero.FEMENINO]: "Femenino",
  [Genero.OTRO]: "Otro",
};

/**
 * Modal de vista de detalle de empleado (read-only)
 * Muestra todos los datos del empleado con opción de copiar al portapapeles
 * Incluye botones para editar y eliminar
 */
export function DetalleEmpleadoModal({
  open,
  onOpenChange,
  empleado,
  onEdit,
  onDelete,
}: DetalleEmpleadoModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!empleado) return null;

  const nombreCompleto = `${empleado.nombre} ${empleado.apellidos}`;
  const rolLabel = getRolLabel(empleado.rol, empleado.genero);
  const generoLabel = GENERO_LABELS[empleado.genero];

  // Formatear fecha para mostrar
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  const handleEdit = () => {
    onEdit?.(empleado);
    onOpenChange(false);
  };

  const handleDelete = () => {
    onDelete?.(empleado);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0" showCloseButton={false}>
        {/* Header con botón cerrar y acciones */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Detalle del empleado
          </h2>
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={handleEdit}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Editar"
              >
                <Edit2 className="h-4 w-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDelete}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                title="Eliminar"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="flex gap-6 p-6">
          {/* Imagen de perfil */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
              {empleado.imagenPerfil ? (
                <Image
                  src={getPublicPath(empleado.imagenPerfil)}
                  alt={nombreCompleto}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-3xl font-semibold">
                  {empleado.nombre.charAt(0)}{empleado.apellidos.charAt(0)}
                </div>
              )}
            </div>
            {/* Indicador de estado */}
            <div className="mt-2 flex items-center justify-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  empleado.activo ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className="text-sm text-gray-600">
                {empleado.activo ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          {/* Datos del empleado */}
          <div className="flex-1 space-y-3">
            {/* Nombre completo */}
            <DataRow
              label="Nombre"
              value={nombreCompleto}
              onCopy={() => handleCopy(nombreCompleto, "nombre")}
              copied={copiedField === "nombre"}
            />

            {/* Usuario */}
            <DataRow
              label="Usuario"
              value={empleado.username}
              onCopy={() => handleCopy(empleado.username, "username")}
              copied={copiedField === "username"}
            />

            {/* DNI */}
            <DataRow
              label="DNI"
              value={empleado.dni}
              onCopy={() => handleCopy(empleado.dni, "dni")}
              copied={copiedField === "dni"}
            />

            {/* Género */}
            <DataRow
              label="Género"
              value={generoLabel}
            />

            {/* Fecha de nacimiento */}
            <DataRow
              label="Nacimiento"
              value={formatDate(empleado.fechaNacimiento)}
            />

            {/* Rol */}
            <DataRow
              label="Rol"
              value={rolLabel}
            />

            {/* Tipo de contrato */}
            <DataRow
              label="Contrato"
              value={empleado.tipoContrato === TipoContrato.INDEFINIDO ? "Indefinido" : "Temporal"}
            />

            {/* Fin de contrato (solo si es temporal) */}
            {empleado.tipoContrato === TipoContrato.TEMPORAL && empleado.finContrato && (
              <DataRow
                label="Fin contrato"
                value={formatDate(empleado.finContrato)}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Componente auxiliar para mostrar una fila de datos */
function DataRow({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onCopy?: () => void;
  copied?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
      {onCopy && (
        <button
          onClick={onCopy}
          className={`p-1.5 rounded transition-colors ${
            copied
              ? "text-green-600 bg-green-50"
              : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          }`}
          title={copied ? "¡Copiado!" : "Copiar"}
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
