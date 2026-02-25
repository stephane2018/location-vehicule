import Link from "next/link";
import Image from "next/image";
import { VehicleCategory } from "../types";

interface CompactCardProps {
  category: VehicleCategory;
}

function formatFCFA(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount);
}

export function CompactCard({ category }: CompactCardProps) {
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
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/5" />
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
