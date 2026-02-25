import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Car,
  CreditCard,
  Eye,
  Mail,
  MapPin,
  Phone,
  TrendingUp,
  User,
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
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import type { Client } from "@/core/types/client";
import { CLIENTS_MOCK } from "@/core/data/mock/clients";
import { RESERVATIONS_MOCK } from "@/core/data/mock/reservations";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

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

const RESERVATION_STATUT_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  confirmee: {
    label: "Confirmee",
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
    label: "Terminee",
    className: "bg-secondary text-secondary-foreground border-border",
  },
  annulee: {
    label: "Annulee",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const PAIEMENT_CONFIG: Record<string, { className: string }> = {
  "Orange Money": {
    className: "bg-orange-500/10 text-orange-700 border-orange-200",
  },
  "MTN MoMo": {
    className: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
  },
  Wave: {
    className: "bg-sky-500/10 text-sky-700 border-sky-200",
  },
  "Moov Money": {
    className: "bg-blue-500/10 text-blue-700 border-blue-200",
  },
  "Carte bancaire": {
    className: "bg-violet-500/10 text-violet-700 border-violet-200",
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

function getClientReservations(client: Client) {
  const fullName = `${client.nom} ${client.prenom}`;
  return RESERVATIONS_MOCK.filter((r) => r.client === fullName);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ClientProfileCard({ client }: { client: Client }) {
  const statutCfg = STATUT_CONFIG[client.statut];

  return (
    <Card className="gap-0 py-0">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Avatar */}
          <Avatar className="size-20 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
              {getInitials(client.nom, client.prenom)}
            </AvatarFallback>
          </Avatar>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h2 className="text-xl font-bold text-foreground">
                {client.prenom} {client.nom}
              </h2>
              <Badge variant="outline" className={statutCfg.className}>
                {statutCfg.label}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{client.id}</p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-muted-foreground" />
                <a
                  href={`tel:${client.telephone.replace(/\s/g, "")}`}
                  className="text-sm text-foreground hover:text-primary transition-colors"
                >
                  {client.telephone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-muted-foreground" />
                <a
                  href={`mailto:${client.email}`}
                  className="text-sm text-foreground hover:text-primary transition-colors"
                >
                  {client.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="size-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-foreground">{client.ville}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="size-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  Inscrit le {client.inscriptionDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatsCards({ client }: { client: Client }) {
  const reservations = getClientReservations(client);
  const depenseMoyenne =
    client.nombreReservations > 0
      ? Math.round(client.totalDepense / client.nombreReservations)
      : 0;

  const stats = [
    {
      label: "Reservations",
      value: client.nombreReservations,
      icon: Car,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      label: "Total depense",
      value: formatMontant(client.totalDepense),
      icon: CreditCard,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-600",
    },
    {
      label: "Depense moyenne",
      value: formatMontant(depenseMoyenne),
      icon: TrendingUp,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-600",
    },
    {
      label: "Reservations actives",
      value: reservations.filter(
        (r) => r.statut === "confirmee" || r.statut === "en_cours"
      ).length,
      icon: Calendar,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => {
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
            <div className="min-w-0">
              <p className="text-lg font-bold text-foreground leading-tight truncate">
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

function ReservationsTable({ client }: { client: Client }) {
  const reservations = getClientReservations(client);

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="px-6 py-5 border-b">
        <CardTitle className="text-base flex items-center gap-2">
          <Car className="size-4 text-muted-foreground" />
          Historique des reservations ({reservations.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {reservations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Car className="size-10 text-muted-foreground/40 mb-3" />
            <p className="text-sm font-medium text-foreground">
              Aucune reservation
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Ce client n&apos;a pas encore effectue de reservation.
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Reservation</TableHead>
                <TableHead>Vehicule</TableHead>
                <TableHead className="hidden md:table-cell">Agence</TableHead>
                <TableHead className="hidden lg:table-cell">Dates</TableHead>
                <TableHead className="hidden sm:table-cell text-right">
                  Montant
                </TableHead>
                <TableHead>Paiement</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => {
                const statutCfg =
                  RESERVATION_STATUT_CONFIG[reservation.statut] ?? {
                    label: reservation.statut,
                    className: "bg-muted text-muted-foreground",
                  };
                const paiementCfg = PAIEMENT_CONFIG[reservation.paiement] ?? {
                  className: "bg-muted text-muted-foreground",
                };

                return (
                  <TableRow key={reservation.id}>
                    <TableCell className="pl-6">
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          {reservation.id}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {reservation.jours} jour
                          {reservation.jours > 1 ? "s" : ""}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Car className="size-3.5 shrink-0 text-muted-foreground" />
                        <span className="text-sm">{reservation.vehicule}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">
                          {reservation.agenceRetrait}
                        </p>
                        {reservation.agenceRetour !==
                          reservation.agenceRetrait && (
                          <p className="text-xs text-muted-foreground">
                            &rarr; {reservation.agenceRetour}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">
                          {reservation.dateDebut}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {reservation.dateFin}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-right text-sm font-medium text-foreground">
                      {formatMontant(reservation.montant)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={paiementCfg.className}
                      >
                        {reservation.paiement}
                      </Badge>
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
                        asChild
                      >
                        <Link
                          href={`/admin/reservations/${reservation.id}`}
                          aria-label={`Voir la reservation ${reservation.id}`}
                        >
                          <Eye className="size-3.5" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const client = CLIENTS_MOCK.find((c) => c.id === id);

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <User className="size-12 text-muted-foreground/40" />
        <p className="text-muted-foreground">Client introuvable.</p>
        <Button variant="outline" asChild>
          <Link href="/admin/clients">Retour aux clients</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin/clients"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Retour aux clients
      </Link>

      {/* Profile card */}
      <ClientProfileCard client={client} />

      {/* Stats */}
      <StatsCards client={client} />

      <Separator />

      {/* Reservations history */}
      <ReservationsTable client={client} />
    </div>
  );
}
