import Link from "next/link";
import Image from "next/image";
import { Fuel, Users, Settings2, ArrowRight, Star } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/shared/components/ui/card";

interface FeaturedVehicle {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  image: string;
  gradientFrom: string;
  gradientTo: string;
  specs: { transmission: string; carburant: string; places: number };
  rating: number;
  isPopular?: boolean;
}

const FEATURED_VEHICLES: FeaturedVehicle[] = [
  {
    id: "v1",
    name: "Toyota Corolla 2023",
    category: "Berline",
    pricePerDay: 25_000,
    image: "https://images.unsplash.com/photo-1635876664453-20c68e076348?auto=format&fit=crop&w=800&q=80",
    gradientFrom: "#1d4ed8",
    gradientTo: "#3b82f6",
    specs: { transmission: "Automatique", carburant: "Essence", places: 5 },
    rating: 4.8,
    isPopular: true,
  },
  {
    id: "v2",
    name: "Hyundai Tucson 2022",
    category: "SUV",
    pricePerDay: 45_000,
    image: "https://images.unsplash.com/photo-1709774378962-171db2614a30?auto=format&fit=crop&w=800&q=80",
    gradientFrom: "#0f172a",
    gradientTo: "#334155",
    specs: { transmission: "Automatique", carburant: "Diesel", places: 5 },
    rating: 4.9,
    isPopular: true,
  },
  {
    id: "v4",
    name: "Mercedes C-Class 2023",
    category: "Luxe Berline",
    pricePerDay: 95_000,
    image: "https://images.unsplash.com/photo-1636127739824-37cb465c66e8?auto=format&fit=crop&w=800&q=80",
    gradientFrom: "#1a1a2e",
    gradientTo: "#4a4a6a",
    specs: { transmission: "Automatique", carburant: "Essence", places: 5 },
    rating: 5.0,
    isPopular: true,
  },
  {
    id: "v5",
    name: "Toyota Land Cruiser 2023",
    category: "Luxe SUV",
    pricePerDay: 150_000,
    image: "https://images.unsplash.com/photo-1650530579355-7ad9d4766043?auto=format&fit=crop&w=800&q=80",
    gradientFrom: "#064e3b",
    gradientTo: "#10b981",
    specs: { transmission: "Automatique", carburant: "Diesel", places: 7 },
    rating: 4.9,
    isPopular: true,
  },
];

function formatFCFA(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount);
}

function SpecPill({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-muted/80 px-2.5 py-1 text-[11px] text-muted-foreground">
      <Icon className="size-3 shrink-0" />
      <span>{label}</span>
    </div>
  );
}

function VehicleCard({ vehicle }: { vehicle: FeaturedVehicle }) {
  return (
    <Card className="group overflow-hidden gap-0 p-0 border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
      {/* Image */}
      <div className="relative">
        <div
          className="relative h-48 w-full overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${vehicle.gradientFrom}, ${vehicle.gradientTo})`,
          }}
        >
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          {vehicle.isPopular && (
            <Badge className="bg-white/90 text-foreground shadow-sm text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
              Populaire
            </Badge>
          )}
          <div className="ml-auto flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm">
            <Star className="size-3 text-amber-400 fill-amber-400" />
            <span className="text-[11px] font-semibold text-white">{vehicle.rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="px-5 pt-5 pb-0 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[11px] font-medium uppercase tracking-wider text-primary">
              {vehicle.category}
            </span>
            <h3 className="text-base font-bold text-foreground leading-snug truncate mt-0.5">
              {vehicle.name}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <span className="text-lg font-bold text-foreground">
              {formatFCFA(vehicle.pricePerDay)}
            </span>
            <p className="text-[10px] text-muted-foreground">FCFA/jour</p>
          </div>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-1.5">
          <SpecPill icon={Settings2} label={vehicle.specs.transmission} />
          <SpecPill icon={Fuel} label={vehicle.specs.carburant} />
          <SpecPill icon={Users} label={`${vehicle.specs.places} places`} />
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex gap-2 px-5 py-4">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-1.5 text-xs border-border/50"
          asChild
        >
          <Link href={`/vehicules/${vehicle.id}`}>
            Voir détails
            <ArrowRight className="size-3" />
          </Link>
        </Button>
        <Button size="sm" className="flex-1 text-xs" asChild>
          <Link href={`/vehicules/${vehicle.id}`}>Réserver</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function FeaturedVehiclesSection() {
  return (
    <section
      className="bg-muted/30 py-20 sm:py-24 lg:py-28"
      aria-labelledby="featured-vehicles-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Sélection
            </p>
            <h2
              id="featured-vehicles-heading"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Nos véhicules les plus demandés
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Découvrez les véhicules préférés de nos clients, disponibles
              dans nos agences à travers la Côte d&apos;Ivoire.
            </p>
          </div>
          <Button variant="outline" className="gap-2 shrink-0 self-start sm:self-auto" asChild>
            <Link href="/vehicules">
              Voir tout le catalogue
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_VEHICLES.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
