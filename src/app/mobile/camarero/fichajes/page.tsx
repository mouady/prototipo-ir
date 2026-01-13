"use client";

import ContainerMobile from "@/components/views/mobile/shared/ContainerMobile";
import HeaderMobile from "@/components/views/mobile/shared/HeaderMobile";
import SideMenu, { CAMARERO_MENU_OPTIONS, CamareroView } from "@/components/views/mobile/shared/SideMenu";
import FichajesView from "@/components/views/mobile/shared/FichajesView";
import { useState } from "react";

// Perfil del camarero (en producción vendría del estado de autenticación)
const CAMARERO_PROFILE = {
  id: "emp-2", // María - Camarera
  nombre: "María",
  apellidos: "Fernández Ruiz",
  rol: "CAMARERO",
  imagenPerfil: "/empleados/maria.png",
};

export default function FichajesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ContainerMobile>
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        profile={CAMARERO_PROFILE}
        menuOptions={CAMARERO_MENU_OPTIONS}
        activeView={CamareroView.FICHAJES}
      />
      <HeaderMobile
        title="Registro de horario"
        onMenuClick={() => setIsMenuOpen(true)}
        profile={CAMARERO_PROFILE}
      />
      <FichajesView empleadoId={CAMARERO_PROFILE.id} />
    </ContainerMobile>
  );
}
