"use client";

import type { PointControle, PointControleEtat } from "@/types/admin";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Etat config
// ---------------------------------------------------------------------------

const ETAT_CONFIG: Record<
  PointControleEtat,
  { label: string; activeClass: string; outlineClass: string }
> = {
  bon: {
    label: "Bon",
    activeClass: "bg-emerald-500/15 text-emerald-700 border-emerald-300",
    outlineClass:
      "border-emerald-200 text-emerald-600 hover:bg-emerald-500/10 cursor-pointer",
  },
  acceptable: {
    label: "Acceptable",
    activeClass: "bg-amber-500/15 text-amber-700 border-amber-300",
    outlineClass:
      "border-amber-200 text-amber-600 hover:bg-amber-500/10 cursor-pointer",
  },
  degrade: {
    label: "Degrade",
    activeClass: "bg-orange-500/15 text-orange-700 border-orange-300",
    outlineClass:
      "border-orange-200 text-orange-600 hover:bg-orange-500/10 cursor-pointer",
  },
  endommage: {
    label: "Endommage",
    activeClass: "bg-red-500/15 text-red-700 border-red-300",
    outlineClass:
      "border-red-200 text-red-600 hover:bg-red-500/10 cursor-pointer",
  },
};

const ETATS: PointControleEtat[] = ["bon", "acceptable", "degrade", "endommage"];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface CheckpointItemProps {
  point: PointControle;
  readOnly?: boolean;
}

export default function CheckpointItem({
  point,
  readOnly = false,
}: CheckpointItemProps) {
  const currentConfig = ETAT_CONFIG[point.etat];

  return (
    <div className="flex flex-col gap-2 py-3 border-b last:border-b-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-medium text-foreground">
          {point.label}
        </span>

        {readOnly ? (
          <Badge variant="outline" className={currentConfig.activeClass}>
            {currentConfig.label}
          </Badge>
        ) : (
          <div className="flex gap-1.5 flex-wrap">
            {ETATS.map((etat) => {
              const config = ETAT_CONFIG[etat];
              const isActive = point.etat === etat;
              return (
                <Badge
                  key={etat}
                  variant="outline"
                  className={cn(
                    "text-xs px-2.5 py-0.5 transition-colors",
                    isActive ? config.activeClass : config.outlineClass
                  )}
                >
                  {config.label}
                </Badge>
              );
            })}
          </div>
        )}
      </div>

      {point.commentaire && (
        <p className="text-xs text-muted-foreground pl-0 sm:pl-0 italic">
          {point.commentaire}
        </p>
      )}
    </div>
  );
}
