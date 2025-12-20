"use client";
import { useState } from "react";
import ContainerMobile from "@/components/views/mobile/shared/ContainerMobile";
import HeaderMobile from "@/components/views/mobile/shared/HeaderMobile";
import SideMenu, { CAMARERO_MENU_OPTIONS } from "@/components/views/mobile/shared/SideMenu";

// Perfil del camarero (en producción vendría del estado de autenticación)
const CAMARERO_PROFILE = {
  nombre: "María",
  apellidos: "Fernández Ruiz",
  rol: "CAMARERO",
  imagenPerfil: "/empleados/maria.png",
};

const ACCENT_COLOR = "#34e64c";

export default function CamareroPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ContainerMobile>
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        profile={CAMARERO_PROFILE}
        menuOptions={CAMARERO_MENU_OPTIONS}
      />
      <HeaderMobile
        title="Vista Camarero"
        onMenuClick={() => setIsMenuOpen(true)}
      />
    </ContainerMobile>
  );
}
