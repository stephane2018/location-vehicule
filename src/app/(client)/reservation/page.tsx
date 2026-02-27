"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Stepper from "@/shared/components/booking/Stepper";
import ProtectionStep from "@/shared/components/booking/ProtectionStep";
import AddOnsStep from "@/shared/components/booking/AddOnsStep";
import ReviewStep from "@/shared/components/booking/ReviewStep";
import BookingSummaryCard from "@/shared/components/booking/BookingSummaryCard";
import { VEHICLES } from "@/core/utils/vehicleData";

function ReservationContent() {
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get("vehicleId");

  const [currentStep, setCurrentStep] = useState(1);
  const [protectionPackage, setProtectionPackage] = useState<string>("no-extra");
  const [addOns, setAddOns] = useState<Record<string, { enabled: boolean; quantity: number }>>({});

  const vehicle = VEHICLES.find(v => v.id === vehicleId);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-[oklch(0.98_0.01_250)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Véhicule introuvable</h1>
          <p className="text-gray-600">Le véhicule que vous recherchez n'existe pas.</p>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate total price
  const PROTECTION_PACKAGES = [
    { id: "no-extra", price: 0 },
    { id: "basic", price: 5000 },
    { id: "smart", price: 10000 },
    { id: "all-inclusive", price: 15000 },
  ];

  const ADD_ONS_DATA = {
    "gps": { name: "GPS", price: 2000 },
    "child-seat": { name: "Siège enfant", price: 1500 },
    "wifi": { name: "Wi-Fi embarqué", price: 3000 },
    "additional-driver": { name: "Conducteur supplémentaire", price: 5000 },
    "fuel-prepay": { name: "Plein d'essence prépayé", price: 25000 },
    "premium-insurance": { name: "Assurance premium", price: 8000 },
  } as const;

  const protectionPrice = PROTECTION_PACKAGES.find(p => p.id === protectionPackage)?.price || 0;

  // Get selected add-ons with details
  const selectedAddOns = Object.keys(addOns)
    .filter(key => addOns[key]?.enabled)
    .map(key => ({
      id: key,
      name: ADD_ONS_DATA[key as keyof typeof ADD_ONS_DATA]?.name || key,
      price: ADD_ONS_DATA[key as keyof typeof ADD_ONS_DATA]?.price || 0,
      quantity: addOns[key].quantity || 1,
    }));

  const addOnsPrice = selectedAddOns.reduce((total, addon) => {
    return total + (addon.price * addon.quantity);
  }, 0);

  const totalPrice = vehicle.pricePerDay + protectionPrice + addOnsPrice;

  const getNextLabel = () => {
    if (currentStep === 3) return "Confirmer et payer";
    return "Continue";
  };

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.01_250)]">
      {/* Sticky Stepper */}
      <Stepper
        currentStep={currentStep}
        onBack={currentStep > 1 ? handleBack : undefined}
        onNext={handleNext}
        totalPrice={totalPrice}
        nextLabel={getNextLabel()}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Booking Summary Card - Only visible on last step */}
        {currentStep === 3 && (
          <BookingSummaryCard
            vehicle={vehicle}
            currentStep={currentStep}
            protectionPackage={protectionPackage}
            protectionPrice={protectionPrice}
            selectedAddOns={selectedAddOns}
            addOnsPrice={addOnsPrice}
            totalPrice={totalPrice}
            defaultExpanded={true}
          />
        )}

        {/* Step Content */}
        {currentStep === 1 && (
          <ProtectionStep
            selectedPackage={protectionPackage}
            onSelectPackage={setProtectionPackage}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <AddOnsStep
            addOns={addOns}
            onUpdateAddOns={setAddOns}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <ReviewStep
            vehicle={vehicle}
            protectionPackage={protectionPackage}
            addOns={addOns}
            onBack={handleBack}
            onSubmit={() => {
              // Will be triggered from stepper
              console.log("Submitting from Stepper");
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function ReservationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[oklch(0.98_0.01_250)] flex items-center justify-center">Chargement...</div>}>
      <ReservationContent />
    </Suspense>
  );
}
