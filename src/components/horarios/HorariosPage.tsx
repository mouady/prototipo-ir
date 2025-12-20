"use client";

import { useState, useMemo } from "react";
import { startOfWeek } from "date-fns";
import {
  useHorarios,
  useHorariosEspeciales,
  useEmpleados,
  DiaSemana,
  HorarioEspecial,
} from "@/mock";
import { getTurnosSemana } from "@/mock";
import { CalendarioSemanal } from "./CalendarioSemanal";
import { PanelHorarioGeneral } from "./PanelHorarioGeneral";
import { ModalDiaEspecial } from "./ModalDiaEspecial";

/**
 * Página principal del módulo de Horarios
 * 
 * Layout según mockups:
 * - Zona principal izquierda/central: Calendario semanal (Week view)
 * - Panel lateral derecho: Horario general y botón añadir día especial
 * 
 * Funcionalidades:
 * - Navegar entre semanas
 * - Ver turnos de cada día con empleados asignados
 * - Seleccionar un día para editarlo
 * - Abrir modal de día especial
 * - Editar horario general por día de la semana
 */
export function HorariosPage() {
  // Hooks de datos
  const { horarios } = useHorarios();
  const { guardar: guardarHorarioEspecial } = useHorariosEspeciales();
  const { empleados } = useEmpleados();

  // Estado de navegación del calendario
  const [fechaInicio, setFechaInicio] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  // Estado de la vista activa
  const [vistaActiva, setVistaActiva] = useState<
    "Year" | "Week" | "Month" | "Day"
  >("Week");

  // Estado del día seleccionado
  const [diaSeleccionado, setDiaSeleccionado] = useState<string | undefined>();

  // Estado del modal
  const [modalOpen, setModalOpen] = useState(false);
  const [fechaModal, setFechaModal] = useState<string>("");
  const [horarioModal, setHorarioModal] = useState<HorarioEspecial | undefined>();

  // Estado para mostrar fichajes
  const [showFichajes] = useState(false);

  // Obtener turnos de la semana actual
  const turnosSemana = useMemo(() => {
    return getTurnosSemana(fechaInicio);
  }, [fechaInicio]);

  // Handlers
  const handleDiaClick = (fecha: string) => {
    setDiaSeleccionado(fecha);
    // Buscar si ya hay un horario especial para esa fecha
    const horarioExistente = turnosSemana.find((t) => t.fecha === fecha);
    setFechaModal(fecha);
    setHorarioModal(horarioExistente);
    setModalOpen(true);
  };

  const handleAddDiaEspecial = () => {
    // Usar la fecha de hoy como default
    const hoy = new Date().toISOString().split("T")[0];
    setFechaModal(hoy);
    setHorarioModal(undefined);
    setModalOpen(true);
  };

  const handleEditDiaGeneral = (dia: DiaSemana) => {
    // Por ahora, mostramos un alert. En producción abriríamos un modal para editar
    console.log("Editar día:", dia);
    alert(
      `Funcionalidad de editar horario general para ${dia} pendiente de implementar`
    );
  };

  const handleGuardarHorarioEspecial = (
    horario: Omit<HorarioEspecial, "id">
  ) => {
    guardarHorarioEspecial(horario);
    setDiaSeleccionado(horario.fecha);
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-[calc(100vh-56px)] overflow-hidden">
      <div className="flex gap-6 h-full">
        {/* Zona principal: Calendario */}
        <CalendarioSemanal
          turnosSemana={turnosSemana}
          fechaInicio={fechaInicio}
          onFechaInicioChange={setFechaInicio}
          onDiaClick={handleDiaClick}
          diaSeleccionado={diaSeleccionado}
          vistaActiva={vistaActiva}
          onVistaChange={setVistaActiva}
          showFichajes={showFichajes}
        />

        {/* Panel lateral: Horario general */}
        <PanelHorarioGeneral
          horarios={horarios}
          onEditDia={handleEditDiaGeneral}
          onAddDiaEspecial={handleAddDiaEspecial}
        />
      </div>

      {/* Modal de día especial */}
      <ModalDiaEspecial
        open={modalOpen}
        onOpenChange={setModalOpen}
        fecha={fechaModal}
        horarioEspecial={horarioModal}
        empleados={empleados}
        onGuardar={handleGuardarHorarioEspecial}
      />
    </div>
  );
}
