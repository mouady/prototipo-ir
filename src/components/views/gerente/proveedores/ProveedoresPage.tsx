"use client";

import { useState } from "react";
import { useProveedores, Proveedor } from "@/mock";
import { Button } from "@/components/ui/button";
import { Filter, Plus, Pencil, Save, X } from "lucide-react";
import { ProveedorCard } from "./ProveedorCard";
import { ProveedorEditRow } from "./ProveedorEditRow";
import { ProveedorModal } from "./ProveedorModal";
import { EliminarProveedorModal } from "./EliminarProveedorModal";
import type { NuevoProveedor, ActualizarProveedor } from "./types";

// Importar funciones del store
import { agregarProveedor, actualizarProveedor, eliminarProveedor } from "@/mock/inventario/store";

/**
 * Página principal del módulo de Proveedores
 * 
 * Según especificación de UI/UX en proveedores.md:
 * 
 * Vista Principal (Dashboard):
 * - Cabecera con botones Filtrar, + Crear, Edición
 * - Lista de tarjetas de proveedores
 * 
 * Modo Edición (Bulk Edit):
 * - Cabecera con botones Filtrar, Guardar cambios, X (cerrar)
 * - Filas editables con inputs
 * 
 * Modales:
 * - Modal de creación de proveedor
 * - Modal de confirmación de borrado
 */
export function ProveedoresPage() {
  const { proveedores } = useProveedores();
  
  // Estados de la vista
  const [modoEdicion, setModoEdicion] = useState(false);
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [proveedorParaEliminar, setProveedorParaEliminar] = useState<Proveedor | null>(null);

  // Estado para edición en bulk - guarda los valores modificados
  const [cambiosPendientes, setCambiosPendientes] = useState<
    Map<string, ActualizarProveedor>
  >(new Map());

  // Obtener valores actuales (originales o modificados) para un proveedor
  const getValoresProveedor = (proveedor: Proveedor) => {
    const cambios = cambiosPendientes.get(proveedor.id);
    return {
      nombre: cambios?.nombre ?? proveedor.nombre,
      cif: cambios?.cif ?? proveedor.cif,
      tlf: cambios?.tlf ?? proveedor.tlf,
      email: cambios?.email ?? proveedor.email,
    };
  };

  // Verificar si un proveedor ha sido modificado
  const estaModificado = (id: string) => cambiosPendientes.has(id);

  // Manejar cambios en los campos de edición
  const handleCambioEdicion = (
    id: string,
    campo: keyof Omit<Proveedor, "id">,
    valor: string
  ) => {
    setCambiosPendientes((prev) => {
      const nuevos = new Map(prev);
      const cambiosActuales = nuevos.get(id) || {};
      nuevos.set(id, { ...cambiosActuales, [campo]: valor });
      return nuevos;
    });
  };

  // Guardar todos los cambios
  const guardarCambios = () => {
    cambiosPendientes.forEach((cambios, id) => {
      actualizarProveedor(id, cambios);
    });
    setCambiosPendientes(new Map());
    setModoEdicion(false);
  };

  // Cancelar edición
  const cancelarEdicion = () => {
    setCambiosPendientes(new Map());
    setModoEdicion(false);
  };

  // Entrar en modo edición
  const activarModoEdicion = () => {
    setCambiosPendientes(new Map());
    setModoEdicion(true);
  };

  // Abrir modal de eliminación
  const handleEliminarClick = (proveedor: Proveedor) => {
    setProveedorParaEliminar(proveedor);
    setModalEliminar(true);
  };

  // Confirmar eliminación
  const handleConfirmarEliminar = () => {
    if (proveedorParaEliminar) {
      eliminarProveedor(proveedorParaEliminar.id);
      setProveedorParaEliminar(null);
    }
  };

  // Crear nuevo proveedor
  const handleCrearProveedor = (datos: NuevoProveedor) => {
    agregarProveedor(datos);
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-full overflow-y-auto">
      {/* Toolbar/Cabecera */}
      <div className="flex justify-between items-center mb-6">
        {/* Izquierda: Botón Filtrar */}
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtrar
        </Button>

        {/* Derecha: Botones de acción */}
        <div className="flex gap-2">
          {modoEdicion ? (
            <>
              {/* Modo Edición: Guardar y Cancelar */}
              <Button
                size="sm"
                className="gap-2 bg-gray-800 hover:bg-gray-700"
                onClick={guardarCambios}
              >
                <Save className="h-4 w-4" />
                Guardar cambios
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={cancelarEdicion}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              {/* Vista Normal: Crear y Editar */}
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setModalCrear(true)}
              >
                <Plus className="h-4 w-4" />
                Crear
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={activarModoEdicion}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Lista de Proveedores */}
      <div className="grid grid-cols-2 gap-3">
        {proveedores.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-500">
            No hay proveedores registrados
          </div>
        ) : modoEdicion ? (
          // Modo Edición: Filas editables
          proveedores.map((proveedor) => (
            <div key={proveedor.id} className="col-span-2">
              <ProveedorEditRow
                proveedor={proveedor}
                valores={getValoresProveedor(proveedor)}
                onChange={(campo, valor) =>
                  handleCambioEdicion(proveedor.id, campo, valor)
                }
                onDelete={() => handleEliminarClick(proveedor)}
                modificado={estaModificado(proveedor.id)}
              />
            </div>
          ))
        ) : (
          // Vista Normal: Tarjetas en 2 columnas
          proveedores.map((proveedor) => (
            <ProveedorCard key={proveedor.id} proveedor={proveedor} />
          ))
        )}
      </div>

      {/* Modal de Creación */}
      <ProveedorModal
        open={modalCrear}
        onOpenChange={setModalCrear}
        onSubmit={handleCrearProveedor}
      />

      {/* Modal de Confirmación de Eliminación */}
      <EliminarProveedorModal
        open={modalEliminar}
        onOpenChange={setModalEliminar}
        proveedor={proveedorParaEliminar}
        onConfirm={handleConfirmarEliminar}
      />
    </div>
  );
}
