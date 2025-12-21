"use client";

import { Bell, BellRing, Umbrella, Home, ChevronRight } from "lucide-react";
import { useMesas, MesaConEstado, EstadoMesa, Zona } from "@/mock/mesas";

interface MesasViewProps {
  onSelectMesa?: (mesaId: string) => void;
  camareroId: string;
  camareroNombre: string;
}

/**
 * Icono de estado de mesa según su estado actual
 */
function IconoEstadoMesa({ estado, platosListos }: { estado: EstadoMesa; platosListos: number }) {
  if (estado === EstadoMesa.ATENCIÓN_REQUERIDA) {
    return (
      <div className="relative">
        <BellRing className="w-5 h-5 text-red-500" />
        {platosListos > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {platosListos}
          </span>
        )}
      </div>
    );
  }
  if (estado === EstadoMesa.OCUPADA) {
    return <Bell className="w-5 h-5 text-gray-800 fill-gray-800" />;
  }
  return <Bell className="w-5 h-5 text-gray-400" />;
}

/**
 * Icono de zona (Interior / Terraza)
 */
function IconoZona({ zona }: { zona: Zona }) {
  if (zona === Zona.TERRAZA) {
    return (
      <div className="flex items-center gap-1 text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded-lg">
        <Umbrella className="w-3.5 h-3.5 text-blue-700" />
        <span className="font-medium">Terraza</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 text-xs text-gray-600 bg-pink-50 px-2 py-1 rounded-lg">
      <Home className="w-3.5 h-3.5 text-pink-600" />
      <span className="font-medium">Interior</span>
    </div>
  );
}

/**
 * Fila de mesa individual
 */
function MesaRow({
  mesa,
  onSelect,
  onCrearCuenta,
  esResponsable,
}: {
  mesa: MesaConEstado;
  onSelect: () => void;
  onCrearCuenta: () => void;
  esResponsable: boolean;
}) {
  const tieneCtaActiva = mesa.cuentaActiva !== undefined;
  const responsable = mesa.camareroResponsable || (tieneCtaActiva ? "Sin asignar" : null);

  return (
    <div
      className={`flex items-center gap-3 p-4 bg-white border-b border-gray-100 ${
        mesa.estado === EstadoMesa.ATENCIÓN_REQUERIDA ? "bg-red-50" : ""
      }`}
    >
      {/* Icono de estado */}
      <div className="flex-shrink-0">
        <IconoEstadoMesa estado={mesa.estado} platosListos={mesa.platosListosCount} />
      </div>

      {/* Info de la mesa */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900">Mesa {mesa.numMesa}</p>
        {responsable && (
          <p className="text-sm text-gray-500">
            Responsable: {esResponsable ? "Tú" : responsable}
          </p>
        )}
      </div>

      {/* Icono de zona */}
      <div className="flex-shrink-0">
        <IconoZona zona={mesa.zona} />
      </div>

      {/* Botón de acción */}
      <div className="flex-shrink-0">
        {tieneCtaActiva ? (
          <button
            onClick={onSelect}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Abrir cuenta
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onCrearCuenta}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Crear cuenta
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Vista principal de lista de mesas (Dashboard)
 * Según spec 2.5
 */
export default function MesasView({ onSelectMesa, camareroId, camareroNombre }: MesasViewProps) {
  const { mesas, crearCuenta } = useMesas();

  const handleCrearCuenta = (mesaId: string) => {
    crearCuenta(mesaId, camareroId, camareroNombre);
  };

  const handleSelectMesa = (mesaId: string) => {
    if (onSelectMesa) {
      onSelectMesa(mesaId);
    }
  };

  // Ordenar mesas: primero las que requieren atención, luego ocupadas, luego libres
  const mesasOrdenadas = [...mesas].sort((a, b) => {
    const prioridad = {
      [EstadoMesa.ATENCIÓN_REQUERIDA]: 0,
      [EstadoMesa.OCUPADA]: 1,
      [EstadoMesa.LIBRE]: 2,
    };
    const diff = prioridad[a.estado] - prioridad[b.estado];
    if (diff !== 0) return diff;
    return a.numMesa - b.numMesa;
  });

  // Separar mesas con cuenta abierta y sin cuenta
  const mesasConCuenta = mesasOrdenadas.filter((m) => m.cuentaActiva !== undefined);
  const mesasSinCuenta = mesasOrdenadas.filter((m) => m.cuentaActiva === undefined);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Lista de mesas */}
      <div className="flex-1 overflow-y-auto">
        {/* Mesas con cuenta abierta */}
        {mesasConCuenta.length > 0 && (
          <>
            <div className="sticky top-0 bg-gray-100 px-4 py-2 border-b border-gray-200">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Mesas con cuenta abierta ({mesasConCuenta.length})
              </p>
            </div>
            {mesasConCuenta.map((mesa) => (
              <MesaRow
                key={mesa.id}
                mesa={mesa}
                onSelect={() => handleSelectMesa(mesa.id)}
                onCrearCuenta={() => handleCrearCuenta(mesa.id)}
                esResponsable={mesa.camareroResponsable === camareroNombre}
              />
            ))}
          </>
        )}

        {/* Mesas sin cuenta */}
        {mesasSinCuenta.length > 0 && (
          <>
            <div className="sticky top-0 bg-gray-100 px-4 py-2 border-b border-gray-200">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Mesas disponibles ({mesasSinCuenta.length})
              </p>
            </div>
            {mesasSinCuenta.map((mesa) => (
              <MesaRow
                key={mesa.id}
                mesa={mesa}
                onSelect={() => handleSelectMesa(mesa.id)}
                onCrearCuenta={() => handleCrearCuenta(mesa.id)}
                esResponsable={mesa.camareroResponsable === camareroNombre}
              />
            ))}
          </>
        )}
      </div>

      {/* Resumen inferior */}
      <div className="flex-shrink-0 p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-around text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {mesas.filter((m) => m.estado !== EstadoMesa.LIBRE).length}
            </p>
            <p className="text-xs text-gray-500">Ocupadas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-500">
              {mesas.filter((m) => m.estado === EstadoMesa.ATENCIÓN_REQUERIDA).length}
            </p>
            <p className="text-xs text-gray-500">Atención</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {mesas.filter((m) => m.estado === EstadoMesa.LIBRE).length}
            </p>
            <p className="text-xs text-gray-500">Libres</p>
          </div>
        </div>
        {/* Espacio inferior para evitar solapamiento con el bisel */}
          <div className="h-[34px]" />
      </div>
    </div>
  );
}