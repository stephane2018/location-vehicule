"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import type { ExploitationVehicule } from "@/core/types/admin";

interface DemandChartProps {
  data: ExploitationVehicule[];
}

export default function DemandChart({ data }: DemandChartProps) {
  const sorted = [...data].sort((a, b) => b.scoreDemande - a.scoreDemande);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={sorted}
        layout="vertical"
        margin={{ top: 8, right: 32, left: 8, bottom: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          type="category"
          dataKey="nom"
          width={140}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          formatter={(value) => [`${value} / 100`, "Score demande"]}
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid hsl(var(--border))",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            fontSize: "13px",
          }}
        />
        <defs>
          <linearGradient id="demandGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.7} />
            <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Bar
          dataKey="scoreDemande"
          fill="url(#demandGradient)"
          radius={[0, 6, 6, 0]}
          barSize={24}
        >
          {sorted.map((entry) => (
            <Cell
              key={entry.vehiculeId}
              fillOpacity={entry.scoreDemande >= 80 ? 1 : 0.65}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
