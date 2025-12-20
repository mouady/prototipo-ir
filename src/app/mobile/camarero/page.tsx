"use client";
import { useState } from "react";
import ContainerMobile from "@/components/views/mobile/shared/ContainerMobile";
import HeaderMobile from "@/components/views/mobile/shared/HeaderMobile";
import SideMenu, { CAMARERO_MENU_OPTIONS, CamareroView } from "@/components/views/mobile/shared/SideMenu";
import FichajesView from "@/components/views/mobile/shared/FichajesView";
import ComandasView from "@/components/views/mobile/camarero/ComandasView";
import MesasView from "@/components/views/mobile/camarero/MesasView";
import ReservasView from "@/components/views/mobile/camarero/ReservasView";

// Perfil del camarero (en producción vendría del estado de autenticación)
const CAMARERO_PROFILE = {
  id: "emp-2", // María - Camarera
  nombre: "María",
  apellidos: "Fernández Ruiz",
  rol: "CAMARERO",
  imagenPerfil: "/empleados/maria.png",
};

// Mapa de vistas a títulos
const VIEW_TITLES: Record<CamareroView, string> = {
  [CamareroView.FICHAJES]: "Registro de horario",
  [CamareroView.COMANDAS]: "Comandas",
  [CamareroView.MESAS]: "Mesas",
  [CamareroView.RESERVAS]: "Reservas",
};

export default function CamareroPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<CamareroView>(CamareroView.FICHAJES);

  // Renderizar el componente activo con las props necesarias
  const renderActiveView = () => {
    switch (activeView) {
      case CamareroView.FICHAJES:
        return <FichajesView empleadoId={CAMARERO_PROFILE.id} />;
      case CamareroView.COMANDAS:
        return <ComandasView />;
      case CamareroView.MESAS:
        return <MesasView />;
      case CamareroView.RESERVAS:
        return <ReservasView />;
      default:
        return null;
    }
  };

  return (
    <ContainerMobile>
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        profile={CAMARERO_PROFILE}
        menuOptions={CAMARERO_MENU_OPTIONS}
        activeView={activeView}
        onViewChange={(viewId) => setActiveView(viewId as CamareroView)}
      />
      <HeaderMobile
        title={VIEW_TITLES[activeView]}
        onMenuClick={() => setIsMenuOpen(true)}
      />
      {renderActiveView()}
    </ContainerMobile>
  );
}
