"use client";
import { useState } from "react";
import ContainerMobile from "@/components/views/mobile/shared/ContainerMobile";
import HeaderMobile from "@/components/views/mobile/shared/HeaderMobile";
import SideMenu, { COCINERO_MENU_OPTIONS, CocineroView } from "@/components/views/mobile/shared/SideMenu";
import FichajesView from "@/components/views/mobile/shared/FichajesView";
import AvisosView from "@/components/views/mobile/cocinero/AvisosView";

// Perfil del cocinero (en producción vendría del estado de autenticación)
const COCINERO_PROFILE = {
  id: "emp-1", // Antonio - Cocinero
  nombre: "Antonio",
  apellidos: "García López",
  rol: "COCINERO",
  imagenPerfil: "/empleados/antonio.png",
};

// Mapa de vistas a títulos
const VIEW_TITLES: Record<CocineroView, string> = {
  [CocineroView.FICHAJES]: "Registro de horario",
  [CocineroView.AVISOS]: "Avisos",
};

export default function CocineroPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<CocineroView>(CocineroView.FICHAJES);

  // Renderizar el componente activo con las props necesarias
  const renderActiveView = () => {
    switch (activeView) {
      case CocineroView.FICHAJES:
        return <FichajesView empleadoId={COCINERO_PROFILE.id} />;
      case CocineroView.AVISOS:
        return <AvisosView cocineroId={COCINERO_PROFILE.id} cocineroNombre={COCINERO_PROFILE.nombre} />;
      default:
        return null;
    }
  };

  return (
    <ContainerMobile>
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        profile={COCINERO_PROFILE}
        menuOptions={COCINERO_MENU_OPTIONS}
        activeView={activeView}
        onViewChange={(viewId) => setActiveView(viewId as CocineroView)}
      />
      <HeaderMobile
        title={VIEW_TITLES[activeView]}
        onMenuClick={() => setIsMenuOpen(true)}
      />
      {renderActiveView()}
    </ContainerMobile>
  );
}
