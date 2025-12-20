"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus } from "lucide-react";
import { agregarIngrediente } from "@/mock";

interface AgregarIngredienteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mapeo de IDs de proveedor a nombres
const PROVEEDORES_MAP: Record<string, string> = {
  cashsupremo: "CashSupremo",
  "pimientos-juanito": "Pimientos Juanito",
  "mercado-central": "Mercado Central",
};

export function AgregarIngredienteModal({
  open,
  onOpenChange,
}: AgregarIngredienteModalProps) {
  const [nombre, setNombre] = useState("");
  const [unidad, setUnidad] = useState("kg");
  const [umbralActivo, setUmbralActivo] = useState(true);
  const [umbral, setUmbral] = useState("");
  const [proveedor, setProveedor] = useState("");

  const resetForm = () => {
    setNombre("");
    setUnidad("kg");
    setUmbralActivo(true);
    setUmbral("");
    setProveedor("");
  };

  const handleSubmit = () => {
    if (!nombre.trim()) {
      return; // No permitir nombres vacíos
    }

    // Obtener el nombre del proveedor
    const proveedorNombre = PROVEEDORES_MAP[proveedor] || proveedor || "Sin proveedor";

    // Agregar el ingrediente al store
    agregarIngrediente({
      nombre: nombre.trim(),
      proveedor: proveedorNombre,
      unidad,
      umbral: umbralActivo ? Number(umbral) || 0 : undefined,
      cantidad: 0, // Nuevo ingrediente empieza sin cantidad
      stockActual: 0,
      stockTotal: 0,
    });

    onOpenChange(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[340px] p-0 gap-0"
        showCloseButton={false}
      >
        {/* Header con flecha de regreso */}
        <div className="p-4 pb-2">
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Contenido del formulario */}
        <div className="px-6 pb-6 space-y-5">
          {/* Campo Nombre */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Nombre</label>
            <Input
              placeholder="Ej: Manzana"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="h-11 bg-gray-50 border-gray-200"
            />
          </div>

          {/* Campo Unidad de medida */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Unidad de medida
            </label>
            <Select value={unidad} onValueChange={setUnidad}>
              <SelectTrigger className="h-11 bg-gray-50 border-gray-200 w-full">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Kilos</SelectItem>
                <SelectItem value="g">Gramos</SelectItem>
                <SelectItem value="l">Litros</SelectItem>
                <SelectItem value="ml">Mililitros</SelectItem>
                <SelectItem value="uds">Unidades</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campo Umbral con toggle */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-900">Umbral</label>
              {/* Toggle switch */}
              <button
                type="button"
                role="switch"
                aria-checked={umbralActivo}
                onClick={() => setUmbralActivo(!umbralActivo)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  umbralActivo ? "bg-emerald-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                    umbralActivo ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
            {umbralActivo && (
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Ej: 23"
                  value={umbral}
                  onChange={(e) => setUmbral(e.target.value)}
                  className="h-11 bg-gray-50 border-gray-200 pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  {unidad}
                </span>
              </div>
            )}
          </div>

          {/* Campo Proveedor */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Proveedor
            </label>
            <Select value={proveedor} onValueChange={setProveedor}>
              <SelectTrigger className="h-11 bg-gray-50 border-gray-200 w-full">
                <SelectValue placeholder="Seleccionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cashsupremo">CashSupremo</SelectItem>
                <SelectItem value="pimientos-juanito">
                  Pimientos Juanito
                </SelectItem>
                <SelectItem value="mercado-central">Mercado Central</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botón de añadir */}
          <Button
            onClick={handleSubmit}
            className="w-full h-11 bg-gray-800 hover:bg-gray-900 text-white gap-2"
          >
            <Plus className="h-4 w-4" />
            Añadir ingrediente
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
