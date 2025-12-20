"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ProductGrid } from "./ProductGrid";

export function InventarioPage() {
  const [categoriaActiva, setCategoriaActiva] = useState("platos");

  return (
    <div className="flex flex-1 h-[calc(100vh-56px)]">
      <Sidebar
        categoriaActiva={categoriaActiva}
        onCategoriaChange={setCategoriaActiva}
      />
      <ProductGrid categoriaActiva={categoriaActiva} />
    </div>
  );
}
