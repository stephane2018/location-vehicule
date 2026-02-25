"use client";

import React, { use } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  ClipboardCheck,
  Gauge,
  Save,
  Lock,
  User,
  MessageSquare,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  formatKilometrage,
  formatDate,
} from "@/utils/adminHelpers";
import {
  INSPECTIONS,
  RESERVATIONS_MOCK,
} from "@/data/mock/inspections";
import type { PointControle } from "@/types/admin";

import CheckpointGroup from "@/components/admin/inspection/CheckpointGroup";
import FuelLevelIndicator from "@/components/admin/inspection/FuelLevelIndicator";
import InspectionSummary from "@/components/admin/inspection/InspectionSummary";
import PhotoGallery from "@/components/admin/inspection/PhotoGallery";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function groupByCategorie(
  points: PointControle[]
): Record<string, PointControle[]> {
  const groups: Record<string, PointControle[]> = {};
  for (const p of points) {
    if (!groups[p.categorie]) {
      groups[p.categorie] = [];
    }
    groups[p.categorie].push(p);
  }
  return groups;
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function InspectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "depart";

  const reservation = RESERVATIONS_MOCK.find((r) => r.id === id);

  // Find matching inspection
  const inspectionId =
    type === "retour"
      ? reservation?.inspectionRetourId
      : reservation?.inspectionDepartId;

  const inspection = INSPECTIONS.find((ins) => ins.id === inspectionId);

  if (!reservation || !inspection) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Inspection non trouvee
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            L&apos;inspection de {type} pour la reservation &laquo; {id} &raquo; n&apos;existe pas.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/admin/reservations/${id}`}>
            <ArrowLeft className="size-4 mr-2" />
            Retour a la reservation
          </Link>
        </Button>
      </div>
    );
  }

  const isFinalise = inspection.statut === "finalise";
  const typeLabel = type === "depart" ? "depart" : "retour";

  const statutBadge = isFinalise
    ? {
        label: "Finalise",
        className: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
      }
    : {
        label: "En cours",
        className: "bg-blue-500/10 text-blue-700 border-blue-200",
      };

  const grouped = groupByCategorie(inspection.pointsControle);
  const categoryOrder = [
    "Exterieur",
    "Interieur",
    "Mecanique",
    "Equipements",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild className="size-9">
            <Link href={`/admin/reservations/${id}`}>
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Inspection de {typeLabel}
              </h1>
              <Badge variant="outline" className={statutBadge.className}>
                {statutBadge.label}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {inspection.id} &mdash; Reservation {reservation.id} &mdash;{" "}
              {reservation.vehicule.nom}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="informations">
        <TabsList>
          <TabsTrigger value="informations">Informations</TabsTrigger>
          <TabsTrigger value="points-controle">
            Points de controle
          </TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>

        {/* Tab 1: Informations */}
        <TabsContent value="informations" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Kilometrage card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Gauge className="size-4 text-muted-foreground" />
                  Kilometrage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">
                  {formatKilometrage(inspection.kilometrage)}
                </p>
              </CardContent>
            </Card>

            {/* Fuel card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Carburant</CardTitle>
              </CardHeader>
              <CardContent>
                <FuelLevelIndicator level={inspection.niveauCarburant} />
              </CardContent>
            </Card>
          </div>

          {/* Details card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ClipboardCheck className="size-4 text-muted-foreground" />
                Details de l&apos;inspection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="size-3.5" />
                  Date
                </span>
                <span className="text-sm font-medium text-foreground">
                  {formatDate(inspection.date)}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <User className="size-3.5" />
                  Inspecteur
                </span>
                <span className="text-sm font-medium text-foreground">
                  {inspection.inspecteur}
                </span>
              </div>
              {inspection.commentaireGeneral && (
                <>
                  <Separator />
                  <div className="space-y-1.5">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <MessageSquare className="size-3.5" />
                      Commentaire general
                    </span>
                    <p className="text-sm text-foreground bg-muted rounded-lg p-3">
                      {inspection.commentaireGeneral}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Points de controle */}
        <TabsContent value="points-controle" className="space-y-6 mt-6">
          <div className="space-y-2">
            {categoryOrder.map((cat) => {
              const points = grouped[cat];
              if (!points || points.length === 0) return null;
              return (
                <CheckpointGroup
                  key={cat}
                  categorie={cat}
                  points={points}
                  readOnly={isFinalise}
                />
              );
            })}
          </div>

          {/* Summary */}
          <InspectionSummary pointsControle={inspection.pointsControle} />
        </TabsContent>

        {/* Tab 3: Photos */}
        <TabsContent value="photos" className="mt-6">
          <PhotoGallery photos={inspection.photos} />
        </TabsContent>
      </Tabs>

      {/* Bottom actions */}
      <Separator />
      <div className="flex items-center gap-3 justify-end">
        <Button
          variant="outline"
          disabled={isFinalise}
          className="gap-2"
        >
          <Save className="size-4" />
          Sauvegarder
        </Button>
        <Button
          disabled={isFinalise}
          className="gap-2"
        >
          {isFinalise ? (
            <Lock className="size-4" />
          ) : (
            <ClipboardCheck className="size-4" />
          )}
          Finaliser
        </Button>
      </div>
    </div>
  );
}
