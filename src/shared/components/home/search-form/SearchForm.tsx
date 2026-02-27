"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { DateTimeInput } from "@/shared/components/ui";
import { LocationField, ReturnLocationField, VehicleTypeTabs } from "./fields";

export function SearchForm() {
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
    console.log({
      vehicleType,
      pickupLocation,
      returnLocation: differentReturn ? returnLocation : pickupLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
    });
  }

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white shadow-2xl">
      <VehicleTypeTabs value={vehicleType} onChange={setVehicleType} />

      <div className="p-4 sm:p-6 relative overflow-visible">
        <div className="hidden lg:block space-y-4 overflow-visible">
          <div className="grid grid-cols-12 gap-4 relative overflow-visible">
            <div className="col-span-3">
              <LocationField
                label="Pickup"
                value={pickupLocation}
                onChange={setPickupLocation}
              />
            </div>

            {/* Return */}
            <div className="col-span-3">
              <ReturnLocationField
                label="Return"
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
                label="Pickup date"
                dateBorderColor="border-blue-500"
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
                label="Return date"
                dateBorderColor="border-gray-300"
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
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base"
            >
              Show cars
            </Button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-4 overflow-visible">
          {/* Pickup Location */}
          <LocationField
            label="Pickup"
            value={pickupLocation}
            onChange={setPickupLocation}
          />

          {/* Return Location */}
          <ReturnLocationField
            label="Return"
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
                label="Pickup date"
                dateBorderColor="border-blue-500"
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
                label="Return date"
                dateBorderColor="border-gray-300"
                startDate={pickupDate}
                endDate={returnDate}
                isPickup={false}
                openTrigger={returnOpenTrigger}
              />
            </div>
          </div>
        </div>

        {/* Corporate rate link */}
        <div className="mt-4">
          <button className="text-sm text-gray-600 hover:text-gray-900 underline">
            Apply corpo
          </button>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-blue-300/20 border-t rounded-b-2xl border-blue-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-blue-500 flex items-center justify-center">
            <Star className="size-4 text-white fill-white" />
          </div>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Auto Loc:</span> drive more, save
            more! Up to 20% off for members.
          </p>
        </div>
      </div>
    </div>
  );
}
