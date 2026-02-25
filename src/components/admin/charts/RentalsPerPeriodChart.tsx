"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { ExploitationPeriode } from "@/types/admin";

interface RentalsPerPeriodChartProps {
  data: ExploitationPeriode[];
}

export default function RentalsPerPeriodChart({
  data,
}: RentalsPerPeriodChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 8, right: 32, left: 8, bottom: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
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
          iconType="circle"
          iconSize={8}
          formatter={(value: string) => (
            <span style={{ fontSize: "12px", color: "hsl(var(--muted-foreground))" }}>
              {value}
            </span>
          )}
        />
        <Line
          type="monotone"
          dataKey="locationsCourtes"
          name="Courte durée"
          stroke="hsl(217, 91%, 60%)"
          strokeWidth={2.5}
          dot={{ r: 4, fill: "hsl(217, 91%, 60%)" }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="locationsLongues"
          name="Longue durée"
          stroke="hsl(38, 92%, 50%)"
          strokeWidth={2.5}
          dot={{ r: 4, fill: "hsl(38, 92%, 50%)" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
