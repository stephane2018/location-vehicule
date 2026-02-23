import {
  BadgeDollarSign,
  Car,
  Headphones,
  MapPinned,
  Shield,
  Smartphone,
} from "lucide-react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}

const FEATURES: Feature[] = [
  {
    icon: BadgeDollarSign,
    title: "Tarifs transparents",
    description:
      "Pas de frais cachés, pas de mauvaise surprise. Le prix affiché est le prix final, assurance et kilométrage illimité inclus.",
    stat: "0",
    statLabel: "frais cachés",
  },
  {
    icon: Car,
    title: "Flotte récente",
    description:
      "Tous nos véhicules ont moins de 3 ans et sont entretenus méticuleusement entre chaque location.",
    stat: "<3",
    statLabel: "ans d'âge moyen",
  },
  {
    icon: MapPinned,
    title: "5 agences",
    description:
      "Présents à Abidjan, Yamoussoukro, Bouaké et San Pedro. Retrait et restitution flexibles entre nos agences.",
    stat: "5",
    statLabel: "villes couvertes",
  },
  {
    icon: Headphones,
    title: "Assistance 24/7",
    description:
      "Notre équipe est joignable à tout moment pour vous assister en cas de besoin, de jour comme de nuit.",
    stat: "24/7",
    statLabel: "support client",
  },
  {
    icon: Shield,
    title: "Assurance incluse",
    description:
      "Chaque location comprend une assurance tous risques pour rouler en toute sérénité sur les routes ivoiriennes.",
    stat: "100%",
    statLabel: "couverture",
  },
  {
    icon: Smartphone,
    title: "Paiement Mobile Money",
    description:
      "Payez simplement via Orange Money, MTN MoMo, Moov Money ou Wave. Pas besoin de carte bancaire.",
    stat: "4",
    statLabel: "moyens de paiement",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <div className="group relative flex flex-col rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
      {/* Stat badge — top right */}
      <div className="absolute top-5 right-5 text-right">
        <div className="text-lg font-bold text-primary leading-none">
          {feature.stat}
        </div>
        <div className="mt-0.5 text-[10px] text-muted-foreground uppercase tracking-wider">
          {feature.statLabel}
        </div>
      </div>

      {/* Icon */}
      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/8 mb-5 transition-colors duration-300 group-hover:bg-primary/12">
        <Icon className="size-5 text-primary" />
      </div>

      {/* Text */}
      <h3 className="text-sm font-semibold text-foreground mb-2">
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {feature.description}
      </p>
    </div>
  );
}

export function WhyUsSection() {
  return (
    <section
      className="bg-background py-20 sm:py-24 lg:py-28"
      aria-labelledby="why-us-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Nos engagements
          </p>
          <h2
            id="why-us-heading"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Pourquoi choisir AutoLoc CI
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Des avantages concrets pour une expérience de location
            sans compromis.
          </p>
        </div>

        {/* Bento grid: 3 cols on desktop */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
