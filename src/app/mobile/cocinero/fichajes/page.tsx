"use client";

import ContainerMobile from "@/components/views/mobile/shared/ContainerMobile";
import HeaderMobile from "@/components/views/mobile/shared/HeaderMobile";
import SideMenu, { COCINERO_MENU_OPTIONS, CocineroView } from "@/components/views/mobile/shared/SideMenu";
import FichajesView from "@/components/views/mobile/shared/FichajesView";
import { useState } from "react";

// Perfil del cocinero (en producción vendría del estado de autenticación)
const COCINERO_PROFILE = {
  id: "emp-1", // Antonio - Cocinero
  nombre: "Antonio",
  apellidos: "García López",
  rol: "COCINERO",
  imagenPerfil: "/empleados/antonio.png",
};

export default function FichajesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ContainerMobile>
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        profile={COCINERO_PROFILE}
        menuOptions={COCINERO_MENU_OPTIONS}
        activeView={CocineroView.FICHAJES}
      />
      <HeaderMobile
        title="Registro de horario"
        onMenuClick={() => setIsMenuOpen(true)}
        profile={COCINERO_PROFILE}
      />
      <FichajesView empleadoId={COCINERO_PROFILE.id} />
    </ContainerMobile>
  );
}
