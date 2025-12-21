"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Users,
  Plus,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { useReservas, Reserva, getMesas } from "@/mock/mesas";

/**
 * Formatea una fecha para mostrar
 * Ejemplo: "Viernes, 20 dic."
 */
function formatearFecha(fecha: Date): string {
  const opciones: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
  };
  const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
  return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
}

/**
 * Formatea la hora de una reserva
 */
function formatearHora(fecha: Date): string {
  return fecha.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
}

/**
 * Tarjeta de reserva individual
 */
function ReservaCard({
  reserva,
  onTerminar,
  onEliminar,
  onEditar,
}: {
  reserva: Reserva;
  onTerminar: () => void;
  onEliminar: () => void;
  onEditar: () => void;
}) {
  const esTerminada = reserva.terminada;

  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-4 mb-3 ${
        esTerminada ? "opacity-60" : ""
      }`}
    >
      {/* Info principal */}
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Users className="w-5 h-5 text-gray-600" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-900">
            {reserva.anfitrion} ({reserva.numPersonas})
          </p>
          <p className="text-sm text-gray-500">Mesa {reserva.numMesa}</p>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{formatearHora(reserva.fechaHora)}</span>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex gap-2">
        {!esTerminada && (
          <>
            <button
              onClick={onEditar}
              className="flex-1 py-2 px-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Editar
            </button>
            <button
              onClick={onTerminar}
              className="flex-1 py-2 px-3 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Marcar terminada
            </button>
          </>
        )}
        {esTerminada && (
          <button
            disabled
            className="flex-1 py-2 px-3 text-sm font-medium text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed"
          >
            Terminada
          </button>
        )}
        <button
          onClick={onEliminar}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Eliminar reserva"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

/**
 * Formulario para crear nueva reserva
 */
function FormularioReserva({
  onCrear,
  onCancelar,
}: {
  fecha: Date;
  onCrear: (datos: { anfitrion: string; hora: string; numPersonas: number; mesaId: string }) => void;
  onCancelar: () => void;
}) {
  const [anfitrion, setAnfitrion] = useState("");
  const [hora, setHora] = useState("12:00");
  const [numPersonas, setNumPersonas] = useState(2);
  const [mesaId, setMesaId] = useState("");
  
  const mesas = getMesas();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!anfitrion.trim() || !mesaId) return;
    onCrear({ anfitrion, hora, numPersonas, mesaId });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-4 mb-4 space-y-4">
      {/* Anfitrión */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Anfitrión</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={anfitrion}
            onChange={(e) => setAnfitrion(e.target.value)}
            placeholder="Nombre y apellido"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
            required
          />
        </div>
      </div>

      {/* Mesa */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mesa</label>
        <select
          value={mesaId}
          onChange={(e) => setMesaId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          required
        >
          <option value="">Seleccionar mesa...</option>
          {mesas.map((mesa) => (
            <option key={mesa.id} value={mesa.id}>
              Mesa {mesa.numMesa} ({mesa.capacidad} personas) - {mesa.zona}
            </option>
          ))}
        </select>
      </div>

      {/* Hora y personas en fila */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Personas</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              min="1"
              max="20"
              value={numPersonas}
              onChange={(e) => setNumPersonas(parseInt(e.target.value) || 1)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancelar}
          className="flex-1 py-2 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Añadir reserva
        </button>
      </div>
    </form>
  );
}

/**
 * Modal para editar reserva (aparece desde abajo)
 */
function ModalEditarReserva({
  reserva,
  onGuardar,
  onCancelar,
}: {
  reserva: Reserva;
  fecha: Date;
  onGuardar: (datos: { anfitrion: string; hora: string; numPersonas: number; mesaId: string; numMesa: number }) => void;
  onCancelar: () => void;
}) {
  const [anfitrion, setAnfitrion] = useState(reserva.anfitrion);
  const [hora, setHora] = useState(
    reserva.fechaHora.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", hour12: false })
  );
  const [numPersonas, setNumPersonas] = useState(reserva.numPersonas);
  const [mesaId, setMesaId] = useState(reserva.mesaId);
  
  const mesas = getMesas();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!anfitrion.trim() || !mesaId) return;
    const mesa = mesas.find((m) => m.id === mesaId);
    if (!mesa) return;
    onGuardar({ anfitrion, hora, numPersonas, mesaId, numMesa: mesa.numMesa });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-end justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-t-2xl p-6 space-y-4">
        <h3 className="font-bold text-lg text-gray-900">Editar reserva</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Anfitrión */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Anfitrión</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={anfitrion}
                onChange={(e) => setAnfitrion(e.target.value)}
                placeholder="Nombre y apellido"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                required
                autoFocus
              />
            </div>
          </div>

          {/* Mesa */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Mesa</label>
            <select
              value={mesaId}
              onChange={(e) => setMesaId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            >
              <option value="">Seleccionar mesa...</option>
              {mesas.map((mesa) => (
                <option key={mesa.id} value={mesa.id}>
                  Mesa {mesa.numMesa} ({mesa.capacidad} personas) - {mesa.zona}
                </option>
              ))}
            </select>
          </div>

          {/* Hora y personas en fila */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2">Hora</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-2">Personas</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={numPersonas}
                  onChange={(e) => setNumPersonas(parseInt(e.target.value) || 1)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancelar}
              className="flex-1 py-3 px-4 bg-gray-100 rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-gray-900 rounded-lg font-medium text-white hover:bg-gray-800 transition-colors"
            >
              Guardar cambios
            </button>
          </div>
        </form>
        {/* Espacio inferior para evitar solapamiento con el bisel */}
          <div className="h-[10px]" />
      </div>
    </div>
  );
}

/**
 * Vista principal de reservas
 * Según spec 2.8
 */
export default function ReservasView() {
  const {
    fecha,
    reservas,
    totalReservas,
    pagina,
    totalPaginas,
    setPagina,
    crearReserva,
    editarReserva,
    terminarReserva,
    eliminarReserva,
    irADiaAnterior,
    irADiaSiguiente,
  } = useReservas();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [reservaEditando, setReservaEditando] = useState<Reserva | null>(null);

  const handleCrearReserva = (datos: {
    anfitrion: string;
    hora: string;
    numPersonas: number;
    mesaId: string;
  }) => {
    // Construir fecha/hora
    const [horas, minutos] = datos.hora.split(":").map(Number);
    const fechaHora = new Date(fecha);
    fechaHora.setHours(horas, minutos, 0, 0);

    const mesa = getMesas().find((m) => m.id === datos.mesaId);
    if (!mesa) return;

    try {
      crearReserva({
        mesaId: datos.mesaId,
        numMesa: mesa.numMesa,
        fechaHora,
        anfitrion: datos.anfitrion,
        numPersonas: datos.numPersonas,
      });
      setMostrarFormulario(false);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error al crear reserva");
    }
  };

  const handleEditarReserva = (datos: {
    anfitrion: string;
    hora: string;
    numPersonas: number;
    mesaId: string;
    numMesa: number;
  }) => {
    if (!reservaEditando) return;

    const [horas, minutos] = datos.hora.split(":").map(Number);
    const fechaHora = new Date(fecha);
    fechaHora.setHours(horas, minutos, 0, 0);

    try {
      editarReserva(reservaEditando.id, {
        mesaId: datos.mesaId,
        numMesa: datos.numMesa,
        fechaHora,
        anfitrion: datos.anfitrion,
        numPersonas: datos.numPersonas,
      });
      setReservaEditando(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Error al editar reserva");
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Tarjeta de fecha */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
              <span className="font-semibold text-gray-900">{formatearFecha(fecha)}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={irADiaAnterior}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={irADiaSiguiente}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Formulario de nueva reserva */}
        {mostrarFormulario && (
          <FormularioReserva
            fecha={fecha}
            onCrear={handleCrearReserva}
            onCancelar={() => setMostrarFormulario(false)}
          />
        )}

        {/* Lista de reservas */}
        {reservas.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No hay reservas para este día</p>
          </div>
        ) : (
          reservas.map((reserva) => (
            <ReservaCard
              key={reserva.id}
              reserva={reserva}
              onTerminar={() => terminarReserva(reserva.id)}
              onEliminar={() => eliminarReserva(reserva.id)}
              onEditar={() => setReservaEditando(reserva)}
            />
          ))
        )}
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200">
          <div className="flex items-center justify-center gap-2">
            {/* Previous */}
            <button
              onClick={() => setPagina(Math.max(1, pagina - 1))}
              disabled={pagina === 1}
              className={`flex items-center gap-1 text-sm ${
                pagina === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {/* Números de página */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPaginas, 3) }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setPagina(num)}
                  className={`w-7 h-7 rounded text-sm font-medium ${
                    pagina === num
                      ? "bg-gray-800 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => setPagina(Math.min(totalPaginas, pagina + 1))}
              disabled={pagina === totalPaginas}
              className={`flex items-center gap-1 text-sm ${
                pagina === totalPaginas
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Contador */}
          <p className="text-center text-xs text-gray-500 mt-2">
            {totalReservas} reserva{totalReservas !== 1 ? "s" : ""} en total
          </p>
        </div>
      )}

      {/* Modal de edición */}
      {reservaEditando && (
        <ModalEditarReserva
          reserva={reservaEditando}
          fecha={fecha}
          onGuardar={handleEditarReserva}
          onCancelar={() => setReservaEditando(null)}
        />
      )}
    </div>
  );
}