import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Crown } from "lucide-react";
import { VehicleCategory } from "../types";

interface LuxuryCardProps {
  category: VehicleCategory;
}

function formatFCFA(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount);
}

export function LuxuryCard({ category }: LuxuryCardProps) {
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
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        {/* Premium badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-linear-to-r from-amber-500/90 to-amber-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-950 backdrop-blur-sm">
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
