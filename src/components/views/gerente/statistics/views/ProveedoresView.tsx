"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HorizontalBarChart } from "../charts";
import { KPICard } from "../KPICard";
import { estadisticasProveedores } from "../mockData";

export function ProveedoresView() {
  const data = estadisticasProveedores.topProveedores.map((p) => ({
    nombre: p.nombre,
    valor: p.importe,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Gráfico principal */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Top 5 proveedores</CardTitle>
        </CardHeader>
        <CardContent>
          <HorizontalBarChart
            data={data}
            colorScheme="blue"
            xAxisLabel="Importe (€)"
          />
        </CardContent>
      </Card>

      {/* KPIs */}
      <KPICard
        items={[
          {
            label: "Total gastado",
            value: estadisticasProveedores.totalGastado.toLocaleString("es-ES"),
            suffix: "€",
          },
        ]}
      />
    </div>
  );
}
