import React from "react";
import {
  Plus,
  MapPin,
  Phone,
  Car,
  User,
  Pencil,
  Eye,
  Building2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Agence {
  id: string;
  nom: string;
  ville: string;
  adresse: string;
  telephone: string;
  responsable: string;
  nombreVehicules: number;
  vehiculesDisponibles: number;
  statut: "active" | "inactive";
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const AGENCES_MOCK: Agence[] = [
  {
    id: "AGC-001",
    nom: "AutoLoc Cocody",
    ville: "Abidjan",
    adresse: "Rue des Jardins, Cocody, Abidjan",
    telephone: "+225 07 11 22 33 44",
    responsable: "Kouadio Jean-Baptiste",
    nombreVehicules: 15,
    vehiculesDisponibles: 8,
    statut: "active",
  },
  {
    id: "AGC-002",
    nom: "AutoLoc Plateau",
    ville: "Abidjan",
    adresse: "Avenue Houphouët-Boigny, Plateau, Abidjan",
    telephone: "+225 07 55 66 77 88",
    responsable: "Traoré Aminata",
    nombreVehicules: 12,
    vehiculesDisponibles: 5,
    statut: "active",
  },
  {
    id: "AGC-003",
    nom: "AutoLoc Yamoussoukro",
    ville: "Yamoussoukro",
    adresse: "Boulevard de la Paix, Yamoussoukro",
    telephone: "+225 07 22 33 44 55",
    responsable: "Koné Mamadou",
    nombreVehicules: 8,
    vehiculesDisponibles: 4,
    statut: "active",
  },
  {
    id: "AGC-004",
    nom: "AutoLoc Bouaké",
    ville: "Bouaké",
    adresse: "Quartier Commerce, Avenue du Général de Gaulle, Bouaké",
    telephone: "+225 07 44 55 66 77",
    responsable: "Diallo Fatoumata",
    nombreVehicules: 6,
    vehiculesDisponibles: 3,
    statut: "active",
  },
  {
    id: "AGC-005",
    nom: "AutoLoc San Pedro",
    ville: "San Pedro",
    adresse: "Zone Industrielle, San Pedro",
    telephone: "+225 07 88 99 00 11",
    responsable: "Yao François",
    nombreVehicules: 4,
    vehiculesDisponibles: 3,
    statut: "active",
  },
];

// Occupation ratio thresholds for color coding
function getOccupationVariant(
  total: number,
  disponibles: number
): { barWidth: string; barColor: string } {
  const occupationRate = total > 0 ? ((total - disponibles) / total) * 100 : 0;

  if (occupationRate >= 80) {
    return {
      barWidth: `${occupationRate}%`,
      barColor: "bg-destructive",
    };
  }
  if (occupationRate >= 50) {
    return {
      barWidth: `${occupationRate}%`,
      barColor: "bg-amber-500",
    };
  }
  return {
    barWidth: `${occupationRate}%`,
    barColor: "bg-emerald-500",
  };
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function AgenceCard({ agence }: { agence: Agence }) {
  const occupation = getOccupationVariant(
    agence.nombreVehicules,
    agence.vehiculesDisponibles
  );
  const enLocation = agence.nombreVehicules - agence.vehiculesDisponibles;

  return (
    <Card className="gap-0 py-0 flex flex-col hover:shadow-md transition-shadow">
      {/* Card header with name and status badge */}
      <CardHeader className="px-5 pt-5 pb-4 border-b gap-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="size-5 text-primary" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-base truncate">{agence.nom}</CardTitle>
              <CardDescription className="mt-0.5 text-xs">
                {agence.id}
              </CardDescription>
            </div>
          </div>
          <Badge
            variant="outline"
            className="shrink-0 bg-emerald-500/10 text-emerald-700 border-emerald-200"
          >
            Active
          </Badge>
        </div>
      </CardHeader>

      {/* Card body: contact info */}
      <CardContent className="px-5 py-4 flex-1 space-y-3">
        {/* Address */}
        <div className="flex items-start gap-2.5">
          <MapPin className="size-4 shrink-0 text-muted-foreground mt-0.5" />
          <p className="text-sm text-muted-foreground leading-snug">
            {agence.adresse}
          </p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2.5">
          <Phone className="size-4 shrink-0 text-muted-foreground" />
          <a
            href={`tel:${agence.telephone.replace(/\s/g, "")}`}
            className="text-sm text-foreground hover:text-primary transition-colors"
          >
            {agence.telephone}
          </a>
        </div>

        {/* Manager */}
        <div className="flex items-center gap-2.5">
          <User className="size-4 shrink-0 text-muted-foreground" />
          <p className="text-sm text-foreground">{agence.responsable}</p>
        </div>

        <Separator />

        {/* Vehicle count + occupation bar */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <Car className="size-4 shrink-0 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {agence.nombreVehicules} véhicules
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="text-emerald-600 font-medium">
                {agence.vehiculesDisponibles} libres
              </span>
              <span>·</span>
              <span className="text-amber-600 font-medium">
                {enLocation} en location
              </span>
            </div>
          </div>
          {/* Occupation progress bar */}
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${occupation.barColor}`}
              style={{ width: occupation.barWidth }}
              role="progressbar"
              aria-label="Taux d'occupation"
              aria-valuenow={enLocation}
              aria-valuemax={agence.nombreVehicules}
            />
          </div>
        </div>
      </CardContent>

      {/* Card footer: actions */}
      <CardFooter className="px-5 py-4 border-t gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-1.5"
          aria-label={`Modifier ${agence.nom}`}
        >
          <Pencil className="size-3.5" />
          Modifier
        </Button>
        <Button
          size="sm"
          className="flex-1 gap-1.5"
          aria-label={`Voir les véhicules de ${agence.nom}`}
        >
          <Eye className="size-3.5" />
          Voir véhicules
        </Button>
      </CardFooter>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Summary stats bar
// ---------------------------------------------------------------------------

function AgencesSummary({ agences }: { agences: Agence[] }) {
  const totalVehicules = agences.reduce((s, a) => s + a.nombreVehicules, 0);
  const totalDisponibles = agences.reduce(
    (s, a) => s + a.vehiculesDisponibles,
    0
  );
  const totalEnLocation = totalVehicules - totalDisponibles;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[
        { label: "Agences actives", value: agences.length, color: "text-primary" },
        { label: "Total véhicules", value: totalVehicules, color: "text-foreground" },
        {
          label: "Véhicules disponibles",
          value: totalDisponibles,
          color: "text-emerald-600",
        },
        {
          label: "Véhicules en location",
          value: totalEnLocation,
          color: "text-amber-600",
        },
      ].map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border bg-card p-4 shadow-sm"
        >
          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function AgencesPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Gestion des Agences
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gérez les agences de location AutoLoc CI à travers la Côte d&apos;Ivoire.
          </p>
        </div>
        <Button className="gap-2 self-start sm:self-auto">
          <Plus className="size-4" />
          Ajouter une agence
        </Button>
      </div>

      {/* Summary stats */}
      <AgencesSummary agences={AGENCES_MOCK} />

      {/* Agency grid */}
      <section aria-label="Liste des agences">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {AGENCES_MOCK.map((agence) => (
            <AgenceCard key={agence.id} agence={agence} />
          ))}
        </div>
      </section>
    </div>
  );
}
