"use client";

import { X, Home, Clock, Bell, LogOut, User, LayoutGrid, CalendarDays } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface MenuOption {
  label: string;
  id: string;
  icon: React.ReactNode;
}

export interface UserProfile {
  nombre: string;
  apellidos: string;
  rol: string;
  imagenPerfil: string;
}

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  menuOptions: MenuOption[];
  activeView: string;
  onViewChange: (viewId: string) => void;
  accentColor?: string;
}

export default function SideMenu({
  isOpen,
  onClose,
  profile,
  menuOptions,
  activeView,
  onViewChange,
  accentColor = "#101828",
}: SideMenuProps) {
  
  const handleOptionClick = (viewId: string) => {
    onViewChange(viewId);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Side Menu */}
      <div
        className={`absolute top-0 left-0 h-full w-72 max-w-[85%] bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Profile Header */}
        <div
          className="p-6 text-white"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 overflow-hidden border-2 border-white/40">
              {profile.imagenPerfil ? (
                <Image
                  src={profile.imagenPerfil}
                  alt={`${profile.nombre} ${profile.apellidos}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white/70" />
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-lg font-bold">
            {profile.nombre} {profile.apellidos}
          </h2>
          <p className="text-sm text-white/80 capitalize">{profile.rol.toLowerCase()}</p>
        </div>

        {/* Menu Options */}
        <nav className="py-4">
          {menuOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              className={`w-full flex items-center gap-4 px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors ${
                activeView === option.id ? "bg-gray-100 border-r-4" : ""
              }`}
              style={{
                borderRightColor: activeView === option.id ? accentColor : "transparent",
              }}
            >
              <span style={{ color: accentColor }}>{option.icon}</span>
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-gray-200 mx-4" />

        {/* Logout Option */}
        <div className="py-4">
          <Link
            href="/"
            className="flex items-center gap-4 px-6 py-3 text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </Link>
        </div>
      </div>
    </>
  );
}

// IDs de vistas para Camarero
export enum CamareroView {
  FICHAJES = "fichajes",
  MESAS = "mesas",
  RESERVAS = "reservas",
}

// IDs de vistas para Cocinero
export enum CocineroView {
  FICHAJES = "fichajes",
  AVISOS = "avisos",
}

// Opciones de menú predefinidas para Camarero
export const CAMARERO_MENU_OPTIONS: MenuOption[] = [
  {
    label: "Fichajes",
    id: CamareroView.FICHAJES,
    icon: <Clock className="w-5 h-5" />,
  },
  {
    label: "Mesas",
    id: CamareroView.MESAS,
    icon: <LayoutGrid className="w-5 h-5" />,
  },
  {
    label: "Reservas",
    id: CamareroView.RESERVAS,
    icon: <CalendarDays className="w-5 h-5" />,
  },
];

// Opciones de menú predefinidas para Cocinero
export const COCINERO_MENU_OPTIONS: MenuOption[] = [
  {
    label: "Fichajes",
    id: CocineroView.FICHAJES,
    icon: <Clock className="w-5 h-5" />,
  },
  {
    label: "Avisos",
    id: CocineroView.AVISOS,
    icon: <Bell className="w-5 h-5" />,
  },
];
