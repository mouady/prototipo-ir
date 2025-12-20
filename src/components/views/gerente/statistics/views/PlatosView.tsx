"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HorizontalBarChart } from "../charts";
import { KPICard } from "../KPICard";
import { estadisticasPlatos } from "../mockData";

export function PlatosView() {
  const data = estadisticasPlatos.topPlatos.map((p) => ({
    nombre: p.nombre,
    valor: p.cantidad,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Gráfico principal */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Top 5 platos más vendidos</CardTitle>
        </CardHeader>
        <CardContent>
          <HorizontalBarChart
            data={data}
            colorScheme="green"
            xAxisLabel="Nº de platos vendidos"
          />
        </CardContent>
      </Card>

      {/* KPIs */}
      <KPICard
        items={[
          {
            label: "Total platos Top 5",
            value: estadisticasPlatos.totalTop5,
          },
          {
            label: "Día con más platos vendidos",
            value: estadisticasPlatos.diaConMasVentas,
          },
          {
            label: "Media de platos diaria",
            value: estadisticasPlatos.mediaPlotosDiaria,
          },
        ]}
      />
    </div>
  );
}
