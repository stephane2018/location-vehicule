"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Shield,
  Star,
  Clock,
  Car,
  Fuel,
  Settings2,
  Gauge,
  Key,
  Navigation,
} from "lucide-react";
import { VEHICLES } from "@/core/utils/vehicleData";

// ─── Constants ───────────────────────────────────────────────────────────────

const TRUST_BADGES = [
  { icon: Shield, label: "Assurance tous risques" },
  { icon: Star, label: "4.9/5 — 2 400+ avis" },
  { icon: Clock, label: "Annulation gratuite 48h" },
] as const;

const HERO_SLIDES = [
  VEHICLES[3],  // Mercedes C-Class
  VEHICLES[4],  // Land Cruiser
  VEHICLES[11], // Lamborghini Urus
  VEHICLES[9],  // Porsche Cayenne
  VEHICLES[0],  // Toyota Corolla
  VEHICLES[1],  // Hyundai Tucson
];

const BG_ICONS = [
  { icon: Car, top: "10%", left: "5%", size: "size-10", opacity: "opacity-[0.03]", rotate: "-rotate-12" },
  { icon: Fuel, top: "20%", right: "8%", size: "size-8", opacity: "opacity-[0.04]", rotate: "rotate-6" },
  { icon: Settings2, top: "55%", left: "3%", size: "size-9", opacity: "opacity-[0.03]", rotate: "rotate-12" },
  { icon: Gauge, top: "38%", right: "4%", size: "size-11", opacity: "opacity-[0.035]", rotate: "-rotate-6" },
  { icon: Key, top: "75%", left: "8%", size: "size-7", opacity: "opacity-[0.04]", rotate: "rotate-15" },
  { icon: Navigation, top: "68%", right: "10%", size: "size-8", opacity: "opacity-[0.03]", rotate: "-rotate-20" },
  { icon: Shield, top: "12%", left: "42%", size: "size-6", opacity: "opacity-[0.025]", rotate: "rotate-3" },
  { icon: Star, top: "82%", right: "28%", size: "size-7", opacity: "opacity-[0.03]", rotate: "-rotate-8" },
];

// ─── Hero Section ────────────────────────────────────────────────────────────

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentVehicle = HERO_SLIDES[currentSlide];

  return (
    <section className="relative" aria-label="Recherche de véhicules">
      {/* ── Dark base ── */}
      <div className="absolute inset-0 bg-[oklch(0.10_0.02_250)]" />

      {/* ── Radial accent ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 25% 45%, oklch(0.25 0.15 260 / 0.25), transparent)",
        }}
      />

      {/* ── Grid pattern ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Background icons ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {BG_ICONS.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`absolute text-white ${item.opacity} ${item.rotate}`}
              style={{ top: item.top, left: item.left, right: item.right }}
            >
              <Icon className={item.size} strokeWidth={1} />
            </div>
          );
        })}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Two-column: text left + slideshow right ── */}
        <div className="grid grid-cols-1 items-center gap-10 pt-20 sm:pt-24 lg:grid-cols-2 lg:gap-16 lg:pt-32 pb-10 lg:pb-14">
          {/* ── Left: text ── */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
              <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium tracking-wide text-white/70">
                200+ véhicules disponibles maintenant
              </span>
            </div>

            <h1 className="mt-7 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Roulez sans limites
              <span className="block mt-2 bg-linear-to-r from-primary via-primary/80 to-white/50 bg-clip-text text-transparent">
                à travers la Côte d&apos;Ivoire
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-white/50 sm:text-lg max-w-md">
              De la citadine économique au SUV de luxe, trouvez le véhicule
              parfait. Réservation en 2&nbsp;minutes, paiement Mobile Money,
              et c&apos;est parti.
            </p>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-white/40"
                >
                  <badge.icon className="size-4 text-primary/70" />
                  <span className="text-xs font-medium">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-10">
              {[
                { value: "200+", label: "Véhicules" },
                { value: "5", label: "Agences" },
                { value: "5 000+", label: "Clients" },
                { value: "98%", label: "Satisfaction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[10px] text-white/30 uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: image slideshow ── */}
          <div className="relative">
            {/* Glow behind card */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-3xl bg-primary/8 blur-3xl"
            />

            <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-3 shadow-2xl backdrop-blur-sm overflow-hidden">
              {/* Main image */}
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden">
                {HERO_SLIDES.map((v, i) => (
                  <div
                    key={v.id}
                    className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
                    style={{ opacity: i === currentSlide ? 1 : 0 }}
                  >
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                ))}

                {/* Bottom gradient overlay for text */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                {/* Vehicle info overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="transition-all duration-500">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {currentVehicle.category}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {currentVehicle.name}
                    </h3>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className="text-xl font-bold text-white">
                      {currentVehicle.pricePerDay.toLocaleString("fr-FR")}
                    </span>
                    <p className="text-[10px] text-white/50">FCFA / jour</p>
                  </div>
                </div>

                {/* Rating badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
                  <Star className="size-3 text-amber-400 fill-amber-400" />
                  <span className="text-[11px] font-semibold text-white">4.9</span>
                </div>
              </div>

              {/* Thumbnails row */}
              <div className="flex gap-2 mt-3">
                {HERO_SLIDES.map((v, i) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setCurrentSlide(i)}
                    className={`relative flex-1 h-14 sm:h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                      i === currentSlide
                        ? "ring-2 ring-primary ring-offset-1 ring-offset-black/50"
                        : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      sizes="16vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
