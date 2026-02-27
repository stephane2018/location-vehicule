"use client";

import { useState } from "react";
import { MapPin, Calendar, Clock, ArrowRight, Car, Shield, Check, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { AGENCES_MOCK } from "@/core/data/mock/agences";

type Step = 1 | 2 | 3 | 4;

interface SearchFormData {
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  bookingOption: "best_price" | "stay_flexible";
  mileageOption: "limited" | "unlimited";
  protectionPackage: "none" | "basic" | "smart" | "all_inclusive";
}

const PROTECTION_PACKAGES = [
  {
    id: "none",
    name: "No extra protection",
    price: 0,
    deductible: "up to full vehicle value",
    features: [
      { name: "Loss damage waiver for collision", included: false },
      { name: "Tire and Windshield Protection", included: false },
      { name: "Interior Protection", included: false },
      { name: "Mobility service", included: false },
    ],
  },
  {
    id: "basic",
    name: "Basic Protection",
    price: 4110,
    deductible: "up to 3,299,520 FCFA",
    features: [
      { name: "Loss damage waiver for collision", included: true },
      { name: "Tire and Windshield Protection", included: false },
      { name: "Interior Protection", included: false },
      { name: "Mobility service", included: false },
    ],
  },
  {
    id: "smart",
    name: "Smart Protection",
    price: 14450,
    discount: "-78% online discount",
    deductible: "No deductible",
    features: [
      { name: "Loss damage waiver for collision", included: true },
      { name: "Tire and Windshield Protection", included: true },
      { name: "Interior Protection", included: false },
      { name: "Mobility service", included: false },
    ],
  },
  {
    id: "all_inclusive",
    name: "All Inclusive Protection",
    price: 36550,
    discount: "-54% online discount",
    deductible: "No deductible",
    features: [
      { name: "Loss damage waiver for collision", included: true },
      { name: "Tire and Windshield Protection", included: true },
      { name: "Interior Protection", included: true },
      { name: "Mobility service", included: true },
    ],
  },
];

export function SearchSection() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<SearchFormData>({
    pickupLocation: "",
    returnLocation: "",
    pickupDate: "",
    pickupTime: "12:00",
    returnDate: "",
    returnTime: "12:00",
    bookingOption: "best_price",
    mileageOption: "limited",
    protectionPackage: "none",
  });

  const updateFormData = (field: keyof SearchFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const calculateTotal = () => {
    let total = 0;
    
    if (formData.bookingOption === "stay_flexible") {
      total += 5290;
    }
    
    if (formData.mileageOption === "unlimited") {
      total += 2570;
    }
    
    const protection = PROTECTION_PACKAGES.find(p => p.id === formData.protectionPackage);
    if (protection) {
      total += protection.price;
    }
    
    return total;
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="shadow-2xl border-0">
        <CardContent className="p-0">
          {/* Step 1: Location & Dates */}
          {currentStep === 1 && (
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold">Pickup & Return</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pickup Location */}
                <div className="space-y-2">
                  <Label htmlFor="pickup-location" className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    Pickup location
                  </Label>
                  <Select
                    value={formData.pickupLocation}
                    onValueChange={(value) => updateFormData("pickupLocation", value)}
                  >
                    <SelectTrigger id="pickup-location">
                      <SelectValue placeholder="Select pickup location" />
                    </SelectTrigger>
                    <SelectContent>
                      {AGENCES_MOCK.map((agence) => (
                        <SelectItem key={agence.id} value={agence.id}>
                          {agence.nom} - {agence.ville}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Return Location */}
                <div className="space-y-2">
                  <Label htmlFor="return-location" className="flex items-center gap-2">
                    <MapPin className="size-4" />
                    Return location
                  </Label>
                  <Select
                    value={formData.returnLocation}
                    onValueChange={(value) => updateFormData("returnLocation", value)}
                  >
                    <SelectTrigger id="return-location">
                      <SelectValue placeholder="Same as pickup" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same">Same as pickup</SelectItem>
                      {AGENCES_MOCK.map((agence) => (
                        <SelectItem key={agence.id} value={agence.id}>
                          {agence.nom} - {agence.ville}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pickup Date */}
                <div className="space-y-2">
                  <Label htmlFor="pickup-date" className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    Pickup date
                  </Label>
                  <Input
                    id="pickup-date"
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => updateFormData("pickupDate", e.target.value)}
                  />
                </div>

                {/* Pickup Time */}
                <div className="space-y-2">
                  <Label htmlFor="pickup-time" className="flex items-center gap-2">
                    <Clock className="size-4" />
                    Pickup time
                  </Label>
                  <Input
                    id="pickup-time"
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) => updateFormData("pickupTime", e.target.value)}
                  />
                </div>

                {/* Return Date */}
                <div className="space-y-2">
                  <Label htmlFor="return-date" className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    Return date
                  </Label>
                  <Input
                    id="return-date"
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => updateFormData("returnDate", e.target.value)}
                  />
                </div>

                {/* Return Time */}
                <div className="space-y-2">
                  <Label htmlFor="return-time" className="flex items-center gap-2">
                    <Clock className="size-4" />
                    Return time
                  </Label>
                  <Input
                    id="return-time"
                    type="time"
                    value={formData.returnTime}
                    onChange={(e) => updateFormData("returnTime", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={nextStep} size="lg" className="gap-2">
                  Continue
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Booking Options */}
          {currentStep === 2 && (
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold">Booking Options</h3>
              </div>

              {/* Booking Option */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Booking option</Label>
                <RadioGroup
                  value={formData.bookingOption}
                  onValueChange={(value: string) => updateFormData("bookingOption", value as "best_price" | "stay_flexible")}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="best_price" id="best-price" />
                    <Label htmlFor="best-price" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Best price</div>
                      <div className="text-sm text-muted-foreground">
                        Pay now, cancel and rebook for a fee
                      </div>
                    </Label>
                    <Badge variant="outline">Included</Badge>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="stay_flexible" id="stay-flexible" />
                    <Label htmlFor="stay-flexible" className="flex-1 cursor-pointer">
                      <div className="font-semibold flex items-center gap-2">
                        Stay flexible
                        <Badge className="bg-orange-500">Popular</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Pay at pickup, free cancellation and rebooking any time before pickup time
                      </div>
                    </Label>
                    <div className="text-right">
                      <div className="font-semibold">+ 5 290 FCFA / day</div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              {/* Mileage */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Mileage</Label>
                <RadioGroup
                  value={formData.mileageOption}
                  onValueChange={(value: string) => updateFormData("mileageOption", value as "limited" | "unlimited")}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="limited" id="limited" />
                    <Label htmlFor="limited" className="flex-1 cursor-pointer">
                      <div className="font-semibold">1,000 km</div>
                      <div className="text-sm text-muted-foreground">
                        +500 FCFA for every additional km
                      </div>
                    </Label>
                    <Badge variant="outline">Included</Badge>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                    <RadioGroupItem value="unlimited" id="unlimited" />
                    <Label htmlFor="unlimited" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Unlimited kilometers</div>
                      <div className="text-sm text-muted-foreground">
                        All kilometers are included in the price
                      </div>
                    </Label>
                    <div className="text-right">
                      <div className="font-semibold">+ 2 570 FCFA / day</div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex justify-between pt-4">
                <Button onClick={prevStep} variant="outline" size="lg">
                  Back
                </Button>
                <Button onClick={nextStep} size="lg" className="gap-2">
                  Continue
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Protection Package */}
          {currentStep === 3 && (
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold">Which protection package do you need?</h3>
              </div>

              <div className="bg-muted/50 p-3 rounded-lg text-sm flex items-start gap-2">
                <Shield className="size-4 mt-0.5 shrink-0" />
                <p>
                  Drivers must have held their driver&apos;s license for at least 2 year(s) for this vehicle
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {PROTECTION_PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => updateFormData("protectionPackage", pkg.id)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      formData.protectionPackage === pkg.id
                        ? "border-primary ring-2 ring-primary/20"
                        : "hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-sm">{pkg.name}</h4>
                      <div
                        className={`size-5 rounded-full border-2 flex items-center justify-center ${
                          formData.protectionPackage === pkg.id
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {formData.protectionPackage === pkg.id && (
                          <Check className="size-3 text-primary-foreground" />
                        )}
                      </div>
                    </div>

                    {pkg.discount && (
                      <Badge className="mb-2 text-xs bg-emerald-500">{pkg.discount}</Badge>
                    )}

                    <div className="text-xs text-muted-foreground mb-3">
                      Deductible: {pkg.deductible}
                    </div>

                    <div className="space-y-2 mb-4">
                      {pkg.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs">
                          {feature.included ? (
                            <Check className="size-3 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <X className="size-3 text-muted-foreground shrink-0 mt-0.5" />
                          )}
                          <span className={feature.included ? "" : "text-muted-foreground"}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t">
                      {pkg.price === 0 ? (
                        <div className="font-bold text-sm">Included</div>
                      ) : (
                        <div>
                          <div className="font-bold">{pkg.price.toLocaleString()} FCFA</div>
                          <div className="text-xs text-muted-foreground">/ day</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button onClick={prevStep} variant="outline" size="lg">
                  Back
                </Button>
                <Button onClick={nextStep} size="lg" className="gap-2">
                  Continue
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Summary */}
          {currentStep === 4 && (
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold">Booking Summary</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Booking option</span>
                  <span className="font-medium">
                    {formData.bookingOption === "best_price" ? "Best price" : "Stay flexible"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Mileage</span>
                  <span className="font-medium">
                    {formData.mileageOption === "limited" ? "1,000 km" : "Unlimited"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Protection</span>
                  <span className="font-medium">
                    {PROTECTION_PACKAGES.find((p) => p.id === formData.protectionPackage)?.name}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total per day</span>
                  <span className="text-primary">{calculateTotal().toLocaleString()} FCFA</span>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button onClick={prevStep} variant="outline" size="lg">
                  Back
                </Button>
                <Button size="lg" className="gap-2 bg-orange-500 hover:bg-orange-600">
                  <Car className="size-4" />
                  Show cars
                </Button>
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="px-6 pb-6">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    step <= currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
