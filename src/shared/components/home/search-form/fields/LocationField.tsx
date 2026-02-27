"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  MapPin,
  X,
  Building2,
  Navigation,
  Car,
  Phone,
  ChevronRight,
  Search,
} from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { AGENCES_MOCK } from "@/core/data/mock/agences";
import type { Agence } from "@/core/types/agence";

interface LocationFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Group agencies by city
const CITIES = Array.from(new Set(AGENCES_MOCK.map((a) => a.ville)));

const CITY_META: Record<string, { icon: typeof Building2; tagline: string }> = {
  Abidjan: {
    icon: Building2,
    tagline: "Capitale economique",
  },
  Yamoussoukro: {
    icon: Navigation,
    tagline: "Capitale politique",
  },
  "Bouaké": {
    icon: Navigation,
    tagline: "Carrefour du centre",
  },
  "San Pedro": {
    icon: Navigation,
    tagline: "Ville portuaire",
  },
};

export function LocationField({
  label,
  value,
  onChange,
  placeholder = "Ville ou agence",
}: LocationFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeAgence, setActiveAgence] = useState<Agence | null>(null);
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
    setSearch("");
    // Default active to first agency
    if (!activeAgence) {
      setActiveAgence(AGENCES_MOCK[0]);
    }
  }, [activeAgence]);

  const handleSelect = useCallback(
    (agence: Agence) => {
      onChange(`${agence.nom} - ${agence.ville}`);
      setIsOpen(false);
      setActiveAgence(null);
    },
    [onChange]
  );

  // Filter agencies by search
  const filteredByCity = CITIES.map((city) => ({
    city,
    agencies: AGENCES_MOCK.filter(
      (a) =>
        a.ville === city &&
        (search === "" ||
          a.nom.toLowerCase().includes(search.toLowerCase()) ||
          a.ville.toLowerCase().includes(search.toLowerCase()) ||
          a.adresse.toLowerCase().includes(search.toLowerCase()))
    ),
  })).filter((group) => group.agencies.length > 0);

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
        <div className="absolute top-full left-0 mt-2 z-50 w-[680px] max-w-[95vw] bg-card rounded-xl border border-border shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Search bar */}
          <div className="p-3 border-b border-border/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une ville ou agence..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                autoFocus
              />
            </div>
          </div>

          <div className="flex min-h-[340px] max-h-[420px]">
            {/* Left: Location list */}
            <div className="w-[280px] border-r border-border/50 overflow-y-auto">
              {filteredByCity.length === 0 ? (
                <div className="p-6 text-center text-sm text-muted-foreground">
                  Aucun resultat pour &quot;{search}&quot;
                </div>
              ) : (
                filteredByCity.map(({ city, agencies }) => {
                  const meta = CITY_META[city];
                  const CityIcon = meta?.icon || MapPin;
                  return (
                    <div key={city}>
                      {/* City header */}
                      <div className="px-4 pt-3 pb-1 flex items-center gap-2">
                        <CityIcon className="size-3.5 text-muted-foreground/60" />
                        <span className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
                          {city}
                        </span>
                        {meta && (
                          <span className="text-[10px] text-muted-foreground/40 ml-auto">
                            {meta.tagline}
                          </span>
                        )}
                      </div>

                      {/* Agencies */}
                      {agencies.map((agence) => {
                        const isActive = activeAgence?.id === agence.id;
                        return (
                          <button
                            key={agence.id}
                            type="button"
                            onClick={() => handleSelect(agence)}
                            onMouseEnter={() => setActiveAgence(agence)}
                            className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors cursor-pointer group ${
                              isActive
                                ? "bg-primary/5 border-l-2 border-l-primary"
                                : "hover:bg-muted/50 border-l-2 border-l-transparent"
                            }`}
                          >
                            <div
                              className={`mt-0.5 shrink-0 size-8 rounded-lg flex items-center justify-center ${
                                isActive
                                  ? "bg-primary/10 text-primary"
                                  : "bg-muted text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary"
                              }`}
                            >
                              <MapPin className="size-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div
                                className={`text-sm font-medium truncate ${
                                  isActive ? "text-primary" : "text-foreground"
                                }`}
                              >
                                {agence.nom}
                              </div>
                              <div className="text-xs text-muted-foreground truncate mt-0.5">
                                {agence.adresse}
                              </div>
                            </div>
                            <ChevronRight
                              className={`size-4 mt-1 shrink-0 transition-colors ${
                                isActive
                                  ? "text-primary/70"
                                  : "text-muted-foreground/40 group-hover:text-muted-foreground"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Right: Location details */}
            <div className="flex-1 overflow-y-auto">
              {activeAgence ? (
                <div className="h-full flex flex-col">
                  {/* Agency image */}
                  <div className="relative h-[160px] overflow-hidden">
                    <img
                      src={activeAgence.image}
                      alt={activeAgence.nom}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="text-white font-semibold text-base">
                        {activeAgence.nom}
                      </h3>
                      <p className="text-white/80 text-xs mt-0.5">
                        {activeAgence.ville}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 flex-1 space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {activeAgence.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="size-3.5 text-primary/60 mt-0.5 shrink-0" />
                        <span className="text-xs text-muted-foreground">
                          {activeAgence.adresse}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="size-3.5 text-primary/60 shrink-0" />
                        <span className="text-xs text-muted-foreground">
                          {activeAgence.telephone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Car className="size-3.5 text-primary/60 shrink-0" />
                        <span className="text-xs text-muted-foreground">
                          {activeAgence.vehiculesDisponibles} vehicules
                          disponibles sur {activeAgence.nombreVehicules}
                        </span>
                      </div>
                    </div>

                    {/* Select button */}
                    <button
                      type="button"
                      onClick={() => handleSelect(activeAgence)}
                      className="w-full mt-2 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-lg transition-colors"
                    >
                      Choisir cette agence
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground p-6 text-center">
                  <div>
                    <MapPin className="size-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p>Survolez une agence pour voir les details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
