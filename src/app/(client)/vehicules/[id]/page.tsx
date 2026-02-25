"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { VEHICLES, type Vehicle } from "@/core/utils/vehicleData";
import VehicleCard from "@/shared/components/Layout/VehicleCard";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Fuel,
  MapPin,
  Phone,
  Settings2,
  Shield,
  Star,
  Users,
  X,
  ZoomIn,
} from "lucide-react";

// ─── Mock features & reviews ─────────────────────────────────────────────────

const FEATURES = [
  "Climatisation automatique",
  "Bluetooth & Apple CarPlay",
  "GPS intégré",
  "Caméra de recul",
  "Régulateur de vitesse",
  "Vitres électriques",
  "Verrouillage centralisé",
  "ABS & ESP",
  "Airbags frontaux & latéraux",
  "Sièges réglables",
];

const REVIEWS = [
  {
    name: "Kouamé Yves",
    initials: "KY",
    rating: 5,
    date: "12 fév. 2026",
    comment:
      "Véhicule en excellent état, très propre. Service rapide à l'agence de Cocody. Je recommande vivement.",
  },
  {
    name: "Adjoua Mariam",
    initials: "AM",
    rating: 4,
    date: "5 fév. 2026",
    comment:
      "Bon rapport qualité-prix. La prise en charge était simple et efficace. Un petit bémol sur le délai d'attente.",
  },
  {
    name: "Bamba Cheick",
    initials: "BC",
    rating: 5,
    date: "28 jan. 2026",
    comment:
      "Parfait pour mon déplacement à Yamoussoukro. Véhicule confortable et économique. Je recommande !",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${
            i < rating
              ? "text-amber-400 fill-amber-400"
              : "text-muted-foreground/20"
          }`}
        />
      ))}
    </div>
  );
}

// Generate thumbnail variants from the main image URL
function getImageVariants(baseUrl: string) {
  const variants = [
    baseUrl,
    baseUrl.replace(/w=\d+/, "w=800") + "&flip=h",
    baseUrl.replace(/w=\d+/, "w=800") + "&sat=-30",
    baseUrl.replace(/w=\d+/, "w=800") + "&bri=10",
  ];
  return variants;
}

function VehicleImageGallery({ vehicle }: { vehicle: Vehicle }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const images = getImageVariants(vehicle.image);

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div
          className="group relative h-64 sm:h-80 lg:h-[26rem] w-full overflow-hidden rounded-2xl border border-border/50 cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${vehicle.gradientFrom}, ${vehicle.gradientTo})`,
          }}
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={images[activeIndex]}
            alt={vehicle.name}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority
          />
          {/* Zoom hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
            <div className="flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-white text-sm backdrop-blur-sm">
              <ZoomIn className="size-4" />
              Agrandir
            </div>
          </div>
          {/* Badges */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            {vehicle.popular && (
              <Badge className="bg-white/90 text-foreground shadow-md text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
                Populaire
              </Badge>
            )}
            <div className="flex items-center gap-1 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm">
              <Star className="size-3.5 text-amber-400 fill-amber-400" />
              <span className="text-sm font-semibold text-white">4.8</span>
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative h-16 sm:h-20 flex-1 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === activeIndex
                  ? "border-primary shadow-md shadow-primary/10"
                  : "border-border/50 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${vehicle.name} - vue ${i + 1}`}
                fill
                sizes="25vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="size-5" />
          </button>

          {/* Previous */}
          <button
            className="absolute left-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
            }}
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* Main lightbox image */}
          <div
            className="relative w-[90vw] h-[70vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={vehicle.name}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
            }}
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Lightbox thumbnails */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(i);
                }}
                className={`relative size-14 rounded-lg overflow-hidden border-2 transition-all ${
                  i === activeIndex
                    ? "border-white shadow-lg"
                    : "border-white/20 opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Vue ${i + 1}`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function VehicleNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center gap-5">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-muted/60">
            <ArrowLeft className="size-8 text-muted-foreground/40" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Véhicule introuvable
          </h1>
          <p className="text-muted-foreground max-w-md">
            Le véhicule que vous recherchez n&apos;existe pas ou a été retiré
            du catalogue.
          </p>
          <Button asChild>
            <Link href="/vehicules">Retour au catalogue</Link>
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

  // Similar: same category, excluding current. If < 3, fill with other popular vehicles
  const sameCategory = VEHICLES.filter(
    (v) => v.category === vehicle.category && v.id !== vehicle.id
  );
  const otherPopular = VEHICLES.filter(
    (v) =>
      v.id !== vehicle.id &&
      v.category !== vehicle.category &&
      v.popular
  );
  const relatedVehicles = [...sameCategory, ...otherPopular].slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        {/* ── Breadcrumb ── */}
        <div className="mb-6">
          <Link
            href="/vehicules"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-4" />
            Retour au catalogue
          </Link>
        </div>

        {/* ── Main content grid ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ── Left: vehicle info (2/3) ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image gallery with lightbox */}
            <VehicleImageGallery vehicle={vehicle} />

            {/* Title card */}
            <div className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                      {vehicle.category}
                    </span>
                    <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
                      {vehicle.name}
                    </h1>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-lg">
                      {vehicle.transmission} · {vehicle.carburant} ·{" "}
                      {vehicle.seats} places — Idéal pour vos déplacements
                      en Côte d&apos;Ivoire avec un confort optimal.
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-3xl font-bold text-primary">
                      {vehicle.pricePerDay.toLocaleString("fr-FR")}
                    </div>
                    <p className="text-xs text-muted-foreground">FCFA / jour</p>
                    <p className="mt-1 text-[10px] text-muted-foreground/60">
                      Assurance & km illimité inclus
                    </p>
                  </div>
                </div>

                {/* Specs row */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      icon: Settings2,
                      label: vehicle.transmission,
                      title: "Transmission",
                    },
                    {
                      icon: Fuel,
                      label: vehicle.carburant,
                      title: "Carburant",
                    },
                    {
                      icon: Users,
                      label: `${vehicle.seats} places`,
                      title: "Places",
                    },
                    {
                      icon: CalendarDays,
                      label: "2023",
                      title: "Année",
                    },
                  ].map((spec) => (
                    <div
                      key={spec.title}
                      className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/20 p-3"
                    >
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/8">
                        <spec.icon className="size-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">
                          {spec.title}
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {spec.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description + Features */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <h2 className="text-sm font-semibold text-foreground mb-3">
                    Description
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Le {vehicle.name} est un véhicule{" "}
                    {vehicle.category.toLowerCase()} équipé d&apos;une
                    transmission {vehicle.transmission.toLowerCase()} et
                    fonctionnant à l&apos;{vehicle.carburant.toLowerCase()}.
                    Confort optimal pour {vehicle.seats} passagers.
                    Disponible dans{" "}
                    {vehicle.agencies.length === 1
                      ? "notre agence de " + vehicle.agencies[0]
                      : `nos agences de ${vehicle.agencies.slice(0, -1).join(", ")} et ${vehicle.agencies[vehicle.agencies.length - 1]}`}
                    .
                  </p>
                </div>

                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <h2 className="text-sm font-semibold text-foreground mb-3">
                    Équipements
                  </h2>
                  <div className="grid grid-cols-1 gap-2">
                    {FEATURES.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-sm font-semibold text-foreground">
                    Avis clients
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Star className="size-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-foreground">4.8</span>
                    <span>· 24 avis</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {REVIEWS.map((review) => (
                    <div
                      key={review.name}
                      className="rounded-xl border border-border/50 bg-card p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/8 text-xs font-bold text-primary">
                          {review.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {review.name}
                              </p>
                              <p className="text-[11px] text-muted-foreground/60">
                                {review.date}
                              </p>
                            </div>
                            <StarRating rating={review.rating} />
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: sticky booking card (1/3) ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-5">
                {/* Booking card */}
                <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-lg">
                  <div className="text-center mb-5">
                    <div className="text-3xl font-bold text-primary">
                      {vehicle.pricePerDay.toLocaleString("fr-FR")}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      FCFA / jour · tout inclus
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full font-semibold gap-2"
                      asChild
                    >
                      <Link href="/reservation">
                        <CalendarCheck className="size-4" />
                        Réserver maintenant
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full gap-2 border-border/50"
                    >
                      <Phone className="size-4" />
                      Contacter l&apos;agence
                    </Button>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border/50 space-y-2.5">
                    {[
                      { icon: Shield, label: "Assurance tous risques incluse" },
                      {
                        icon: CheckCircle2,
                        label: "Annulation gratuite sous 48h",
                      },
                      { icon: MapPin, label: "Kilométrage illimité" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-2.5 text-xs text-muted-foreground"
                      >
                        <item.icon className="size-3.5 text-emerald-500 shrink-0" />
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agencies */}
                <div className="rounded-2xl border border-border/50 bg-card p-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-3">
                    Disponible dans
                  </h3>
                  <div className="space-y-2">
                    {vehicle.agencies.map((agency) => (
                      <div
                        key={agency}
                        className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-muted/20 px-3 py-2.5"
                      >
                        <div className="flex size-7 items-center justify-center rounded-md bg-primary/8">
                          <Building2 className="size-3.5 text-primary" />
                        </div>
                        <span className="text-sm text-foreground">
                          {agency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* ── Related vehicles section ── */}
        {relatedVehicles.length > 0 && (
          <section className="mt-16 mb-10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                  Vous pourriez aussi aimer
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Véhicules similaires
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 border-border/50 shrink-0"
                asChild
              >
                <Link href="/vehicules">
                  Tout voir
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedVehicles.map((v) => (
                <VehicleCard
                  key={v.id}
                  vehicle={v}
                  onViewDetails={(id) =>
                    (window.location.href = `/vehicules/${id}`)
                  }
                  onReserve={(id) =>
                    (window.location.href = `/vehicules/${id}`)
                  }
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
