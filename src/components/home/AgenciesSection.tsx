import Link from "next/link";
import { MapPin, Phone, Clock, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Agency {
  id: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  vehicleCount: number;
  gradient: string;
}

const AGENCIES: Agency[] = [
  {
    id: "abidjan-cocody",
    city: "Abidjan — Cocody",
    address: "Rue des Jardins, Cocody",
    phone: "+225 07 11 22 33 44",
    hours: "Lun-Sam · 08h-18h",
    vehicleCount: 45,
    gradient: "from-blue-500/8 to-blue-500/3",
  },
  {
    id: "abidjan-plateau",
    city: "Abidjan — Plateau",
    address: "Av. Houphouët-Boigny, Plateau",
    phone: "+225 07 55 66 77 88",
    hours: "Lun-Sam · 08h-18h",
    vehicleCount: 38,
    gradient: "from-emerald-500/8 to-emerald-500/3",
  },
  {
    id: "yamoussoukro",
    city: "Yamoussoukro",
    address: "Boulevard de la Paix",
    phone: "+225 07 22 33 44 55",
    hours: "Lun-Sam · 08h-18h",
    vehicleCount: 22,
    gradient: "from-amber-500/8 to-amber-500/3",
  },
  {
    id: "bouake",
    city: "Bouaké",
    address: "Av. du Général de Gaulle",
    phone: "+225 07 44 55 66 77",
    hours: "Lun-Sam · 08h-17h",
    vehicleCount: 18,
    gradient: "from-violet-500/8 to-violet-500/3",
  },
  {
    id: "san-pedro",
    city: "San Pedro",
    address: "Zone Industrielle",
    phone: "+225 07 88 99 00 11",
    hours: "Lun-Ven · 08h-17h",
    vehicleCount: 15,
    gradient: "from-rose-500/8 to-rose-500/3",
  },
];

function AgencyCard({ agency }: { agency: Agency }) {
  return (
    <div className="group relative flex flex-col rounded-2xl border border-border/50 bg-card overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
      {/* Top gradient strip */}
      <div className={`h-1 bg-gradient-to-r ${agency.gradient.replace('/8', '/40').replace('/3', '/20')}`} />

      <div className="flex flex-col gap-4 p-5 flex-1">
        {/* Header row */}
        <div className="flex items-start gap-3">
          <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${agency.gradient}`}>
            <Building2 className="size-5 text-foreground/70" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-foreground leading-snug">
              {agency.city}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {agency.vehicleCount} véhicules
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/60" />
            <span>{agency.address}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="size-3.5 shrink-0 text-muted-foreground/60" />
            <a
              href={`tel:${agency.phone.replace(/\s/g, "")}`}
              className="hover:text-primary transition-colors"
            >
              {agency.phone}
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="size-3.5 shrink-0 text-muted-foreground/60" />
            <span>{agency.hours}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-2">
          <Link
            href="/agences"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
          >
            Voir les véhicules
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function AgenciesSection() {
  return (
    <section
      className="bg-muted/30 py-20 sm:py-24 lg:py-28"
      aria-labelledby="agencies-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              Réseau
            </p>
            <h2
              id="agencies-heading"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Nos agences en Côte d&apos;Ivoire
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Un réseau de 5 agences stratégiquement positionnées pour
              vous servir où que vous soyez.
            </p>
          </div>
          <Button variant="outline" className="gap-2 shrink-0 self-start sm:self-auto" asChild>
            <Link href="/agences">
              Toutes nos agences
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {AGENCIES.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>

        {/* Map placeholder */}
        <div className="mt-10 rounded-2xl border border-border/50 bg-card h-48 flex items-center justify-center">
          <div className="text-center space-y-1">
            <MapPin className="size-8 text-muted-foreground/30 mx-auto" />
            <p className="text-xs text-muted-foreground">
              Carte interactive — bientôt disponible
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
