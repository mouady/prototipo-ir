"use client";
import { useState } from "react";
import ContainerMobile from "@/components/views/mobile/shared/ContainerMobile";
import HeaderMobile from "@/components/views/mobile/shared/HeaderMobile";
import SideMenu, { COCINERO_MENU_OPTIONS } from "@/components/views/mobile/shared/SideMenu";

// Perfil del cocinero (en producción vendría del estado de autenticación)
const COCINERO_PROFILE = {
  nombre: "Antonio",
  apellidos: "García López",
  rol: "COCINERO",
  imagenPerfil: "/empleados/antonio.png",
};

const ACCENT_COLOR = "#2147c2";

export default function CocineroPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ContainerMobile>
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        profile={COCINERO_PROFILE}
        menuOptions={COCINERO_MENU_OPTIONS}
      />
      <HeaderMobile
        title="Vista Cocinero"
        onMenuClick={() => setIsMenuOpen(true)}
      />
    </ContainerMobile>
  );
}
