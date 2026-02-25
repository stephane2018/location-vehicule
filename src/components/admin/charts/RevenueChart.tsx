"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import type { RevenueByPeriod } from "@/types/admin";
import { formatMontant } from "@/utils/adminHelpers";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RevenueChartProps {
  data: RevenueByPeriod[];
}

// ---------------------------------------------------------------------------
// Custom tooltip
// ---------------------------------------------------------------------------

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
  dataKey: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-lg border bg-background p-3 shadow-md">
      <p className="mb-2 text-sm font-semibold text-foreground">{label}</p>
      {payload.map((entry) => (
        <div
          key={entry.dataKey}
          className="flex items-center gap-2 text-sm"
        >
          <span
            className="inline-block size-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name} :</span>
          <span className="font-medium text-foreground">
            {formatMontant(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Format Y axis labels in millions
// ---------------------------------------------------------------------------

function formatYAxis(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}k`;
  }
  return String(value);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.546 0.245 262.881)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.546 0.245 262.881)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorCouts" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.577 0.245 27.325)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.577 0.245 27.325)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="mois"
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <YAxis
          tickFormatter={formatYAxis}
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 13, paddingTop: 8 }}
        />
        <Area
          type="monotone"
          dataKey="revenus"
          name="Revenus"
          stroke="oklch(0.546 0.245 262.881)"
          fill="url(#colorRevenus)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="coutsMaintenance"
          name="Co\u00fbts maintenance"
          stroke="oklch(0.577 0.245 27.325)"
          fill="url(#colorCouts)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
