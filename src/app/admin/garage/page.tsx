import React from "react";
import Link from "next/link";
import {
  Wrench,
  Banknote,
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Star,
  ArrowRight,
  MapPin,
  Phone,
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
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/shared/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import {
  GARAGES,
  INTERVENTIONS,
  MAINTENANCE_VEHICULES,
} from "@/core/data/mock/garage";
import { CROSS_REPORT, VEHICLE_FINANCIALS } from "@/core/data/mock/finances";
import { formatMontant, formatDate } from "@/core/utils/adminHelpers";

import CrossReportChart from "@/shared/components/admin/charts/CrossReportChart";
import ImmobilizationChart from "@/shared/components/admin/charts/ImmobilizationChart";

// ---------------------------------------------------------------------------
// Types & Config
// ---------------------------------------------------------------------------

import type {
  InterventionType,
  InterventionStatut,
  UrgenceNiveau,
} from "@/core/types/admin";

const TYPE_CONFIG: Record<InterventionType, { label: string; className: string }> = {
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

const STATUT_CONFIG: Record<InterventionStatut, { label: string; className: string }> = {
  planifiee: {
    label: "Planifiée",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  en_cours: {
    label: "En cours",
    className: "bg-amber-500/10 text-amber-700 border-amber-200",
  },
  terminee: {
    label: "Terminée",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
  annulee: {
    label: "Annulée",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const URGENCE_CONFIG: Record<UrgenceNiveau, { label: string; className: string }> = {
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
// Computed data
// ---------------------------------------------------------------------------

const interventionsActives = INTERVENTIONS.filter(
  (i) => i.statut === "en_cours"
);

const coutMoisCourant = INTERVENTIONS.filter(
  (i) =>
    i.statut !== "annulee" &&
    i.dateDebut.startsWith("2026-02")
).reduce((sum, i) => sum + i.cout, 0);

const joursImmobilisationMoy = Math.round(
  VEHICLE_FINANCIALS.reduce((sum, v) => sum + v.joursImmobilisation, 0) /
    VEHICLE_FINANCIALS.length
);

const vehiculesProcheSeuil = MAINTENANCE_VEHICULES.filter(
  (v) => v.kilometrageActuel > v.prochainEntretien - 1000
);

const recentInterventions = [...INTERVENTIONS]
  .sort((a, b) => b.dateDebut.localeCompare(a.dateDebut))
  .slice(0, 5);

const immobilizationData = VEHICLE_FINANCIALS.filter(
  (v) => v.joursImmobilisation > 0
)
  .map((v) => ({
    nom: v.nom.replace(/\s+\d{4}$/, ""),
    jours: v.joursImmobilisation,
  }))
  .sort((a, b) => b.jours - a.jours)
  .slice(0, 8);

// ---------------------------------------------------------------------------
// KPI data
// ---------------------------------------------------------------------------

const KPI_DATA = [
  {
    label: "Interventions actives",
    value: String(interventionsActives.length),
    unit: "",
    trend: "+2",
    trendUp: true,
    trendLabel: "ce mois",
    icon: Wrench,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    label: "Coût maintenance mois",
    value: formatMontant(coutMoisCourant),
    unit: "",
    trend: "+18%",
    trendUp: false,
    trendLabel: "vs mois dernier",
    icon: Banknote,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
  {
    label: "Jours immobilisation moy.",
    value: String(joursImmobilisationMoy),
    unit: "jours",
    trend: "-2",
    trendUp: true,
    trendLabel: "vs mois dernier",
    icon: Clock,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
  {
    label: "Véhicules proches seuil",
    value: String(vehiculesProcheSeuil.length),
    unit: "",
    trend: "+3",
    trendUp: false,
    trendLabel: "ce mois",
    icon: AlertTriangle,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600",
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function KpiCard({
  label,
  value,
  unit,
  trend,
  trendUp,
  trendLabel,
  icon: Icon,
  iconBg,
  iconColor,
}: (typeof KPI_DATA)[number]) {
  const TrendIcon = trendUp ? TrendingUp : TrendingDown;
  const trendColor = trendUp ? "text-emerald-600" : "text-destructive";

  return (
    <Card className="gap-0 py-5">
      <CardContent className="px-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground font-medium truncate">
              {label}
            </p>
            <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                {value}
              </span>
              {unit && (
                <span className="text-xs font-medium text-muted-foreground">
                  {unit}
                </span>
              )}
            </div>
            <div className={`mt-1.5 flex items-center gap-1 ${trendColor}`}>
              <TrendIcon className="size-3.5 shrink-0" />
              <span className="text-xs font-semibold">{trend}</span>
              <span className="text-xs text-muted-foreground">{trendLabel}</span>
            </div>
          </div>
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
          >
            <Icon className={`size-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StarRating({ note }: { note: number }) {
  const full = Math.floor(note);
  const hasHalf = note - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className="size-3.5 fill-amber-400 text-amber-400"
        />
      ))}
      {hasHalf && (
        <Star className="size-3.5 fill-amber-400/50 text-amber-400" />
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="size-3.5 text-muted-foreground/30"
        />
      ))}
      <span className="ml-1.5 text-sm font-semibold text-foreground">
        {note.toFixed(1)}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function GaragePage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Garage & Maintenance
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Suivi de la maintenance et gestion des interventions
          </p>
        </div>
        <Link href="/admin/garage/interventions">
          <Button className="gap-2 self-start sm:self-auto">
            <Wrench className="size-4" />
            Voir les interventions
          </Button>
        </Link>
      </div>

      {/* KPI cards */}
      <section aria-label="Indicateurs clés">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {KPI_DATA.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>
      </section>

      {/* Alerts: vehicles approaching maintenance threshold */}
      {vehiculesProcheSeuil.length > 0 && (
        <section aria-label="Alertes maintenance">
          <div className="space-y-3">
            {vehiculesProcheSeuil.map((v) => {
              const kmRestant = v.prochainEntretien - v.kilometrageActuel;
              const isCritique = kmRestant <= 500;
              return (
                <Alert
                  key={v.vehiculeId}
                  variant={isCritique ? "destructive" : "default"}
                >
                  <AlertTriangle className="size-4" />
                  <AlertTitle>
                    {v.nom} ({v.immatriculation})
                  </AlertTitle>
                  <AlertDescription>
                    Prochain entretien à{" "}
                    {v.prochainEntretien.toLocaleString("fr-CI")} km — actuellement à{" "}
                    {v.kilometrageActuel.toLocaleString("fr-CI")} km.{" "}
                    <span className="font-semibold">
                      {kmRestant > 0
                        ? `${kmRestant.toLocaleString("fr-CI")} km restants`
                        : "Seuil dépassé"}
                    </span>
                  </AlertDescription>
                </Alert>
              );
            })}
          </div>
        </section>
      )}

      {/* Recent interventions table */}
      <Card className="gap-0 py-0">
        <CardHeader className="px-6 py-5 border-b">
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Wrench className="size-4 text-primary" />
                Interventions récentes
              </CardTitle>
              <CardDescription className="mt-0.5">
                Les 5 dernières interventions planifiées ou en cours
              </CardDescription>
            </div>
            <Link href="/admin/garage/interventions">
              <Button variant="outline" size="sm" className="gap-1.5">
                Tout voir
                <ArrowRight className="size-3.5" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">ID</TableHead>
                <TableHead>Véhicule</TableHead>
                <TableHead className="hidden md:table-cell">Garage</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="hidden lg:table-cell">Urgence</TableHead>
                <TableHead className="pr-6 text-right">Coût</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentInterventions.map((intervention) => {
                const typeCfg = TYPE_CONFIG[intervention.type];
                const statutCfg = STATUT_CONFIG[intervention.statut];
                const urgenceCfg = URGENCE_CONFIG[intervention.urgence];

                return (
                  <TableRow key={intervention.id}>
                    <TableCell className="pl-6">
                      <p className="font-semibold text-sm text-foreground">
                        {intervention.id}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(intervention.dateDebut)}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium text-foreground">
                        {intervention.vehiculeNom}
                      </p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {intervention.garageNom}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className={typeCfg.className}>
                        {typeCfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statutCfg.className}>
                        {statutCfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant="outline" className={urgenceCfg.className}>
                        {urgenceCfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6 text-right text-sm font-semibold text-foreground">
                      {intervention.cout > 0
                        ? formatMontant(intervention.cout)
                        : "—"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Garage partner cards */}
      <section aria-label="Garages partenaires">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Garages partenaires
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {GARAGES.map((garage) => (
            <Card key={garage.id} className="gap-0 py-0">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground truncate">
                      {garage.nom}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="truncate">{garage.adresse}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Phone className="size-3.5 shrink-0" />
                      <span>{garage.telephone}</span>
                    </div>
                  </div>
                  <StarRating note={garage.note} />
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {garage.specialites.map((spec) => (
                    <Badge
                      key={spec}
                      variant="outline"
                      className="bg-secondary/50 text-secondary-foreground border-border"
                    >
                      {spec}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-6 border-t pt-3">
                  <div>
                    <p className="text-lg font-bold text-foreground">
                      {garage.interventionsTotal}
                    </p>
                    <p className="text-xs text-muted-foreground">interventions</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">
                      {garage.tauxSatisfaction}%
                    </p>
                    <p className="text-xs text-muted-foreground">satisfaction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Cross Report Chart */}
        <Card className="gap-0 py-0 lg:col-span-2">
          <CardHeader className="px-6 py-5 border-b">
            <CardTitle className="text-base">
              Rapport croisé maintenance / revenus
            </CardTitle>
            <CardDescription className="mt-0.5">
              Comparaison des coûts de maintenance et des revenus par véhicule
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <CrossReportChart data={CROSS_REPORT} />
          </CardContent>
        </Card>

        {/* Immobilization Chart */}
        <Card className="gap-0 py-0 lg:col-span-2">
          <CardHeader className="px-6 py-5 border-b">
            <CardTitle className="text-base">
              Jours d&apos;immobilisation par véhicule
            </CardTitle>
            <CardDescription className="mt-0.5">
              Top des véhicules les plus immobilisés (en jours)
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ImmobilizationChart data={immobilizationData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
