import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CATEGORY_IMAGES } from "@/utils/vehicleData";

interface VehicleCategory {
  name: string;
  priceFrom: number;
  count: number;
  isLuxury?: boolean;
  slug: string;
  image: string;
}

const VEHICLE_CATEGORIES: VehicleCategory[] = [
  {
    name: "Citadine",
    priceFrom: 15_000,
    count: 18,
    slug: "citadine",
    image: CATEGORY_IMAGES["Citadine"],
  },
  {
    name: "Berline",
    priceFrom: 25_000,
    count: 32,
    slug: "berline",
    image: CATEGORY_IMAGES["Berline"],
  },
  {
    name: "SUV",
    priceFrom: 38_000,
    count: 45,
    slug: "suv",
    image: CATEGORY_IMAGES["SUV"],
  },
  {
    name: "Utilitaire",
    priceFrom: 22_000,
    count: 12,
    slug: "utilitaire",
    image: CATEGORY_IMAGES["Utilitaire"],
  },
  {
    name: "Luxe Berline",
    priceFrom: 85_000,
    count: 8,
    isLuxury: true,
    slug: "luxe-berline",
    image: CATEGORY_IMAGES["Luxe Berline"],
  },
  {
    name: "Luxe SUV",
    priceFrom: 140_000,
    count: 6,
    isLuxury: true,
    slug: "luxe-suv",
    image: CATEGORY_IMAGES["Luxe SUV"],
  },
];

function formatFCFA(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount);
}

function CategoryCard({ category }: { category: VehicleCategory }) {
  return (
    <Link
      href="/vehicules"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-28 w-full overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Luxury indicator */}
        {category.isLuxury && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
              Premium
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col items-center p-4 pt-3">
        {/* Name */}
        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
          {category.name}
        </h3>

        {/* Count */}
        <p className="mt-1 text-xs text-muted-foreground">
          {category.count} véhicules
        </p>

        {/* Price */}
        <p className="mt-2 text-xs text-muted-foreground">
          À partir de{" "}
          <span className="font-semibold text-foreground">
            {formatFCFA(category.priceFrom)}
          </span>
          <span className="text-muted-foreground"> FCFA/jour</span>
        </p>

        {/* Hover arrow */}
        <div className="mt-2 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
          Découvrir
          <ArrowRight className="size-3" />
        </div>
      </div>
    </Link>
  );
}

export function VehicleCategoriesSection() {
  return (
    <section
      className="bg-background py-20 sm:py-24 lg:py-28"
      aria-labelledby="categories-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
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
            De la citadine économique au SUV de luxe, trouvez le véhicule
            qui correspond à votre usage et à votre budget.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 sm:gap-5">
          {VEHICLE_CATEGORIES.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
