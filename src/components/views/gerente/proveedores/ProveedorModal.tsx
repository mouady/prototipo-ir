"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Proveedor } from "@/mock";
import type { NuevoProveedor } from "./types";

interface ProveedorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (datos: NuevoProveedor) => void;
  proveedorParaEditar?: Proveedor | null;
}

/**
 * Modal para añadir o editar un proveedor
 * 
 * Según especificación de UI/UX en proveedores.md:
 * - Cabecera con flecha para cerrar/volver
 * - Formulario con campos: nombre, CIF, teléfono, email
 * - Botón primario ancho completo
 * 
 * RN-20: tlf, cif y email deben respetar formatos válidos.
 */
export function ProveedorModal({
  open,
  onOpenChange,
  onSubmit,
  proveedorParaEditar,
}: ProveedorModalProps) {
  const [nombre, setNombre] = useState("");
  const [cif, setCif] = useState("");
  const [tlf, setTlf] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [initialized, setInitialized] = useState(false);

  const esEdicion = !!proveedorParaEditar;

  // Resetear formulario
  const resetForm = useCallback(() => {
    setNombre("");
    setCif("");
    setTlf("");
    setEmail("");
    setErrors({});
    setInitialized(false);
  }, []);

  // Inicializar valores cuando el modal se abre
  const initializeForm = useCallback(() => {
    if (proveedorParaEditar) {
      setNombre(proveedorParaEditar.nombre);
      setCif(proveedorParaEditar.cif);
      setTlf(proveedorParaEditar.tlf);
      setEmail(proveedorParaEditar.email);
    } else {
      setNombre("");
      setCif("");
      setTlf("");
      setEmail("");
    }
    setErrors({});
    setInitialized(true);
  }, [proveedorParaEditar]);

  // Manejar cambios de apertura del modal
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && !initialized) {
      initializeForm();
    } else if (!newOpen) {
      resetForm();
    }
    onOpenChange(newOpen);
  };

  // Validación de campos (RN-20)
  const validarFormulario = (): boolean => {
    const nuevosErrors: Record<string, string> = {};

    if (!nombre.trim()) {
      nuevosErrors.nombre = "El nombre es obligatorio";
    }

    if (!cif.trim()) {
      nuevosErrors.cif = "El CIF es obligatorio";
    } else if (!/^[A-Z]\d{8}$/i.test(cif.trim())) {
      nuevosErrors.cif = "Formato de CIF inválido (Ej: A12345678)";
    }

    if (!tlf.trim()) {
      nuevosErrors.tlf = "El teléfono es obligatorio";
    } else if (!/^(\+34\s?)?\d{9}$|^\d{9}$/.test(tlf.replace(/\s/g, ""))) {
      nuevosErrors.tlf = "Formato de teléfono inválido";
    }

    if (!email.trim()) {
      nuevosErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nuevosErrors.email = "Formato de email inválido";
    }

    setErrors(nuevosErrors);
    return Object.keys(nuevosErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;

    const datos: NuevoProveedor = {
      nombre: nombre.trim(),
      cif: cif.trim().toUpperCase(),
      tlf: tlf.trim(),
      email: email.trim().toLowerCase(),
    };

    onSubmit(datos);
    onOpenChange(false);
    resetForm();
  };

  const handleClose = () => {
    onOpenChange(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent 
        className="sm:max-w-[400px] p-0 gap-0"
        showCloseButton={false}
      >
        {/* Header con flecha para cerrar */}
        <div className="px-4 py-3 border-b border-gray-200">
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Campo Nombre */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Nombre
            </label>
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Naranjas Antonio"
              className={errors.nombre ? "border-red-500" : ""}
            />
            {errors.nombre && (
              <p className="text-xs text-red-500">{errors.nombre}</p>
            )}
          </div>

          {/* Campo CIF */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              CIF
            </label>
            <Input
              value={cif}
              onChange={(e) => setCif(e.target.value)}
              placeholder="Ej: A12345678"
              className={errors.cif ? "border-red-500" : ""}
            />
            {errors.cif && (
              <p className="text-xs text-red-500">{errors.cif}</p>
            )}
          </div>

          {/* Campo Teléfono */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <Input
              value={tlf}
              onChange={(e) => setTlf(e.target.value)}
              placeholder="Ej: +34 123 45 67 89"
              className={errors.tlf ? "border-red-500" : ""}
            />
            {errors.tlf && (
              <p className="text-xs text-red-500">{errors.tlf}</p>
            )}
          </div>

          {/* Campo Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ej: abc@defg.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Botón de acción */}
          <Button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-700 text-white"
          >
            {esEdicion ? "Guardar cambios" : "+ Añadir proveedor"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
