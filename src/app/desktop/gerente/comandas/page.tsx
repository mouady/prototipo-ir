"use client";

import { Header } from "@/components/Header";
import { ComandasPage } from "@/components/views/gerente/comandas/ComandasPage";

export default function ComandasPageRoute() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header seccionActiva="comandas" />
      <ComandasPage />
    </div>
  );
}
