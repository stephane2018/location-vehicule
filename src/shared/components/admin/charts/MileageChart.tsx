"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { formatKilometrage } from "@/core/utils/adminHelpers";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MileageChartProps {
  data: { date: string; km: number }[];
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
          <span className="text-muted-foreground">Kilométrage :</span>
          <span className="font-medium text-foreground">
            {formatKilometrage(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
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

export default function MileageChart({ data }: MileageChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="mileageGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="oklch(0.546 0.245 262.881)"
              stopOpacity={0.3}
            />
            <stop
              offset="100%"
              stopColor="oklch(0.546 0.245 262.881)"
              stopOpacity={0.02}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <YAxis
          tickFormatter={formatYAxis}
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="km"
          stroke="none"
          fill="url(#mileageGradient)"
        />
        <Line
          type="monotone"
          dataKey="km"
          name="Kilométrage"
          stroke="oklch(0.546 0.245 262.881)"
          strokeWidth={2}
          dot={{ r: 4, fill: "oklch(0.546 0.245 262.881)" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
