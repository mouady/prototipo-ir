"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Clock, Euro, X, Check } from "lucide-react";
import { FormatoP, FormatoPlato } from "@/mock";

// Labels para mostrar FormatoPlato en español
const FORMATO_LABELS: Record<FormatoPlato, string> = {
  [FormatoPlato.ESTANDAR]: "Estándar",
  [FormatoPlato.TAPA]: "Tapa",
  [FormatoPlato.MEDIA]: "Media",
  [FormatoPlato.RACION]: "Ración",
};

interface FormatosSectionProps {
  formatos: FormatoP[];
  onChange: (formatos: FormatoP[]) => void;
  disabled?: boolean;
}

interface FormatoFormState {
  formatoPlato: FormatoPlato | "";
  precio: string;
  tiempoPreparacion: string;
}

const INITIAL_FORM_STATE: FormatoFormState = {
  formatoPlato: "",
  precio: "",
  tiempoPreparacion: "",
};

export function FormatosSection({ formatos, onChange, disabled }: FormatosSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormatoFormState>(INITIAL_FORM_STATE);

  // Obtener formatos disponibles (no usados)
  const formatosUsados = new Set(formatos.map((f) => f.formatoPlato));
  const formatosDisponibles = Object.values(FormatoPlato).filter(
    (f) => !formatosUsados.has(f) || (editingId && formatos.find((fmt) => fmt.id === editingId)?.formatoPlato === f)
  );

  const resetForm = () => {
    setFormState(INITIAL_FORM_STATE);
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleAddClick = () => {
    setShowAddForm(true);
    setEditingId(null);
    setFormState(INITIAL_FORM_STATE);
  };

  const handleEditClick = (formato: FormatoP) => {
    setEditingId(formato.id);
    setShowAddForm(false);
    setFormState({
      formatoPlato: formato.formatoPlato,
      precio: formato.precio.toString(),
      tiempoPreparacion: formato.tiempoPreparacion.toString(),
    });
  };

  const handleDeleteClick = (formatoId: string) => {
    // No permitir eliminar si es el único formato
    if (formatos.length <= 1) return;
    
    const nuevosFormatos = formatos.filter((f) => f.id !== formatoId);
    onChange(nuevosFormatos);
  };

  const handleSaveNew = () => {
    if (!formState.formatoPlato || !formState.precio || !formState.tiempoPreparacion) return;

    const nuevoFormato: FormatoP = {
      id: `temp-${Date.now()}`, // ID temporal, se reemplazará al guardar el plato
      formatoPlato: formState.formatoPlato as FormatoPlato,
      precio: parseFloat(formState.precio),
      tiempoPreparacion: parseInt(formState.tiempoPreparacion),
    };

    onChange([...formatos, nuevoFormato]);
    resetForm();
  };

  const handleSaveEdit = () => {
    if (!editingId || !formState.formatoPlato || !formState.precio || !formState.tiempoPreparacion) return;

    const nuevosFormatos = formatos.map((f) =>
      f.id === editingId
        ? {
            ...f,
            formatoPlato: formState.formatoPlato as FormatoPlato,
            precio: parseFloat(formState.precio),
            tiempoPreparacion: parseInt(formState.tiempoPreparacion),
          }
        : f
    );

    onChange(nuevosFormatos);
    resetForm();
  };

  const isFormValid = formState.formatoPlato && formState.precio && formState.tiempoPreparacion;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Formatos del plato *
        </label>
        {!showAddForm && !editingId && formatosDisponibles.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAddClick}
            disabled={disabled}
            className="h-7 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Añadir
          </Button>
        )}
      </div>

      {/* Lista de formatos existentes */}
      <div className="space-y-2">
        {formatos.map((formato) => (
          <div key={formato.id}>
            {editingId === formato.id ? (
              // Formulario de edición inline
              <FormatoForm
                formState={formState}
                onChange={setFormState}
                formatosDisponibles={formatosDisponibles}
                onSave={handleSaveEdit}
                onCancel={resetForm}
                isValid={!!isFormValid}
              />
            ) : (
              // Vista del formato
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm text-gray-900">
                      {FORMATO_LABELS[formato.formatoPlato]}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Euro className="h-3.5 w-3.5" />
                      <span className="text-sm">{formato.precio.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-3.5 w-3.5" />
                      <span className="text-sm">{formato.tiempoPreparacion} min</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleEditClick(formato)}
                    disabled={disabled}
                    className="p-1.5 hover:bg-gray-200 rounded transition-colors disabled:opacity-50"
                  >
                    <Pencil className="h-3.5 w-3.5 text-gray-600" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(formato.id)}
                    disabled={disabled || formatos.length <= 1}
                    className="p-1.5 hover:bg-red-100 rounded transition-colors disabled:opacity-50"
                    title={formatos.length <= 1 ? "Debe haber al menos un formato" : "Eliminar formato"}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Formulario para añadir nuevo formato */}
      {showAddForm && (
        <FormatoForm
          formState={formState}
          onChange={setFormState}
          formatosDisponibles={formatosDisponibles}
          onSave={handleSaveNew}
          onCancel={resetForm}
          isValid={!!isFormValid}
        />
      )}

      {/* Mensaje si no hay formatos */}
      {formatos.length === 0 && !showAddForm && (
        <div className="text-center py-4 text-gray-500 text-sm">
          No hay formatos configurados.
          <button
            type="button"
            onClick={handleAddClick}
            className="text-blue-600 hover:underline ml-1"
          >
            Añade uno
          </button>
        </div>
      )}
    </div>
  );
}

// Componente interno para el formulario de formato
interface FormatoFormProps {
  formState: FormatoFormState;
  onChange: (state: FormatoFormState) => void;
  formatosDisponibles: FormatoPlato[];
  onSave: () => void;
  onCancel: () => void;
  isValid: boolean;
}

function FormatoForm({
  formState,
  onChange,
  formatosDisponibles,
  onSave,
  onCancel,
  isValid,
}: FormatoFormProps) {
  return (
    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {/* Tipo de formato */}
        <div className="space-y-1">
          <label className="text-xs text-gray-600">Formato</label>
          <Select
            value={formState.formatoPlato}
            onValueChange={(value) =>
              onChange({ ...formState, formatoPlato: value as FormatoPlato })
            }
          >
            <SelectTrigger className="h-9 text-sm bg-white">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              {formatosDisponibles.map((formato) => (
                <SelectItem key={formato} value={formato}>
                  {FORMATO_LABELS[formato]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Precio */}
        <div className="space-y-1">
          <label className="text-xs text-gray-600">Precio (€)</label>
          <Input
            type="number"
            step="0.01"
            min="0"
            value={formState.precio}
            onChange={(e) => onChange({ ...formState, precio: e.target.value })}
            placeholder="0.00"
            className="h-9 text-sm bg-white"
          />
        </div>

        {/* Tiempo de preparación */}
        <div className="space-y-1">
          <label className="text-xs text-gray-600">Tiempo (min)</label>
          <Input
            type="number"
            min="1"
            value={formState.tiempoPreparacion}
            onChange={(e) =>
              onChange({ ...formState, tiempoPreparacion: e.target.value })
            }
            placeholder="10"
            className="h-9 text-sm bg-white"
          />
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="h-7 px-2"
        >
          <X className="h-3.5 w-3.5 mr-1" />
          Cancelar
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={onSave}
          disabled={!isValid}
          className="h-7 px-2"
        >
          <Check className="h-3.5 w-3.5 mr-1" />
          Guardar
        </Button>
      </div>
    </div>
  );
}
