"use client";

import { useState, useRef } from "react";
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
import { ArrowLeft, Upload, X, Trash2 } from "lucide-react";
import { 
  Plato,
  CategoriaCarta,
  agregarPlato,
  actualizarPlato,
} from "@/mock";
import { EliminarPlatoModal } from "./EliminarPlatoModal";

interface PlatoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platoParaEditar?: Plato | null;
  onSuccess?: () => void;
}

// Mapeo de categorías para mostrar en español
const CATEGORIA_LABELS: Record<CategoriaCarta, string> = {
  [CategoriaCarta.ENSALADAS]: "Ensaladas",
  [CategoriaCarta.EN_FRIO]: "En frío",
  [CategoriaCarta.CALENTITO]: "Calenitos",
  [CategoriaCarta.PESCADO_FRITO]: "Pescado frito",
  [CategoriaCarta.SUGERENCIAS]: "Sugerencias",
  [CategoriaCarta.REFRESCOS]: "Refrescos",
  [CategoriaCarta.AGUA]: "Agua",
  [CategoriaCarta.CERVEZAS]: "Cervezas",
  [CategoriaCarta.VINOS]: "Vinos",
  [CategoriaCarta.INFUSIONES_Y_CAFE]: "Infusiones y café",
  [CategoriaCarta.OTROS]: "Otros",
};

export function PlatoModal({
  open,
  onOpenChange,
  platoParaEditar,
  onSuccess,
}: PlatoModalProps) {
  // Form state - inicializado con los datos del plato si existe
  const [nombre, setNombre] = useState(platoParaEditar?.nombre || "");
  const [categoria, setCategoria] = useState<CategoriaCarta | "">(platoParaEditar?.categoriaCarta || "");
  const [imagen, setImagen] = useState(platoParaEditar?.imagen || "");
  const [imagenNombre, setImagenNombre] = useState(platoParaEditar?.imagen.split("/").pop() || "");
  const [eliminarModalOpen, setEliminarModalOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const esEdicion = !!platoParaEditar;

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagenNombre(file.name);
      setImagen(`/platos/${file.name}`);
    }
  };

  const handleRemoveFile = () => {
    setImagen("");
    setImagenNombre("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    // Validaciones básicas
    if (!nombre.trim() || !categoria || !imagen) {
      return;
    }

    const datosPlato: Omit<Plato, "id"> = {
      tipo: "plato",
      nombre: nombre.trim(),
      imagen,
      categoriaCarta: categoria as CategoriaCarta,
    };

    if (esEdicion && platoParaEditar) {
      actualizarPlato(platoParaEditar.id, datosPlato);
    } else {
      agregarPlato(datosPlato);
    }

    onOpenChange(false);
    onSuccess?.();
  };

  const handleEliminar = () => {
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <>
      <Dialog 
        key={platoParaEditar?.id || 'new'} 
        open={open} 
        onOpenChange={onOpenChange}
      >
        <DialogContent className="sm:max-w-[450px] p-0 gap-0 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {esEdicion ? "Editar plato" : "Nuevo plato"}
            </h2>
          </div>

          {/* Contenido */}
          <div className="px-6 py-4 space-y-4">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Nombre del plato *
              </label>
              <Input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Papas bravas"
                className="w-full"
              />
            </div>

            {/* Categoría */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Categoría *
              </label>
              <Select
                value={categoria}
                onValueChange={(value) => setCategoria(value as CategoriaCarta)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORIA_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Imagen */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Imagen del plato *
              </label>
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {imagenNombre ? (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate">
                        {imagenNombre}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleFileUpload}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Subir imagen
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
            {esEdicion && (
              <Button
                variant="outline"
                onClick={() => setEliminarModalOpen(true)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </Button>
            )}
            <div className="flex-1" />
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!nombre.trim() || !categoria || !imagen}
            >
              {esEdicion ? "Guardar" : "Crear"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {esEdicion && platoParaEditar && (
        <EliminarPlatoModal
          open={eliminarModalOpen}
          onOpenChange={setEliminarModalOpen}
          plato={platoParaEditar}
          onConfirm={handleEliminar}
        />
      )}
    </>
  );
}
