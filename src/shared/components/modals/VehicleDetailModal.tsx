"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Users, Settings2, Battery, CheckCircle2, DoorClosed, Info } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import type { Vehicle } from "@/core/utils/vehicleData";

interface VehicleDetailModalProps {
  vehicle: Vehicle;
  isOpen: boolean;
  onClose: () => void;
}

export default function VehicleDetailModal({ vehicle, isOpen, onClose }: VehicleDetailModalProps) {
  const router = useRouter();
  const [bookingOption, setBookingOption] = useState<"best" | "flexible">("best");
  const [mileageOption, setMileageOption] = useState<"limited" | "unlimited">("limited");

  const handleReserve = () => {
    router.push(`/reservation?vehicleId=${vehicle.id}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-1 sm:p-2">
      <div className="bg-white rounded-lg sm:rounded-xl w-full  sm:max-w-2xl  overflow-hidden shadow-2xl">
        <div className="grid md:grid-cols-5 gap-0 max-h-[98vh]">
          {/* Image du véhicule - gauche (2 colonnes) */}
          <div
            className="relative md:col-span-2 p-2 sm:p-3 flex flex-col items-center justify-center min-h-[180px] sm:min-h-[240px]"
            style={{
              background: `linear-gradient(135deg, ${vehicle.gradientFrom}, ${vehicle.gradientTo})`
            }}
          >
            <div className="text-center mb-2">
              <h2 className="text-sm sm:text-base font-bold text-white mb-0.5">
                {vehicle.name}
              </h2>
              <p className="text-gray-200 text-[10px] sm:text-xs">
                {vehicle.category}
              </p>
            </div>

            <div className="relative w-full mb-2">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Badge Populaire */}
            {vehicle.popular && (
              <Badge className="bg-primary text-white px-1.5 py-0 text-[10px] font-semibold mb-2">
                Populaire
              </Badge>
            )}

            {/* Spécifications */}
            <div className="w-full space-y-1 text-white text-[10px] sm:text-xs">
              <div className="flex items-center gap-1.5">
                <div className="bg-white/20 p-0.5 sm:p-1 rounded">
                  <Users className="size-2.5 sm:size-3" />
                </div>
                <span>{vehicle.seats} Places</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="bg-white/20 p-0.5 sm:p-1 rounded">
                  <Settings2 className="size-2.5 sm:size-3" />
                </div>
                <span>{vehicle.transmission}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="bg-white/20 p-0.5 sm:p-1 rounded">
                  <Battery className="size-2.5 sm:size-3" />
                </div>
                <span>{vehicle.carburant}</span>
              </div>
            </div>
          </div>

          {/* Options de réservation - droite (3 colonnes) */}
          <div className="md:col-span-3 p-2 sm:p-3 relative overflow-y-auto max-h-[calc(98vh-180px)] sm:max-h-[98vh]">
            {/* Bouton fermer */}
            <button
              onClick={onClose}
              className="absolute top-1 right-1 sm:top-2 sm:right-2 p-1 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X className="size-4" />
            </button>

            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-sm sm:text-base font-bold mb-2">Options de réservation</h3>

              {/* Best price */}
              <div
                onClick={() => setBookingOption("best")}
                className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${
                  bookingOption === "best"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <div className="flex items-start gap-1.5 flex-1">
                    <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 ${
                      bookingOption === "best" ? "border-primary" : "border-gray-300"
                    }`}>
                      {bookingOption === "best" && (
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs sm:text-sm mb-0.5">Meilleur prix</div>
                      <p className="text-[10px] sm:text-xs text-gray-600">
                        Paiement maintenant
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-primary whitespace-nowrap">Inclus</span>
                </div>
              </div>

              {/* Stay flexible */}
              <div
                onClick={() => setBookingOption("flexible")}
                className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${
                  bookingOption === "flexible"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <div className="flex items-start gap-1.5 flex-1">
                    <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 mt-0.5 flex items-center justify-center flex-shrink-0 ${
                      bookingOption === "flexible" ? "border-primary" : "border-gray-300"
                    }`}>
                      {bookingOption === "flexible" && (
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-0.5 flex-wrap">
                        <span className="font-semibold text-xs sm:text-sm">Flexibilité max</span>
                        <Badge className="bg-primary/10 text-primary text-[9px] px-1 py-0 border border-primary/20">
                          Top
                        </Badge>
                      </div>
                      <p className="text-[10px] sm:text-xs text-gray-600">
                        Annulation gratuite
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-primary whitespace-nowrap">+ 10k</span>
                </div>
              </div>

              {/* Mileage */}
              <div className="pt-2 sm:pt-3">
                <h3 className="text-sm sm:text-base font-bold mb-2">Kilométrage</h3>

                {/* 250 km */}
                <div
                  onClick={() => setMileageOption("limited")}
                  className={`border-2 rounded-lg p-2 cursor-pointer transition-all mb-2 ${
                    mileageOption === "limited"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex items-start gap-1.5 flex-1">
                      <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                        mileageOption === "limited" ? "border-primary" : "border-gray-300"
                      }`}>
                        {mileageOption === "limited" && (
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs sm:text-sm mb-0.5">250 km / jour</div>
                        <p className="text-[10px] sm:text-xs text-gray-600">
                          + 50 FCFA / km
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-primary whitespace-nowrap">Inclus</span>
                  </div>
                </div>

                {/* Unlimited kilometers */}
                <div
                  onClick={() => setMileageOption("unlimited")}
                  className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${
                    mileageOption === "unlimited"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex items-start gap-1.5 flex-1">
                      <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                        mileageOption === "unlimited" ? "border-primary" : "border-gray-300"
                      }`}>
                        {mileageOption === "unlimited" && (
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs sm:text-sm mb-0.5">Illimité</div>
                        <p className="text-[10px] sm:text-xs text-gray-600">
                          Tous km inclus
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-primary whitespace-nowrap">+ 5k</span>
                  </div>
                </div>
              </div>

              {/* Agences disponibles */}
              <div className="pt-2 sm:pt-3">
                <h3 className="text-sm sm:text-base font-bold mb-2">Agences</h3>
                <div className="flex flex-wrap gap-1">
                  {vehicle.agencies.map((agency) => (
                    <Badge key={agency} variant="outline" className="px-1.5 py-0 text-[10px] sm:text-xs">
                      {agency}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Prix et bouton */}
              <div className="pt-2 sm:pt-3 border-t mt-2">
                <div className="mb-2 sm:mb-3">
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">
                      {vehicle.pricePerDay.toLocaleString('fr-FR')}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-600">FCFA / jour</span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500">
                    {(vehicle.pricePerDay * 7).toLocaleString('fr-FR')} FCFA / 7j
                  </div>
                </div>
                <Button
                  onClick={handleReserve}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm"
                >
                  Réserver
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
