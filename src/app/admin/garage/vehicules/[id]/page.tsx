"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Gauge,
  Wrench,
  Banknote,
  Calendar,
  MapPin,
  FileText,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { Progress } from "@/shared/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";

import {
  MAINTENANCE_VEHICULES,
  INTERVENTIONS,
} from "@/core/data/mock/garage";
import {
  formatMontant,
  formatKilometrage,
  formatDate,
} from "@/core/utils/adminHelpers";

import MileageChart from "@/shared/components/admin/charts/MileageChart";
import MaintenanceCostChart from "@/shared/components/admin/charts/MaintenanceCostChart";

import type {
  InterventionType,
  InterventionStatut,
} from "@/core/types/admin";

// ---------------------------------------------------------------------------
// Badge configs
// ---------------------------------------------------------------------------

const TYPE_CONFIG: Record<InterventionType, { label: string; className: string }> = {
  maintenance_preventive: {
    label: "Maintenance preventive",
    className: "bg-blue-500/10 text-blue-700 border-blue-200",
  },
  reparation: {
    label: "Reparation",
    className: "bg-red-500/10 text-red-700 border-red-200",
  },
  revision: {
    label: "Revision",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
  carrosserie: {
    label: "Carrosserie",
    className: "bg-amber-500/10 text-amber-700 border-amber-200",
  },
  pneus: {
    label: "Pneus",
    className: "bg-gray-500/10 text-gray-700 border-gray-200",
  },
};

const STATUT_CONFIG: Record<InterventionStatut, { label: string; className: string }> = {
  planifiee: {
    label: "Planifiee",
    className: "bg-blue-500/10 text-blue-700 border-blue-200",
  },
  en_cours: {
    label: "En cours",
    className: "bg-amber-500/10 text-amber-700 border-amber-200",
  },
  terminee: {
    label: "Terminee",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
  annulee: {
    label: "Annulee",
    className: "bg-red-500/10 text-red-700 border-red-200",
  },
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function GarageVehiculeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const vehicule = MAINTENANCE_VEHICULES.find((v) => v.vehiculeId === id);

  if (!vehicule) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Vehicule non trouve
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Aucun vehicule ne correspond a cet identifiant.
          </p>
        </div>
        <Link href="/admin/garage">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="size-4" />
            Retour au garage
          </Button>
        </Link>
      </div>
    );
  }

  const interventions = INTERVENTIONS.filter(
    (i) => i.vehiculeId === vehicule.vehiculeId
  ).sort((a, b) => b.dateDebut.localeCompare(a.dateDebut));

  const progressRatio = Math.min(
    Math.round((vehicule.kilometrageActuel / vehicule.prochainEntretien) * 100),
    100
  );

  return (
    <div className="space-y-8">
      {/* Back button */}
      <Link href="/admin/garage">
        <Button variant="ghost" size="sm" className="gap-2 -ml-2">
          <ArrowLeft className="size-4" />
          Retour au garage
        </Button>
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {vehicule.nom}
          </h1>
          <Badge variant="outline" className="bg-secondary/50 text-secondary-foreground border-border">
            {vehicule.immatriculation}
          </Badge>
        </div>
      </div>

      {/* KPI Row */}
      <section aria-label="Indicateurs cles">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Kilometrage actuel */}
          <Card className="gap-0 py-5">
            <CardContent className="px-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground font-medium">
                    Kilometrage actuel
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                    {formatKilometrage(vehicule.kilometrageActuel)}
                  </p>
                </div>
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Gauge className="size-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prochain entretien */}
          <Card className="gap-0 py-5">
            <CardContent className="px-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground font-medium">
                    Prochain entretien
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                    {formatKilometrage(vehicule.prochainEntretien)}
                  </p>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatKilometrage(vehicule.kilometrageActuel)}</span>
                      <span>{progressRatio}%</span>
                    </div>
                    <Progress value={progressRatio} />
                  </div>
                </div>
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
                  <Wrench className="size-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cout maintenance total */}
          <Card className="gap-0 py-5">
            <CardContent className="px-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground font-medium">
                    Cout maintenance total
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                    {formatMontant(vehicule.coutMaintenanceTotal)}
                  </p>
                </div>
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
                  <Banknote className="size-5 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Mileage chart */}
        <Card className="gap-0 py-0">
          <CardHeader className="px-6 py-5 border-b">
            <CardTitle className="text-base">
              Progression kilometrique
            </CardTitle>
            <CardDescription className="mt-0.5">
              Evolution du kilometrage au fil du temps
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <MileageChart data={vehicule.historiqueKilometrage} />
          </CardContent>
        </Card>

        {/* Maintenance cost chart */}
        <Card className="gap-0 py-0">
          <CardHeader className="px-6 py-5 border-b">
            <CardTitle className="text-base">
              Couts de maintenance
            </CardTitle>
            <CardDescription className="mt-0.5">
              Repartition mensuelle des couts de maintenance
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <MaintenanceCostChart data={vehicule.coutsMensuels} />
          </CardContent>
        </Card>
      </div>

      {/* Interventions history */}
      <Card className="gap-0 py-0">
        <CardHeader className="px-6 py-5 border-b">
          <CardTitle className="text-base flex items-center gap-2">
            <Wrench className="size-4 text-primary" />
            Historique des interventions
          </CardTitle>
          <CardDescription className="mt-0.5">
            {interventions.length} intervention{interventions.length > 1 ? "s" : ""} enregistree{interventions.length > 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {interventions.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              Aucune intervention enregistree pour ce vehicule.
            </div>
          ) : (
            <Accordion type="single" collapsible className="px-6">
              {interventions.map((intervention) => {
                const typeCfg = TYPE_CONFIG[intervention.type];
                const statutCfg = STATUT_CONFIG[intervention.statut];

                return (
                  <AccordionItem key={intervention.id} value={intervention.id}>
                    <AccordionTrigger className="gap-3">
                      <div className="flex flex-1 flex-wrap items-center gap-2">
                        <span className="font-semibold text-sm text-foreground">
                          {intervention.id}
                        </span>
                        <Badge variant="outline" className={typeCfg.className}>
                          {typeCfg.label}
                        </Badge>
                        <Badge variant="outline" className={statutCfg.className}>
                          {statutCfg.label}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(intervention.dateDebut)}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
                        {/* Description */}
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            Description
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {intervention.description}
                          </p>
                        </div>

                        <Separator />

                        {/* Details grid */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="size-4 text-muted-foreground shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground">Garage</p>
                              <p className="text-sm font-medium text-foreground">
                                {intervention.garageNom}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Gauge className="size-4 text-muted-foreground shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground">Kilometrage</p>
                              <p className="text-sm font-medium text-foreground">
                                {formatKilometrage(intervention.kilometrage)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Banknote className="size-4 text-muted-foreground shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground">Cout</p>
                              <p className="text-sm font-medium text-foreground">
                                {intervention.cout > 0
                                  ? formatMontant(intervention.cout)
                                  : "\u2014"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="size-4 text-muted-foreground shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground">Date debut</p>
                              <p className="text-sm font-medium text-foreground">
                                {formatDate(intervention.dateDebut)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="size-4 text-muted-foreground shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground">Date fin</p>
                              <p className="text-sm font-medium text-foreground">
                                {intervention.dateFin
                                  ? formatDate(intervention.dateFin)
                                  : "\u2014"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Invoice link */}
                        {intervention.factureId && (
                          <>
                            <Separator />
                            <Link
                              href={`/admin/finances/documents/${intervention.factureId}`}
                            >
                              <Button variant="outline" size="sm" className="gap-2">
                                <FileText className="size-4" />
                                Voir la facture
                              </Button>
                            </Link>
                          </>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
