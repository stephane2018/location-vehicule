"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Switch } from "@/shared/components/ui/switch";
import {
  Baby,
  Navigation,
  Wifi,
  Users,
  Fuel,
  Shield,
  Info,
  Plus,
  Minus,
  X,
} from "lucide-react";

interface AddOnsStepProps {
  addOns: Record<string, { enabled: boolean; quantity: number }>;
  onUpdateAddOns: (addOns: Record<string, { enabled: boolean; quantity: number }>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ADD_ONS = [
  {
    id: "gps",
    name: "GPS",
    icon: Navigation,
    price: 2000,
    unit: "jour",
    description: "Système de navigation GPS avec cartes à jour",
    details:
      "GPS TomTom ou Garmin avec cartes de la Côte d'Ivoire et pays voisins. Mises à jour régulières incluses.",
    maxQuantity: 2,
  },
  {
    id: "child-seat",
    name: "Siège enfant",
    icon: Baby,
    price: 1500,
    unit: "jour",
    description: "Siège auto homologué pour enfants",
    details:
      "Sièges homologués selon normes européennes. Disponibles en 3 tailles : bébé (0-13kg), enfant (9-18kg), rehausseur (15-36kg). Précisez l'âge de l'enfant lors de la prise en charge.",
    maxQuantity: 3,
  },
  {
    id: "wifi",
    name: "Wi-Fi embarqué",
    icon: Wifi,
    price: 3000,
    unit: "jour",
    description: "Hotspot Wi-Fi 4G illimité",
    details:
      "Routeur 4G permettant de connecter jusqu'à 5 appareils simultanément. Données illimitées avec débit réduit après 20GB/jour.",
    maxQuantity: 1,
  },
  {
    id: "additional-driver",
    name: "Conducteur supplémentaire",
    icon: Users,
    price: 5000,
    unit: "location",
    description: "Ajouter un conducteur additionnel",
    details:
      "Le conducteur supplémentaire doit avoir plus de 23 ans, posséder un permis valide depuis plus de 2 ans et présenter une pièce d'identité.",
    maxQuantity: 2,
  },
  {
    id: "fuel-prepay",
    name: "Plein d'essence prépayé",
    icon: Fuel,
    price: 25000,
    unit: "plein",
    description: "Retour sans refaire le plein",
    details:
      "Payez le plein à l'avance au tarif actuel du carburant. Retournez le véhicule sans avoir à passer à la station. Non remboursable.",
    maxQuantity: 1,
  },
  {
    id: "premium-insurance",
    name: "Assurance premium",
    icon: Shield,
    price: 8000,
    unit: "jour",
    description: "Couverture tous risques étendue",
    details:
      "Extension de garantie couvrant le vol, le bris de glace, les dommages aux pneus, l'assistance panne 0km et le véhicule de remplacement sous 2h.",
    maxQuantity: 1,
  },
];

export default function AddOnsStep({
  addOns,
  onUpdateAddOns,
  onNext,
  onBack,
}: AddOnsStepProps) {
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const toggleAddOn = (id: string) => {
    const newAddOns = { ...addOns };
    if (newAddOns[id]) {
      newAddOns[id] = {
        ...newAddOns[id],
        enabled: !newAddOns[id].enabled,
      };
    } else {
      newAddOns[id] = { enabled: true, quantity: 1 };
    }
    onUpdateAddOns(newAddOns);
  };

  const updateQuantity = (id: string, delta: number) => {
    const addOn = ADD_ONS.find((a) => a.id === id);
    if (!addOn) return;

    const currentQuantity = addOns[id]?.quantity || 1;
    const newQuantity = Math.max(1, Math.min(addOn.maxQuantity, currentQuantity + delta));

    onUpdateAddOns({
      ...addOns,
      [id]: {
        enabled: addOns[id]?.enabled || false,
        quantity: newQuantity,
      },
    });
  };

  const totalAddOnsPrice = ADD_ONS.reduce((total, addOn) => {
    if (addOns[addOn.id]?.enabled) {
      return total + addOn.price * (addOns[addOn.id].quantity || 1);
    }
    return total;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Add-ons List */}
      <div className="space-y-4">
        {ADD_ONS.map((addOn) => {
          const Icon = addOn.icon;
          const isEnabled = addOns[addOn.id]?.enabled || false;
          const quantity = addOns[addOn.id]?.quantity || 1;

          return (
            <div
              key={addOn.id}
              className={`bg-white rounded-lg border-2 p-4 transition-all ${
                isEnabled
                  ? "border-primary shadow-md"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                    isEnabled ? "bg-primary/10" : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isEnabled ? "text-primary" : "text-gray-500"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {addOn.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {addOn.description}
                      </p>
                    </div>

                    {/* Toggle Switch */}
                    <Switch
                      checked={isEnabled}
                      onCheckedChange={() => toggleAddOn(addOn.id)}
                      className="flex-shrink-0"
                    />
                  </div>

                  {/* Price and Details Button */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-primary">
                        {addOn.price.toLocaleString("fr-FR")} FCFA
                      </span>
                      <span className="text-sm text-gray-600">/ {addOn.unit}</span>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setShowDetails(showDetails === addOn.id ? null : addOn.id)
                      }
                      className="text-primary hover:text-primary/80"
                    >
                      <Info className="w-4 h-4 mr-1" />
                      Détails
                    </Button>
                  </div>

                  {/* Quantity Controls (only when enabled) */}
                  {isEnabled && addOn.maxQuantity > 1 && (
                    <div className="mt-4 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">
                        Quantité:
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(addOn.id, -1)}
                          disabled={quantity <= 1}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(addOn.id, 1)}
                          disabled={quantity >= addOn.maxQuantity}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {quantity === addOn.maxQuantity && (
                        <Badge variant="secondary" className="text-xs">
                          Maximum
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Details Panel */}
                  {showDetails === addOn.id && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-900">
                          <p className="font-semibold mb-1">
                            Informations détaillées
                          </p>
                          <p>{addOn.details}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal (alternative overlay approach) */}
      {showDetails && (
        <div
          className="fixed inset-0 bg-black/20 z-50 flex items-end sm:items-center justify-center"
          onClick={() => setShowDetails(null)}
        >
          <div
            className="bg-white rounded-t-2xl sm:rounded-2xl max-w-lg w-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {ADD_ONS.find((a) => a.id === showDetails)?.name}
              </h3>
              <button
                onClick={() => setShowDetails(null)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-700">
              {ADD_ONS.find((a) => a.id === showDetails)?.details}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
