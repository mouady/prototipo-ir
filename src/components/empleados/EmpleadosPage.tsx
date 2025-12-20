"use client";

import { useState } from "react";
import { useEmpleados, Empleado, eliminarEmpleado } from "@/mock";
import { EmpleadoCard } from "./EmpleadoCard";
import { AddEmpleadoCard } from "./AddEmpleadoCard";
import { EmpleadoModal } from "./EmpleadoModal";
import { DetalleEmpleadoModal } from "./DetalleEmpleadoModal";
import { EliminarEmpleadoModal } from "./EliminarEmpleadoModal";

/**
 * Página principal del módulo de Empleados
 * 
 * Estructura:
 * - Título y descripción
 * - Grid de tarjetas de empleados
 * - Tarjeta para añadir nuevo empleado
 * 
 * Flujos:
 * - Click en tarjeta → Abre modal de detalle
 * - Click en editar → Abre modal de edición
 * - Click en añadir → Abre modal de creación
 * - Desde detalle: editar → modal edición, eliminar → modal confirmación
 */
export function EmpleadosPage() {
  const { empleados } = useEmpleados();
  
  // Estados para los modales
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<Empleado | null>(null);
  const [modalCrearEditar, setModalCrearEditar] = useState(false);
  const [modalDetalle, setModalDetalle] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [empleadoParaEditar, setEmpleadoParaEditar] = useState<Empleado | null>(null);

  // Handlers para abrir modales
  const handleCardClick = (empleado: Empleado) => {
    setEmpleadoSeleccionado(empleado);
    setModalDetalle(true);
  };

  const handleEditClick = (empleado: Empleado) => {
    setEmpleadoParaEditar(empleado);
    setModalCrearEditar(true);
  };

  const handleAddClick = () => {
    setEmpleadoParaEditar(null);
    setModalCrearEditar(true);
  };

  const handleDeleteFromDetalle = (empleado: Empleado) => {
    setEmpleadoSeleccionado(empleado);
    setModalEliminar(true);
  };

  const handleEditFromDetalle = (empleado: Empleado) => {
    setEmpleadoParaEditar(empleado);
    setModalCrearEditar(true);
  };

  const handleConfirmDelete = () => {
    if (empleadoSeleccionado) {
      eliminarEmpleado(empleadoSeleccionado.id);
      setEmpleadoSeleccionado(null);
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-[calc(100vh-56px)] overflow-y-auto">
      {/* Header de la página */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Listado de empleados</h1>
        <p className="text-gray-500 mt-1">
          Información relevante sobre camareros y cocineros
        </p>
      </div>

      {/* Grid de empleados */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {empleados.map((empleado) => (
          <EmpleadoCard
            key={empleado.id}
            empleado={empleado}
            onClick={handleCardClick}
            onEdit={handleEditClick}
          />
        ))}
        
        {/* Tarjeta para añadir nuevo empleado */}
        <AddEmpleadoCard onClick={handleAddClick} />
      </div>

      {/* Modal de crear/editar empleado */}
      <EmpleadoModal
        open={modalCrearEditar}
        onOpenChange={setModalCrearEditar}
        empleadoParaEditar={empleadoParaEditar}
      />

      {/* Modal de detalle de empleado */}
      <DetalleEmpleadoModal
        open={modalDetalle}
        onOpenChange={setModalDetalle}
        empleado={empleadoSeleccionado}
        onEdit={handleEditFromDetalle}
        onDelete={handleDeleteFromDetalle}
      />

      {/* Modal de confirmación de eliminación */}
      <EliminarEmpleadoModal
        open={modalEliminar}
        onOpenChange={setModalEliminar}
        empleado={empleadoSeleccionado}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
