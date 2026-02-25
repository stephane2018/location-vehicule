"use client";

// import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Building2,
  Car,
  Clock,
  Mail,
  MapPin,
  Navigation,
  Phone,
  ArrowRight,
  Star,
  Shield,
  Users,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AgencePublic {
  id: string;
  nom: string;
  ville: string;
  adresse: string;
  telephone: string;
  email: string;
  horaires: string;
  nombreVehicules: number;
  coordonnees: { lat: number; lng: number };
  image: string;
  gradient: { from: string; to: string };
  rating: number;
  avisCount: number;
}

// ─── Mock data ───────────────────────────────────────────────────────────────

const AGENCES: AgencePublic[] = [
  {
    id: "AGC-001",
    nom: "AutoLoc Cocody",
    ville: "Abidjan",
    adresse: "Rue des Jardins, Cocody, Abidjan",
    telephone: "+225 07 11 22 33 44",
    email: "cocody@autoloc-ci.com",
    horaires: "Lun-Sam : 08h00 - 18h00",
    nombreVehicules: 15,
    coordonnees: { lat: 5.3599, lng: -3.9854 },
    image:
      "https://images.unsplash.com/photo-1671917057310-88d5fd951ece?auto=format&fit=crop&w=800&q=80",
    gradient: { from: "#1d4ed8", to: "#3b82f6" },
    rating: 4.9,
    avisCount: 142,
  },
  {
    id: "AGC-002",
    nom: "AutoLoc Plateau",
    ville: "Abidjan",
    adresse: "Avenue Houphouët-Boigny, Plateau, Abidjan",
    telephone: "+225 07 55 66 77 88",
    email: "plateau@autoloc-ci.com",
    horaires: "Lun-Sam : 08h00 - 18h00",
    nombreVehicules: 12,
    coordonnees: { lat: 5.3167, lng: -4.0167 },
    image:
      "https://images.unsplash.com/photo-1648770664367-54d43741edf1?auto=format&fit=crop&w=800&q=80",
    gradient: { from: "#064e3b", to: "#10b981" },
    rating: 4.8,
    avisCount: 98,
  },
  {
    id: "AGC-003",
    nom: "AutoLoc Yamoussoukro",
    ville: "Yamoussoukro",
    adresse: "Boulevard de la Paix, Yamoussoukro",
    telephone: "+225 07 22 33 44 55",
    email: "yamoussoukro@autoloc-ci.com",
    horaires: "Lun-Sam : 08h00 - 18h00",
    nombreVehicules: 8,
    coordonnees: { lat: 6.8276, lng: -5.2893 },
    image:
      "https://images.unsplash.com/photo-1660469668872-72ffb0e2d810?auto=format&fit=crop&w=800&q=80",
    gradient: { from: "#7f1d1d", to: "#ef4444" },
    rating: 4.7,
    avisCount: 56,
  },
  {
    id: "AGC-004",
    nom: "AutoLoc Bouaké",
    ville: "Bouaké",
    adresse: "Quartier Commerce, Avenue du Général de Gaulle, Bouaké",
    telephone: "+225 07 44 55 66 77",
    email: "bouake@autoloc-ci.com",
    horaires: "Lun-Sam : 08h00 - 17h00",
    nombreVehicules: 6,
    coordonnees: { lat: 7.6833, lng: -5.0167 },
    image:
      "https://images.unsplash.com/photo-1741991110666-88115e724741?auto=format&fit=crop&w=800&q=80",
    gradient: { from: "#4c1d95", to: "#7c3aed" },
    rating: 4.8,
    avisCount: 34,
  },
  {
    id: "AGC-005",
    nom: "AutoLoc San Pedro",
    ville: "San Pedro",
    adresse: "Zone Industrielle, San Pedro",
    telephone: "+225 07 88 99 00 11",
    email: "sanpedro@autoloc-ci.com",
    horaires: "Lun-Ven : 08h00 - 17h00",
    nombreVehicules: 4,
    coordonnees: { lat: 4.7485, lng: -6.6363 },
    image:
      "https://images.unsplash.com/photo-1763454310351-abd6b81167bb?auto=format&fit=crop&w=800&q=80",
    gradient: { from: "#b45309", to: "#f59e0b" },
    rating: 4.6,
    avisCount: 21,
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function AgenceCard({ agence }: { agence: AgencePublic }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={agence.image}
          alt={`Agence ${agence.nom} - ${agence.ville}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Overlay content */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-bold text-white">{agence.nom}</h3>
          <div className="mt-1 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star className="size-3 text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-white">
                {agence.rating}
              </span>
              <span className="text-xs text-white/60">
                ({agence.avisCount} avis)
              </span>
            </div>
          </div>
        </div>

        {/* Badge */}
        <Badge className="absolute top-3 right-3 bg-white/90 text-foreground shadow-sm text-[10px] font-semibold backdrop-blur-sm">
          {agence.nombreVehicules} véhicules
        </Badge>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="space-y-3 flex-1">
          <div className="flex items-start gap-2.5">
            <MapPin className="size-4 shrink-0 text-primary mt-0.5" />
            <p className="text-sm text-muted-foreground leading-snug">
              {agence.adresse}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Phone className="size-4 shrink-0 text-primary" />
            <a
              href={`tel:${agence.telephone.replace(/\s/g, "")}`}
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              {agence.telephone}
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            <Mail className="size-4 shrink-0 text-primary" />
            <a
              href={`mailto:${agence.email}`}
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              {agence.email}
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            <Clock className="size-4 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">{agence.horaires}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-5 pt-4 border-t border-border/50">
          <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs border-border/50">
            <Phone className="size-3.5" />
            Appeler
          </Button>
          <Button size="sm" className="flex-1 gap-1.5 text-xs">
            <Navigation className="size-3.5" />
            Itinéraire
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function AgencesPage() {
  const router = useRouter();
  const totalVehicules = AGENCES.reduce((s, a) => s + a.nombreVehicules, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero banner ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[oklch(0.13_0.02_250)]" />

        {/* Gradient accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 30% 40%, oklch(0.3 0.15 260 / 0.2), transparent)",
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

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Notre réseau
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Nos agences en
              <span className="block mt-1 text-white/50">
                Côte d&apos;Ivoire
              </span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/40 max-w-lg">
              Un réseau de {AGENCES.length} agences stratégiquement positionnées
              pour vous servir avec une flotte de {totalVehicules} véhicules,
              partout en Côte d&apos;Ivoire.
            </p>

            {/* Stats */}
            <div className="mt-8 flex items-center gap-8">
              {[
                { value: String(AGENCES.length), label: "Agences" },
                { value: String(totalVehicules), label: "Véhicules" },
                { value: "4", label: "Villes" },
                { value: "6j/7", label: "Ouverture" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs text-white/35">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"
        />
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* ── Trust bar ── */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-border/50 bg-card px-6 py-4 shadow-sm">
          {[
            { icon: Shield, label: "Assurance incluse" },
            { icon: Clock, label: "Ouvert 6j/7" },
            { icon: Users, label: "5 000+ clients satisfaits" },
            { icon: Star, label: "4.8/5 note moyenne" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <item.icon className="size-4 text-primary" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* ── Map placeholder ── */}
        <div className="mb-10 relative rounded-2xl border border-border/50 bg-muted/20 h-72 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-muted/60 mx-auto">
                <MapPin className="size-6 text-muted-foreground/50" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Carte interactive
                </p>
                <p className="text-xs text-muted-foreground/60">
                  Bientôt disponible
                </p>
              </div>
            </div>
          </div>
          {/* Decorative dots representing cities */}
          <div className="absolute inset-0 pointer-events-none">
            {AGENCES.map((agence, i) => {
              const positions = [
                { top: "45%", left: "35%" },
                { top: "48%", left: "33%" },
                { top: "30%", left: "40%" },
                { top: "22%", left: "42%" },
                { top: "58%", left: "25%" },
              ];
              const pos = positions[i];
              return (
                <div
                  key={agence.id}
                  className="absolute flex items-center gap-1.5"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <div className="size-2.5 rounded-full bg-primary shadow-lg shadow-primary/30 animate-pulse" />
                  <span className="text-[10px] font-medium text-muted-foreground/80 whitespace-nowrap">
                    {agence.ville === "Abidjan"
                      ? agence.nom.replace("AutoLoc ", "")
                      : agence.ville}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Agencies grid ── */}
        <section aria-label="Liste des agences" className="mb-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
                {AGENCES.length} agences
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Trouvez l&apos;agence la plus proche
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AGENCES.map((agence) => (
              <AgenceCard key={agence.id} agence={agence} />
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-[oklch(0.13_0.02_250)]" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 70% 50%, oklch(0.3 0.15 260 / 0.15), transparent)",
            }}
          />

          <div className="relative px-8 py-12 sm:px-12 sm:py-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Besoin d&apos;aide ?
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Notre équipe est à votre écoute
            </h2>
            <p className="mt-3 text-white/40 max-w-lg mx-auto">
              Contactez-nous pour trouver le véhicule et l&apos;agence qui
              correspondent parfaitement à vos besoins.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" className="gap-2 font-semibold">
                <Phone className="size-4" />
                +225 27 00 00 00
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-white/15 bg-transparent text-white hover:bg-white/5 hover:text-white w-full sm:w-auto"
                onClick={() => router.push("/contact")}
              >
                Nous contacter
                <ArrowRight className="size-4" />
              </Button>
            </div>
            <p className="mt-6 text-xs text-white/25">
              Lun-Sam : 08h00 - 18h00 · Réponse sous 30 minutes
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
