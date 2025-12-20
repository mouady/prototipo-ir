"use client";
import Link from "next/link";
import ContainerMobile from "@/components/views/mobile/shared/ContainerMobile";
import HeaderMobile from "@/components/views/mobile/shared/HeaderMobile";
import { Menu } from "lucide-react";

export default function CamareroPage() {

  return (
    <ContainerMobile>
          <HeaderMobile title="Vista Camarero" link="/" color="#34e64cff" />
        </ContainerMobile>
  );
}
