"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { VEHICLES, formatPrice, type Vehicle } from "@/utils/vehicleData";
import VehicleCard from "@/components/organisms/VehicleCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Fuel,
  MapPin,
  Settings2,
  Shield,
  Star,
  Users,
} from "lucide-react";

// ─── Category badge color mapping ────────────────────────────────────────────

const CATEGORY_STYLES: Record<string, string> = {
  Citadine: "bg-secondary text-secondary-foreground",
  Berline: "bg-primary text-primary-foreground",
  SUV: "bg-accent text-accent-foreground",
  Utilitaire: "bg-muted text-muted-foreground border border-border",
  "Luxe Berline": "bg-primary/10 text-primary border border-primary/20",
  "Luxe SUV": "bg-primary/10 text-primary border border-primary/20",
  "Luxe Sportive": "bg-destructive/10 text-destructive border border-destructive/20",
};

// ─── Mock features & reviews ─────────────────────────────────────────────────

const FEATURES = [
  "Climatisation",
  "Bluetooth",
  "GPS intégré",
  "Caméra de recul",
  "Régulateur de vitesse",
  "Vitres électriques",
  "Verrouillage centralisé",
  "ABS",
];

const REVIEWS = [
  {
    name: "Kouamé Yves",
    rating: 5,
    date: "12 fév. 2026",
    comment: "Véhicule en excellent état, très propre. Service rapide à l'agence de Cocody.",
  },
  {
    name: "Adjoua Mariam",
    rating: 4,
    date: "5 fév. 2026",
    comment: "Bon rapport qualité-prix. La prise en charge était simple et efficace.",
  },
  {
    name: "Bamba Cheick",
    rating: 5,
    date: "28 jan. 2026",
    comment: "Parfait pour mon déplacement à Yamoussoukro. Je recommande vivement !",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function VehicleImageGallery({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${vehicle.gradientFrom}, ${vehicle.gradientTo})`,
        }}
      >
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          priority
        />
        {vehicle.popular && (
          <Badge className="absolute top-4 left-4 bg-white/90 text-foreground shadow-md text-xs uppercase tracking-wide backdrop-blur-sm">
            Populaire
          </Badge>
        )}
      </div>
      {/* Thumbnail row */}
      <div className="flex gap-2">
        {[
          { w: 400, q: 80 },
          { w: 400, q: 70 },
          { w: 400, q: 60 },
          { w: 400, q: 80 },
        ].map((params, i) => {
          const thumbUrl = vehicle.image.replace("w=800", `w=${params.w}`).replace("q=80", `q=${params.q}`);
          return (
            <div
              key={i}
              className="relative h-16 sm:h-20 flex-1 rounded-lg overflow-hidden cursor-pointer ring-2 ring-transparent hover:ring-primary transition-all"
            >
              <Image
                src={thumbUrl}
                alt={`${vehicle.name} - vue ${i + 1}`}
                fill
                sizes="25vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

// ─── Not Found state ─────────────────────────────────────────────────────────

function VehicleNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />
      <main className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-muted">
            <span className="text-4xl" aria-hidden="true">🔍</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Véhicule introuvable</h1>
          <p className="text-muted-foreground max-w-md">
            Le véhicule que vous recherchez n&apos;existe pas ou a été retiré du catalogue.
          </p>
          <Button asChild>
            <Link href="/vehicules">Voir tous les véhicules</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function VehicleDetailPage() {
  const params = useParams();
  const vehicleId = params.id as string;
  const vehicle = VEHICLES.find((v) => v.id === vehicleId);

  if (!vehicle) return <VehicleNotFound />;

  const categoryStyle =
    CATEGORY_STYLES[vehicle.category] ?? "bg-secondary text-secondary-foreground";

  // Similar vehicles: same category, excluding current
  const similarVehicles = VEHICLES.filter(
    (v) => v.category === vehicle.category && v.id !== vehicle.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden="true" />

      <main className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/vehicules"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-4" />
            Retour au catalogue
          </Link>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left: Gallery (3/5) */}
          <div className="lg:col-span-3">
            <VehicleImageGallery vehicle={vehicle} />
          </div>

          {/* Right: Info & CTA (2/5) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category + name */}
            <div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryStyle}`}
              >
                {vehicle.category}
              </span>
              <h1 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                {vehicle.name}
              </h1>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="size-4 text-amber-400 fill-amber-400" />
                <span className="font-medium text-foreground">4.8</span>
                <span>(24 avis)</span>
              </div>
            </div>

            {/* Price */}
            <div className="rounded-xl bg-primary/5 border border-primary/10 p-5">
              <p className="text-sm text-muted-foreground">Tarif journalier</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">
                  {vehicle.pricePerDay.toLocaleString("fr-FR")}
                </span>
                <span className="text-sm text-muted-foreground">FCFA / jour</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Assurance tous risques incluse. Kilométrage illimité.
              </p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Settings2, label: vehicle.transmission, title: "Transmission" },
                { icon: Fuel, label: vehicle.carburant, title: "Carburant" },
                { icon: Users, label: `${vehicle.seats} places`, title: "Places" },
                { icon: CalendarDays, label: "2023", title: "Année" },
              ].map((spec) => (
                <div
                  key={spec.title}
                  className="flex items-center gap-3 rounded-lg border bg-card p-3"
                >
                  <spec.icon className="size-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{spec.title}</p>
                    <p className="text-sm font-medium text-foreground">{spec.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Agencies */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Disponible dans
              </h3>
              <div className="flex flex-wrap gap-2">
                {vehicle.agencies.map((agency) => (
                  <div
                    key={agency}
                    className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    <MapPin className="size-3" />
                    {agency}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3">
              <Button size="lg" className="w-full font-semibold text-base">
                Réserver ce véhicule
              </Button>
              <Button variant="outline" size="lg" className="w-full gap-2">
                <Building2 className="size-4" />
                Contacter l&apos;agence
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="size-4 text-emerald-500" />
                Assurance incluse
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" />
                Annulation gratuite
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        {/* Features + Description */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Description</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Le {vehicle.name} est un véhicule {vehicle.category.toLowerCase()} idéal
              pour vos déplacements en Côte d&apos;Ivoire. Équipé d&apos;une transmission{" "}
              {vehicle.transmission.toLowerCase()} et fonctionnant à l&apos;
              {vehicle.carburant.toLowerCase()}, il offre un confort optimal pour{" "}
              {vehicle.seats} passagers. Disponible dans{" "}
              {vehicle.agencies.length === 1
                ? "notre agence de " + vehicle.agencies[0]
                : `nos agences de ${vehicle.agencies.slice(0, -1).join(", ")} et ${vehicle.agencies[vehicle.agencies.length - 1]}`}
              .
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">
              Équipements inclus
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {FEATURES.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        {/* Reviews */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6">
            Avis clients
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <Card key={review.name} className="gap-0 py-0">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {review.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {review.comment}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Similar vehicles */}
        {similarVehicles.length > 0 && (
          <>
            <Separator className="my-10" />
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  Véhicules similaires
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/vehicules">Voir tout</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {similarVehicles.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
