"use client";

import type { PointControle, PointControleEtat } from "@/core/types/admin";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import CheckpointItem from "@/shared/components/admin/inspection/CheckpointItem";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ETAT_COLORS: Record<PointControleEtat, string> = {
  bon: "text-emerald-600",
  acceptable: "text-amber-600",
  degrade: "text-orange-600",
  endommage: "text-red-600",
};

const ETAT_LABELS: Record<PointControleEtat, string> = {
  bon: "bon",
  acceptable: "acceptable",
  degrade: "degrade",
  endommage: "endommage",
};

function buildSummary(points: PointControle[]): string {
  const counts: Partial<Record<PointControleEtat, number>> = {};
  for (const p of points) {
    counts[p.etat] = (counts[p.etat] ?? 0) + 1;
  }
  const parts: string[] = [];
  for (const etat of [
    "bon",
    "acceptable",
    "degrade",
    "endommage",
  ] as PointControleEtat[]) {
    const count = counts[etat];
    if (count && count > 0) {
      parts.push(`${count} ${ETAT_LABELS[etat]}`);
    }
  }
  return parts.join(", ");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface CheckpointGroupProps {
  categorie: string;
  points: PointControle[];
  readOnly?: boolean;
}

export default function CheckpointGroup({
  categorie,
  points,
  readOnly = false,
}: CheckpointGroupProps) {
  const summary = buildSummary(points);

  // Determine the worst state to color the count summary
  const hasEndommage = points.some((p) => p.etat === "endommage");
  const hasDegrade = points.some((p) => p.etat === "degrade");
  const hasAcceptable = points.some((p) => p.etat === "acceptable");

  let worstColor = ETAT_COLORS.bon;
  if (hasAcceptable) worstColor = ETAT_COLORS.acceptable;
  if (hasDegrade) worstColor = ETAT_COLORS.degrade;
  if (hasEndommage) worstColor = ETAT_COLORS.endommage;

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={categorie}>
        <AccordionTrigger className="hover:no-underline">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span className="font-semibold text-sm text-foreground">
              {categorie}
            </span>
            <span className={`text-xs ${worstColor}`}>
              {summary}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-0">
            {points.map((point) => (
              <CheckpointItem
                key={point.pointId}
                point={point}
                readOnly={readOnly}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
