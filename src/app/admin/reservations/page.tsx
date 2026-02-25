import React from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Eye,
  Search,
  XCircle,
  Filter,
  Download,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
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
// Types
// ---------------------------------------------------------------------------

import type { Reservation, ReservationStatut } from "@/core/types/reservation";
import { RESERVATIONS_MOCK } from "@/core/data/mock/reservations";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STATUT_CONFIG: Record<
  ReservationStatut,
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
  en_cours: {
    label: "En cours",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  terminee: {
    label: "Terminée",
    className: "bg-secondary text-secondary-foreground border-border",
  },
  annulee: {
    label: "Annulée",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const STATS_DATA = [
  {
    label: "Total réservations",
    value: 156,
    icon: CalendarCheck,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    label: "Confirmées",
    value: 89,
    icon: CheckCircle2,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    label: "En attente",
    value: 23,
    icon: Clock,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
  {
    label: "Annulées",
    value: 12,
    icon: XCircle,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
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

function StatBar() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {STATS_DATA.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm"
          >
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${stat.iconBg}`}
            >
              <Icon className={`size-5 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground leading-tight">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function ReservationsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Gestion des Réservations
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Suivez et gérez toutes les réservations de la plateforme AutoLoc CI.
          </p>
        </div>
        <Button variant="outline" className="gap-2 self-start sm:self-auto">
          <Download className="size-4" />
          Exporter
        </Button>
      </div>

      {/* Stats bar */}
      <StatBar />

      {/* Table card */}
      <Card className="gap-0 py-0">
        <CardHeader className="px-6 py-5 border-b">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">
              Toutes les réservations
            </CardTitle>
            <div className="flex items-center gap-2">
              {/* Status filter */}
              <Select>
                <SelectTrigger className="w-36 h-9 text-sm">
                  <Filter className="size-3.5 mr-1.5 text-muted-foreground" />
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous</SelectItem>
                  <SelectItem value="confirmee">Confirmées</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="en_cours">En cours</SelectItem>
                  <SelectItem value="terminee">Terminées</SelectItem>
                  <SelectItem value="annulee">Annulées</SelectItem>
                </SelectContent>
              </Select>
              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-8 h-9 text-sm"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Réservation</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="hidden md:table-cell">
                  Véhicule
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  Agence
                </TableHead>
                <TableHead className="hidden xl:table-cell">
                  Dates
                </TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="hidden sm:table-cell text-right">
                  Montant
                </TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RESERVATIONS_MOCK.map((res) => {
                const statutCfg = STATUT_CONFIG[res.statut];
                return (
                  <TableRow key={res.id}>
                    <TableCell className="pl-6">
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          {res.id}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {res.jours} jour{res.jours > 1 ? "s" : ""}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {res.client}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {res.telephone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {res.vehicule}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      <div>
                        <p>{res.agenceRetrait}</p>
                        {res.agenceRetrait !== res.agenceRetour && (
                          <p className="text-xs">→ {res.agenceRetour}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell text-xs text-muted-foreground">
                      <span>{res.dateDebut}</span>
                      <span className="mx-1">→</span>
                      <span>{res.dateFin}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statutCfg.className}
                      >
                        {statutCfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-right text-sm font-semibold text-foreground">
                      {formatMontant(res.montant)}
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-primary"
                        aria-label={`Voir la réservation ${res.id}`}
                      >
                        <Eye className="size-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
