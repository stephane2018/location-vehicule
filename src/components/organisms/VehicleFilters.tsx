"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AGENCIES, type Agency, type VehicleCategory } from "@/utils/vehicleData";
import { RotateCcw, Search } from "lucide-react";
import * as React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FilterState {
  categories: VehicleCategory[];
  priceMin: string;
  priceMax: string;
  agency: Agency | "Tous";
  transmission: "Tous" | "Automatique" | "Manuelle";
  carburant: "Tous" | "Essence" | "Diesel";
  seats: "Tous" | "4" | "5" | "7+";
}

export const DEFAULT_FILTERS: FilterState = {
  categories: [],
  priceMin: "",
  priceMax: "",
  agency: "Tous",
  transmission: "Tous",
  carburant: "Tous",
  seats: "Tous",
};

interface VehicleFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onApply: () => void;
  onReset: () => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORIES: VehicleCategory[] = [
  "Citadine",
  "Berline",
  "SUV",
  "Utilitaire",
  "Luxe Berline",
  "Luxe SUV",
  "Luxe Sportive",
];

const TRANSMISSION_OPTIONS = ["Tous", "Automatique", "Manuelle"] as const;
const CARBURANT_OPTIONS = ["Tous", "Essence", "Diesel"] as const;
const SEATS_OPTIONS = ["Tous", "4", "5", "7+"] as const;

// ─── Reusable pill group ─────────────────────────────────────────────────────

interface PillGroupProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  groupLabel: string;
}

function PillGroup<T extends string>({
  options,
  value,
  onChange,
  groupLabel,
}: PillGroupProps<T>) {
  return (
    <div role="radiogroup" aria-label={groupLabel} className="flex flex-wrap gap-1.5">
      {options.map((option) => {
        const active = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option)}
            className={[
              "rounded-full border px-3 py-1 text-[11px] font-medium transition-all duration-200 cursor-pointer",
              active
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border/60 bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
            ].join(" ")}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

// ─── Filter section wrapper ──────────────────────────────────────────────────

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
        {title}
      </p>
      {children}
    </div>
  );
}

// ─── VehicleFilters ──────────────────────────────────────────────────────────

export default function VehicleFilters({
  filters,
  onChange,
  onApply,
  onReset,
}: VehicleFiltersProps) {
  function handleCategoryToggle(cat: VehicleCategory) {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: next });
  }

  // Count active filters
  const activeCount =
    filters.categories.length +
    (filters.priceMin !== "" ? 1 : 0) +
    (filters.priceMax !== "" ? 1 : 0) +
    (filters.agency !== "Tous" ? 1 : 0) +
    (filters.transmission !== "Tous" ? 1 : 0) +
    (filters.carburant !== "Tous" ? 1 : 0) +
    (filters.seats !== "Tous" ? 1 : 0);

  return (
    <aside
      aria-label="Filtres de recherche"
      className="flex flex-col gap-6 rounded-2xl border border-border/50 bg-card p-5 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-foreground text-sm">Filtres</h2>
          {activeCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {activeCount}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          aria-label="Réinitialiser tous les filtres"
        >
          <RotateCcw className="size-3" />
          Réinitialiser
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/50" />

      {/* ── Catégorie ── */}
      <FilterSection title="Catégorie">
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((cat) => {
            const checked = filters.categories.includes(cat);
            return (
              <label
                key={cat}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div
                  role="checkbox"
                  aria-checked={checked}
                  tabIndex={0}
                  onClick={() => handleCategoryToggle(cat)}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      handleCategoryToggle(cat);
                    }
                  }}
                  className={[
                    "flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-all cursor-pointer",
                    "focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none",
                    checked
                      ? "border-primary bg-primary shadow-sm"
                      : "border-border/60 bg-background group-hover:border-primary/40",
                  ].join(" ")}
                >
                  {checked && (
                    <svg
                      viewBox="0 0 10 8"
                      className="size-2.5 text-primary-foreground"
                      fill="none"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M1 4l2.5 2.5L9 1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm transition-colors ${
                    checked ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}
                  onClick={() => handleCategoryToggle(cat)}
                >
                  {cat}
                </span>
              </label>
            );
          })}
        </div>
      </FilterSection>

      <div className="h-px bg-border/50" />

      {/* ── Prix ── */}
      <FilterSection title="Prix (FCFA / jour)">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="price-min" className="text-[11px] text-muted-foreground">
              Min
            </Label>
            <Input
              id="price-min"
              type="number"
              placeholder="15 000"
              min={0}
              value={filters.priceMin}
              onChange={(e) => onChange({ ...filters, priceMin: e.target.value })}
              className="h-9 text-sm border-border/60"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="price-max" className="text-[11px] text-muted-foreground">
              Max
            </Label>
            <Input
              id="price-max"
              type="number"
              placeholder="200 000"
              min={0}
              value={filters.priceMax}
              onChange={(e) => onChange({ ...filters, priceMax: e.target.value })}
              className="h-9 text-sm border-border/60"
            />
          </div>
        </div>
      </FilterSection>

      <div className="h-px bg-border/50" />

      {/* ── Agence ── */}
      <FilterSection title="Agence">
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="radio"
              name="agency"
              value="Tous"
              checked={filters.agency === "Tous"}
              onChange={() => onChange({ ...filters, agency: "Tous" })}
              className="accent-primary size-3.5"
            />
            <span className="text-sm text-muted-foreground">Toutes les agences</span>
          </label>
          {AGENCIES.map((ag) => (
            <label key={ag} className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="radio"
                name="agency"
                value={ag}
                checked={filters.agency === ag}
                onChange={() => onChange({ ...filters, agency: ag })}
                className="accent-primary size-3.5"
              />
              <span className="text-sm text-muted-foreground">{ag}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <div className="h-px bg-border/50" />

      {/* ── Transmission ── */}
      <FilterSection title="Transmission">
        <PillGroup
          options={TRANSMISSION_OPTIONS}
          value={filters.transmission}
          onChange={(v) => onChange({ ...filters, transmission: v })}
          groupLabel="Transmission"
        />
      </FilterSection>

      <div className="h-px bg-border/50" />

      {/* ── Carburant ── */}
      <FilterSection title="Carburant">
        <PillGroup
          options={CARBURANT_OPTIONS}
          value={filters.carburant}
          onChange={(v) => onChange({ ...filters, carburant: v })}
          groupLabel="Carburant"
        />
      </FilterSection>

      <div className="h-px bg-border/50" />

      {/* ── Nombre de places ── */}
      <FilterSection title="Places">
        <PillGroup
          options={SEATS_OPTIONS}
          value={filters.seats}
          onChange={(v) => onChange({ ...filters, seats: v })}
          groupLabel="Nombre de places"
        />
      </FilterSection>

      <div className="h-px bg-border/50" />

      {/* ── Apply button ── */}
      <Button className="w-full gap-2" onClick={onApply}>
        <Search className="size-3.5" />
        Appliquer les filtres
      </Button>
    </aside>
  );
}
