import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Car, Crown } from "lucide-react";
import { CATEGORY_IMAGES } from "@/utils/vehicleData";

interface VehicleCategory {
  name: string;
  priceFrom: number;
  count: number;
  isLuxury?: boolean;
  slug: string;
  image: string;
  description: string;
}

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

function formatFCFA(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount);
}

/** Large featured card — spans 2 rows in the bento grid */
function FeaturedCard({ category }: { category: VehicleCategory }) {
  return (
    <Link
      href="/vehicules"
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-border/50 transition-all duration-300 hover:ring-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 col-span-2 row-span-2"
    >
      {/* Image */}
      <div className="relative h-full min-h-[280px] sm:min-h-[320px] w-full overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Overlay content */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-sm mb-3">
          <Car className="size-3" />
          Populaire
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {category.name}
        </h3>
        <p className="text-sm text-white/70 mb-3 max-w-xs">
          {category.description}
        </p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-white/50 uppercase tracking-wider">
              À partir de
            </p>
            <p className="text-xl font-bold text-white">
              {formatFCFA(category.priceFrom)}{" "}
              <span className="text-sm font-normal text-white/60">
                FCFA/jour
              </span>
            </p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors group-hover:bg-white/20">
            {category.count} véhicules
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Compact card for secondary standard categories */
function CompactCard({ category }: { category: VehicleCategory }) {
  return (
    <Link
      href="/vehicules"
      className="group relative flex overflow-hidden rounded-2xl bg-card ring-1 ring-border/50 transition-all duration-300 hover:ring-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative h-full w-full min-h-[140px] overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/5" />
      </div>

      {/* Overlay content */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="text-base font-bold text-white mb-0.5 group-hover:text-primary-foreground transition-colors">
          {category.name}
        </h3>
        <p className="text-[11px] text-white/60 mb-2 line-clamp-1">
          {category.description}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-white/80">
            <span className="font-semibold text-white">
              {formatFCFA(category.priceFrom)}
            </span>{" "}
            FCFA/j
          </p>
          <span className="text-[10px] text-white/50">
            {category.count} véhicules
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Premium card for luxury categories */
function LuxuryCard({ category }: { category: VehicleCategory }) {
  return (
    <Link
      href="/vehicules"
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-zinc-950 ring-1 ring-white/10 transition-all duration-300 hover:ring-amber-400/30 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        {/* Premium badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500/90 to-amber-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-950 backdrop-blur-sm">
            <Crown className="size-2.5" />
            Premium
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col p-5 flex-1">
        <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
          {category.name}
        </h3>
        <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
          {category.description}
        </p>

        <div className="mt-auto pt-4 flex items-end justify-between border-t border-white/5">
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">
              À partir de
            </p>
            <p className="text-lg font-bold text-white">
              {formatFCFA(category.priceFrom)}{" "}
              <span className="text-xs font-normal text-zinc-500">
                FCFA/jour
              </span>
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-400/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Découvrir
            <ArrowRight className="size-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function VehicleCategoriesSection() {
  const [featured, ...rest] = STANDARD_CATEGORIES;

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
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/20 to-transparent" />
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
