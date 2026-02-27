"use client";

import { Car, Truck, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const VEHICLE_TYPES: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "cars", label: "Cars", icon: Car },
  { value: "trucks", label: "Trucks", icon: Truck },
  { value: "subscription", label: "Subscription", icon: Star },
];

interface VehicleTypeTabsProps {
  value: string;
  onChange: (value: string) => void;
}

export function VehicleTypeTabs({ value, onChange }: VehicleTypeTabsProps) {
  return (
    <div className="flex items-center gap-1 p-2 bg-white border-b rounded-t-2xl">
      {VEHICLE_TYPES.map((type) => {
        const Icon = type.icon;
        return (
          <button
            key={type.value}
            type="button"
            onClick={() => onChange(type.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              value === type.value
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
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
