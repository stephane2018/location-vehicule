"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { ExploitationPeriode } from "@/core/types/admin";

interface ShortLongChartProps {
  data: ExploitationPeriode[];
}

export default function ShortLongChart({ data }: ShortLongChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 8, right: 32, left: 8, bottom: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
        <XAxis
          dataKey="mois"
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid hsl(var(--border))",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            fontSize: "13px",
          }}
        />
        <Legend
          verticalAlign="top"
          height={36}
          iconType="square"
          iconSize={10}
          formatter={(value: string) => (
            <span style={{ fontSize: "12px", color: "hsl(var(--muted-foreground))" }}>
              {value}
            </span>
          )}
        />
        <Bar
          dataKey="locationsCourtes"
          name="Courte durée"
          stackId="locations"
          fill="hsl(217, 91%, 60%)"
          radius={[0, 0, 0, 0]}
          barSize={36}
        />
        <Bar
          dataKey="locationsLongues"
          name="Longue durée"
          stackId="locations"
          fill="hsl(38, 92%, 50%)"
          radius={[4, 4, 0, 0]}
          barSize={36}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
