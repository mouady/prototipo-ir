"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

interface HorizontalBarChartProps {
  data: { nombre: string; valor: number }[];
  colorScheme?: "green" | "blue";
  xAxisLabel?: string;
}

const colorSchemes = {
  green: ["#22c55e", "#4ade80", "#86efac", "#bbf7d0", "#dcfce7"],
  blue: ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"],
};

export function HorizontalBarChart({
  data,
  colorScheme = "green",
  xAxisLabel,
}: HorizontalBarChartProps) {
  const colors = colorSchemes[colorScheme];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis 
          type="number" 
          tickFormatter={(value) => value.toLocaleString("es-ES")}
          label={xAxisLabel ? { value: xAxisLabel, position: "bottom", offset: 0 } : undefined}
        />
        <YAxis 
          type="category" 
          dataKey="nombre" 
          width={150}
          tick={{ fontSize: 12 }}
        />
        <Tooltip 
          formatter={(value) => [Number(value).toLocaleString("es-ES"), "Cantidad"]}
          labelStyle={{ fontWeight: "bold" }}
        />
        <Bar dataKey="valor" radius={[0, 4, 4, 0]}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
          <LabelList 
            dataKey="valor" 
            position="right" 
            formatter={(value) => Number(value).toLocaleString("es-ES")}
            style={{ fontSize: 12, fill: "#374151" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
