"use client";

import { Search, Plus, X } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

interface ReturnLocationFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  differentReturn: boolean;
  onToggleDifferentReturn: (value: boolean) => void;
  placeholder?: string;
}

export function ReturnLocationField({
  label,
  value,
  onChange,
  differentReturn,
  onToggleDifferentReturn,
  placeholder = "Aéroport, ville ou adresse",
}: ReturnLocationFieldProps) {
  return (
    <div>
      <Label className="text-xs font-medium text-gray-700 mb-2 block">
        {label}
      </Label>
      {differentReturn ? (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10 pr-8 h-12 border-gray-300 bg-white text-sm"
            placeholder={placeholder}
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                onToggleDifferentReturn(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onToggleDifferentReturn(true)}
          className="flex items-center gap-2 h-12 px-4 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 w-full justify-start"
        >
          <Plus className="size-4" />
          Lieu de retour différent
        </button>
      )}
    </div>
  );
}
