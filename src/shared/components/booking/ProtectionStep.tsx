"use client";

import ProtectionCard from "./ProtectionCard";

interface ProtectionStepProps {
  selectedPackage: string;
  onSelectPackage: (packageId: string) => void;
  onNext: () => void;
}

const FEATURE_TOOLTIPS: Record<string, string> = {
  collision: "Profitez de la tranquillité d'esprit en sachant que vous êtes protégé contre les coûts élevés en cas de vol ou de dommages à votre véhicule. Au lieu de payer jusqu'à la valeur totale du véhicule, vous n'aurez qu'à couvrir le montant de la franchise spécifiée.",
  tires: "SIXT assume la responsabilité pour toute vitre et pneu endommagés.",
  interior: "Couverture si l'intérieur du véhicule est endommagé, sale ou en désordre.",
  mobility: "En cas d'erreur auto-causée ou pour prévenir d'autres déplacements, SIXT vous aidera à reprendre la route (réservoir vide ou batterie, clé verrouillée à l'intérieur).",
};

const PROTECTION_PACKAGES = [
  {
    id: "no-extra",
    name: "No extra protection",
    price: 0,
    stars: 0,
    discount: null,
    deductible: "Franchise: jusqu'à la valeur totale du véhicule",
    deductibleColor: "text-red-600",
    features: [
      { text: "Waiver pour dommages de collision, rayures, bosses et vol", included: false, tooltip: "collision" },
      { text: "Protection pneus et pare-brise", included: false, tooltip: "tires" },
      { text: "Protection intérieure", included: false, tooltip: "interior" },
      { text: "Service de mobilité", included: false, tooltip: "mobility" },
    ],
  },
  {
    id: "basic",
    name: "Basic Protection",
    price: 5000,
    pricePerDay: "5 000",
    stars: 1,
    discount: null,
    deductible: "Franchise: jusqu'à 300 000 FCFA",
    deductibleColor: "text-gray-900",
    features: [
      { text: "Waiver pour dommages de collision, rayures, bosses et vol", included: true, tooltip: "collision" },
      { text: "Protection pneus et pare-brise", included: false, tooltip: "tires" },
      { text: "Protection intérieure", included: false, tooltip: "interior" },
      { text: "Service de mobilité", included: false, tooltip: "mobility" },
    ],
  },
  {
    id: "smart",
    name: "Smart Protection",
    price: 10000,
    pricePerDay: "10 000",
    originalPrice: "35 714",
    stars: 2,
    discount: "-72% réduction en ligne",
    deductible: "Pas de franchise",
    deductibleColor: "text-green-600",
    features: [
      { text: "Waiver pour dommages de collision, rayures, bosses et vol", included: true, tooltip: "collision" },
      { text: "Protection pneus et pare-brise", included: true, tooltip: "tires" },
      { text: "Protection intérieure", included: false, tooltip: "interior" },
      { text: "Service de mobilité", included: false, tooltip: "mobility" },
    ],
    popular: true,
  },
  {
    id: "all-inclusive",
    name: "All Inclusive Protection",
    price: 15000,
    pricePerDay: "15 000",
    originalPrice: "26 786",
    stars: 3,
    discount: "-44% réduction en ligne",
    deductible: "Pas de franchise",
    deductibleColor: "text-green-600",
    features: [
      { text: "Waiver pour dommages de collision, rayures, bosses et vol", included: true, tooltip: "collision" },
      { text: "Protection pneus et pare-brise", included: true, tooltip: "tires" },
      { text: "Protection intérieure", included: true, tooltip: "interior" },
      { text: "Service de mobilité", included: true, tooltip: "mobility" },
    ],
  },
];

export default function ProtectionStep({
  selectedPackage,
  onSelectPackage,
  onNext,
}: ProtectionStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {PROTECTION_PACKAGES.map((pkg) => (
          <ProtectionCard
            key={pkg.id}
            id={pkg.id}
            name={pkg.name}
            price={pkg.price}
            pricePerDay={pkg.pricePerDay}
            originalPrice={pkg.originalPrice}
            stars={pkg.stars}
            discount={pkg.discount}
            deductible={pkg.deductible}
            deductibleColor={pkg.deductibleColor}
            features={pkg.features}
            isSelected={selectedPackage === pkg.id}
            onSelect={() => onSelectPackage(pkg.id)}
            tooltips={FEATURE_TOOLTIPS}
          />
        ))}
      </div>
    </div>
  );
}
