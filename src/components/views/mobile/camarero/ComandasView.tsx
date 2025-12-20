"use client";

import { useState } from "react";
import MesasView from "./MesasView";
import DetalleMesaView from "./DetalleMesaView";
import CrearComandaView from "./CrearComandaView";
import { getMesaById } from "@/mock/mesas";

type VistaActiva = 
  | { tipo: "lista" }
  | { tipo: "detalle"; mesaId: string }
  | { tipo: "crearComanda"; mesaId: string; numMesa: number };

/**
 * Vista de comandas del camarero
 * Gestiona la navegación entre lista de mesas, detalle y creación de comanda
 */
export default function ComandasView() {
  const [vistaActiva, setVistaActiva] = useState<VistaActiva>({ tipo: "lista" });

  const handleSelectMesa = (mesaId: string) => {
    setVistaActiva({ tipo: "detalle", mesaId });
  };

  const handleBack = () => {
    setVistaActiva({ tipo: "lista" });
  };

  const handleCrearComanda = (mesaId: string) => {
    const mesa = getMesaById(mesaId);
    if (mesa) {
      setVistaActiva({ tipo: "crearComanda", mesaId, numMesa: mesa.numMesa });
    }
  };

  const handleConfirmarComanda = (mesaId: string) => {
    // Volver al detalle de la mesa después de crear la comanda
    setVistaActiva({ tipo: "detalle", mesaId });
  };

  // Renderizar según la vista activa
  switch (vistaActiva.tipo) {
    case "detalle":
      return (
        <DetalleMesaView
          mesaId={vistaActiva.mesaId}
          onBack={handleBack}
          onCrearComanda={() => handleCrearComanda(vistaActiva.mesaId)}
        />
      );
    case "crearComanda":
      return (
        <CrearComandaView
          mesaId={vistaActiva.mesaId}
          numMesa={vistaActiva.numMesa}
          onBack={() => setVistaActiva({ tipo: "detalle", mesaId: vistaActiva.mesaId })}
          onConfirmar={() => handleConfirmarComanda(vistaActiva.mesaId)}
        />
      );
    default:
      return <MesasView onSelectMesa={handleSelectMesa} />;
  }
}