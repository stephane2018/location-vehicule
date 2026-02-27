"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  category: string;
  image: string;
  pricePerDay: number;
}

interface SelectedAddOn {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface BookingSummaryCardProps {
  vehicle: Vehicle;
  currentStep: number;
  protectionPackage: string;
  protectionPrice: number;
  selectedAddOns: SelectedAddOn[];
  addOnsPrice: number;
  totalPrice: number;
  defaultExpanded?: boolean;
}

export default function BookingSummaryCard({
  vehicle,
  currentStep,
  protectionPackage,
  protectionPrice,
  selectedAddOns,
  addOnsPrice,
  totalPrice,
  defaultExpanded = true,
}: BookingSummaryCardProps) {
  const [showSummaryDetails, setShowSummaryDetails] = useState(defaultExpanded);

  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-dashed border-primary/30 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          Récapitulatif de la réservation
        </h3>
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 px-3 py-1 rounded-full">
            <span className="text-xs font-semibold text-primary">
              Étape {currentStep}/3
            </span>
          </div>
          <button
            onClick={() => setShowSummaryDetails(!showSummaryDetails)}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
            aria-label={
              showSummaryDetails ? "Masquer les détails" : "Afficher les détails"
            }
          >
            {showSummaryDetails ? (
              <ChevronUp className="w-5 h-5 text-primary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {showSummaryDetails && (
        <>
          {/* Vehicle Info */}
          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-base text-gray-900">
                  {vehicle.name}
                </h4>
                <p className="text-sm text-gray-600">{vehicle.category}</p>
              </div>
              <div className="text-right bg-primary/5 px-3 py-2 rounded-lg">
                <p className="text-base font-bold text-primary">
                  {vehicle.pricePerDay.toLocaleString("fr-FR")}
                </p>
                <p className="text-xs text-gray-600">FCFA/jour</p>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-white rounded-lg p-4 space-y-3 shadow-sm">
            <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm font-medium text-gray-700">
                  Tarif de base
                </span>
              </div>
              <span className="font-bold text-gray-900">
                {vehicle.pricePerDay.toLocaleString("fr-FR")} FCFA
              </span>
            </div>

            {protectionPrice > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Protection{" "}
                    {protectionPackage !== "no-extra" &&
                      `(${protectionPackage})`}
                  </span>
                </div>
                <span className="font-bold text-green-600">
                  +{protectionPrice.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
            )}

            {selectedAddOns.length > 0 && (
              <div className="py-2 border-b border-dashed border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Services additionnels
                    </span>
                  </div>
                  <span className="font-bold text-blue-600">
                    +{addOnsPrice.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>
                {/* List of selected add-ons */}
                <div className="ml-4 space-y-1 mt-2">
                  {selectedAddOns.map((addon) => (
                    <div
                      key={addon.id}
                      className="flex justify-between items-center text-xs"
                    >
                      <span className="text-gray-600">
                        • {addon.name}{" "}
                        {addon.quantity > 1 && `(x${addon.quantity})`}
                      </span>
                      <span className="text-gray-700 font-medium">
                        {(addon.price * addon.quantity).toLocaleString("fr-FR")}{" "}
                        FCFA
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Total */}
            <div className="pt-3 mt-2">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-dashed border-primary/30">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">
                    Total par jour
                  </span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-primary">
                      {totalPrice.toLocaleString("fr-FR")}
                    </span>
                    <span className="text-lg font-semibold text-gray-600 ml-1">
                      FCFA
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Summary when collapsed */}
      {!showSummaryDetails && (
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">
                  {vehicle.name}
                </h4>
                <p className="text-xs text-gray-600">
                  {selectedAddOns.length > 0 &&
                    `${selectedAddOns.length} service(s) • `}
                  {protectionPackage !== "no-extra" &&
                    `Protection ${protectionPackage}`}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-primary">
                {totalPrice.toLocaleString("fr-FR")} FCFA
              </span>
              <p className="text-xs text-gray-500">/ jour</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
