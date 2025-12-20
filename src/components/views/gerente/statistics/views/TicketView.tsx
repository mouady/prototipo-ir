"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VerticalBarChart } from "../charts";
import { KPICard } from "../KPICard";
import { estadisticasTicket } from "../mockData";

export function TicketView() {
  const data = estadisticasTicket.ticketsPorMes.map((t) => ({
    label: t.mes,
    valor: t.valor,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Gráfico principal */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Ticket medio por mes</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <VerticalBarChart
            data={data}
            yAxisLabel="Ticket medio (€)"
            colorScheme="purple"
          />
        </CardContent>
      </Card>

      {/* KPIs */}
      <KPICard
        items={[
          {
            label: "Media anual",
            value: estadisticasTicket.mediaAnual,
            suffix: "€",
          },
          {
            label: "Mejor mes",
            value: estadisticasTicket.mejorMes,
          },
        ]}
      />
    </div>
  );
}
