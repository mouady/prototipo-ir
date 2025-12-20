"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ReservaDia } from "../types";

interface GroupedBarChartProps {
  data: ReservaDia[];
  yAxisLabel?: string;
}

// Transformar los datos para Recharts
function transformData(data: ReservaDia[]) {
  return data.map((item) => {
    const result: Record<string, number | string> = { dia: item.dia.toString() };
    item.reservas.forEach((reserva, idx) => {
      result[`reserva${idx + 1}`] = reserva;
    });
    return result;
  });
}

// Obtener el número máximo de reservas por día
function getMaxReservas(data: ReservaDia[]): number {
  return Math.max(...data.map((d) => d.reservas.length));
}

// Gama monocromática de morados (de más oscuro a más claro)
const barColors = ["#581c87", "#7c3aed", "#a78bfa", "#c4b5fd", "#ddd6fe"];

export function GroupedBarChart({ data, yAxisLabel }: GroupedBarChartProps) {
  const transformedData = transformData(data);
  const maxReservas = getMaxReservas(data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={transformedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 25 }}
        barSize={16}
        barGap={2}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="dia" 
          tick={{ fontSize: 11 }}
          label={{ value: "Día del mes", position: "bottom", offset: 5, fontSize: 12 }}
        />
        <YAxis 
          tick={{ fontSize: 11 }}
          label={yAxisLabel ? { 
            value: yAxisLabel, 
            angle: -90, 
            position: "insideLeft",
            style: { textAnchor: "middle", fontSize: 12 }
          } : undefined}
          allowDecimals={false}
        />
        <Tooltip 
          formatter={(value) => [value, "Reservas"]}
          labelFormatter={(label) => `Día ${label}`}
        />
        {Array.from({ length: maxReservas }, (_, i) => (
          <Bar
            key={`reserva${i + 1}`}
            dataKey={`reserva${i + 1}`}
            fill={barColors[i % barColors.length]}
            radius={[3, 3, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
