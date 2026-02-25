"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import type { VehicleFinancials } from "@/types/admin";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProfitabilityChartProps {
  data: VehicleFinancials[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getBarColor(rentabilite: number): string {
  if (rentabilite > 70) return "oklch(0.765 0.177 163.223)"; // emerald-500
  if (rentabilite >= 50) return "oklch(0.769 0.188 70.08)"; // amber-500
  return "oklch(0.577 0.245 27.325)"; // red-500
}

// ---------------------------------------------------------------------------
// Custom tooltip
// ---------------------------------------------------------------------------

interface TooltipPayloadItem {
  name: string;
  value: number;
  payload: { nom: string; rentabilite: number };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const item = payload[0].payload;

  return (
    <div className="rounded-lg border bg-background p-3 shadow-md">
      <p className="mb-1 text-sm font-semibold text-foreground">{item.nom}</p>
      <p className="text-sm text-muted-foreground">
        Rentabilit\u00e9 :{" "}
        <span className="font-medium text-foreground">{item.rentabilite} %</span>
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProfitabilityChart({ data }: ProfitabilityChartProps) {
  const sorted = [...data].sort((a, b) => b.rentabilite - a.rentabilite);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={sorted}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(v: number) => `${v}%`}
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <YAxis
          type="category"
          dataKey="nom"
          width={160}
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="rentabilite" name="Rentabilit\u00e9" radius={[0, 4, 4, 0]} barSize={20}>
          {sorted.map((entry) => (
            <Cell key={entry.vehiculeId} fill={getBarColor(entry.rentabilite)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
