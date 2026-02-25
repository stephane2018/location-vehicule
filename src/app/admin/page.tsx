import {
  TrendingUp,
  TrendingDown,
  Banknote,
  Car,
  CalendarCheck,
  Users,
  Building2,
  Download,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

// ---------------------------------------------------------------------------
// Types & Constants
// ---------------------------------------------------------------------------

const KPI_DATA = [
  {
    label: "Revenus totaux",
    value: "38 750 000",
    unit: "FCFA",
    trend: "+15%",
    trendUp: true,
    trendLabel: "vs mois dernier",
    icon: Banknote,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    label: "Réservations totales",
    value: "156",
    unit: "",
    trend: "+22%",
    trendUp: true,
    trendLabel: "vs mois dernier",
    icon: CalendarCheck,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    label: "Taux d'occupation",
    value: "72%",
    unit: "",
    trend: "+5%",
    trendUp: true,
    trendLabel: "vs mois dernier",
    icon: Car,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
  {
    label: "Nouveaux clients",
    value: "27",
    unit: "",
    trend: "-3%",
    trendUp: false,
    trendLabel: "vs mois dernier",
    icon: Users,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600",
  },
];

const MONTHLY_REVENUE = [
  { month: "Sept. 2025", revenue: 28500000, reservations: 98 },
  { month: "Oct. 2025", revenue: 31200000, reservations: 112 },
  { month: "Nov. 2025", revenue: 29800000, reservations: 105 },
  { month: "Déc. 2025", revenue: 35400000, reservations: 134 },
  { month: "Jan. 2026", revenue: 33700000, reservations: 128 },
  { month: "Fév. 2026", revenue: 38750000, reservations: 156 },
];

const AGENCY_PERFORMANCE = [
  {
    agence: "Abidjan-Cocody",
    revenus: 14200000,
    reservations: 58,
    tauxOccupation: 78,
    vehicules: 15,
  },
  {
    agence: "Abidjan-Plateau",
    revenus: 10800000,
    reservations: 42,
    tauxOccupation: 72,
    vehicules: 12,
  },
  {
    agence: "Yamoussoukro",
    revenus: 6500000,
    reservations: 28,
    tauxOccupation: 65,
    vehicules: 8,
  },
  {
    agence: "Bouaké",
    revenus: 4200000,
    reservations: 18,
    tauxOccupation: 58,
    vehicules: 6,
  },
  {
    agence: "San Pedro",
    revenus: 3050000,
    reservations: 10,
    tauxOccupation: 50,
    vehicules: 4,
  },
];

const TOP_VEHICLES = [
  { vehicule: "Toyota RAV4 2023", reservations: 24, revenus: 1800000 },
  { vehicule: "Hyundai Tucson 2022", reservations: 19, revenus: 855000 },
  { vehicule: "Mercedes Classe C 2023", reservations: 16, revenus: 2240000 },
  { vehicule: "Toyota Land Cruiser 2023", reservations: 14, revenus: 2100000 },
  { vehicule: "Kia Sportage 2023", reservations: 12, revenus: 456000 },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatMontant(montant: number): string {
  return montant.toLocaleString("fr-CI") + " FCFA";
}

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

function RevenueChart() {
  const maxRevenue = Math.max(...MONTHLY_REVENUE.map((m) => m.revenue));

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="px-6 py-5 border-b">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base">Évolution des revenus</CardTitle>
            <CardDescription className="mt-0.5">
              Revenus mensuels sur les 6 derniers mois
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-emerald-600">
              <TrendingUp className="size-3.5" />
              <span className="font-semibold">+15%</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Simple bar chart visualization */}
        <div className="h-48 flex items-end gap-3">
          {MONTHLY_REVENUE.map((month, i) => {
            const heightPx = (month.revenue / maxRevenue) * 160; // 160px max height
            const isLast = i === MONTHLY_REVENUE.length - 1;
            return (
              <div
                key={month.month}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
              >
                <span className="text-[10px] text-muted-foreground font-medium mb-1">
                  {(month.revenue / 1000000).toFixed(1)}M
                </span>
                <div
                  className={`w-full rounded-t-lg transition-all ${
                    isLast ? "bg-primary" : "bg-primary/20"
                  }`}
                  style={{ height: `${heightPx}px` }}
                />
                <span className="text-[10px] text-muted-foreground truncate max-w-full mt-2">
                  {month.month.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function ReservationsChart() {
  const maxRes = Math.max(...MONTHLY_REVENUE.map((m) => m.reservations));

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="px-6 py-5 border-b">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base">Réservations mensuelles</CardTitle>
            <CardDescription className="mt-0.5">
              Nombre de réservations par mois
            </CardDescription>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600">
            <TrendingUp className="size-3.5" />
            <span className="font-semibold">+22%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-48 flex items-end gap-3">
          {MONTHLY_REVENUE.map((month, i) => {
            const heightPx = (month.reservations / maxRes) * 160; // 160px max height
            const isLast = i === MONTHLY_REVENUE.length - 1;
            return (
              <div
                key={month.month}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
              >
                <span className="text-[10px] text-muted-foreground font-medium mb-1">
                  {month.reservations}
                </span>
                <div
                  className={`w-full rounded-t-lg transition-all ${
                    isLast ? "bg-amber-500" : "bg-amber-500/20"
                  }`}
                  style={{ height: `${heightPx}px` }}
                />
                <span className="text-[10px] text-muted-foreground truncate max-w-full mt-2">
                  {month.month.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Tableau de bord
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Bienvenue sur AutoLoc CI — aperçu de l&apos;activité en temps réel.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Select defaultValue="fevrier-2026">
            <SelectTrigger className="w-44 h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fevrier-2026">Février 2026</SelectItem>
              <SelectItem value="janvier-2026">Janvier 2026</SelectItem>
              <SelectItem value="decembre-2025">Décembre 2025</SelectItem>
              <SelectItem value="trimestre">Ce trimestre</SelectItem>
              <SelectItem value="annee">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="size-3.5" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPI cards */}
      <section aria-label="Indicateurs clés">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {KPI_DATA.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>
      </section>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart />
        <ReservationsChart />
      </div>

      {/* Tables row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Agency performance */}
        <Card className="gap-0 py-0">
          <CardHeader className="px-6 py-5 border-b">
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Building2 className="size-4 text-primary" />
                  Performance par agence
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Agence</TableHead>
                  <TableHead className="text-right">Revenus</TableHead>
                  <TableHead className="text-center hidden sm:table-cell">Rés.</TableHead>
                  <TableHead className="text-center hidden md:table-cell">Occupation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AGENCY_PERFORMANCE.map((agence) => (
                  <TableRow key={agence.agence}>
                    <TableCell className="pl-6">
                      <p className="text-sm font-medium text-foreground">
                        {agence.agence}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {agence.vehicules} véhicules
                      </p>
                    </TableCell>
                    <TableCell className="text-right text-sm font-semibold text-foreground">
                      {formatMontant(agence.revenus)}
                    </TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground hidden sm:table-cell">
                      {agence.reservations}
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      <div className="flex items-center justify-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              agence.tauxOccupation >= 70
                                ? "bg-emerald-500"
                                : agence.tauxOccupation >= 50
                                ? "bg-amber-500"
                                : "bg-destructive"
                            }`}
                            style={{ width: `${agence.tauxOccupation}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {agence.tauxOccupation}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top vehicles */}
        <Card className="gap-0 py-0">
          <CardHeader className="px-6 py-5 border-b">
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Car className="size-4 text-primary" />
                  Top véhicules
                </CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">#</TableHead>
                  <TableHead>Véhicule</TableHead>
                  <TableHead className="text-center">Rés.</TableHead>
                  <TableHead className="text-right pr-6">Revenus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TOP_VEHICLES.map((v, i) => (
                  <TableRow key={v.vehicule}>
                    <TableCell className="pl-6">
                      <div
                        className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${
                          i === 0
                            ? "bg-amber-500/10 text-amber-600"
                            : i === 1
                            ? "bg-secondary text-secondary-foreground"
                            : i === 2
                            ? "bg-orange-500/10 text-orange-600"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {i + 1}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-foreground">
                      {v.vehicule}
                    </TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground">
                      {v.reservations}
                    </TableCell>
                    <TableCell className="text-right pr-6 text-sm font-semibold text-foreground">
                      {formatMontant(v.revenus)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
