"use client";

import type { PointControle, PointControleEtat } from "@/core/types/admin";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const ETAT_DISPLAY: Record<
  PointControleEtat,
  { label: string; color: string; bgColor: string }
> = {
  bon: {
    label: "Bon",
    color: "text-emerald-700",
    bgColor: "bg-emerald-500/10 border-emerald-200",
  },
  acceptable: {
    label: "Acceptable",
    color: "text-amber-700",
    bgColor: "bg-amber-500/10 border-amber-200",
  },
  degrade: {
    label: "Degrade",
    color: "text-orange-700",
    bgColor: "bg-orange-500/10 border-orange-200",
  },
  endommage: {
    label: "Endommage",
    color: "text-red-700",
    bgColor: "bg-red-500/10 border-red-200",
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface InspectionSummaryProps {
  pointsControle: PointControle[];
}

export default function InspectionSummary({
  pointsControle,
}: InspectionSummaryProps) {
  // Count by state
  const counts: Record<PointControleEtat, number> = {
    bon: 0,
    acceptable: 0,
    degrade: 0,
    endommage: 0,
  };
  for (const p of pointsControle) {
    counts[p.etat]++;
  }

  // Determine overall status
  const hasEndommage = counts.endommage > 0;
  const hasDegrade = counts.degrade > 0;

  let overallLabel: string;
  let overallColor: string;
  let overallBg: string;
  let OverallIcon: typeof CheckCircle2;

  if (hasEndommage) {
    overallLabel = "Dommages constates";
    overallColor = "text-red-700";
    overallBg = "bg-red-500/10 border-red-200";
    OverallIcon = ShieldAlert;
  } else if (hasDegrade) {
    overallLabel = "Degradations mineures";
    overallColor = "text-amber-700";
    overallBg = "bg-amber-500/10 border-amber-200";
    OverallIcon = AlertTriangle;
  } else {
    overallLabel = "Bon etat general";
    overallColor = "text-emerald-700";
    overallBg = "bg-emerald-500/10 border-emerald-200";
    OverallIcon = CheckCircle2;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Resume de l&apos;inspection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Counts grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(
            ["bon", "acceptable", "degrade", "endommage"] as PointControleEtat[]
          ).map((etat) => {
            const display = ETAT_DISPLAY[etat];
            return (
              <div
                key={etat}
                className={`flex flex-col items-center rounded-lg border p-3 ${display.bgColor}`}
              >
                <span className={`text-2xl font-bold ${display.color}`}>
                  {counts[etat]}
                </span>
                <span className={`text-xs font-medium ${display.color}`}>
                  {display.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Overall status */}
        <div
          className={`flex items-center gap-3 rounded-lg border p-4 ${overallBg}`}
        >
          <OverallIcon className={`size-5 shrink-0 ${overallColor}`} />
          <div>
            <p className={`text-sm font-semibold ${overallColor}`}>
              Etat general
            </p>
            <p className={`text-sm ${overallColor}`}>{overallLabel}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
