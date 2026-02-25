"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Car,
  ClipboardCheck,
  MapPin,
  Phone,
  Mail,
  User,
  Plus,
  CircleDot,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { formatMontant, formatDate } from "@/core/utils/adminHelpers";
import { RESERVATIONS_MOCK } from "@/core/data/mock/inspections";

// ---------------------------------------------------------------------------
// Statut config
// ---------------------------------------------------------------------------

const STATUT_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  confirmee: {
    label: "Confirmee",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
  en_cours: {
    label: "En cours",
    className: "bg-blue-500/10 text-blue-700 border-blue-200",
  },
  terminee: {
    label: "Terminee",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  annulee: {
    label: "Annulee",
    className: "bg-red-500/10 text-red-700 border-red-200",
  },
};

// ---------------------------------------------------------------------------
// Timeline component
// ---------------------------------------------------------------------------

interface TimelineEvent {
  label: string;
  date: string | null;
  done: boolean;
  accent?: string;
}

function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="relative space-y-0">
      {events.map((event, index) => (
        <div key={event.label} className="flex gap-3">
          {/* Line + dot */}
          <div className="flex flex-col items-center">
            <div
              className={`size-3 rounded-full shrink-0 mt-1.5 ${
                event.done
                  ? event.accent ?? "bg-primary"
                  : "border-2 border-muted-foreground/30 bg-background"
              }`}
            />
            {index < events.length - 1 && (
              <div className="w-px flex-1 bg-border min-h-6" />
            )}
          </div>
          {/* Content */}
          <div className="pb-4">
            <p
              className={`text-sm font-medium ${
                event.done ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {event.label}
            </p>
            {event.date && (
              <p className="text-xs text-muted-foreground">{event.date}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function ReservationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const reservation = RESERVATIONS_MOCK.find((r) => r.id === id);

  if (!reservation) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Reservation introuvable
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            La reservation &laquo; {id} &raquo; n&apos;existe pas.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/reservations">
            <ArrowLeft className="size-4 mr-2" />
            Retour aux reservations
          </Link>
        </Button>
      </div>
    );
  }

  const statutCfg = STATUT_CONFIG[reservation.statut] ?? {
    label: reservation.statut,
    className: "",
  };

  // Build timeline events
  const timelineEvents: TimelineEvent[] = [
    {
      label: "Reservation creee",
      date: formatDate(reservation.dateDebut),
      done: true,
      accent: "bg-primary",
    },
    {
      label: "Inspection de depart",
      date: reservation.inspectionDepartId
        ? "Effectuee"
        : null,
      done: !!reservation.inspectionDepartId,
      accent: "bg-emerald-500",
    },
    {
      label: "Location en cours",
      date:
        reservation.statut === "en_cours"
          ? "En cours"
          : reservation.statut === "terminee"
          ? `${formatDate(reservation.dateDebut)} - ${formatDate(reservation.dateFin)}`
          : null,
      done:
        reservation.statut === "en_cours" ||
        reservation.statut === "terminee",
      accent: "bg-blue-500",
    },
    {
      label: "Inspection de retour",
      date: reservation.inspectionRetourId
        ? "Effectuee"
        : null,
      done: !!reservation.inspectionRetourId,
      accent: "bg-emerald-500",
    },
    {
      label: "Location terminee",
      date:
        reservation.statut === "terminee"
          ? formatDate(reservation.dateFin)
          : null,
      done: reservation.statut === "terminee",
      accent: "bg-primary",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild className="size-9">
            <Link href="/admin/reservations">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Reservation {reservation.id}
              </h1>
              <Badge variant="outline" className={statutCfg.className}>
                {statutCfg.label}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Detail de la reservation et etat des lieux
            </p>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="size-4 text-muted-foreground" />
                Informations client
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {reservation.client.nom}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {reservation.client.telephone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {reservation.client.email}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Car className="size-4 text-muted-foreground" />
                Vehicule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Vehicule</span>
                <span className="text-sm font-medium text-foreground">
                  {reservation.vehicule.nom}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Immatriculation
                </span>
                <span className="text-sm font-mono font-medium text-foreground">
                  {reservation.vehicule.immatriculation}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Reservation details card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                Details de la reservation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="size-3.5" />
                  Agence
                </span>
                <span className="text-sm font-medium text-foreground">
                  {reservation.agence}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Date de depart
                </span>
                <span className="text-sm font-medium text-foreground">
                  {formatDate(reservation.dateDebut)}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Date de retour
                </span>
                <span className="text-sm font-medium text-foreground">
                  {formatDate(reservation.dateFin)}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Montant</span>
                <span className="text-sm font-bold text-foreground">
                  {formatMontant(reservation.montant)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - 1/3 */}
        <div className="space-y-6">
          {/* Timeline card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CircleDot className="size-4 text-muted-foreground" />
                Chronologie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline events={timelineEvents} />
            </CardContent>
          </Card>

          {/* Inspections card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ClipboardCheck className="size-4 text-muted-foreground" />
                Etats des lieux
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Inspection depart */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Depart
                </p>
                {reservation.inspectionDepartId ? (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link
                      href={`/admin/reservations/${reservation.id}/inspection?type=depart`}
                    >
                      <ClipboardCheck className="size-4 mr-2" />
                      Voir l&apos;inspection ({reservation.inspectionDepartId})
                    </Link>
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Aucune inspection
                    </p>
                    <Button variant="default" size="sm" className="w-full gap-2">
                      <Plus className="size-4" />
                      Creer l&apos;inspection
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              {/* Inspection retour */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Retour
                </p>
                {reservation.inspectionRetourId ? (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link
                      href={`/admin/reservations/${reservation.id}/inspection?type=retour`}
                    >
                      <ClipboardCheck className="size-4 mr-2" />
                      Voir l&apos;inspection ({reservation.inspectionRetourId})
                    </Link>
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Aucune inspection
                    </p>
                    <Button variant="default" size="sm" className="w-full gap-2">
                      <Plus className="size-4" />
                      Creer l&apos;inspection
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
