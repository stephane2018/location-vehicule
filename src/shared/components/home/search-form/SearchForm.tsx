"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { DateTimeInput } from "@/shared/components/ui";
import { LocationField, ReturnLocationField, VehicleTypeTabs } from "./fields";

export function SearchForm() {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState("cars");
  const [pickupLocation, setPickupLocation] = useState("Paris Orly Airport");
  const [returnLocation, setReturnLocation] = useState("");
  const [differentReturn, setDifferentReturn] = useState(false);
  const [pickupDate, setPickupDate] = useState(new Date(2026, 1, 28));
  const [pickupTime, setPickupTime] = useState("12:00 PM");
  const [returnDate, setReturnDate] = useState(new Date(2026, 2, 4));
  const [returnTime, setReturnTime] = useState("12:00 PM");
  const [currentMonth] = useState(new Date(2026, 1, 1));
  const [returnOpenTrigger, setReturnOpenTrigger] = useState(0);

  const openReturnCalendar = () => {
    setTimeout(() => {
      setReturnOpenTrigger((prev) => prev + 1);
    }, 150);
  };

  function handleSearch() {
    const params = new URLSearchParams({
      vehicleType,
      pickup: pickupLocation,
      return: differentReturn ? returnLocation : pickupLocation,
      pickupDate: pickupDate.toISOString(),
      pickupTime,
      returnDate: returnDate.toISOString(),
      returnTime,
    });
    
    router.push(`/recherche?${params.toString()}`);
  }

  return (
    <div className="relative rounded-2xl border border-border/50 bg-background shadow-2xl">
      <VehicleTypeTabs value={vehicleType} onChange={setVehicleType} />

      <div className="p-4 sm:p-6 relative overflow-visible">
        <div className="hidden lg:block space-y-4 overflow-visible">
          <div className="grid grid-cols-12 gap-4 relative overflow-visible">
            <div className="col-span-3">
              <LocationField
                label="Prise en charge"
                value={pickupLocation}
                onChange={setPickupLocation}
              />
            </div>

            {/* Return */}
            <div className="col-span-3">
              <ReturnLocationField
                label="Retour"
                value={returnLocation}
                onChange={setReturnLocation}
                differentReturn={differentReturn}
                onToggleDifferentReturn={setDifferentReturn}
              />
            </div>

            {/* Pickup Date */}
            <div className="col-span-3">
              <DateTimeInput
                date={pickupDate}
                time={pickupTime}
                onDateChange={setPickupDate}
                onTimeChange={setPickupTime}
                currentMonth={currentMonth}
                label="Date de depart"
                dateBorderColor="border-primary"
                startDate={pickupDate}
                endDate={returnDate}
                isPickup={true}
                onDateSelected={openReturnCalendar}
              />
            </div>

            {/* Return Date */}
            <div className="col-span-3">
              <DateTimeInput
                date={returnDate}
                time={returnTime}
                onDateChange={setReturnDate}
                onTimeChange={setReturnTime}
                currentMonth={currentMonth}
                label="Date de retour"
                dateBorderColor="border-border"
                startDate={pickupDate}
                endDate={returnDate}
                isPickup={false}
                openTrigger={returnOpenTrigger}
              />
            </div>
          </div>

          {/* Search Button */}
          <div>
            <Button
              onClick={handleSearch}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
            >
              Rechercher un vehicule
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4 overflow-visible">
          {/* Pickup Location */}
          <LocationField
            label="Prise en charge"
            value={pickupLocation}
            onChange={setPickupLocation}
          />

          {/* Return Location */}
          <ReturnLocationField
            label="Retour"
            value={returnLocation}
            onChange={setReturnLocation}
            differentReturn={differentReturn}
            onToggleDifferentReturn={setDifferentReturn}
          />

          {/* Date/Time Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <DateTimeInput
                date={pickupDate}
                time={pickupTime}
                onDateChange={setPickupDate}
                onTimeChange={setPickupTime}
                currentMonth={currentMonth}
                label="Date de depart"
                dateBorderColor="border-primary"
                startDate={pickupDate}
                endDate={returnDate}
                isPickup={true}
                onDateSelected={openReturnCalendar}
              />
            </div>
            <div>
              <DateTimeInput
                date={returnDate}
                time={returnTime}
                onDateChange={setReturnDate}
                onTimeChange={setReturnTime}
                currentMonth={currentMonth}
                label="Date de retour"
                dateBorderColor="border-border"
                startDate={pickupDate}
                endDate={returnDate}
                isPickup={false}
                openTrigger={returnOpenTrigger}
              />
            </div>
          </div>
        </div>

        {/* Mobile search button */}
        <div className="lg:hidden mt-4">
          <Button
            onClick={handleSearch}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
          >
            Rechercher un vehicule
          </Button>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-primary/5 border-t border-primary/10 rounded-b-2xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-primary flex items-center justify-center">
            <Star className="size-4 text-primary-foreground fill-primary-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">AutoLoc CI :</span>{" "}
            roulez plus, economisez plus ! Jusqu&apos;a 20% de reduction.
          </p>
        </div>
      </div>
    </div>
  );
}
