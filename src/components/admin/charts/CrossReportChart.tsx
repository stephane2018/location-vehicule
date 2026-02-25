"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import type { CrossReport } from "@/types/admin";
import { formatMontant } from "@/utils/adminHelpers";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CrossReportChartProps {
  data: CrossReport[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatYAxisFCFA(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}k`;
  }
  return String(value);
}

function shortenName(name: string): string {
  return name.replace(/\s+\d{4}$/, "");
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
      {payload.map((entry) => {
        const isFCFA = entry.dataKey !== "ratioMaintenanceRevenu";
        return (
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
              {isFCFA ? formatMontant(entry.value) : `${entry.value} %`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CrossReportChart({ data }: CrossReportChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    shortName: shortenName(d.vehiculeNom),
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart
        data={chartData}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis
          dataKey="shortName"
          tick={{ fontSize: 11 }}
          className="text-muted-foreground"
          angle={-35}
          textAnchor="end"
          height={70}
        />
        <YAxis
          yAxisId="left"
          tickFormatter={formatYAxisFCFA}
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 100]}
          tickFormatter={(v: number) => `${v}%`}
          tick={{ fontSize: 12 }}
          className="text-muted-foreground"
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 13, paddingTop: 8 }} />
        <Bar
          yAxisId="left"
          dataKey="coutMaintenance"
          name="Co\u00fbt maintenance"
          fill="oklch(0.577 0.245 27.325)"
          radius={[4, 4, 0, 0]}
          barSize={18}
        />
        <Bar
          yAxisId="left"
          dataKey="revenus"
          name="Revenus"
          fill="oklch(0.696 0.17 162.48)"
          radius={[4, 4, 0, 0]}
          barSize={18}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="ratioMaintenanceRevenu"
          name="Ratio maint./rev."
          stroke="oklch(0.769 0.188 70.08)"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
