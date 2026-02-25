import { Crown } from "lucide-react";
import { CATEGORY_IMAGES } from "@/core/utils/vehicleData";
import { FeaturedCard, CompactCard, LuxuryCard } from "./vehicle-category-cards";
import { VehicleCategory } from "./types";

const STANDARD_CATEGORIES: VehicleCategory[] = [
  {
    name: "SUV",
    priceFrom: 38_000,
    count: 45,
    slug: "suv",
    image: CATEGORY_IMAGES["SUV"],
    description: "Confort et polyvalence pour la ville comme la route",
  },
  {
    name: "Berline",
    priceFrom: 25_000,
    count: 32,
    slug: "berline",
    image: CATEGORY_IMAGES["Berline"],
    description: "Élégance et confort au quotidien",
  },
  {
    name: "Citadine",
    priceFrom: 15_000,
    count: 18,
    slug: "citadine",
    image: CATEGORY_IMAGES["Citadine"],
    description: "Compacte et économique",
  },
  {
    name: "Utilitaire",
    priceFrom: 22_000,
    count: 12,
    slug: "utilitaire",
    image: CATEGORY_IMAGES["Utilitaire"],
    description: "Capacité et robustesse pour vos activités",
  },
];

const LUXURY_CATEGORIES: VehicleCategory[] = [
  {
    name: "Luxe Berline",
    priceFrom: 85_000,
    count: 8,
    isLuxury: true,
    slug: "luxe-berline",
    image: CATEGORY_IMAGES["Luxe Berline"],
    description: "Prestige et raffinement pour vos déplacements d'exception",
  },
  {
    name: "Luxe SUV",
    priceFrom: 140_000,
    count: 6,
    isLuxury: true,
    slug: "luxe-suv",
    image: CATEGORY_IMAGES["Luxe SUV"],
    description: "Puissance et luxe pour une expérience sans compromis",
  },
];


export function VehicleCategoriesSection() {
  const [featured, ...rest] = STANDARD_CATEGORIES;

  return (
    <section
      className="bg-background py-20 sm:py-24 lg:py-28"
      aria-labelledby="categories-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-14 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Notre flotte
          </p>
          <h2
            id="categories-heading"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Une catégorie pour chaque besoin
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            De la citadine économique au SUV de luxe, trouvez le véhicule qui
            correspond à votre usage et à votre budget.
          </p>
        </div>

        {/* Standard categories — Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {/* Featured large card: SUV */}
          <FeaturedCard category={featured} />

          {/* Secondary cards */}
          {rest.map((category) => (
            <CompactCard key={category.slug} category={category} />
          ))}
        </div>

        {/* Luxury section */}
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Crown className="size-4 text-amber-500" />
              <h3 className="text-lg font-semibold text-foreground">
                Collection Prestige
              </h3>
            </div>
            <div className="flex-1 h-px bg-linear-to-r from-amber-500/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {LUXURY_CATEGORIES.map((category) => (
              <LuxuryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
