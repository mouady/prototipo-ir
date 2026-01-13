"use client";

import ContainerMobile from "@/components/views/mobile/shared/ContainerMobile";
import HeaderMobile from "@/components/views/mobile/shared/HeaderMobile";
import SideMenu, { CAMARERO_MENU_OPTIONS, CamareroView } from "@/components/views/mobile/shared/SideMenu";
import ReservasView from "@/components/views/mobile/camarero/ReservasView";
import { useState } from "react";

// Perfil del camarero (en producción vendría del estado de autenticación)
const CAMARERO_PROFILE = {
  id: "emp-2", // María - Camarera
  nombre: "María",
  apellidos: "Fernández Ruiz",
  rol: "CAMARERO",
  imagenPerfil: "/empleados/maria.png",
};

export default function ReservasPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ContainerMobile>
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        profile={CAMARERO_PROFILE}
        menuOptions={CAMARERO_MENU_OPTIONS}
        activeView={CamareroView.RESERVAS}
      />
      <HeaderMobile
        title="Reservas"
        onMenuClick={() => setIsMenuOpen(true)}
        profile={CAMARERO_PROFILE}
      />
      <ReservasView />
    </ContainerMobile>
  );
}
