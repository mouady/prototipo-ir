"use client";

import { useState } from "react";
import { Header, SeccionActiva } from "@/components/Header";
import { InventarioPage } from "@/components/inventario/InventarioPage";
import { ComandasPage } from "@/components/comandas/ComandasPage";
import { StatisticsPage } from "@/components/statistics";
import { EmpleadosPage } from "@/components/empleados";
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
