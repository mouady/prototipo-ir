"use client";

import { Header } from "@/components/Header";
import { EmpleadosPage } from "@/components/views/gerente/empleados";

export default function EmpleadosPageRoute() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header seccionActiva="empleados" />
      <EmpleadosPage />
    </div>
  );
}
