"use client";

import { useState } from "react";
import { LeftMenu } from "./LeftMenu";
import { Filtros, FiltrosCamareros } from "./Filtros";
import { PlatosView, TicketView, CamarerosView, ProveedoresView, ReservasView } from "./views";
import type { EstadisticaSeccion } from "./types";

export function StatisticsPage() {
  const [seccionActiva, setSeccionActiva] = useState<EstadisticaSeccion>("platos");
  const [mes, setMes] = useState(8); // Agosto por defecto
  const [anio, setAnio] = useState(2025);
  const [ordenarCamarerosPor, setOrdenarCamarerosPor] = useState("horasTrabajadas");

  const renderContenido = () => {
    switch (seccionActiva) {
      case "platos":
        return <PlatosView />;
      case "ticket":
        return <TicketView />;
      case "camareros":
        return <CamarerosView ordenarPor={ordenarCamarerosPor} />;
      case "proveedores":
        return <ProveedoresView />;
      case "reservas":
        return <ReservasView />;
      default:
        return <PlatosView />;
    }
  };

  const renderFiltros = () => {
    if (seccionActiva === "camareros") {
      return (
        <FiltrosCamareros
          mes={mes}
          anio={anio}
          onMesChange={setMes}
          onAnioChange={setAnio}
          ordenarPor={ordenarCamarerosPor}
          onOrdenarPorChange={setOrdenarCamarerosPor}
        />
      );
    }

    if (seccionActiva === "ticket") {
      return (
        <Filtros
          mes={mes}
          anio={anio}
          onMesChange={setMes}
          onAnioChange={setAnio}
          mostrarMes={false}
        />
      );
    }

    return (
      <Filtros
        mes={mes}
        anio={anio}
        onMesChange={setMes}
        onAnioChange={setAnio}
      />
    );
  };

  return (
    <div className="flex flex-1 h-[calc(100vh-56px)]">
      {/* Barra lateral izquierda */}
      <LeftMenu
        seccionActiva={seccionActiva}
        onSeccionChange={setSeccionActiva}
      />

      {/* Área de contenido principal */}
      <main className="flex-1 bg-gray-50 p-6 overflow-auto">
        {/* Filtros */}
        <div className="mb-6">
          {renderFiltros()}
        </div>

        {/* Contenido según la sección activa */}
        {renderContenido()}
      </main>
    </div>
  );
}
