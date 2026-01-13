"use client";

import { Header } from "@/components/Header";
import { HorariosPage } from "@/components/views/gerente/horarios";

export default function HorariosPageRoute() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header seccionActiva="horarios" />
      <HorariosPage />
    </div>
  );
}
