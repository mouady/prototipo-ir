"use client";

import { GeneradorMensajes } from "@/components/generador-mensajes";
import { SEED_PROVEEDORES, SEED_PRODUCTOS } from "@/mock/seed";

export default function GeneradorMensajesPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <GeneradorMensajes 
        proveedores={SEED_PROVEEDORES}
        productos={SEED_PRODUCTOS}
      />
    </div>
  );
}
