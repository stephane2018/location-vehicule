"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ImmobilizationChartProps {
  data: { nom: string; jours: number }[];
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
            {entry.value} jour{entry.value > 1 ? "s" : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ImmobilizationChart({ data }: ImmobilizationChartProps) {
  const sorted = [...data].sort((a, b) => b.jours - a.jours);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={sorted}
        layout="vertical"
        margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          type="number"
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <YAxis
          type="category"
          dataKey="nom"
          tick={{ fontSize: 11 }}
          className="text-muted-foreground"
          width={130}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="jours"
          name="Jours d'immobilisation"
          fill="oklch(0.769 0.188 70.08)"
          radius={[0, 4, 4, 0]}
          barSize={20}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
