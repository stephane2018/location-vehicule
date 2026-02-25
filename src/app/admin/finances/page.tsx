import {
  Banknote,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Car,
  Trophy,
  AlertTriangle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  GLOBAL_FINANCIALS,
  VEHICLE_FINANCIALS,
  REVENUE_BY_PERIOD,
  CROSS_REPORT,
} from "@/data/mock/finances";
import { formatMontant, formatPourcentage } from "@/utils/adminHelpers";

import RevenueChart from "@/components/admin/charts/RevenueChart";
import ProfitabilityChart from "@/components/admin/charts/ProfitabilityChart";
import CrossAnalysisChart from "@/components/admin/charts/CrossAnalysisChart";

// ---------------------------------------------------------------------------
// KPI definitions
// ---------------------------------------------------------------------------

const KPI_DATA = [
  {
    label: "Revenus total",
    value: formatMontant(GLOBAL_FINANCIALS.revenuTotal),
    trend: "+15%",
    trendUp: true,
    trendLabel: "vs p\u00e9riode pr\u00e9c\u00e9dente",
    icon: Banknote,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    label: "Revenus mensuel",
    value: formatMontant(GLOBAL_FINANCIALS.revenuMensuel),
    trend: "+8%",
    trendUp: true,
    trendLabel: "vs mois dernier",
    icon: TrendingUp,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    label: "Taux de rentabilit\u00e9",
    value: formatPourcentage(GLOBAL_FINANCIALS.tauxRentabilite),
    trend: "+3%",
    trendUp: true,
    trendLabel: "vs mois dernier",
    icon: BarChart3,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600",
  },
  {
    label: "Revenu moyen / v\u00e9hicule",
    value: formatMontant(GLOBAL_FINANCIALS.revenuMoyenVehicule),
    trend: "-2%",
    trendUp: false,
    trendLabel: "vs mois dernier",
    icon: Car,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
] as const;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getRentabiliteBadge(rentabilite: number) {
  if (rentabilite > 70) {
    return (
      <Badge
        variant="outline"
        className="bg-emerald-500/10 text-emerald-700 border-emerald-200"
      >
        {formatPourcentage(rentabilite)}
      </Badge>
    );
  }
  if (rentabilite >= 50) {
    return (
      <Badge
        variant="outline"
        className="bg-amber-500/10 text-amber-700 border-amber-200"
      >
        {formatPourcentage(rentabilite)}
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className="bg-destructive/10 text-destructive border-destructive/20"
    >
      {formatPourcentage(rentabilite)}
    </Badge>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function KpiCard({
  label,
  value,
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

// ---------------------------------------------------------------------------
// Top / Bottom performers
// ---------------------------------------------------------------------------

const sortedByRentabilite = [...VEHICLE_FINANCIALS].sort(
  (a, b) => b.rentabilite - a.rentabilite
);
const TOP_3 = sortedByRentabilite.slice(0, 3);
const BOTTOM_3 = sortedByRentabilite.slice(-3).reverse();

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function FinancesPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Finances
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Suivi financier et rentabilit&eacute; du parc
        </p>
      </div>

      {/* KPI cards */}
      <section aria-label="Indicateurs financiers">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {KPI_DATA.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>
      </section>

      {/* Revenue chart */}
      <section aria-label="Évolution des revenus">
        <Card className="gap-0 py-0">
          <CardHeader className="px-6 py-5 border-b">
            <CardTitle className="text-base">
              &Eacute;volution des revenus et co&ucirc;ts
            </CardTitle>
            <CardDescription className="mt-0.5">
              Revenus et co&ucirc;ts de maintenance sur les 6 derniers mois
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <RevenueChart data={REVENUE_BY_PERIOD} />
          </CardContent>
        </Card>
      </section>

      {/* Profitability table */}
      <section aria-label="Rentabilité par véhicule">
        <Card className="gap-0 py-0">
          <CardHeader className="px-6 py-5 border-b">
            <CardTitle className="text-base">
              Rentabilit&eacute; par v&eacute;hicule
            </CardTitle>
            <CardDescription className="mt-0.5">
              Classement des v&eacute;hicules par taux de rentabilit&eacute;
              d&eacute;croissant
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">V&eacute;hicule</TableHead>
                  <TableHead className="text-right">CA</TableHead>
                  <TableHead className="text-right">
                    Co&ucirc;t maintenance
                  </TableHead>
                  <TableHead className="text-center">
                    Rentabilit&eacute;
                  </TableHead>
                  <TableHead className="text-center">Rotation</TableHead>
                  <TableHead className="pr-6 text-right">
                    Immobilisation (jours)
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedByRentabilite.map((v) => (
                  <TableRow key={v.vehiculeId}>
                    <TableCell className="pl-6">
                      <p className="font-medium text-foreground text-sm">
                        {v.nom}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {v.vehiculeId}
                      </p>
                    </TableCell>
                    <TableCell className="text-right text-sm font-semibold text-foreground">
                      {formatMontant(v.chiffreAffaires)}
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {formatMontant(v.coutMaintenance)}
                    </TableCell>
                    <TableCell className="text-center">
                      {getRentabiliteBadge(v.rentabilite)}
                    </TableCell>
                    <TableCell className="text-center text-sm text-foreground">
                      {v.rotation}
                    </TableCell>
                    <TableCell className="pr-6 text-right text-sm text-muted-foreground">
                      {v.joursImmobilisation}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Profitability chart */}
      <section aria-label="Graphique de rentabilité">
        <Card className="gap-0 py-0">
          <CardHeader className="px-6 py-5 border-b">
            <CardTitle className="text-base">
              Rentabilit&eacute; par v&eacute;hicule
            </CardTitle>
            <CardDescription className="mt-0.5">
              Taux de rentabilit&eacute; compar&eacute; entre les
              v&eacute;hicules du parc
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ProfitabilityChart data={VEHICLE_FINANCIALS} />
          </CardContent>
        </Card>
      </section>

      {/* Cross analysis chart */}
      <section aria-label="Analyse croisée">
        <Card className="gap-0 py-0">
          <CardHeader className="px-6 py-5 border-b">
            <CardTitle className="text-base">
              Analyse crois&eacute;e maintenance / revenus
            </CardTitle>
            <CardDescription className="mt-0.5">
              Comparaison des co&ucirc;ts de maintenance et des revenus par
              v&eacute;hicule, avec le ratio maintenance/revenus
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <CrossAnalysisChart data={CROSS_REPORT} />
          </CardContent>
        </Card>
      </section>

      {/* Top 3 / Bottom 3 performers */}
      <section aria-label="Top et bottom performers">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Top 3 */}
          <Card className="gap-0 py-0">
            <CardHeader className="px-6 py-5 border-b">
              <div className="flex items-center gap-2">
                <Trophy className="size-5 text-emerald-600" />
                <div>
                  <CardTitle className="text-base">Top 3 performers</CardTitle>
                  <CardDescription className="mt-0.5">
                    V&eacute;hicules les plus rentables
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 py-4 space-y-3">
              {TOP_3.map((v, idx) => (
                <div
                  key={v.vehiculeId}
                  className="flex items-center gap-4 rounded-lg border bg-card p-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                    <span className="text-sm font-bold text-emerald-700">
                      #{idx + 1}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {v.nom}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      CA : {formatMontant(v.chiffreAffaires)} &middot;{" "}
                      {v.rotation} locations
                    </p>
                  </div>
                  <div>{getRentabiliteBadge(v.rentabilite)}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Bottom 3 */}
          <Card className="gap-0 py-0">
            <CardHeader className="px-6 py-5 border-b">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-destructive" />
                <div>
                  <CardTitle className="text-base">
                    Bottom 3 performers
                  </CardTitle>
                  <CardDescription className="mt-0.5">
                    V&eacute;hicules les moins rentables
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 py-4 space-y-3">
              {BOTTOM_3.map((v, idx) => (
                <div
                  key={v.vehiculeId}
                  className="flex items-center gap-4 rounded-lg border bg-card p-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                    <span className="text-sm font-bold text-destructive">
                      #{VEHICLE_FINANCIALS.length - idx}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {v.nom}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      CA : {formatMontant(v.chiffreAffaires)} &middot;{" "}
                      {v.joursImmobilisation} jours d&apos;immobilisation
                    </p>
                  </div>
                  <div>{getRentabiliteBadge(v.rentabilite)}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
