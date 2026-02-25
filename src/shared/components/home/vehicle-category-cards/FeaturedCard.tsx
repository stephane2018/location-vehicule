import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Car } from "lucide-react";
import { VehicleCategory } from "../types";

interface FeaturedCardProps {
  category: VehicleCategory;
}

function formatFCFA(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount);
}

export function FeaturedCard({ category }: FeaturedCardProps) {
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
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
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
