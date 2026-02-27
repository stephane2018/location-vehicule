"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface StepperProps {
  currentStep: number;
  onBack?: () => void;
  onNext?: () => void;
  totalPrice?: number;
  nextLabel?: string;
  canGoNext?: boolean;
}

const STEPS = [
  { number: 1, label: "Quelle protection avez-vous besoin ?" },
  { number: 2, label: "Services" },
  { number: 3, label: "Paiement et révision" },
];

export default function Stepper({
  currentStep,
  onBack,
  onNext,
  totalPrice,
  nextLabel = "Continue",
  canGoNext = true
}: StepperProps) {
  const currentStepInfo = STEPS.find(s => s.number === currentStep);

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Back button and Step title */}
          <div className="flex items-center gap-3">
            {currentStep > 1 && onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Retour"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
            )}
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 uppercase">
                {currentStepInfo?.label}
              </h1>
              <p className="text-xs text-gray-500">
                Étape {currentStep} sur {STEPS.length}
              </p>
            </div>
          </div>

          {/* Right: Price and Continue button */}
          <div className="flex items-center gap-4">
            {totalPrice !== undefined && (
              <div className="hidden sm:block text-right">
                <p className="text-xs text-gray-600">Total:</p>
                <p className="text-lg font-bold text-primary">
                  F {totalPrice.toLocaleString("fr-FR")}
                  <span className="text-xs font-normal text-gray-600">.00</span>
                </p>
              </div>
            )}
            {onNext && (
              <Button
                onClick={onNext}
                disabled={!canGoNext}
                className="bg-primary text-white font-semibold px-6 py-2 rounded-md"
              >
                {nextLabel}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile price display */}
        {totalPrice !== undefined && (
          <div className="sm:hidden mt-2 text-center">
            <span className="text-sm text-gray-600">Total: </span>
            <span className="text-xl font-bold text-primary">
              F {totalPrice.toLocaleString("fr-FR")}
              <span className="text-xs font-normal text-gray-600">.00</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
