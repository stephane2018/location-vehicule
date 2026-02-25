"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Camera,
  Car,
  CheckCircle2,
  CircleDot,
  Clock,
  CreditCard,
  FileText,
  Hash,
  ImageIcon,
  MapPin,
  Mail,
  Phone,
  Plus,
  ShieldCheck,
  User,
  Wallet,
  XCircle,
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
import { RESERVATIONS_MOCK, type PaiementStatut } from "@/core/data/mock/inspections";

// ---------------------------------------------------------------------------
// Statut config
// ---------------------------------------------------------------------------

const STATUT_CONFIG: Record<
  string,
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
    className: "bg-blue-500/10 text-blue-700 border-blue-200",
  },
  terminee: {
    label: "Terminée",
    className: "bg-secondary text-secondary-foreground border-border",
  },
  annulee: {
    label: "Annulée",
    className: "bg-red-500/10 text-red-700 border-red-200",
  },
};

const PAIEMENT_STATUT_CONFIG: Record<
  PaiementStatut,
  { label: string; icon: React.ElementType; className: string }
> = {
  en_attente: {
    label: "En attente",
    icon: Clock,
    className: "bg-amber-500/10 text-amber-700 border-amber-200",
  },
  valide: {
    label: "Validé",
    icon: CheckCircle2,
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
  echoue: {
    label: "Échoué",
    icon: XCircle,
    className: "bg-red-500/10 text-red-700 border-red-200",
  },
  rembourse: {
    label: "Remboursé",
    icon: ArrowLeft,
    className: "bg-blue-500/10 text-blue-700 border-blue-200",
  },
};

// ---------------------------------------------------------------------------
// Timeline
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
// InfoRow
// ---------------------------------------------------------------------------

function InfoRow({
  label,
  value,
  icon: Icon,
  bold,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ElementType;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground flex items-center gap-2">
        {Icon && <Icon className="size-3.5" />}
        {label}
      </span>
      <span
        className={`text-sm text-foreground ${bold ? "font-bold" : "font-medium"}`}
      >
        {value}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PhotoGrid
// ---------------------------------------------------------------------------

function PhotoGrid({
  photos,
  emptyLabel,
}: {
  photos: string[];
  emptyLabel: string;
}) {
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed rounded-lg">
        <ImageIcon className="size-8 text-muted-foreground/30 mb-2" />
        <p className="text-xs text-muted-foreground">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {photos.map((src, i) => (
        <div
          key={i}
          className="relative aspect-square rounded-lg overflow-hidden border bg-muted"
        >
          <Image
            src={src}
            alt={`Photo ${i + 1}`}
            fill
            className="object-cover"
            sizes="120px"
          />
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
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
            Réservation introuvable
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            La réservation &laquo; {id} &raquo; n&apos;existe pas.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/reservations">
            <ArrowLeft className="size-4 mr-2" />
            Retour aux réservations
          </Link>
        </Button>
      </div>
    );
  }

  const statutCfg = STATUT_CONFIG[reservation.statut] ?? {
    label: reservation.statut,
    className: "",
  };

  const paiementCfg = PAIEMENT_STATUT_CONFIG[reservation.paiementStatut];
  const PaiementIcon = paiementCfg.icon;

  const isSameAgency = reservation.agenceRetrait === reservation.agenceRetour;

  const timelineEvents: TimelineEvent[] = [
    {
      label: "Réservation créée",
      date: formatDate(reservation.dateDebut),
      done: true,
      accent: "bg-primary",
    },
    {
      label: "Inspection de départ",
      date: reservation.inspectionDepartId ? "Effectuée" : null,
      done: !!reservation.inspectionDepartId,
      accent: "bg-emerald-500",
    },
    {
      label: "Location en cours",
      date:
        reservation.statut === "en_cours"
          ? "En cours"
          : reservation.statut === "terminee"
            ? `${formatDate(reservation.dateDebut)} → ${formatDate(reservation.dateFin)}`
            : null,
      done:
        reservation.statut === "en_cours" ||
        reservation.statut === "terminee",
      accent: "bg-blue-500",
    },
    {
      label: "Inspection de retour",
      date: reservation.inspectionRetourId ? "Effectuée" : null,
      done: !!reservation.inspectionRetourId,
      accent: "bg-emerald-500",
    },
    {
      label: "Location terminée",
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
                Réservation {reservation.id}
              </h1>
              <Badge variant="outline" className={statutCfg.className}>
                {statutCfg.label}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Détail complet de la réservation
            </p>
          </div>
        </div>
      </div>

      {/* 3 visual cards: Client / Véhicule / Agence */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Client */}
        <Card className="gap-0 py-0 overflow-hidden">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="relative size-12 shrink-0 rounded-full overflow-hidden border-2 border-primary/20">
              <Image
                src={reservation.client.photo}
                alt={reservation.client.nom}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Client
              </p>
              <p className="text-sm font-semibold text-foreground truncate">
                {reservation.client.nom}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {reservation.client.telephone}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Véhicule */}
        <Card className="gap-0 py-0 overflow-hidden">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="relative size-12 shrink-0 rounded-lg overflow-hidden border">
              <Image
                src={reservation.vehicule.image}
                alt={reservation.vehicule.nom}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Véhicule
              </p>
              <p className="text-sm font-semibold text-foreground truncate">
                {reservation.vehicule.nom}
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                {reservation.vehicule.immatriculation}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Agence */}
        <Card className="gap-0 py-0 overflow-hidden">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="relative size-12 shrink-0 rounded-lg overflow-hidden border">
              <Image
                src={reservation.agenceImage}
                alt={reservation.agenceRetrait}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Agence
              </p>
              <p className="text-sm font-semibold text-foreground truncate">
                {reservation.agenceRetrait}
              </p>
              {!isSameAgency && (
                <p className="text-xs text-muted-foreground truncate">
                  → {reservation.agenceRetour}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="size-4 text-muted-foreground" />
                Informations client
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow icon={User} label="Nom complet" value={reservation.client.nom} />
              <Separator />
              <InfoRow
                icon={Phone}
                label="Téléphone"
                value={
                  <a
                    href={`tel:${reservation.client.telephone.replace(/\s/g, "")}`}
                    className="hover:text-primary transition-colors"
                  >
                    {reservation.client.telephone}
                  </a>
                }
              />
              <Separator />
              <InfoRow
                icon={Mail}
                label="Email"
                value={
                  <a
                    href={`mailto:${reservation.client.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {reservation.client.email}
                  </a>
                }
              />
            </CardContent>
          </Card>

          {/* Reservation details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                Détails de la réservation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow icon={Car} label="Véhicule" value={reservation.vehicule.nom} />
              <Separator />
              <InfoRow
                icon={Hash}
                label="Immatriculation"
                value={<span className="font-mono">{reservation.vehicule.immatriculation}</span>}
              />
              <Separator />
              <InfoRow icon={MapPin} label="Agence de retrait" value={reservation.agenceRetrait} />
              <Separator />
              <InfoRow
                icon={MapPin}
                label="Agence de retour"
                value={
                  <span className="flex items-center gap-1.5">
                    {reservation.agenceRetour}
                    {!isSameAgency && (
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 bg-amber-500/10 text-amber-700 border-amber-200"
                      >
                        Aller simple
                      </Badge>
                    )}
                  </span>
                }
              />
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="size-3.5" />
                  Période
                </span>
                <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  {formatDate(reservation.dateDebut)}
                  <ArrowRight className="size-3 text-muted-foreground" />
                  {formatDate(reservation.dateFin)}
                  <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0">
                    {reservation.jours} jour{reservation.jours > 1 ? "s" : ""}
                  </Badge>
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Paiement */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Wallet className="size-4 text-muted-foreground" />
                Paiement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="size-3.5" />
                  Statut du paiement
                </span>
                <Badge variant="outline" className={`gap-1.5 ${paiementCfg.className}`}>
                  <PaiementIcon className="size-3" />
                  {paiementCfg.label}
                </Badge>
              </div>
              <Separator />
              <InfoRow
                icon={CreditCard}
                label="Moyen de paiement"
                value={<Badge variant="outline">{reservation.paiement}</Badge>}
              />
              {reservation.paiementRef && (
                <>
                  <Separator />
                  <InfoRow
                    icon={FileText}
                    label="Référence"
                    value={<span className="font-mono text-xs">{reservation.paiementRef}</span>}
                  />
                </>
              )}
              <Separator />
              <InfoRow label="Prix / jour" value={formatMontant(reservation.prixJour)} />
              <Separator />
              <InfoRow
                label="Durée"
                value={`${reservation.jours} jour${reservation.jours > 1 ? "s" : ""}`}
              />
              <Separator />
              <InfoRow label="Total" value={formatMontant(reservation.montant)} bold />
            </CardContent>
          </Card>

          {/* Photos avant / après */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Camera className="size-4 text-muted-foreground" />
                Photos du véhicule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Avant la prise du véhicule
                </p>
                <PhotoGrid
                  photos={reservation.photosAvant}
                  emptyLabel="Aucune photo avant la prise"
                />
              </div>
              <Separator />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Après le retour du véhicule
                </p>
                <PhotoGrid
                  photos={reservation.photosApres}
                  emptyLabel="Aucune photo après le retour"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pièce d'identité */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ShieldCheck className="size-4 text-muted-foreground" />
                Pièce d&apos;identité
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PhotoGrid
                photos={reservation.client.pieceIdentite}
                emptyLabel="Aucune pièce d'identité enregistrée"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right column - 1/3 */}
        <div className="space-y-6">
          {/* Timeline */}
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

          {/* Inspections */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="size-4 text-muted-foreground" />
                États des lieux
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Départ
                </p>
                {reservation.inspectionDepartId ? (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link
                      href={`/admin/reservations/${reservation.id}/inspection?type=depart`}
                    >
                      <FileText className="size-4 mr-2" />
                      Voir ({reservation.inspectionDepartId})
                    </Link>
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Aucune inspection</p>
                    <Button variant="default" size="sm" className="w-full gap-2">
                      <Plus className="size-4" />
                      Créer l&apos;inspection
                    </Button>
                  </div>
                )}
              </div>
              <Separator />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Retour
                </p>
                {reservation.inspectionRetourId ? (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link
                      href={`/admin/reservations/${reservation.id}/inspection?type=retour`}
                    >
                      <FileText className="size-4 mr-2" />
                      Voir ({reservation.inspectionRetourId})
                    </Link>
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Aucune inspection</p>
                    <Button variant="default" size="sm" className="w-full gap-2">
                      <Plus className="size-4" />
                      Créer l&apos;inspection
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
