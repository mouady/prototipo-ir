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
} from "recharts";

interface VerticalBarChartProps {
  data: { label: string; valor: number }[];
  yAxisLabel?: string;
  colorScheme?: "purple" | "multi";
}

function getBarColor(value: number, maxValue: number): string {
  const intensity = value / maxValue;
  if (intensity > 0.9) return "#7c3aed"; // purple-600
  if (intensity > 0.7) return "#a855f7"; // purple-500
  if (intensity > 0.5) return "#d946ef"; // fuchsia-500
  if (intensity > 0.3) return "#f472b6"; // pink-400
  return "#f9a8d4"; // pink-300
}

const multiColors = ["#fb923c", "#60a5fa", "#f87171", "#facc15", "#4ade80"];

export function VerticalBarChart({
  data,
  yAxisLabel,
  colorScheme = "purple",
}: VerticalBarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.valor));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="label" 
          tick={{ fontSize: 11 }}
          interval={0}
        />
        <YAxis 
          tick={{ fontSize: 11 }}
          label={yAxisLabel ? { 
            value: yAxisLabel, 
            angle: -90, 
            position: "insideLeft",
            style: { textAnchor: "middle", fontSize: 12 }
          } : undefined}
        />
        <Tooltip 
          formatter={(value) => [`${Number(value).toFixed(2)} €`, "Ticket medio"]}
          labelStyle={{ fontWeight: "bold" }}
        />
        <Bar dataKey="valor" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={
                colorScheme === "multi" 
                  ? multiColors[index % multiColors.length]
                  : getBarColor(entry.valor, maxValue)
              } 
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
