"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Car, Settings2, Battery, Flame, ChevronDown } from "lucide-react";
import VehicleCard from "@/shared/components/Layout/VehicleCard";
import VehicleDetailModal from "@/shared/components/modals/VehicleDetailModal";
import { VEHICLES, type Vehicle } from "@/core/utils/vehicleData";

// Filtrer les véhicules disponibles
const VEHICULES_DISPONIBLES = VEHICLES.filter(v => v.status === "disponible");

function RechercheContent() {
  const searchParams = useSearchParams();
  const [vehicules, setVehicules] = useState(VEHICULES_DISPONIBLES);
  const [filtresActifs, setFiltresActifs] = useState({
    popular: false,
    automatic: false,
    diesel: false,
  });
  const [tri, setTri] = useState("recommended");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [selectedVehicule, setSelectedVehicule] = useState<Vehicle | null>(null);

  // Récupérer les paramètres de recherche
  useEffect(() => {
    const pickup = searchParams.get("pickup");
    const returnLoc = searchParams.get("return");
    const pickupDate = searchParams.get("pickupDate");
    const returnDate = searchParams.get("returnDate");

    console.log("Paramètres de recherche:", {
      pickup,
      returnLoc,
      pickupDate,
      returnDate,
    });
  }, [searchParams]);

  const appliquerFiltres = () => {
    let filtres = [...VEHICULES_DISPONIBLES];

    if (filtresActifs.popular) {
      filtres = filtres.filter(v => v.popular);
    }

    if (filtresActifs.automatic) {
      filtres = filtres.filter(v => v.transmission === "Automatique");
    }

    if (filtresActifs.diesel) {
      filtres = filtres.filter(v => v.carburant === "Diesel");
    }

    // Tri
    switch (tri) {
      case "lowestPrice":
        filtres.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case "highestPrice":
        filtres.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case "recommended":
      default:
        // Garder l'ordre par défaut
        break;
    }

    setVehicules(filtres);
  };

  useEffect(() => {
    appliquerFiltres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtresActifs, tri]);

  const toggleFiltre = (filtre: keyof typeof filtresActifs) => {
    setFiltresActifs(prev => ({
      ...prev,
      [filtre]: !prev[filtre]
    }));
  };

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.01_250)]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight">
            WHICH CAR DO YOU WANT TO DRIVE?
          </h1>
        </div>
      </div>

      {/* Filtres et tri */}
      <div className="border-b bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Tri dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 ${
                  tri !== "recommended"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-primary border-2 border-primary"
                }`}
              >
                <span className="text-lg">↑↓</span>
                {tri === "recommended" && "Recommended"}
                {tri === "lowestPrice" && "Lowest price"}
                {tri === "highestPrice" && "Highest price"}
                <ChevronDown className="size-4" />
              </button>

              {showSortMenu && (
                <div className="absolute top-full left-0 mt-2 bg-white border-2 border-primary rounded-lg shadow-lg min-w-[200px] z-50">
                  <button
                    onClick={() => {
                      setTri("recommended");
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 font-medium text-sm ${
                      tri === "recommended" ? "text-primary" : ""
                    }`}
                  >
                    Recommended
                  </button>
                  <button
                    onClick={() => {
                      setTri("lowestPrice");
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 font-medium text-sm ${
                      tri === "lowestPrice" ? "text-primary" : ""
                    }`}
                  >
                    Lowest price
                  </button>
                  <button
                    onClick={() => {
                      setTri("highestPrice");
                      setShowSortMenu(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 font-medium text-sm ${
                      tri === "highestPrice" ? "text-primary" : ""
                    }`}
                  >
                    Highest price
                  </button>
                  <button
                    onClick={() => setShowSortMenu(false)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 font-medium text-sm border-t"
                  >
                    Electric vehicles
                  </button>
                </div>
              )}
            </div>

            {/* Bouton Filters */}
            <button className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm transition-all hover:bg-primary/90 flex items-center gap-2">
              <Settings2 className="size-4" />
              Filters
            </button>

            {/* Popular */}
            <button
              onClick={() => toggleFiltre("popular")}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 ${
                filtresActifs.popular
                  ? "bg-orange-500 text-white border-2 border-orange-600"
                  : "bg-white text-black border-2 border-gray-300 hover:border-orange-500"
              }`}
            >
              <Flame className="size-4" />
              Populaire
            </button>

            {/* Automatic */}
            <button
              onClick={() => toggleFiltre("automatic")}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 ${
                filtresActifs.automatic
                  ? "bg-primary text-primary-foreground"
                  : "bg-white text-primary border-2 border-gray-300 hover:border-primary"
              }`}
            >
              <Settings2 className="size-4" />
              Automatique
            </button>

            {/* Diesel */}
            <button
              onClick={() => toggleFiltre("diesel")}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 ${
                filtresActifs.diesel
                  ? "bg-primary text-primary-foreground"
                  : "bg-white text-primary border-2 border-gray-300 hover:border-primary"
              }`}
            >
              <Battery className="size-4" />
              Diesel
            </button>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicules.map((vehicule) => (
            <VehicleCard
              key={vehicule.id}
              vehicle={vehicule}
              onViewDetails={() => setSelectedVehicule(vehicule)}
              onReserve={() => setSelectedVehicule(vehicule)}
            />
          ))}
        </div>

        {vehicules.length === 0 && (
          <div className="text-center py-12">
            <Car className="size-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun véhicule trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos filtres ou votre recherche
            </p>
          </div>
        )}
      </div>

      {/* Modal de détails */}
      <VehicleDetailModal
        vehicle={selectedVehicule!}
        isOpen={selectedVehicule !== null}
        onClose={() => setSelectedVehicule(null)}
      />
    </div>
  );
}

export default function RecherchePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[oklch(0.98_0.01_250)] flex items-center justify-center">Chargement...</div>}>
      <RechercheContent />
    </Suspense>
  );
}
