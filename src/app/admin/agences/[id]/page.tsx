"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowLeft,
  Building2,
  Car,
  Fuel,
  Grid3X3,
  List,
  MapPin,
  Phone,
  Settings2,
  User,
  Users,
} from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { DataTable } from "@/shared/common/data-table";

import VehicleCard from "@/shared/components/Layout/VehicleCard";
import { AGENCES_MOCK } from "@/core/data/mock/agences";
import {
  VEHICLES,
  type Vehicle,
  type VehicleStatus,
  type VehicleCategory,
} from "@/core/utils/vehicleData";

// ---------------------------------------------------------------------------
// Agency name → vehicle agency key mapping
// ---------------------------------------------------------------------------

const AGENCE_VEHICLE_KEY: Record<string, string> = {
  "AutoLoc Cocody": "Abidjan-Cocody",
  "AutoLoc Plateau": "Abidjan-Plateau",
  "AutoLoc Yamoussoukro": "Yamoussoukro",
  "AutoLoc Bouaké": "Bouaké",
  "AutoLoc San Pedro": "San Pedro",
};

// ---------------------------------------------------------------------------
// DataTable columns for list view
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<
  VehicleStatus,
  { label: string; className: string }
> = {
  disponible: {
    label: "Disponible",
    className:
      "bg-emerald-500/10 text-emerald-700 border border-dashed border-emerald-300",
  },
  "en-location": {
    label: "En location",
    className:
      "bg-amber-500/10 text-amber-700 border border-dashed border-amber-300",
  },
  "en-revision": {
    label: "En révision",
    className:
      "bg-destructive/10 text-destructive border border-dashed border-destructive/50",
  },
};

const CATEGORY_CONFIG: Record<string, { className: string }> = {
  SUV: {
    className:
      "bg-primary/20 text-primary border border-dashed border-primary/50",
  },
  Berline: {
    className:
      "bg-secondary/20 text-secondary-foreground border border-dashed border-border",
  },
  Citadine: {
    className:
      "bg-violet-500/20 text-violet-700 border border-dashed border-violet-300",
  },
  Utilitaire: {
    className:
      "bg-secondary/20 text-secondary-foreground border border-dashed border-border",
  },
  "Luxe Berline": {
    className:
      "bg-amber-500/20 text-amber-700 border border-dashed border-amber-300",
  },
  "Luxe SUV": {
    className:
      "bg-emerald-500/20 text-emerald-700 border border-dashed border-emerald-300",
  },
  "Luxe Sportive": {
    className:
      "bg-rose-500/20 text-rose-700 border border-dashed border-rose-300",
  },
};

function formatPrix(prix: number): string {
  return prix.toLocaleString("fr-CI") + " FCFA";
}

const vehicleColumns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "name",
    header: "Véhicule",
    cell: ({ row }) => {
      const vehicle = row.original;
      return (
        <div className="flex items-center gap-3">
          <div
            className="relative size-10 shrink-0 overflow-hidden rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${vehicle.gradientFrom}, ${vehicle.gradientTo})`,
            }}
          >
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <span className="font-medium">{vehicle.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Catégorie",
    cell: ({ row }) => {
      const cat = row.getValue("category") as VehicleCategory;
      const config = CATEGORY_CONFIG[cat] ?? {
        className: "bg-muted text-muted-foreground",
      };
      return (
        <Badge variant="outline" className={config.className}>
          {cat}
        </Badge>
      );
    },
  },
  {
    accessorKey: "transmission",
    header: "Transmission",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Settings2 className="size-3.5" />
        {row.getValue("transmission")}
      </div>
    ),
  },
  {
    accessorKey: "carburant",
    header: "Carburant",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Fuel className="size-3.5" />
        {row.getValue("carburant")}
      </div>
    ),
  },
  {
    accessorKey: "seats",
    header: "Places",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Users className="size-3.5" />
        {row.getValue("seats")}
      </div>
    ),
  },
  {
    accessorKey: "pricePerDay",
    header: "Prix / jour",
    cell: ({ row }) => (
      <div className="font-semibold">
        {formatPrix(row.getValue("pricePerDay"))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status") as VehicleStatus;
      const config = STATUS_CONFIG[status];
      return (
        <Badge variant="outline" className={config.className}>
          {config.label}
        </Badge>
      );
    },
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AgenceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const agence = AGENCES_MOCK.find((a) => a.id === id);

  if (!agence) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <p className="text-muted-foreground">Agence introuvable.</p>
        <Button variant="outline" asChild>
          <Link href="/admin/agences">Retour aux agences</Link>
        </Button>
      </div>
    );
  }

  const vehicleKey = AGENCE_VEHICLE_KEY[agence.nom] ?? agence.nom;
  const vehicles = VEHICLES.filter((v) => v.agencies.includes(vehicleKey));

  const disponibles = vehicles.filter((v) => v.status === "disponible").length;
  const enLocation = vehicles.filter((v) => v.status === "en-location").length;
  const enRevision = vehicles.filter((v) => v.status === "en-revision").length;

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin/agences"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Retour aux agences
      </Link>

      {/* Agency hero with background image */}
      <div className="relative overflow-hidden rounded-xl border">
        {/* Background image */}
        <Image
          src={agence.image}
          alt={agence.nom}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent" />

        {/* Content */}
        <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10">
          {/* Agency name + badge */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
              <Building2 className="size-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                {agence.nom}
              </h1>
              <p className="mt-0.5 text-sm text-white/60">{agence.id}</p>
            </div>
            <Badge className="ml-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              {agence.statut === "active" ? "Active" : "Inactive"}
            </Badge>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-white/80">
            {agence.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-sm text-white/90">
              <MapPin className="size-4 shrink-0 text-white/60" />
              <span>{agence.adresse}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/90">
              <Phone className="size-4 shrink-0 text-white/60" />
              <a
                href={`tel:${agence.telephone.replace(/\s/g, "")}`}
                className="hover:text-white transition-colors"
              >
                {agence.telephone}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/90">
              <User className="size-4 shrink-0 text-white/60" />
              <span>{agence.responsable}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            label: "Total véhicules",
            value: vehicles.length,
            color: "text-foreground",
          },
          {
            label: "Disponibles",
            value: disponibles,
            color: "text-emerald-600",
          },
          {
            label: "En location",
            value: enLocation,
            color: "text-amber-600",
          },
          {
            label: "En révision",
            value: enRevision,
            color: "text-red-600",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border bg-card p-4 shadow-sm"
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <Separator />

      {/* Vehicles section */}
      <section aria-label="Véhicules de l'agence">
        {/* Title + view toggle */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Car className="size-5 text-muted-foreground" />
            Véhicules ({vehicles.length})
          </h2>
          <div className="flex items-center gap-1 rounded-lg border p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="size-8"
              onClick={() => setViewMode("grid")}
              aria-label="Affichage grille"
            >
              <Grid3X3 className="size-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="size-8"
              onClick={() => setViewMode("list")}
              aria-label="Affichage liste"
            >
              <List className="size-4" />
            </Button>
          </div>
        </div>

        {vehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Car className="size-12 text-muted-foreground/40 mb-4" />
            <p className="text-sm font-medium text-foreground">
              Aucun véhicule dans cette agence
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Les véhicules affectés à {agence.nom} apparaîtront ici.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onViewDetails={(vid) => router.push(`/vehicules/${vid}`)}
              />
            ))}
          </div>
        ) : (
          <DataTable
            columns={vehicleColumns}
            data={vehicles}
            enablePagination={true}
            enableSorting={true}
          />
        )}
      </section>
    </div>
  );
}
