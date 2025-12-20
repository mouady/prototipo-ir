"use client";

import { useState } from "react";
import { Header, SeccionActiva } from "@/components/Header";
import { InventarioPage } from "@/components/views/gerente/horarios/inventario/InventarioPage";
import { ComandasPage } from "@/components/views/gerente/comandas/ComandasPage";
import { StatisticsPage } from "@/components/views/gerente/statistics";
import { EmpleadosPage } from "@/components/views/gerente/empleados";
import { HorariosPage } from "@/components/views/gerente/horarios";
import SeccionConstruccion from "@/app/SeccionConstruccion";

export default function GerentePage() {
  const [seccionActiva, setSeccionActiva] = useState<SeccionActiva>("inventario");

  const renderSeccion = () => {
    switch (seccionActiva) {
      case "comandas":
        return <ComandasPage />;
      case "empleados":
        return <EmpleadosPage />;
      case "inventario":
        return <InventarioPage />;
      case "estadisticas":
        return <StatisticsPage />;
      case "horarios":
        return <HorariosPage />;
      default:
        return (
          <SeccionConstruccion />
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header seccionActiva={seccionActiva} onSeccionChange={setSeccionActiva} />
      {renderSeccion()}
    </div>
  );
}
