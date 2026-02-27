"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, X } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FloatingLocationPicker } from "../FloatingLocationPicker";
import type { Agence } from "@/core/types/agence";

interface LocationFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function LocationField({
  label,
  value,
  onChange,
  placeholder = "Ville ou agence",
}: LocationFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleSelect = useCallback(
    (agence: Agence) => {
      onChange(`${agence.nom} - ${agence.ville}`);
      setIsOpen(false);
    },
    [onChange]
  );

  return (
    <div ref={containerRef} className="relative">
      <Label className="text-xs font-medium text-muted-foreground mb-2 block">
        {label}
      </Label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
        <Input
          ref={inputRef}
          value={value}
          readOnly
          onClick={handleOpen}
          className="pl-10 pr-8 h-12 border-border bg-background text-sm cursor-pointer"
          placeholder={placeholder}
        />
        {value && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Floating Location Picker */}
      {isOpen && (
        <FloatingLocationPicker
          onSelect={handleSelect}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
