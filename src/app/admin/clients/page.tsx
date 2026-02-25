import React from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  UserX,
  Search,
  Eye,
  Mail,
  Phone,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

import type { Client } from "@/core/types/client";
import { CLIENTS_MOCK } from "@/core/data/mock/clients";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STATS_DATA = [
  {
    label: "Total clients",
    value: 342,
    icon: Users,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    label: "Clients actifs",
    value: 218,
    icon: UserCheck,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    label: "Nouveaux ce mois",
    value: 27,
    icon: UserPlus,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
  {
    label: "Clients inactifs",
    value: 97,
    icon: UserX,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
];

const STATUT_CONFIG: Record<
  Client["statut"],
  { label: string; className: string }
> = {
  actif: {
    label: "Actif",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
  inactif: {
    label: "Inactif",
    className: "bg-secondary text-secondary-foreground border-border",
  },
  nouveau: {
    label: "Nouveau",
    className: "bg-primary/10 text-primary border-primary/20",
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatMontant(montant: number): string {
  return montant.toLocaleString("fr-CI") + " FCFA";
}

function getInitials(nom: string, prenom: string): string {
  return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
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

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Gestion des Clients
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Consultez et gérez les comptes clients de la plateforme AutoLoc CI.
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
              Liste des clients
            </CardTitle>
            {/* Search input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Rechercher un client..."
                className="pl-8 h-9 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Client</TableHead>
                <TableHead className="hidden md:table-cell">
                  Contact
                </TableHead>
                <TableHead className="hidden lg:table-cell">Ville</TableHead>
                <TableHead className="hidden xl:table-cell">
                  Inscription
                </TableHead>
                <TableHead className="text-center">Réservations</TableHead>
                <TableHead className="hidden sm:table-cell text-right">
                  Total dépensé
                </TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CLIENTS_MOCK.map((client) => {
                const statutCfg = STATUT_CONFIG[client.statut];
                return (
                  <TableRow key={client.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                            {getInitials(client.nom, client.prenom)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm text-foreground">
                            {client.prenom} {client.nom}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {client.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Phone className="size-3" />
                          {client.telephone}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Mail className="size-3" />
                          {client.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {client.ville}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell text-sm text-muted-foreground">
                      {client.inscriptionDate}
                    </TableCell>
                    <TableCell className="text-center text-sm font-medium text-foreground">
                      {client.nombreReservations}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-right text-sm font-medium text-foreground">
                      {formatMontant(client.totalDepense)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statutCfg.className}
                      >
                        {statutCfg.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-primary"
                        aria-label={`Voir le profil de ${client.prenom} ${client.nom}`}
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
