"use client";

import { Header } from "@/components/Header";
import { StatisticsPage } from "@/components/views/gerente/statistics";

export default function EstadisticasPageRoute() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header seccionActiva="estadisticas" />
      <StatisticsPage />
    </div>
  );
}
