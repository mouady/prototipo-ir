"use client";

import { Header } from "@/components/Header";
import { InventarioPage } from "@/components/views/gerente/inventario/InventarioPage";

export default function InventarioPageRoute() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header seccionActiva="inventario" />
      <InventarioPage />
    </div>
  );
}
