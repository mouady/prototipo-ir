"use client";

import { useState } from "react";
import { Header, SeccionActiva } from "@/components/Header";
import { InventarioPage } from "@/components/inventario/InventarioPage";
import { ComandasPage } from "@/components/comandas/ComandasPage";
import SeccionConstruccion from "@/app/SeccionConstruccion";

export default function Home() {
  const [seccionActiva, setSeccionActiva] = useState<SeccionActiva>("inventario");

  const renderSeccion = () => {
    switch (seccionActiva) {
      case "comandas":
        return <ComandasPage />;
      case "inventario":
        return <InventarioPage />;
      case "horarios":
      case "empleados":
      case "estadisticas":
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
