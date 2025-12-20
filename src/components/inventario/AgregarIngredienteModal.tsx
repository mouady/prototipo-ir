"use client";

import { useState, useEffect } from "react";
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
import { agregarProducto, actualizarProducto, TipoProducto, UnidadMedida, Producto } from "@/mock";

interface AgregarProductoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tipoProducto: TipoProducto;
  productoParaEditar?: Producto;
}

// Mapeo de IDs de proveedor a nombres
const PROVEEDORES_MAP: Record<string, string> = {
  cashsupremo: "CashSupremo",
  "pimientos-juanito": "Pimientos Juanito",
  "mercado-central": "Mercado Central",
};

// Mapeo de unidades del form al enum
const UNIDAD_MAP: Record<string, UnidadMedida> = {
  kg: UnidadMedida.KG,
  g: UnidadMedida.GRAMOS,
  l: UnidadMedida.LITROS,
  ml: UnidadMedida.ML,
  uds: UnidadMedida.UNIDADES,
};

function getEtiquetaProducto(tipo: TipoProducto) {
  switch (tipo) {
    case TipoProducto.INGREDIENTE:
      return "ingrediente";
    case TipoProducto.BEBIDA:
      return "bebida";
    case TipoProducto.RECURSO:
      return "recurso";
    default:
      return "producto";
  }
}

export function AgregarProductoModal({
  open,
  onOpenChange,
  tipoProducto,
  productoParaEditar,
}: AgregarProductoModalProps) {
  const [nombre, setNombre] = useState("");
  const [unidad, setUnidad] = useState("kg");
  const [umbralActivo, setUmbralActivo] = useState(true);
  const [umbral, setUmbral] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [stock, setStock] = useState("");
  const [litros, setLitros] = useState("");

  const etiqueta = getEtiquetaProducto(productoParaEditar?.tipoProducto ?? tipoProducto);
  const tipoEfectivo = productoParaEditar?.tipoProducto ?? tipoProducto;

  // Cargar datos del ingrediente cuando se abre el modal en modo edición
  useEffect(() => {
    if (productoParaEditar) {
      setNombre(productoParaEditar.nombre);
      setStock(productoParaEditar.stock.toString());
      setUnidad(productoParaEditar.unidadMedida);
      setUmbral(productoParaEditar.umbral?.toString() || "");
      setUmbralActivo(!!productoParaEditar.umbral);
      setProveedor(productoParaEditar.proveedor || "");
      setLitros(
        typeof productoParaEditar.litros === "number"
          ? productoParaEditar.litros.toString()
          : ""
      );
    }
  }, [productoParaEditar]);

  const resetForm = () => {
    setNombre("");
    setUnidad(tipoProducto === TipoProducto.INGREDIENTE ? "kg" : "uds");
    setUmbralActivo(true);
    setUmbral("");
    setProveedor("");
    setStock("");
    setLitros("");
  };

  // Cuando se abre en modo creación, limpiar el formulario.
  useEffect(() => {
    if (open && !productoParaEditar) {
      resetForm();
    }
  }, [open, productoParaEditar]);

  const handleSubmit = () => {
    if (!nombre.trim()) {
      return; // No permitir nombres vacíos
    }

    // Obtener el nombre del proveedor
    const proveedorNombre = PROVEEDORES_MAP[proveedor] || proveedor || undefined;

    const unidadMedida = UNIDAD_MAP[unidad] || UnidadMedida.KG;
    const umbralNumero = umbralActivo ? Number(umbral) || undefined : undefined;
    const stockNumero = Number(stock) || 0;

    const litrosNumero =
      tipoEfectivo === TipoProducto.BEBIDA
        ? litros.trim() === ""
          ? undefined
          : Math.max(0, Number(litros) || 0)
        : undefined;

    if (productoParaEditar) {
      // Modo edición
      actualizarProducto(productoParaEditar.id, {
        nombre: nombre.trim(),
        unidadMedida,
        umbral: umbralNumero,
        stock: stockNumero,
        proveedor: proveedorNombre,
        ...(tipoEfectivo === TipoProducto.BEBIDA ? { litros: litrosNumero } : { litros: undefined }),
      });
    } else {
      // Modo crear
      agregarProducto({
        nombre: nombre.trim(),
        tipoProducto,
        unidadMedida,
        umbral: umbralNumero,
        stock: 0, // Nuevo ingrediente empieza sin stock
        proveedor: proveedorNombre,
        ...(tipoProducto === TipoProducto.BEBIDA ? { litros: litrosNumero } : {}),
      });
    }

    onOpenChange(false);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[340px] p-0 gap-0"
        showCloseButton={false}
      >
        {/* Header con flecha de regreso y título */}
        <div className="p-4 pb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenChange(false)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {productoParaEditar ? `Editar ${etiqueta}` : `Añadir ${etiqueta}`}
            </h2>
          </div>
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

          {/* Campo Stock - Solo mostrar en edición */}
          {productoParaEditar && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Stock actual</label>
              <Input
                type="number"
                placeholder="Ej: 10"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="h-11 bg-gray-50 border-gray-200"
              />
            </div>
          )}

          {/* Campo Litros - Solo para BEBIDAS */}
          {tipoEfectivo === TipoProducto.BEBIDA && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Litros (formato)
              </label>
              <div className="relative">
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="Ej: 0.33"
                  value={litros}
                  onChange={(e) => setLitros(e.target.value)}
                  className="h-11 bg-gray-50 border-gray-200 pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  L
                </span>
              </div>
              <p className="text-xs text-gray-500">Solo aplica si el tipo es BEBIDA.</p>
            </div>
          )}

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
            {productoParaEditar ? (
              <>Guardar cambios</>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Añadir {etiqueta}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Compat: mantiene el nombre anterior para el flujo de ingredientes.
 */
export function AgregarIngredienteModal(props: Omit<AgregarProductoModalProps, "tipoProducto">) {
  return <AgregarProductoModal {...props} tipoProducto={TipoProducto.INGREDIENTE} />;
}
