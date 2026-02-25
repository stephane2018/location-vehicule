"use client";

import VehicleCard from "@/shared/components/Layout/VehicleCard";
import VehicleFilters, {
  DEFAULT_FILTERS,
  type FilterState,
} from "@/shared/components/Layout/VehicleFilters";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { VEHICLES, type Vehicle } from "@/core/utils/vehicleData";
import {
  Car,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  SlidersHorizontal,
} from "lucide-react";
import * as React from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const SORT_OPTIONS = [
  { value: "prix-asc", label: "Prix croissant" },
  { value: "prix-desc", label: "Prix décroissant" },
  { value: "populaires", label: "Populaires" },
  { value: "recents", label: "Récents" },
] as const;

type SortOption = (typeof SORT_OPTIONS)[number]["value"];

const ITEMS_PER_PAGE = 9;

// ─── Pure filtering + sorting logic ───────────────────────────────────────────

function applyFilters(vehicles: Vehicle[], filters: FilterState): Vehicle[] {
  return vehicles.filter((v) => {
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(v.category)
    )
      return false;

    if (filters.priceMin !== "" && v.pricePerDay < Number(filters.priceMin))
      return false;
    if (filters.priceMax !== "" && v.pricePerDay > Number(filters.priceMax))
      return false;

    if (filters.agency !== "Tous" && !v.agencies.includes(filters.agency))
      return false;

    if (
      filters.transmission !== "Tous" &&
      v.transmission !== filters.transmission
    )
      return false;

    if (filters.carburant !== "Tous" && v.carburant !== filters.carburant)
      return false;

    if (filters.seats !== "Tous") {
      if (filters.seats === "7+" && v.seats < 7) return false;
      if (filters.seats !== "7+" && v.seats !== Number(filters.seats))
        return false;
    }

    return true;
  });
}

function applySort(vehicles: Vehicle[], sort: SortOption): Vehicle[] {
  const copy = [...vehicles];
  switch (sort) {
    case "prix-asc":
      return copy.sort((a, b) => a.pricePerDay - b.pricePerDay);
    case "prix-desc":
      return copy.sort((a, b) => b.pricePerDay - a.pricePerDay);
    case "populaires":
      return copy.sort(
        (a, b) => Number(b.popular ?? false) - Number(a.popular ?? false)
      );
    case "recents":
      return copy.sort(
        (a, b) =>
          new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      );
    default:
      return copy;
  }
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-dashed border-border/50 bg-muted/20 px-8 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/60">
        <Car className="size-7 text-muted-foreground/50" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-base font-semibold text-foreground">
          Aucun véhicule trouvé
        </p>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Essayez de modifier vos critères de recherche pour découvrir plus de
          véhicules.
        </p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="mt-1 border-border/50"
      >
        Réinitialiser les filtres
      </Button>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  function buildPages(): (number | "…")[] {
    const pages: (number | "…")[] = [];
    const delta = 1;
    const range: number[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (range[0] > 2) pages.push(1, "…");
    else pages.push(1);

    pages.push(...range);

    if (range[range.length - 1] < totalPages - 1)
      pages.push("…", totalPages);
    else pages.push(totalPages);

    return pages;
  }

  const pages = buildPages();

  return (
    <nav
      aria-label="Pagination du catalogue"
      className="flex items-center justify-center gap-1.5"
    >
      <Button
        variant="outline"
        size="icon"
        className="size-9 border-border/50 rounded-lg"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Page précédente"
      >
        <ChevronLeft className="size-4" />
      </Button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="flex size-9 items-center justify-center text-sm text-muted-foreground/50"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <Button
            key={p}
            variant={p === currentPage ? "default" : "outline"}
            size="icon"
            className={`size-9 text-sm rounded-lg ${
              p === currentPage
                ? "shadow-sm"
                : "border-border/50"
            }`}
            onClick={() => onPageChange(p as number)}
            aria-label={`Page ${p}`}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="icon"
        className="size-9 border-border/50 rounded-lg"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Page suivante"
      >
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  );
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

interface ToolbarProps {
  resultCount: number;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  filterSheetTrigger: React.ReactNode;
}

function Toolbar({
  resultCount,
  sort,
  onSortChange,
  filterSheetTrigger,
}: ToolbarProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/50 bg-card px-4 py-3 shadow-sm">
      {/* Result count */}
      <div className="flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/8">
          <LayoutGrid className="size-3.5 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {resultCount}
          </span>{" "}
          véhicule{resultCount > 1 ? "s" : ""}{" "}
          {resultCount > 1 ? "disponibles" : "disponible"}
        </p>
      </div>

      {/* Sort + mobile filter trigger */}
      <div className="flex items-center gap-2">
        <div className="lg:hidden">{filterSheetTrigger}</div>

        <Select
          value={sort}
          onValueChange={(v) => onSortChange(v as SortOption)}
        >
          <SelectTrigger
            className="w-44 text-sm border-border/50 bg-background"
            aria-label="Trier les véhicules"
          >
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

// ─── Main Catalog Page ────────────────────────────────────────────────────────

export default function VehiculesPage() {
  const [filters, setFilters] = React.useState<FilterState>(DEFAULT_FILTERS);
  const [pendingFilters, setPendingFilters] =
    React.useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = React.useState<SortOption>("populaires");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [mobileSheetOpen, setMobileSheetOpen] = React.useState(false);

  const displayedVehicles = React.useMemo(() => {
    const filtered = applyFilters(VEHICLES, filters);
    return applySort(filtered, sort);
  }, [filters, sort]);

  const totalPages = Math.ceil(displayedVehicles.length / ITEMS_PER_PAGE);

  const pageVehicles = React.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return displayedVehicles.slice(start, start + ITEMS_PER_PAGE);
  }, [displayedVehicles, currentPage]);

  function handleSidebarFilterChange(next: FilterState) {
    setFilters(next);
    setCurrentPage(1);
  }

  function handleSidebarApply() {
    setCurrentPage(1);
  }

  function handleSidebarReset() {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  }

  function handleMobileApply() {
    setFilters(pendingFilters);
    setCurrentPage(1);
    setMobileSheetOpen(false);
  }

  function handleMobileReset() {
    setPendingFilters(DEFAULT_FILTERS);
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  }

  function handleSortChange(next: SortOption) {
    setSort(next);
    setCurrentPage(1);
  }

  function handleSheetOpenChange(open: boolean) {
    if (open) setPendingFilters(filters);
    setMobileSheetOpen(open);
  }

  const mobileFilterTrigger = (
    <Sheet open={mobileSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-border/50"
        >
          <SlidersHorizontal className="size-3.5" />
          Filtres
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full max-w-sm overflow-y-auto p-0"
        aria-describedby={undefined}
      >
        <SheetHeader className="px-5 pt-5 pb-2">
          <SheetTitle className="text-base">Filtres de recherche</SheetTitle>
        </SheetHeader>
        <div className="px-5 pb-5">
          <VehicleFilters
            filters={pendingFilters}
            onChange={setPendingFilters}
            onApply={handleMobileApply}
            onReset={handleMobileReset}
          />
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero banner ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[oklch(0.13_0.02_250)]" />

        {/* Gradient accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 70% 20%, oklch(0.3 0.15 260 / 0.25), transparent)",
          }}
        />

        {/* Fine grid pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Catalogue
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Trouvez le véhicule
              <span className="block mt-1 text-white/50">
                qui vous correspond
              </span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/40 max-w-lg">
              Parcourez notre flotte de véhicules disponibles en
              Côte&nbsp;d&apos;Ivoire. Filtrez par catégorie, budget ou agence
              pour trouver la location parfaite.
            </p>

            {/* Stats */}
            <div className="mt-8 flex items-center gap-6">
              {[
                { value: `${VEHICLES.length}`, label: "Véhicules" },
                { value: "5", label: "Agences" },
                { value: "7", label: "Catégories" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs text-white/35">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"
        />
      </section>

      {/* ── Main content ── */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Toolbar */}
        <div className="mb-6">
          <Toolbar
            resultCount={displayedVehicles.length}
            sort={sort}
            onSortChange={handleSortChange}
            filterSheetTrigger={mobileFilterTrigger}
          />
        </div>

        {/* Two-column layout */}
        <div className="flex gap-8 items-start">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-8">
            <VehicleFilters
              filters={filters}
              onChange={handleSidebarFilterChange}
              onApply={handleSidebarApply}
              onReset={handleSidebarReset}
            />
          </aside>

          {/* Vehicle grid + pagination */}
          <section className="flex-1 min-w-0 flex flex-col gap-8">
            {pageVehicles.length === 0 ? (
              <EmptyState onReset={handleSidebarReset} />
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                aria-label="Liste des véhicules"
              >
                {pageVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onViewDetails={(id) =>
                      (window.location.href = `/vehicules/${id}`)
                    }
                    onReserve={(id) =>
                      (window.location.href = `/vehicules/${id}`)
                    }
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}

            {/* Result range */}
            {displayedVehicles.length > 0 && (
              <p className="text-center text-xs text-muted-foreground/60 -mt-4">
                {Math.min(
                  (currentPage - 1) * ITEMS_PER_PAGE + 1,
                  displayedVehicles.length
                )}
                {" – "}
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  displayedVehicles.length
                )}{" "}
                sur {displayedVehicles.length} véhicule
                {displayedVehicles.length > 1 ? "s" : ""}
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
