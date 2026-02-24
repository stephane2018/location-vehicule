"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Vehicle, type VehicleStatus } from "@/utils/vehicleData";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  CircleCheck,
  Fuel,
  Settings2,
  Star,
  Users,
  Wrench,
} from "lucide-react";

// ─── Status config ───────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  VehicleStatus,
  { label: string; icon: React.ElementType; className: string }
> = {
  disponible: {
    label: "Disponible",
    icon: CircleCheck,
    className:
      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  },
  "en-location": {
    label: "En location",
    icon: CalendarClock,
    className:
      "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/20",
  },
  "en-revision": {
    label: "En révision",
    icon: Wrench,
    className:
      "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/20",
  },
};

function formatAvailableDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SpecPill({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-1 text-[11px] text-muted-foreground">
      <Icon className="size-3 shrink-0" />
      <span>{label}</span>
    </div>
  );
}

function StatusBadge({ vehicle }: { vehicle: Vehicle }) {
  const config = STATUS_CONFIG[vehicle.status];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-start gap-1">
      <div
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${config.className}`}
      >
        <Icon className="size-3 shrink-0" />
        <span>{config.label}</span>
      </div>
      {vehicle.status === "en-location" && vehicle.availableDate && (
        <span className="text-[10px] text-muted-foreground ml-1">
          Libre le {formatAvailableDate(vehicle.availableDate)}
        </span>
      )}
    </div>
  );
}

// ─── Main VehicleCard component ──────────────────────────────────────────────

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails?: (id: string) => void;
  onReserve?: (id: string) => void;
}

export default function VehicleCard({
  vehicle,
  onViewDetails,
  onReserve,
}: VehicleCardProps) {
  const {
    id,
    name,
    category,
    pricePerDay,
    transmission,
    carburant,
    seats,
    agencies,
    image,
    gradientFrom,
    gradientTo,
    popular,
    status,
  } = vehicle;

  const isUnavailable = status !== "disponible";

  const agencyLabel =
    agencies.length === 1
      ? agencies[0]
      : agencies.length === 2
      ? agencies.join(" · ")
      : `${agencies[0]} · ${agencies[1]} +${agencies.length - 2}`;

  return (
    <Card
      className={`group overflow-hidden border-border/50 p-0 gap-0 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-primary/15 ${
        isUnavailable ? "opacity-80" : ""
      }`}
    >
      {/* ── Image ── */}
      <div className="relative">
        <div
          className="relative h-44 w-full overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
          }}
        >
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              isUnavailable ? "grayscale-[30%]" : ""
            }`}
          />

          {/* Unavailable overlay */}
          {isUnavailable && (
            <div className="absolute inset-0 bg-black/10" />
          )}
        </div>

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {popular ? (
            <Badge className="bg-white/90 text-foreground shadow-sm text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
              Populaire
            </Badge>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm">
            <Star className="size-3 text-amber-400 fill-amber-400" />
            <span className="text-[11px] font-semibold text-white">4.8</span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <CardContent className="flex flex-col gap-3 px-4 pt-4 pb-0">
        {/* Category + name + price */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1 min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
              {category}
            </span>
            <h3 className="font-semibold text-foreground text-[15px] leading-snug truncate">
              {name}
            </h3>
          </div>
          <div className="flex flex-col items-end shrink-0 ml-2">
            <span className="text-lg font-bold text-foreground leading-tight">
              {pricePerDay.toLocaleString("fr-FR")}
            </span>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap">
              FCFA / jour
            </span>
          </div>
        </div>

        {/* Status */}
        <StatusBadge vehicle={vehicle} />

        {/* Specs */}
        <div className="flex flex-wrap gap-1.5" aria-label="Caractéristiques">
          <SpecPill icon={Settings2} label={transmission} />
          <SpecPill icon={Fuel} label={carburant} />
          <SpecPill icon={Users} label={`${seats} places`} />
        </div>

        {/* Agencies */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Building2 className="size-3.5 shrink-0 text-muted-foreground/60" />
          <span className="truncate" title={agencies.join(", ")}>
            {agencyLabel}
          </span>
        </div>
      </CardContent>

      {/* ── Footer ── */}
      <CardFooter className="flex gap-2 px-4 py-4">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-1.5 text-xs border-border/50"
          onClick={() => onViewDetails?.(id)}
          aria-label={`Voir les détails de ${name}`}
        >
          Voir détails
          <ArrowRight className="size-3" />
        </Button>
        <Button
          size="sm"
          className="flex-1 text-xs"
          onClick={() => onReserve?.(id)}
          disabled={isUnavailable}
          aria-label={`Réserver ${name}`}
        >
          {isUnavailable ? "Indisponible" : "Réserver"}
        </Button>
      </CardFooter>
    </Card>
  );
}

// Re-use Card imports at component level
import { Card, CardContent, CardFooter } from "@/components/ui/card";
