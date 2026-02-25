"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Car,
  MapPin,
  Phone,
  Gauge,
  Banknote,
  Calendar,
  FileText,
  Wrench,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  CalendarClock,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { Progress } from "@/shared/components/ui/progress";

import {
  INTERVENTIONS,
  GARAGES,
  MAINTENANCE_VEHICULES,
} from "@/core/data/mock/garage";
import {
  formatMontant,
  formatKilometrage,
  formatDate,
} from "@/core/utils/adminHelpers";

import type {
  InterventionType,
  InterventionStatut,
  UrgenceNiveau,
} from "@/core/types/admin";

// ---------------------------------------------------------------------------
// Badge configs
// ---------------------------------------------------------------------------

const TYPE_CONFIG: Record<
  InterventionType,
  { label: string; className: string }
> = {
  maintenance_preventive: {
    label: "Maintenance préventive",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  reparation: {
    label: "Réparation",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  revision: {
    label: "Révision",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
  carrosserie: {
    label: "Carrosserie",
    className: "bg-violet-500/10 text-violet-700 border-violet-200",
  },
  pneus: {
    label: "Pneus",
    className: "bg-orange-500/10 text-orange-700 border-orange-200",
  },
};

const STATUT_CONFIG: Record<
  InterventionStatut,
  { label: string; className: string; icon: React.ElementType }
> = {
  planifiee: {
    label: "Planifiée",
    className: "bg-primary/10 text-primary border-primary/20",
    icon: CalendarClock,
  },
  en_cours: {
    label: "En cours",
    className: "bg-amber-500/10 text-amber-700 border-amber-200",
    icon: Clock,
  },
  terminee: {
    label: "Terminée",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
  annulee: {
    label: "Annulée",
    className: "bg-destructive/10 text-destructive border-destructive/20",
    icon: XCircle,
  },
};

const URGENCE_CONFIG: Record<
  UrgenceNiveau,
  { label: string; className: string }
> = {
  basse: {
    label: "Basse",
    className: "bg-secondary text-secondary-foreground border-border",
  },
  moyenne: {
    label: "Moyenne",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  haute: {
    label: "Haute",
    className: "bg-amber-500/10 text-amber-700 border-amber-200",
  },
  critique: {
    label: "Critique",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function InterventionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const intervention = INTERVENTIONS.find((i) => i.id === id);

  if (!intervention) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Intervention non trouvée
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Aucune intervention ne correspond à cet identifiant.
          </p>
        </div>
        <Link href="/admin/garage/interventions">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="size-4" />
            Retour aux interventions
          </Button>
        </Link>
      </div>
    );
  }

  const garage = GARAGES.find((g) => g.id === intervention.garageId);
  const vehicule = MAINTENANCE_VEHICULES.find(
    (v) => v.vehiculeId === intervention.vehiculeId
  );

  const statutCfg = STATUT_CONFIG[intervention.statut];
  const typeCfg = TYPE_CONFIG[intervention.type];
  const urgenceCfg = URGENCE_CONFIG[intervention.urgence];
  const StatutIcon = statutCfg.icon;

  // Calcul de la durée en jours
  const dureeJours = intervention.dateFin
    ? Math.ceil(
        (new Date(intervention.dateFin).getTime() -
          new Date(intervention.dateDebut).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  // Timeline events
  const timelineEvents: {
    label: string;
    date?: string;
    icon: React.ElementType;
    active: boolean;
    color: string;
  }[] = [
    {
      label: "Intervention planifiée",
      date: intervention.dateDebut,
      icon: CalendarClock,
      active: true,
      color: "text-primary",
    },
    {
      label: "Prise en charge",
      date:
        intervention.statut !== "planifiee" &&
        intervention.statut !== "annulee"
          ? intervention.dateDebut
          : undefined,
      icon: Wrench,
      active:
        intervention.statut === "en_cours" ||
        intervention.statut === "terminee",
      color: "text-amber-600",
    },
    {
      label: "Intervention terminée",
      date:
        intervention.statut === "terminee"
          ? intervention.dateFin
          : undefined,
      icon: CheckCircle2,
      active: intervention.statut === "terminee",
      color: "text-emerald-600",
    },
  ];

  if (intervention.statut === "annulee") {
    timelineEvents.push({
      label: "Intervention annulée",
      date: intervention.dateDebut,
      icon: XCircle,
      active: true,
      color: "text-destructive",
    });
  }

  return (
    <div className="space-y-8">
      {/* Back button */}
      <Link
        href="/admin/garage/interventions"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        Retour aux interventions
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {intervention.id}
            </h1>
            <Badge variant="outline" className={typeCfg.className}>
              {typeCfg.label}
            </Badge>
            <Badge variant="outline" className={statutCfg.className}>
              <StatutIcon className="size-3 mr-1" />
              {statutCfg.label}
            </Badge>
            <Badge variant="outline" className={urgenceCfg.className}>
              <AlertTriangle className="size-3 mr-1" />
              {urgenceCfg.label}
            </Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {intervention.description}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link href={`/admin/garage/vehicules/${intervention.vehiculeId}`}>
            <Button variant="outline" size="sm" className="gap-2">
              <Car className="size-3.5" />
              Fiche véhicule
            </Button>
          </Link>
          {intervention.factureId && (
            <Link
              href={`/admin/finances/documents/${intervention.factureId}`}
            >
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="size-3.5" />
                Voir la facture
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Coût */}
        <Card className="gap-0 py-5">
          <CardContent className="px-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground font-medium">
                  Coût
                </p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                  {intervention.cout > 0
                    ? formatMontant(intervention.cout)
                    : "—"}
                </p>
              </div>
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
                <Banknote className="size-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kilométrage */}
        <Card className="gap-0 py-5">
          <CardContent className="px-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground font-medium">
                  Kilométrage
                </p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                  {formatKilometrage(intervention.kilometrage)}
                </p>
              </div>
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Gauge className="size-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Durée */}
        <Card className="gap-0 py-5">
          <CardContent className="px-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground font-medium">
                  Durée
                </p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                  {dureeJours !== null ? `${dureeJours} jour${dureeJours > 1 ? "s" : ""}` : "En cours"}
                </p>
              </div>
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                <Clock className="size-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Urgence */}
        <Card className="gap-0 py-5">
          <CardContent className="px-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground font-medium">
                  Niveau d&apos;urgence
                </p>
                <div className="mt-2">
                  <Badge
                    variant="outline"
                    className={`${urgenceCfg.className} text-base px-3 py-1`}
                  >
                    {urgenceCfg.label}
                  </Badge>
                </div>
              </div>
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                <AlertTriangle className="size-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column — 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Véhicule card */}
          <Card className="gap-0 py-0">
            <CardHeader className="px-6 py-5 border-b">
              <CardTitle className="text-base flex items-center gap-2">
                <Car className="size-4 text-primary" />
                Véhicule
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Véhicule</p>
                    <p className="text-sm font-semibold text-foreground">
                      {intervention.vehiculeNom}
                    </p>
                  </div>
                  {vehicule && (
                    <>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Immatriculation
                        </p>
                        <Badge
                          variant="outline"
                          className="bg-secondary/50 text-secondary-foreground border-border mt-0.5"
                        >
                          {vehicule.immatriculation}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Kilométrage actuel
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {formatKilometrage(vehicule.kilometrageActuel)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                {vehicule && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Prochain entretien
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {formatKilometrage(vehicule.prochainEntretien)}
                    </p>
                    <div className="w-40">
                      <Progress
                        value={Math.min(
                          Math.round(
                            (vehicule.kilometrageActuel /
                              vehicule.prochainEntretien) *
                              100
                          ),
                          100
                        )}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatKilometrage(
                        vehicule.prochainEntretien -
                          vehicule.kilometrageActuel
                      )}{" "}
                      restants
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Détails intervention */}
          <Card className="gap-0 py-0">
            <CardHeader className="px-6 py-5 border-b">
              <CardTitle className="text-base flex items-center gap-2">
                <Wrench className="size-4 text-primary" />
                Détails de l&apos;intervention
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Description</p>
                  <p className="mt-1 text-sm text-foreground">
                    {intervention.description}
                  </p>
                </div>
                <Separator />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <Calendar className="size-4 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Date de début
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {formatDate(intervention.dateDebut)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="size-4 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Date de fin
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {intervention.dateFin
                          ? formatDate(intervention.dateFin)
                          : "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Gauge className="size-4 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Kilométrage à l&apos;entrée
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {formatKilometrage(intervention.kilometrage)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Banknote className="size-4 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Coût</p>
                      <p className="text-sm font-semibold text-foreground">
                        {intervention.cout > 0
                          ? formatMontant(intervention.cout)
                          : "—"}
                      </p>
                    </div>
                  </div>
                </div>
                {intervention.factureId && (
                  <>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <FileText className="size-4 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Facture associée
                        </p>
                        <Link
                          href={`/admin/finances/documents/${intervention.factureId}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {intervention.factureId}
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column — 1/3 */}
        <div className="space-y-6">
          {/* Garage card */}
          {garage && (
            <Card className="gap-0 py-0">
              <CardHeader className="px-6 py-5 border-b">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="size-4 text-primary" />
                  Garage partenaire
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {garage.nom}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {garage.adresse}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="size-3.5 shrink-0" />
                  {garage.telephone}
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Note</span>
                  <span className="font-semibold text-foreground">
                    {garage.note} / 5
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Satisfaction</span>
                  <span className="font-semibold text-foreground">
                    {garage.tauxSatisfaction} %
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Interventions</span>
                  <span className="font-semibold text-foreground">
                    {garage.interventionsTotal}
                  </span>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Spécialités
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {garage.specialites.map((s) => (
                      <Badge
                        key={s}
                        variant="outline"
                        className="bg-secondary/50 text-secondary-foreground border-border text-xs"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline card */}
          <Card className="gap-0 py-0">
            <CardHeader className="px-6 py-5 border-b">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="size-4 text-primary" />
                Suivi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative space-y-6 pl-6">
                {/* Vertical line */}
                <div className="absolute left-[9px] top-1 bottom-1 w-px bg-border" />

                {timelineEvents.map((event, idx) => {
                  const EventIcon = event.icon;
                  return (
                    <div key={idx} className="relative flex items-start gap-3">
                      <div
                        className={`absolute -left-6 flex size-[18px] items-center justify-center rounded-full border-2 ${
                          event.active
                            ? "bg-card border-current " + event.color
                            : "bg-muted border-muted-foreground/30"
                        }`}
                      >
                        <EventIcon
                          className={`size-2.5 ${
                            event.active
                              ? event.color
                              : "text-muted-foreground/50"
                          }`}
                        />
                      </div>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            event.active
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {event.label}
                        </p>
                        {event.date && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatDate(event.date)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
