"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Wrench,
  CheckCircle2,
  Clock,
  Search,
  Eye,
  Filter,
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

import { INTERVENTIONS, GARAGES } from "@/core/data/mock/garage";
import { formatMontant, formatDate } from "@/core/utils/adminHelpers";

import type {
  InterventionType,
  InterventionStatut,
  UrgenceNiveau,
} from "@/core/types/admin";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

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

const TYPE_OPTIONS: { value: InterventionType; label: string }[] = [
  { value: "maintenance_preventive", label: "Maintenance préventive" },
  { value: "reparation", label: "Réparation" },
  { value: "revision", label: "Révision" },
  { value: "carrosserie", label: "Carrosserie" },
  { value: "pneus", label: "Pneus" },
];

const STATUT_OPTIONS: { value: InterventionStatut; label: string }[] = [
  { value: "planifiee", label: "Planifiée" },
  { value: "en_cours", label: "En cours" },
  { value: "terminee", label: "Terminée" },
  { value: "annulee", label: "Annulée" },
];

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

const enCoursCount = INTERVENTIONS.filter(
  (i) => i.statut === "en_cours"
).length;
const termineesCount = INTERVENTIONS.filter(
  (i) => i.statut === "terminee"
).length;
const planifieesCount = INTERVENTIONS.filter(
  (i) => i.statut === "planifiee"
).length;

const STATS_DATA = [
  {
    label: "En cours",
    value: enCoursCount,
    icon: Wrench,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
  {
    label: "Terminées",
    value: termineesCount,
    icon: CheckCircle2,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    label: "Planifiées",
    value: planifieesCount,
    icon: Clock,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
];

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function InterventionsPage() {
  const [typeFilter, setTypeFilter] = useState<string>("tous");
  const [statutFilter, setStatutFilter] = useState<string>("tous");
  const [garageFilter, setGarageFilter] = useState<string>("tous");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return INTERVENTIONS.filter((intervention) => {
      if (typeFilter !== "tous" && intervention.type !== typeFilter) {
        return false;
      }
      if (statutFilter !== "tous" && intervention.statut !== statutFilter) {
        return false;
      }
      if (garageFilter !== "tous" && intervention.garageId !== garageFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = intervention.id.toLowerCase().includes(q);
        const matchesVehicle = intervention.vehiculeNom.toLowerCase().includes(q);
        const matchesGarage = intervention.garageNom.toLowerCase().includes(q);
        const matchesDescription = intervention.description.toLowerCase().includes(q);
        if (!matchesId && !matchesVehicle && !matchesGarage && !matchesDescription) {
          return false;
        }
      }
      return true;
    });
  }, [typeFilter, statutFilter, garageFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <Link
          href="/admin/garage"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="size-3.5" />
          Retour au tableau de bord garage
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Interventions
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Liste complète des interventions de maintenance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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

      {/* Table card */}
      <Card className="gap-0 py-0">
        <CardHeader className="px-6 py-5 border-b">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-base">
              Toutes les interventions
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              {/* Type filter */}
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-44 h-9 text-sm">
                  <Filter className="size-3.5 mr-1.5 text-muted-foreground" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les types</SelectItem>
                  {TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Statut filter */}
              <Select value={statutFilter} onValueChange={setStatutFilter}>
                <SelectTrigger className="w-36 h-9 text-sm">
                  <Filter className="size-3.5 mr-1.5 text-muted-foreground" />
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les statuts</SelectItem>
                  {STATUT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Garage filter */}
              <Select value={garageFilter} onValueChange={setGarageFilter}>
                <SelectTrigger className="w-48 h-9 text-sm">
                  <Filter className="size-3.5 mr-1.5 text-muted-foreground" />
                  <SelectValue placeholder="Garage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les garages</SelectItem>
                  {GARAGES.map((g) => (
                    <SelectItem key={g.id} value={g.id}>
                      {g.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-8 h-9 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
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
                <TableHead className="hidden xl:table-cell">Date début</TableHead>
                <TableHead className="hidden xl:table-cell">Date fin</TableHead>
                <TableHead className="text-right">Coût</TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="h-24 text-center">
                    <p className="text-sm text-muted-foreground">
                      Aucune intervention trouvée.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((intervention) => {
                  const typeCfg = TYPE_CONFIG[intervention.type];
                  const statutCfg = STATUT_CONFIG[intervention.statut];
                  const urgenceCfg = URGENCE_CONFIG[intervention.urgence];

                  return (
                    <TableRow key={intervention.id}>
                      <TableCell className="pl-6">
                        <p className="font-semibold text-sm text-foreground">
                          {intervention.id}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/admin/garage/vehicules/${intervention.vehiculeId}`}
                          className="text-sm font-medium text-foreground hover:text-primary transition-colors hover:underline"
                        >
                          {intervention.vehiculeNom}
                        </Link>
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
                      <TableCell className="hidden xl:table-cell text-sm text-muted-foreground">
                        {formatDate(intervention.dateDebut)}
                      </TableCell>
                      <TableCell className="hidden xl:table-cell text-sm text-muted-foreground">
                        {intervention.dateFin
                          ? formatDate(intervention.dateFin)
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right text-sm font-semibold text-foreground">
                        {intervention.cout > 0
                          ? formatMontant(intervention.cout)
                          : "—"}
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        <Link href={`/admin/garage/interventions/${intervention.id}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-muted-foreground hover:text-primary"
                            aria-label={`Voir l'intervention ${intervention.id}`}
                          >
                            <Eye className="size-3.5" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
