"use client";

import { Fuel } from "lucide-react";
import { cn } from "@/core/lib/utils";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface FuelLevelIndicatorProps {
  level: number; // 0-100
}

export default function FuelLevelIndicator({ level }: FuelLevelIndicatorProps) {
  const clampedLevel = Math.max(0, Math.min(100, level));

  let barColor: string;
  let textColor: string;

  if (clampedLevel > 50) {
    barColor = "bg-emerald-500";
    textColor = "text-emerald-700";
  } else if (clampedLevel >= 25) {
    barColor = "bg-amber-500";
    textColor = "text-amber-700";
  } else {
    barColor = "bg-red-500";
    textColor = "text-red-700";
  }

  return (
    <div className="flex items-center gap-3">
      <Fuel className={cn("size-4 shrink-0", textColor)} />
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Niveau carburant
          </span>
          <span className={cn("text-sm font-semibold", textColor)}>
            {clampedLevel} %
          </span>
        </div>
        <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all", barColor)}
            style={{ width: `${clampedLevel}%` }}
          />
        </div>
      </div>
    </div>
  );
}
