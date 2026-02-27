"use client";

import { Car, Truck, Crown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const VEHICLE_TYPES: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "cars", label: "Voitures", icon: Car },
  { value: "trucks", label: "Utilitaires", icon: Truck },
  { value: "luxury", label: "Luxe", icon: Crown },
];

interface VehicleTypeTabsProps {
  value: string;
  onChange: (value: string) => void;
}

export function VehicleTypeTabs({ value, onChange }: VehicleTypeTabsProps) {
  return (
    <div className="flex items-center gap-1 p-2 bg-card border-b border-border/50 rounded-t-2xl">
      {VEHICLE_TYPES.map((type) => {
        const Icon = type.icon;
        return (
          <button
            key={type.value}
            type="button"
            onClick={() => onChange(type.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              value === type.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Icon className="size-4" />
            {type.label}
          </button>
        );
      })}
    </div>
  );
}
