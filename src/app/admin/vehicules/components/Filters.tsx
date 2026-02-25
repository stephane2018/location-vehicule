import { Search, Filter } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Slider } from "@/shared/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Badge } from "@/shared/components/ui/badge";
import type { VehiculeStatut, VehiculeCategorie } from "@/core/types";

interface FiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statutFilter: VehiculeStatut | "all";
  onStatutFilterChange: (value: VehiculeStatut | "all") => void;
  categorieFilter: VehiculeCategorie | "all";
  onCategorieFilterChange: (value: VehiculeCategorie | "all") => void;
  agenceFilter: string;
  onAgenceFilterChange: (value: string) => void;
  agences: string[];
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  maxPrice: number;
  activeFiltersCount: number;
  onClearAllFilters: () => void;
}

export function Filters({
  searchTerm,
  onSearchChange,
  statutFilter,
  onStatutFilterChange,
  categorieFilter,
  onCategorieFilterChange,
  agenceFilter,
  onAgenceFilterChange,
  agences,
  priceRange,
  onPriceRangeChange,
  maxPrice,
  activeFiltersCount,
  onClearAllFilters,
}: FiltersProps) {
  const statutOptions: { value: VehiculeStatut | "all"; label: string }[] = [
    { value: "all", label: "Tous les statuts" },
    { value: "disponible", label: "Disponible" },
    { value: "en_location", label: "En location" },
    { value: "maintenance", label: "Maintenance" },
  ];

  const categorieOptions: { value: VehiculeCategorie | "all"; label: string }[] = [
    { value: "all", label: "Toutes les catégories" },
    { value: "SUV", label: "SUV" },
    { value: "Berline", label: "Berline" },
    { value: "Citadine", label: "Citadine" },
    { value: "Pick-up", label: "Pick-up" },
    { value: "Premium", label: "Premium" },
    { value: "Utilitaire", label: "Utilitaire" },
  ];

  const getStatutLabel = (value: VehiculeStatut | "all") => {
    return statutOptions.find(opt => opt.value === value)?.label || value;
  };

  const getCategorieLabel = (value: VehiculeCategorie | "all") => {
    return categorieOptions.find(opt => opt.value === value)?.label || value;
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher un véhicule..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="size-4" />
              Statut
              {statutFilter !== "all" && (
                <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                  1
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Filtrer par statut</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statutOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onStatutFilterChange(option.value)}
                className={statutFilter === option.value ? "bg-accent" : ""}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="size-4" />
              Catégorie
              {categorieFilter !== "all" && (
                <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                  1
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Filtrer par catégorie</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categorieOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onCategorieFilterChange(option.value)}
                className={categorieFilter === option.value ? "bg-accent" : ""}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="size-4" />
              Agence
              {agenceFilter !== "all" && (
                <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                  1
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Filtrer par agence</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onAgenceFilterChange("all")}
              className={agenceFilter === "all" ? "bg-accent" : ""}
            >
              Toutes les agences
            </DropdownMenuItem>
            {agences.map((agence) => (
              <DropdownMenuItem
                key={agence}
                onClick={() => onAgenceFilterChange(agence)}
                className={agenceFilter === agence ? "bg-accent" : ""}
              >
                {agence}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="size-4" />
              Prix
              {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                  1
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-80 p-4">
            <DropdownMenuLabel className="pb-3">Filtrer par prix journalier</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Min: {priceRange[0].toLocaleString()} FCFA</span>
                <span>Max: {priceRange[1].toLocaleString()} FCFA</span>
              </div>
              <Slider
                value={priceRange}
                onValueChange={(value: number[]) => onPriceRangeChange(value as [number, number])}
                max={maxPrice}
                min={0}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 FCFA</span>
                <span>{maxPrice.toLocaleString()} FCFA</span>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            onClick={onClearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Tout effacer
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {activeFiltersCount > 0 && (
          <span>{activeFiltersCount} filtre{activeFiltersCount > 1 ? "s" : ""} actif{activeFiltersCount > 1 ? "s" : ""}</span>
        )}
      </div>
    </div>
  );
}
