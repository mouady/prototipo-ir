"use client";

import { useState, useEffect } from "react";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { Plus, Check } from "lucide-react";
import {
  HorarioEspecial,
  AsignacionTurno,
  Empleado,
  RolEmpleado,
} from "@/mock";
import { ChipEmpleado } from "./ChipEmpleado";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalDiaEspecialProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fecha: string; // Formato "YYYY-MM-DD"
  horarioEspecial?: HorarioEspecial;
  empleados: Empleado[];
  onGuardar: (horario: Omit<HorarioEspecial, "id">) => void;
}

/**
 * Modal para editar el horario especial de un día específico
 * 
 * Permite:
 * - Activar/desactivar horario especial (toggle)
 * - Configurar hora de apertura y cierre
 * - Definir turnos (inicio/fin de cada turno)
 * - Asignar personal a cada turno (cocineros y camareros)
 * - Añadir/eliminar turnos
 */
export function ModalDiaEspecial({
  open,
  onOpenChange,
  fecha,
  horarioEspecial,
  empleados,
  onGuardar,
}: ModalDiaEspecialProps) {
  // Calcular valores iniciales basados en props
  const getInitialTurnos = () => {
    if (horarioEspecial) {
      return horarioEspecial.turnos.map((t) => ({
        id: t.id,
        horaInicio: t.horaInicio,
        horaFin: t.horaFin,
        cocineros: t.asignaciones.filter((a) => a.rol === RolEmpleado.COCINERO),
        camareros: t.asignaciones.filter((a) => a.rol === RolEmpleado.CAMARERO),
      }));
    }
    return [
      {
        id: `turno-nuevo-1`,
        horaInicio: "09:00",
        horaFin: "16:00",
        cocineros: [] as AsignacionTurno[],
        camareros: [] as AsignacionTurno[],
      },
      {
        id: `turno-nuevo-2`,
        horaInicio: "16:00",
        horaFin: "00:00",
        cocineros: [] as AsignacionTurno[],
        camareros: [] as AsignacionTurno[],
      },
    ];
  };

  // Estado del toggle de horario especial
  const [horarioEspecialActivo, setHorarioEspecialActivo] = useState(true);

  // Estado del horario
  const [horaApertura, setHoraApertura] = useState(
    horarioEspecial?.horaApertura || "09:00"
  );
  const [horaCierre, setHoraCierre] = useState(
    horarioEspecial?.horaCierre || "00:00"
  );

  // Estado de los turnos
  const [turnos, setTurnos] = useState(getInitialTurnos);

  // Estado para el dropdown de selección de empleado
  const [dropdownOpen, setDropdownOpen] = useState<{
    turnoIndex: number;
    rol: "cocineros" | "camareros";
  } | null>(null);

  // Resetear cuando se abre el modal o cambia el horario
  const resetKey = `${fecha}-${horarioEspecial?.id || "new"}-${open}`;
  useEffect(() => {
    if (open) {
      setHorarioEspecialActivo(true);
      setHoraApertura(horarioEspecial?.horaApertura || "09:00");
      setHoraCierre(horarioEspecial?.horaCierre || "00:00");
      setTurnos(getInitialTurnos());
      setDropdownOpen(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  // Formatear fecha para el título
  const fechaFormateada = (() => {
    try {
      const fechaDate = parse(fecha, "yyyy-MM-dd", new Date());
      return format(fechaDate, "EEEE dd/MM", { locale: es });
    } catch {
      return fecha;
    }
  })();

  // Añadir un nuevo turno
  const handleAddTurno = () => {
    const ultimoTurno = turnos[turnos.length - 1];
    setTurnos([
      ...turnos,
      {
        id: `turno-nuevo-${Date.now()}`,
        horaInicio: ultimoTurno?.horaFin || "16:00",
        horaFin: "00:00",
        cocineros: [],
        camareros: [],
      },
    ]);
  };

  // Actualizar hora de un turno
  const handleTurnoHoraChange = (
    turnoIndex: number,
    campo: "horaInicio" | "horaFin",
    valor: string
  ) => {
    const nuevosTurnos = [...turnos];
    nuevosTurnos[turnoIndex] = {
      ...nuevosTurnos[turnoIndex],
      [campo]: valor,
    };
    setTurnos(nuevosTurnos);
  };

  // Añadir empleado a un turno
  const handleAddEmpleado = (
    turnoIndex: number,
    rol: "cocineros" | "camareros",
    empleado: Empleado
  ) => {
    const nuevosTurnos = [...turnos];
    const asignacion: AsignacionTurno = {
      empleadoId: empleado.id,
      empleadoNombre: `${empleado.nombre} ${empleado.apellidos}`,
      rol: rol === "cocineros" ? RolEmpleado.COCINERO : RolEmpleado.CAMARERO,
    };
    nuevosTurnos[turnoIndex] = {
      ...nuevosTurnos[turnoIndex],
      [rol]: [...nuevosTurnos[turnoIndex][rol], asignacion],
    };
    setTurnos(nuevosTurnos);
    setDropdownOpen(null);
  };

  // Eliminar empleado de un turno
  const handleRemoveEmpleado = (
    turnoIndex: number,
    rol: "cocineros" | "camareros",
    empleadoId: string
  ) => {
    const nuevosTurnos = [...turnos];
    nuevosTurnos[turnoIndex] = {
      ...nuevosTurnos[turnoIndex],
      [rol]: nuevosTurnos[turnoIndex][rol].filter(
        (a) => a.empleadoId !== empleadoId
      ),
    };
    setTurnos(nuevosTurnos);
  };

  // Obtener empleados disponibles (no asignados a ese turno en ese rol)
  const getEmpleadosDisponibles = (
    turnoIndex: number,
    rol: "cocineros" | "camareros"
  ) => {
    const turno = turnos[turnoIndex];
    const asignadosIds = turno[rol].map((a) => a.empleadoId);
    const rolEmpleado =
      rol === "cocineros" ? RolEmpleado.COCINERO : RolEmpleado.CAMARERO;
    return empleados.filter(
      (e) => e.rol === rolEmpleado && !asignadosIds.includes(e.id) && e.activo
    );
  };

  // Guardar cambios
  const handleGuardar = () => {
    const horario: Omit<HorarioEspecial, "id"> = {
      fecha,
      horaApertura,
      horaCierre,
      turnos: turnos.map((t) => ({
        id: t.id,
        horaInicio: t.horaInicio,
        horaFin: t.horaFin,
        asignaciones: [...t.cocineros, ...t.camareros],
      })),
    };
    onGuardar(horario);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl capitalize">
            {fechaFormateada}
          </DialogTitle>
        </DialogHeader>

        {/* Toggle horario especial */}
        <div className="flex items-center justify-between py-2 border-b">
          <span className="font-medium">Horario especial</span>
          <button
            onClick={() => setHorarioEspecialActivo(!horarioEspecialActivo)}
            className={cn(
              "relative w-12 h-6 rounded-full transition-colors",
              horarioEspecialActivo ? "bg-green-500" : "bg-gray-300"
            )}
          >
            <span
              className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                horarioEspecialActivo ? "left-7" : "left-1"
              )}
            />
          </button>
        </div>

        {horarioEspecialActivo && (
          <>
            {/* Horario de apertura/cierre */}
            <div className="grid grid-cols-2 gap-4 py-4 border-b">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Apertura
                </label>
                <Input
                  type="time"
                  value={horaApertura}
                  onChange={(e) => setHoraApertura(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cierre</label>
                <Input
                  type="time"
                  value={horaCierre}
                  onChange={(e) => setHoraCierre(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Turnos */}
            {turnos.map((turno, turnoIndex) => (
              <div key={turno.id} className="py-4 border-b">
                {/* Horas del turno */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Inicio turno {turnoIndex + 1}
                    </label>
                    <Input
                      type="time"
                      value={turno.horaInicio}
                      onChange={(e) =>
                        handleTurnoHoraChange(
                          turnoIndex,
                          "horaInicio",
                          e.target.value
                        )
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Fin turno {turnoIndex + 1}
                    </label>
                    <Input
                      type="time"
                      value={turno.horaFin}
                      onChange={(e) =>
                        handleTurnoHoraChange(
                          turnoIndex,
                          "horaFin",
                          e.target.value
                        )
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Asignación de personal */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Cocineros */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-orange-700 underline">
                        Cocineros
                      </span>
                      <div className="relative">
                        <button
                          onClick={() =>
                            setDropdownOpen(
                              dropdownOpen?.turnoIndex === turnoIndex &&
                                dropdownOpen?.rol === "cocineros"
                                ? null
                                : { turnoIndex, rol: "cocineros" }
                            )
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        {/* Dropdown de selección */}
                        {dropdownOpen?.turnoIndex === turnoIndex &&
                          dropdownOpen?.rol === "cocineros" && (
                            <div className="absolute right-0 top-8 z-50 bg-gray-100 rounded-lg shadow-lg border min-w-[150px]">
                              {getEmpleadosDisponibles(
                                turnoIndex,
                                "cocineros"
                              ).map((emp) => (
                                <button
                                  key={emp.id}
                                  onClick={() =>
                                    handleAddEmpleado(
                                      turnoIndex,
                                      "cocineros",
                                      emp
                                    )
                                  }
                                  className="block w-full text-left px-3 py-2 hover:bg-gray-200 text-sm"
                                >
                                  {emp.nombre} {emp.apellidos}
                                </button>
                              ))}
                              {getEmpleadosDisponibles(turnoIndex, "cocineros")
                                .length === 0 && (
                                <span className="block px-3 py-2 text-sm text-gray-500">
                                  No hay cocineros disponibles
                                </span>
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {turno.cocineros.map((asig) => (
                        <div
                          key={asig.empleadoId}
                          className="flex items-center gap-1"
                        >
                          <ChipEmpleado
                            nombre={asig.empleadoNombre}
                            rol={asig.rol}
                            showRemove
                            onRemove={() =>
                              handleRemoveEmpleado(
                                turnoIndex,
                                "cocineros",
                                asig.empleadoId
                              )
                            }
                            size="sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Camareros */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-green-700 underline">
                        Camareros
                      </span>
                      <div className="relative">
                        <button
                          onClick={() =>
                            setDropdownOpen(
                              dropdownOpen?.turnoIndex === turnoIndex &&
                                dropdownOpen?.rol === "camareros"
                                ? null
                                : { turnoIndex, rol: "camareros" }
                            )
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        {/* Dropdown de selección */}
                        {dropdownOpen?.turnoIndex === turnoIndex &&
                          dropdownOpen?.rol === "camareros" && (
                            <div className="absolute right-0 top-8 z-50 bg-gray-100 rounded-lg shadow-lg border min-w-[150px]">
                              {getEmpleadosDisponibles(
                                turnoIndex,
                                "camareros"
                              ).map((emp) => (
                                <button
                                  key={emp.id}
                                  onClick={() =>
                                    handleAddEmpleado(
                                      turnoIndex,
                                      "camareros",
                                      emp
                                    )
                                  }
                                  className="block w-full text-left px-3 py-2 hover:bg-gray-200 text-sm"
                                >
                                  {emp.nombre} {emp.apellidos}
                                </button>
                              ))}
                              {getEmpleadosDisponibles(turnoIndex, "camareros")
                                .length === 0 && (
                                <span className="block px-3 py-2 text-sm text-gray-500">
                                  No hay camareros disponibles
                                </span>
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {turno.camareros.map((asig) => (
                        <div
                          key={asig.empleadoId}
                          className="flex items-center gap-1"
                        >
                          <ChipEmpleado
                            nombre={asig.empleadoNombre}
                            rol={asig.rol}
                            showRemove
                            onRemove={() =>
                              handleRemoveEmpleado(
                                turnoIndex,
                                "camareros",
                                asig.empleadoId
                              )
                            }
                            size="sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Botones de acción */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleAddTurno}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Añadir nuevo turno
              </Button>
              <Button
                onClick={handleGuardar}
                className="gap-2 bg-green-100 hover:bg-green-200 text-green-800"
              >
                <Check className="h-4 w-4" />
                Confirmar cambios
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
