"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GroupedBarChart } from "../charts";
import { KPICard } from "../KPICard";
import { estadisticasReservas } from "../mockData";

export function ReservasView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Gráfico principal */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Reservas del mes</CardTitle>
        </CardHeader>
        <CardContent className="h-[350px]">
          <GroupedBarChart
            data={estadisticasReservas.reservasPorDia}
            yAxisLabel="Nº de reservas"
          />
        </CardContent>
      </Card>

      {/* KPIs */}
      <KPICard
        items={[
          {
            label: "Reservas totales",
            value: estadisticasReservas.totalReservas,
          },
          {
            label: "Día con más reservas",
            value: estadisticasReservas.diaConMasReservas,
          },
          {
            label: "Media diaria",
            value: estadisticasReservas.mediaDiaria,
          },
        ]}
      />
    </div>
  );
}
