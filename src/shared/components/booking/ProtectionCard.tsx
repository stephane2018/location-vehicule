"use client";

import { useState } from "react";
import { Check, X, Info, Star } from "lucide-react";

interface Feature {
  text: string;
  included: boolean;
  tooltip: string;
}

interface ProtectionCardProps {
  id: string;
  name: string;
  price: number;
  pricePerDay?: string;
  originalPrice?: string;
  stars: number;
  discount: string | null;
  deductible: string;
  deductibleColor: string;
  features: Feature[];
  isSelected: boolean;
  onSelect: () => void;
  tooltips: Record<string, string>;
}

export default function ProtectionCard({
  id,
  name,
  price,
  pricePerDay,
  originalPrice,
  stars,
  discount,
  deductible,
  deductibleColor,
  features,
  isSelected,
  onSelect,
  tooltips,
}: ProtectionCardProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div
      onClick={onSelect}
      className={`group relative bg-white rounded-2xl cursor-pointer transition-all duration-300 ${
        isSelected
          ? "shadow-xl ring-2 ring-primary ring-offset-2 scale-105"
          : "shadow-md hover:shadow-xl border border-gray-100"
      }`}
    >
      {/* Top Accent Bar */}
      <div
        className={`h-1 w-full rounded-t-2xl ${
          isSelected
            ? "bg-linear-to-r from-primary via-orange-400 to-primary"
            : "bg-gray-100"
        }`}
      ></div>

      {/* Content Container */}
      <div className="p-6 overflow-hidden">
        {/* Radio Button */}
        <div className="absolute top-6 right-6">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              isSelected
                ? "border-primary bg-primary shadow-lg shadow-primary/30"
                : "border-gray-300 bg-white group-hover:border-primary/50"
            }`}
          >
            {isSelected && <div className="w-3 h-3 rounded-full bg-white"></div>}
          </div>
        </div>

        {/* Package Header */}
        <div className="mb-5 pr-10">
          <h3 className="font-bold text-lg text-gray-900 mb-3 leading-tight">
            {name}
          </h3>

          {/* Stars */}
          <div className="flex gap-1 mb-3">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 transition-all ${
                  i < stars
                    ? "fill-amber-400 text-amber-400"
                    : "fill-none text-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Discount Badge */}
          {discount && (
            <div className="mb-3">
              <span className="inline-flex items-center text-xs font-bold text-white bg-linear-to-r from-[#FF6B35] to-orange-500 rounded-full px-3 py-1.5 shadow-md">
                🔥 {discount}
              </span>
            </div>
          )}

          {/* Deductible */}
          <div
            className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold ${
              deductibleColor === "text-red-600"
                ? "bg-red-50 text-red-700 border border-red-200"
                : deductibleColor === "text-green-600"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-gray-50 text-gray-700 border border-gray-200"
            }`}
          >
            {deductible}
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-6">
          {features.map((feature, index) => {
            const tooltipId = `${id}-${feature.tooltip}`;
            return (
              <div key={index} className="flex items-start gap-2 relative">
                <div className="shrink-0 mt-0.5">
                  {feature.included ? (
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                      <X className="w-3 h-3 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 flex items-start justify-between gap-1">
                  <span className="text-xs text-gray-700 leading-tight font-medium">
                    {feature.text}
                  </span>
                  <button
                    type="button"
                    className="shrink-0 cursor-help p-1 rounded-full hover:bg-orange-50 transition-colors"
                    onMouseEnter={() => setActiveTooltip(tooltipId)}
                    onMouseLeave={() => setActiveTooltip(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTooltip(
                        activeTooltip === tooltipId ? null : tooltipId
                      );
                    }}
                  >
                    <Info className="w-4 h-4 text-[#FF6B35]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Price */}
        <div className="pt-5 border-t-2 border-dashed border-gray-200">
          {price === 0 ? (
            <div className="text-center bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200">
              <p className="text-2xl font-bold text-green-700">Inclus</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-sm text-gray-500 font-medium">F</span>
                <span className="text-3xl font-black bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-700">
                  {pricePerDay}
                </span>
                <span className="text-sm text-gray-500 font-medium">.95</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">par jour</p>
              {originalPrice && (
                <p className="text-xs text-gray-400 line-through">
                  F {originalPrice} / jour
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tooltips - Rendered at card level to avoid overflow clipping */}
      {activeTooltip && (
        <div className="absolute right-6 bottom-full mb-2 z-50 w-64 bg-gray-900 text-white text-xs rounded-xl p-4 shadow-2xl">
          <div className="absolute -bottom-2 right-3 w-4 h-4 bg-gray-900 transform rotate-45"></div>
          <p className="relative z-10 leading-relaxed">
            {tooltips[activeTooltip.split('-').pop() || '']}
          </p>
        </div>
      )}
    </div>
  );
}
