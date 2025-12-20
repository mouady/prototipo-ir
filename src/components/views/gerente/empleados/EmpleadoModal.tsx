"use client";

import { useState, useEffect, useRef } from "react";
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
import { ArrowLeft, Upload, X } from "lucide-react";
import { 
  Empleado, 
  NuevoEmpleado, 
  TipoContrato, 
  Genero, 
  RolEmpleado,
  agregarEmpleado,
  actualizarEmpleado,
} from "@/mock";

interface EmpleadoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  empleadoParaEditar?: Empleado | null;
  onSuccess?: () => void;
}

// Mapeo de géneros para mostrar en español
const GENERO_LABELS: Record<Genero, string> = {
  [Genero.MASCULINO]: "Masculino",
  [Genero.FEMENINO]: "Femenino",
  [Genero.OTRO]: "Otro",
};

// Mapeo de roles para mostrar en español
const ROL_LABELS: Record<RolEmpleado, string> = {
  [RolEmpleado.CAMARERO]: "Camarero",
  [RolEmpleado.COCINERO]: "Cocinero",
};

/**
 * Modal de creación y edición de empleados
 * 
 * Incluye lógica condicional para el campo Fin del contrato:
 * - Si el toggle "Indefinido" está activo, el campo se oculta
 * - Si está desactivado (contrato temporal), el campo es visible y obligatorio
 * 
 * Basado en el modelo conceptual:
 * RN-06: finContrato debe ser null si y solo si tipoContrato es INDEFINIDO
 */
export function EmpleadoModal({
  open,
  onOpenChange,
  empleadoParaEditar,
  onSuccess,
}: EmpleadoModalProps) {
  // Form state
  const [username, setUsername] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [genero, setGenero] = useState<Genero | "">("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [dni, setDni] = useState("");
  const [esIndefinido, setEsIndefinido] = useState(false);
  const [finContrato, setFinContrato] = useState("");
  const [rol, setRol] = useState<RolEmpleado | "">("");
  const [imagenPerfil, setImagenPerfil] = useState("");
  const [imagenNombre, setImagenNombre] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const esEdicion = !!empleadoParaEditar;

  const resetForm = () => {
    setUsername("");
    setNombre("");
    setApellidos("");
    setGenero("");
    setFechaNacimiento("");
    setDni("");
    setEsIndefinido(false);
    setFinContrato("");
    setRol("");
    setImagenPerfil("");
    setImagenNombre("");
  };

  // Cargar datos cuando se abre en modo edición
  useEffect(() => {
    if (empleadoParaEditar) {
      setUsername(empleadoParaEditar.username);
      setNombre(empleadoParaEditar.nombre);
      setApellidos(empleadoParaEditar.apellidos);
      setGenero(empleadoParaEditar.genero);
      setFechaNacimiento(empleadoParaEditar.fechaNacimiento);
      setDni(empleadoParaEditar.dni);
      setEsIndefinido(empleadoParaEditar.tipoContrato === TipoContrato.INDEFINIDO);
      setFinContrato(empleadoParaEditar.finContrato || "");
      setRol(empleadoParaEditar.rol);
      setImagenPerfil(empleadoParaEditar.imagenPerfil || "");
      setImagenNombre(empleadoParaEditar.imagenPerfil?.split("/").pop() || "");
    }
  }, [empleadoParaEditar]);

  // Limpiar formulario cuando se abre en modo creación
  useEffect(() => {
    if (open && !empleadoParaEditar) {
      resetForm();
    }
  }, [open, empleadoParaEditar]);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // En un caso real, aquí se subiría el archivo
      // Para el prototipo, simulamos con una URL local
      setImagenNombre(file.name);
      setImagenPerfil(`/empleados/${file.name}`);
    }
  };

  const handleRemoveFile = () => {
    setImagenPerfil("");
    setImagenNombre("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    // Validaciones básicas
    if (!username.trim() || !nombre.trim() || !apellidos.trim() || !genero || !fechaNacimiento || !dni.trim() || !rol) {
      return;
    }

    // RN-06: Si no es indefinido, fin de contrato es obligatorio
    if (!esIndefinido && !finContrato) {
      return;
    }

    const datosEmpleado: NuevoEmpleado = {
      username: username.trim(),
      nombre: nombre.trim(),
      apellidos: apellidos.trim(),
      genero: genero as Genero,
      fechaNacimiento,
      dni: dni.trim(),
      tipoContrato: esIndefinido ? TipoContrato.INDEFINIDO : TipoContrato.TEMPORAL,
      finContrato: esIndefinido ? undefined : finContrato,
      rol: rol as RolEmpleado,
      imagenPerfil: imagenPerfil || undefined,
      activo: empleadoParaEditar?.activo ?? true,
    };

    if (esEdicion && empleadoParaEditar) {
      actualizarEmpleado(empleadoParaEditar.id, datosEmpleado);
    } else {
      agregarEmpleado(datosEmpleado);
    }

    onOpenChange(false);
    resetForm();
    onSuccess?.();
  };

  // Formatear fecha para mostrar en el input date
  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return "";
    // Si ya está en formato YYYY-MM-DD, devolver tal cual
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    // Intentar parsear otras formas
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            {esEdicion ? "Editar empleado" : "Nuevo empleado"}
          </h2>
        </div>

        {/* Formulario */}
        <div className="px-6 py-4 space-y-4">
          {/* Nombre de usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de usuario
            </label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="usuario123"
            />
          </div>

          {/* Nombre y Apellidos */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <Input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Antonio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellidos
              </label>
              <Input
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder="García López"
              />
            </div>
          </div>

          {/* Género */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Género
            </label>
            <Select value={genero} onValueChange={(value) => setGenero(value as Genero)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona género" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(GENERO_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de nacimiento
            </label>
            <Input
              type="date"
              value={formatDateForInput(fechaNacimiento)}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
          </div>

          {/* DNI */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              DNI
            </label>
            <Input
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="12345678A"
            />
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol
            </label>
            <Select value={rol} onValueChange={(value) => setRol(value as RolEmpleado)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona rol" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ROL_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Toggle Indefinido */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Indefinido
            </label>
            <button
              type="button"
              onClick={() => setEsIndefinido(!esIndefinido)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                esIndefinido ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  esIndefinido ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Fin del contrato (condicional - RN-06) */}
          {!esIndefinido && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fin del contrato
              </label>
              <Input
                type="date"
                value={formatDateForInput(finContrato)}
                onChange={(e) => setFinContrato(e.target.value)}
              />
            </div>
          )}

          {/* Foto de perfil */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto de perfil
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {imagenNombre ? (
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                <span className="text-sm text-gray-700 flex-1 truncate">
                  {imagenNombre}
                </span>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X className="h-4 w-4" />
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
                Subir
              </Button>
            )}
          </div>
        </div>

        {/* Footer con botón de acción */}
        <div className="px-6 py-4 border-t border-gray-200">
          <Button
            onClick={handleSubmit}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white"
          >
            {esEdicion ? "Guardar cambios" : "Crear empleado"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
