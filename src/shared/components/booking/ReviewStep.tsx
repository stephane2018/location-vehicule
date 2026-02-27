"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Vehicle } from "@/core/utils/vehicleData";
import {
  User,
  CreditCard,
  FileText,
  Plane,
  Check,
  Shield,
} from "lucide-react";

interface ReviewStepProps {
  vehicle: Vehicle;
  protectionPackage: string;
  addOns: Record<string, { enabled: boolean; quantity: number }>;
  onBack: () => void;
  onSubmit?: () => void;
}

const PAYMENT_METHODS = [
  { id: "orange", name: "Orange Money", color: "bg-orange-500" },
  { id: "mtn", name: "MTN MoMo", color: "bg-yellow-500" },
  { id: "moov", name: "Moov Money", color: "bg-blue-500" },
  { id: "wave", name: "Wave", color: "bg-cyan-500" },
  { id: "card", name: "Carte bancaire", color: "bg-gray-700" },
];

export default function ReviewStep({
  vehicle,
  protectionPackage,
  addOns,
  onBack,
}: ReviewStepProps) {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    flightNumber: "",
    invoiceCompany: "",
    invoiceAddress: "",
    invoiceCity: "",
    invoicePostal: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // TODO: Implement booking submission
    console.log("Booking submitted:", {
      vehicle,
      protectionPackage,
      addOns,
      payment: selectedPayment,
      formData,
    });
    alert("Réservation confirmée ! (en développement)");
  };

  return (
    <div className="space-y-6">
      {/* Driver Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Informations du conducteur
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom *</Label>
            <Input
              id="firstName"
              placeholder="Jean"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Nom *</Label>
            <Input
              id="lastName"
              placeholder="Kouassi"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="jean.kouassi@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+225 07 XX XX XX XX"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="licenseNumber">N° Permis de conduire *</Label>
            <Input
              id="licenseNumber"
              placeholder="CI-AB-1234-5678"
              value={formData.licenseNumber}
              onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      {/* Flight Number (Optional) */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Plane className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Numéro de vol (optionnel)
          </h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="flightNumber">Numéro de vol</Label>
          <Input
            id="flightNumber"
            placeholder="Ex: AF703"
            value={formData.flightNumber}
            onChange={(e) => handleInputChange("flightNumber", e.target.value)}
          />
          <p className="text-xs text-gray-500">
            Si vous arrivez par avion, indiquez votre numéro de vol pour que nous
            puissions suivre votre arrivée
          </p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Moyen de paiement</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelectedPayment(method.id)}
              className={`relative flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                selectedPayment === method.id
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-gray-200 hover:border-primary/50"
              }`}
            >
              <div className={`w-4 h-4 rounded-full ${method.color}`} />
              <span className="text-sm font-medium">{method.name}</span>
              {selectedPayment === method.id && (
                <div className="absolute top-2 right-2">
                  <Check className="w-4 h-4 text-primary" />
                </div>
              )}
            </button>
          ))}
        </div>

        {selectedPayment && (
          <div className="space-y-2">
            <Label htmlFor="paymentPhone">Numéro de paiement</Label>
            <Input
              id="paymentPhone"
              type="tel"
              placeholder="+225 07 XX XX XX XX"
              required
            />
          </div>
        )}
      </div>

      {/* Invoice Information */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">
              Informations de facturation
            </h3>
            <p className="text-sm text-gray-600">Optionnel - pour une facture d'entreprise</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="invoiceCompany">Nom de l'entreprise</Label>
            <Input
              id="invoiceCompany"
              placeholder="Nom de votre entreprise"
              value={formData.invoiceCompany}
              onChange={(e) => handleInputChange("invoiceCompany", e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="invoiceAddress">Adresse</Label>
            <Input
              id="invoiceAddress"
              placeholder="Adresse de facturation"
              value={formData.invoiceAddress}
              onChange={(e) => handleInputChange("invoiceAddress", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="invoiceCity">Ville</Label>
            <Input
              id="invoiceCity"
              placeholder="Abidjan"
              value={formData.invoiceCity}
              onChange={(e) => handleInputChange("invoiceCity", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="invoicePostal">Code postal</Label>
            <Input
              id="invoicePostal"
              placeholder="Code postal"
              value={formData.invoicePostal}
              onChange={(e) => handleInputChange("invoicePostal", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Récapitulatif de la réservation
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-700">Véhicule</span>
            <span className="font-semibold">{vehicle.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">Tarif journalier</span>
            <span className="font-semibold">
              {vehicle.pricePerDay.toLocaleString("fr-FR")} FCFA
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-700">Protection</span>
            <span className="font-semibold">
              {protectionPackage === "no-extra"
                ? "Inclus"
                : protectionPackage.toUpperCase()}
            </span>
          </div>

          {Object.keys(addOns).filter((key) => addOns[key].enabled).length > 0 && (
            <>
              <div className="border-t border-gray-300 pt-2 mt-2">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Services additionnels:
                </p>
                {Object.keys(addOns)
                  .filter((key) => addOns[key].enabled)
                  .map((key) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {key} (x{addOns[key].quantity})
                      </span>
                    </div>
                  ))}
              </div>
            </>
          )}

          <div className="border-t-2 border-primary/30 pt-3 mt-3">
            <div className="flex justify-between items-baseline">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <div className="text-right">
                <span className="text-3xl font-bold text-primary">
                  {vehicle.pricePerDay.toLocaleString("fr-FR")} FCFA
                </span>
                <p className="text-xs text-gray-600 mt-1">par jour</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
        <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-green-900">
          <p className="font-semibold mb-1">Paiement sécurisé</p>
          <p>
            Vos données sont protégées par un chiffrement SSL. Annulation
            gratuite jusqu'à 48h avant la prise en charge.
          </p>
        </div>
      </div>
    </div>
  );
}
