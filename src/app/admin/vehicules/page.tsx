"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { DataTable } from "@/shared/common/data-table";
import { columns } from "./columns";
import { VEHICULES_MOCK, VEHICULES_STATS_DATA as STATS_DATA } from "@/core/data/mock/vehicules";
import type { Vehicule, VehiculeStatut, VehiculeCategorie } from "@/core/types/vehicule";
import { StatBar, Filters, AddVehiculeModal } from "./components";

export default function VehiculesPage() {
  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [statutFilter, setStatutFilter] = useState<VehiculeStatut | "all">("all");
  const [categorieFilter, setCategorieFilter] = useState<VehiculeCategorie | "all">("all");
  const [agenceFilter, setAgenceFilter] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  // Get unique agences and max price from mock data
  const { agences, maxPrice } = useMemo(() => {
    const uniqueAgences = Array.from(new Set(VEHICULES_MOCK.map(v => v.agence)));
    const maxVehiclePrice = Math.max(...VEHICULES_MOCK.map(v => v.prixJour));
    return {
      agences: uniqueAgences.sort(),
      maxPrice: Math.ceil(maxVehiclePrice / 10000) * 10000 // Round up to nearest 10k
    };
  }, []);

  // Update price range max when maxPrice is calculated
  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  // Filter vehicles
  const filteredVehicles = useMemo(() => {
    return VEHICULES_MOCK.filter((vehicle) => {
      const matchesSearch = searchTerm === "" || 
        vehicle.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.modele.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.immatriculation.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatut = statutFilter === "all" || vehicle.statut === statutFilter;
      const matchesCategorie = categorieFilter === "all" || vehicle.categorie === categorieFilter;
      const matchesAgence = agenceFilter === "all" || vehicle.agence === agenceFilter;
      const matchesPrice = vehicle.prixJour >= priceRange[0] && vehicle.prixJour <= priceRange[1];

      return matchesSearch && matchesStatut && matchesCategorie && matchesAgence && matchesPrice;
    });
  }, [searchTerm, statutFilter, categorieFilter, agenceFilter, priceRange]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (statutFilter !== "all") count++;
    if (categorieFilter !== "all") count++;
    if (agenceFilter !== "all") count++;
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++;
    return count;
  }, [searchTerm, statutFilter, categorieFilter, agenceFilter, priceRange, maxPrice]);

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setStatutFilter("all");
    setCategorieFilter("all");
    setAgenceFilter("all");
    setPriceRange([0, maxPrice]);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Gestion des Véhicules
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gérez la flotte complète de véhicules AutoLoc CI.
          </p>
        </div>
        <AddVehiculeModal />
      </div>

      {/* Stats bar */}
      <StatBar />

      {/* Filters */}
      

      {/* Data table */}
      <DataTable 
        columns={columns} 
        data={filteredVehicles}
        enablePagination={true}
        enableSorting={true}
        rowSelectable={true}
        toolbar={(table) => (
          <Filters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statutFilter={statutFilter}
            onStatutFilterChange={setStatutFilter}
            categorieFilter={categorieFilter}
            onCategorieFilterChange={setCategorieFilter}
            agenceFilter={agenceFilter}
            onAgenceFilterChange={setAgenceFilter}
            agences={agences}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            maxPrice={maxPrice}
            activeFiltersCount={activeFiltersCount}
            onClearAllFilters={clearAllFilters}
          />
        )}
      />
    </div>
  );
}
