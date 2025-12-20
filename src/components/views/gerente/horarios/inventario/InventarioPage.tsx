"use client";

import { useState } from "react";
import { LeftMenu } from "./LeftMenu";
import { RightGrid } from "./RightGrid";

export function InventarioPage() {
  const [categoriaActiva, setCategoriaActiva] = useState("platos");

  return (
    <div className="flex flex-1 h-[calc(100vh-56px)]">
      <LeftMenu
        categoriaActiva={categoriaActiva}
        onCategoriaChange={setCategoriaActiva}
      />
      <RightGrid categoriaActiva={categoriaActiva} />
    </div>
  );
}
