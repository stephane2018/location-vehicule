"use client";

import { AgenciesSection } from "@/shared/components/home/AgenciesSection";
import { CtaSection } from "@/shared/components/home/CtaSection";
import { FeaturedVehiclesSection } from "@/shared/components/home/FeaturedVehiclesSection";
import { HeroSection } from "@/shared/components/home/HeroSection";
import { SearchSection } from "@/shared/components/home/SearchSection";
import { StickySearchBar } from "@/shared/components/home/StickySearchBar";
import { TestimonialsSection } from "@/shared/components/home/TestimonialsSection";
import { VehicleCategoriesSection } from "@/shared/components/home/VehicleCategoriesSection";
import { WhyUsSection } from "@/shared/components/home/WhyUsSection";



export default function HomePage() {
  return (
    <main>
      <StickySearchBar />
      {/* <SearchSection /> */}
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