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
  placeholder = "Ville ou agence de retour",
}: ReturnLocationFieldProps) {
  return (
    <div>
      <Label className="text-xs font-medium text-muted-foreground mb-2 block">
        {label}
      </Label>
      {differentReturn ? (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10 pr-8 h-12 border-border bg-background text-sm"
            placeholder={placeholder}
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                onToggleDifferentReturn(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onToggleDifferentReturn(true)}
          className="flex items-center gap-2 h-12 px-4 border border-border rounded-md text-sm text-muted-foreground hover:bg-muted/50 w-full justify-start transition-colors"
        >
          <Plus className="size-4" />
          Lieu de retour different
        </button>
      )}
    </div>
  );
}
