import { Header } from "@/components/Header";
import { InventarioPage } from "@/components/inventario/InventarioPage";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header />
      <InventarioPage />
    </div>
  );
}
