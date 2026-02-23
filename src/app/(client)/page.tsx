"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { VehicleCategoriesSection } from "@/components/home/VehicleCategoriesSection";
import { FeaturedVehiclesSection } from "@/components/home/FeaturedVehiclesSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { AgenciesSection } from "@/components/home/AgenciesSection";
import { CtaSection } from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <VehicleCategoriesSection />
      <FeaturedVehiclesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <AgenciesSection />
      <CtaSection />
    </main>
  );
}
