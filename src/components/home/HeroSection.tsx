"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, MapPin, Tag, ArrowRight, Shield, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AGENCIES = [
  { value: "abidjan-cocody", label: "Abidjan — Cocody" },
  { value: "abidjan-plateau", label: "Abidjan — Plateau" },
  { value: "yamoussoukro", label: "Yamoussoukro" },
  { value: "bouake", label: "Bouaké" },
  { value: "san-pedro", label: "San Pedro" },
] as const;

const CATEGORIES = [
  { value: "tous", label: "Toutes catégories" },
  { value: "citadine", label: "Citadine" },
  { value: "berline", label: "Berline" },
  { value: "suv", label: "SUV" },
  { value: "utilitaire", label: "Utilitaire" },
  { value: "luxe", label: "Luxe" },
] as const;

const TRUST_BADGES = [
  { icon: Shield, label: "Assurance incluse" },
  { icon: Star, label: "4.9/5 — 2 400+ avis" },
  { icon: Clock, label: "Annulation gratuite 48h" },
] as const;

export function HeroSection() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [agency, setAgency] = useState("");
  const [category, setCategory] = useState("");

  function handleSearch() {
    console.log({ startDate, endDate, agency, category });
  }

  return (
    <section className="relative overflow-hidden" aria-label="Recherche de véhicules">
      {/* Dark editorial background */}
      <div className="absolute inset-0 bg-[oklch(0.13_0.02_250)]" />

      {/* Subtle gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 70% 40%, oklch(0.3 0.15 260 / 0.25), transparent)",
        }}
      />

      {/* Fine grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 pb-16 pt-20 sm:pt-24 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-32">
          {/* Left: editorial text */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
              <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium tracking-wide text-white/70">
                200+ véhicules disponibles maintenant
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              L&apos;excellence de la
              <span className="block mt-1 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                location automobile
              </span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-white/55 sm:text-lg max-w-md">
              Une flotte premium, un service irréprochable et des tarifs
              transparents dans toute la Côte d&apos;Ivoire.
            </p>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-white/50"
                >
                  <badge.icon className="size-4 text-white/40" />
                  <span className="text-xs font-medium">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="mt-10 flex gap-10">
              {[
                { value: "200+", label: "Véhicules" },
                { value: "5", label: "Agences" },
                { value: "98%", label: "Satisfaction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-xs text-white/40 uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: search card with glass effect */}
          <div className="relative">
            {/* Decorative glow behind card */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl"
            />

            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white">
                  Réservez votre véhicule
                </h2>
                <p className="mt-1 text-sm text-white/40">
                  En quelques clics, à partir de 15 000 FCFA/jour
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label className="flex items-center gap-1.5 text-xs font-medium text-white/60">
                      <Calendar className="size-3 text-primary" />
                      Début
                    </Label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="h-11 border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-primary/50 focus:ring-primary/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="flex items-center gap-1.5 text-xs font-medium text-white/60">
                      <Calendar className="size-3 text-primary" />
                      Fin
                    </Label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="h-11 border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-primary/50 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="flex items-center gap-1.5 text-xs font-medium text-white/60">
                    <MapPin className="size-3 text-primary" />
                    Agence de retrait
                  </Label>
                  <Select value={agency} onValueChange={setAgency}>
                    <SelectTrigger className="h-11 border-white/10 bg-white/5 text-white [&>span]:text-white/60">
                      <SelectValue placeholder="Choisir une agence" />
                    </SelectTrigger>
                    <SelectContent>
                      {AGENCIES.map((a) => (
                        <SelectItem key={a.value} value={a.value}>
                          {a.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="flex items-center gap-1.5 text-xs font-medium text-white/60">
                    <Tag className="size-3 text-primary" />
                    Catégorie
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-11 border-white/10 bg-white/5 text-white [&>span]:text-white/60">
                      <SelectValue placeholder="Toutes catégories" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  size="lg"
                  className="w-full gap-2 h-12 text-sm font-semibold mt-2"
                  onClick={handleSearch}
                >
                  <Search className="size-4" />
                  Rechercher un véhicule
                </Button>
              </div>

              <p className="mt-4 text-center text-[11px] text-white/30">
                Paiement sécurisé par Mobile Money · Aucun frais caché
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border gradient */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
    </section>
  );
}
