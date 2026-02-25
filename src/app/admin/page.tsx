import React from "react";
import {
  CalendarCheck,
  Banknote,
  Car,
  TrendingUp,
  TrendingDown,
  Plus,
  Building2,
  BarChart3,
  ArrowRight,
  Wallet,
  Wrench,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ReservationStatus = "confirmee" | "en_attente" | "annulee";

interface Reservation {
  id: string;
  client: string;
  vehicule: string;
  agence: string;
  dateDebut: string;
  dateFin: string;
  statut: ReservationStatus;
  montant: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const KPI_DATA = [
  {
    label: "Réservations actives",
    value: "47",
    unit: "",
    trend: "+12%",
    trendUp: true,
    trendLabel: "vs mois dernier",
    icon: CalendarCheck,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    label: "Revenus du mois",
    value: "12 500 000",
    unit: "FCFA",
    trend: "+8%",
    trendUp: true,
    trendLabel: "vs mois dernier",
    icon: Banknote,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    label: "Véhicules disponibles",
    value: "23/45",
    unit: "",
    trend: "-4%",
    trendUp: false,
    trendLabel: "vs semaine dernière",
    icon: Car,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
  {
    label: "Taux d'occupation",
    value: "68%",
    unit: "",
    trend: "+5%",
    trendUp: true,
    trendLabel: "vs mois dernier",
    icon: TrendingUp,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-600",
  },
] as const;

const RESERVATIONS_MOCK: Reservation[] = [
  {
    id: "RES-001",
    client: "Kouamé Yves",
    vehicule: "Toyota RAV4 2023",
    agence: "Abidjan-Cocody",
    dateDebut: "20 fév. 2026",
    dateFin: "25 fév. 2026",
    statut: "confirmee",
    montant: 375000,
  },
  {
    id: "RES-002",
    client: "Adjoua Mariam",
    vehicule: "Hyundai Tucson 2022",
    agence: "Abidjan-Plateau",
    dateDebut: "21 fév. 2026",
    dateFin: "23 fév. 2026",
    statut: "en_attente",
    montant: 150000,
  },
  {
    id: "RES-003",
    client: "Bamba Cheick",
    vehicule: "Mercedes Classe C 2023",
    agence: "Yamoussoukro",
    dateDebut: "18 fév. 2026",
    dateFin: "22 fév. 2026",
    statut: "confirmee",
    montant: 560000,
  },
  {
    id: "RES-004",
    client: "Touré Fatoumata",
    vehicule: "Kia Sportage 2022",
    agence: "Bouaké",
    dateDebut: "22 fév. 2026",
    dateFin: "24 fév. 2026",
    statut: "annulee",
    montant: 160000,
  },
  {
    id: "RES-005",
    client: "N'Goran Pierre",
    vehicule: "Peugeot 3008 2023",
    agence: "San Pedro",
    dateDebut: "23 fév. 2026",
    dateFin: "27 fév. 2026",
    statut: "confirmee",
    montant: 320000,
  },
  {
    id: "RES-006",
    client: "Konan Evelyne",
    vehicule: "Toyota Corolla 2022",
    agence: "Abidjan-Cocody",
    dateDebut: "19 fév. 2026",
    dateFin: "21 fév. 2026",
    statut: "en_attente",
    montant: 120000,
  },
  {
    id: "RES-007",
    client: "Diabaté Ismaël",
    vehicule: "Ford Ranger 2023",
    agence: "Abidjan-Plateau",
    dateDebut: "23 fév. 2026",
    dateFin: "28 fév. 2026",
    statut: "confirmee",
    montant: 475000,
  },
  {
    id: "RES-008",
    client: "Aka Sylvie",
    vehicule: "Renault Duster 2022",
    agence: "Yamoussoukro",
    dateDebut: "24 fév. 2026",
    dateFin: "26 fév. 2026",
    statut: "en_attente",
    montant: 130000,
  },
];

const STATUS_CONFIG: Record<
  ReservationStatus,
  { label: string; className: string }
> = {
  confirmee: {
    label: "Confirmée",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
  en_attente: {
    label: "En attente",
    className: "bg-amber-500/10 text-amber-700 border-amber-200",
  },
  annulee: {
    label: "Annulée",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const QUICK_ACTIONS = [
  {
    label: "Ajouter un véhicule",
    description: "Enregistrer un nouveau véhicule dans la flotte",
    icon: Car,
    href: "/admin/vehicules",
  },
  {
    label: "Nouvelle agence",
    description: "Créer une agence de location",
    icon: Building2,
    href: "/admin/agences",
  },
  {
    label: "Suivi financier",
    description: "Revenus, rentabilité et documents",
    icon: Wallet,
    href: "/admin/finances",
  },
  {
    label: "Garage & Maintenance",
    description: "Interventions et suivi du parc",
    icon: Wrench,
    href: "/admin/garage",
  },
  {
    label: "Voir les rapports",
    description: "Consulter les statistiques et analyses",
    icon: BarChart3,
    href: "/admin/rapports",
  },
] as const;

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
              {"unit" in { unit } && unit && (
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
          <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
            <Icon className={`size-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ statut }: { statut: ReservationStatus }) {
  const config = STATUS_CONFIG[statut];
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Tableau de bord
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Bienvenue sur AutoLoc CI — aperçu de l&apos;activité en temps réel.
        </p>
      </div>

      {/* KPI cards */}
      <section aria-label="Indicateurs clés">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {KPI_DATA.map((kpi) => (
            <KpiCard key={kpi.label} {...kpi} />
          ))}
        </div>
      </section>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="gap-0 py-0">
          <CardHeader className="px-6 py-5 border-b">
            <CardTitle className="text-base">Évolution des revenus</CardTitle>
            <CardDescription className="mt-0.5">
              Revenus mensuels sur les 6 derniers mois
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 flex items-end justify-between gap-2">
              {[
                { month: "Sep", value: 9500000, label: "9.5M", reservations: 38, avgDuration: 3.8 },
                { month: "Oct", value: 10200000, label: "10.2M", reservations: 42, avgDuration: 4.1 },
                { month: "Nov", value: 11800000, label: "11.8M", reservations: 48, avgDuration: 4.5 },
                { month: "Déc", value: 10500000, label: "10.5M", reservations: 45, avgDuration: 3.9 },
                { month: "Jan", value: 11200000, label: "11.2M", reservations: 44, avgDuration: 4.2 },
                { month: "Fév", value: 12500000, label: "12.5M", reservations: 47, avgDuration: 4.3 },
              ].map((item, index) => {
                const maxValue = 13000000;
                const heightPx = (item.value / maxValue) * 280; // 280px = h-80 - spacing
                const isLast = index === 5;
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full group h-full flex items-end">
                      <div
                        className={`w-full rounded-t-lg transition-all ${
                          isLast
                            ? "bg-primary"
                            : "bg-muted hover:bg-primary/20"
                        }`}
                        style={{ height: `${heightPx}px` }}
                      >
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl border border-gray-700">
                            <div className="text-xs font-semibold mb-1.5 text-white">{item.month} 2026</div>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between gap-4">
                                <span className="text-gray-300">Revenus:</span>
                                <span className="font-medium text-white">{item.label} FCFA</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-gray-300">Réservations:</span>
                                <span className="font-medium text-white">{item.reservations}</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-gray-300">Durée moy.:</span>
                                <span className="font-medium text-white">{item.avgDuration} jours</span>
                              </div>
                              <div className="flex justify-between gap-4 pt-1 border-t border-gray-700">
                                <span className="text-gray-300">Panier moy.:</span>
                                <span className="font-medium text-white">
                                  {Math.round(item.value / item.reservations / 1000)}k FCFA
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Occupation Chart */}
        <Card className="gap-0 py-0">
          <CardHeader className="px-6 py-5 border-b">
            <CardTitle className="text-base">Taux d'occupation</CardTitle>
            <CardDescription className="mt-0.5">
              Évolution hebdomadaire du parc
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 flex flex-col justify-between">
              {/* Legend */}
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">En location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted" />
                  <span className="text-xs text-muted-foreground">Disponibles</span>
                </div>
              </div>

              {/* Bars */}
              <div className="flex-1 flex items-end justify-between gap-3">
                {[
                  { day: "Lun", occupied: 28, available: 17 },
                  { day: "Mar", occupied: 30, available: 15 },
                  { day: "Mer", occupied: 26, available: 19 },
                  { day: "Jeu", occupied: 32, available: 13 },
                  { day: "Ven", occupied: 29, available: 16 },
                  { day: "Sam", occupied: 35, available: 10 },
                  { day: "Dim", occupied: 31, available: 14 },
                ].map((item) => {
                  const total = 45;
                  const occupiedPercent = (item.occupied / total) * 100;
                  const availablePercent = (item.available / total) * 100;
                  return (
                    <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col gap-1 h-64">
                        <div
                          className="w-full bg-primary rounded-t-lg transition-all hover:opacity-80 relative group"
                          style={{ height: `${occupiedPercent}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-popover text-popover-foreground px-2 py-1 rounded text-xs font-medium shadow-md whitespace-nowrap">
                              {item.occupied} véhicules
                            </div>
                          </div>
                        </div>
                        <div
                          className="w-full bg-muted rounded-b-lg transition-all hover:opacity-80"
                          style={{ height: `${availablePercent}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reservations table + Quick actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent reservations — takes 2/3 on large screens */}
        <section
          className="lg:col-span-2"
          aria-label="Réservations récentes"
        >
          <Card className="gap-0 py-0">
            <CardHeader className="px-6 py-5 border-b">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">
                    Réservations récentes
                  </CardTitle>
                  <CardDescription className="mt-0.5">
                    Les 8 dernières réservations enregistrées
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1.5 shrink-0">
                  Voir tout
                  <ArrowRight className="size-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Client</TableHead>
                    <TableHead>Véhicule</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Agence
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Dates
                    </TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="pr-6 text-right">Montant</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RESERVATIONS_MOCK.map((res) => (
                    <TableRow key={res.id}>
                      <TableCell className="pl-6">
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {res.client}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {res.id}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{res.vehicule}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                        {res.agence}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                        <span>{res.dateDebut}</span>
                        <span className="mx-1">→</span>
                        <span>{res.dateFin}</span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge statut={res.statut} />
                      </TableCell>
                      <TableCell className="pr-6 text-right text-sm font-semibold text-foreground">
                        {formatMontant(res.montant)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Quick actions — 1/3 column */}
        <section aria-label="Actions rapides">
          <Card className="gap-0 py-0 h-full">
            <CardHeader className="px-6 py-5 border-b">
              <CardTitle className="text-base">Actions rapides</CardTitle>
              <CardDescription className="mt-0.5">
                Accès direct aux principales fonctions
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 py-4 space-y-2">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-4 rounded-lg border bg-card p-4 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {action.label}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground truncate">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                );
              })}

              <Separator className="my-2" />

              {/* Summary stats */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xl font-bold text-foreground">47</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Actives
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xl font-bold text-foreground">12</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Ce mois
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xl font-bold text-foreground">23</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Véhicules libres
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 p-3 text-center">
                  <p className="text-xl font-bold text-foreground">5</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Agences
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
