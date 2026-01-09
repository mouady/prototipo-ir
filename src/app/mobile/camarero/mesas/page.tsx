"use client";

import ContainerMobile from "@/components/views/mobile/shared/ContainerMobile";
import HeaderMobile from "@/components/views/mobile/shared/HeaderMobile";
import SideMenu, { CAMARERO_MENU_OPTIONS, CamareroView } from "@/components/views/mobile/shared/SideMenu";
import ComandasView from "@/components/views/mobile/camarero/ComandasView";
import { useState } from "react";

// Perfil del camarero (en producción vendría del estado de autenticación)
const CAMARERO_PROFILE = {
  id: "emp-2", // María - Camarera
  nombre: "María",
  apellidos: "Fernández Ruiz",
  rol: "CAMARERO",
  imagenPerfil: "/empleados/maria.png",
};

export default function MesasPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ContainerMobile>
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        profile={CAMARERO_PROFILE}
        menuOptions={CAMARERO_MENU_OPTIONS}
        activeView={CamareroView.MESAS}
      />
      <HeaderMobile
        title="Mesas"
        onMenuClick={() => setIsMenuOpen(true)}
        profile={CAMARERO_PROFILE}
      />
      <ComandasView camareroId={CAMARERO_PROFILE.id} camareroNombre={CAMARERO_PROFILE.nombre} />
    </ContainerMobile>
  );
}
