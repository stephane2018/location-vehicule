"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Car } from "lucide-react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { NoSSR } from "@/shared/components/ui/no-ssr";
import type { Vehicule, VehiculeStatut, VehiculeCategorie } from "@/core/types/vehicule";

const STATUT_CONFIG: Record<
  VehiculeStatut,
  { label: string; className: string }
> = {
  disponible: {
    label: "Disponible",
    className: "bg-emerald-500/10 text-emerald-700 border border-dashed border-emerald-300",
  },
  en_location: {
    label: "En location",
    className: "bg-amber-500/10 text-amber-700 border border-dashed border-amber-300",
  },
  maintenance: {
    label: "Maintenance",
    className: "bg-destructive/10 text-destructive borde border-dashed border-destructive/50",
  },
};

const CATEGORIE_CONFIG: Record<
  VehiculeCategorie,
  { className: string }
> = {
  SUV: { className: "bg-primary/20 text-primary border border-dashed border-primary/50" },
  Berline: { className: "bg-secondary/20 text-secondary-foreground border border-dashed border-border" },
  "Pick-up": { className: "bg-amber-500/20 text-amber-700 border border-dashed border-amber-300" },
  Citadine: { className: "bg-violet-500/20 text-violet-700 border border-dashed border-violet-300" },
  Premium: { className: "bg-emerald-500/20 text-emerald-700 border border-dashed border-emerald-300" },
  Utilitaire: { className: "bg-secondary/20 text-secondary-foreground border border-dashed border-border" },
};

function formatPrix(prix: number): string {
  return prix.toLocaleString("fr-CI") + " FCFA";
}

export const columns: ColumnDef<Vehicule>[] = [
  {
    accessorKey: "nom",
    header: "Nom",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("nom")}</div>
    ),
  },
  {
    accessorKey: "marque",
    header: "Marque",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("marque")}</div>
    ),
  },
  {
    accessorKey: "modele",
    header: "Modèle",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("modele")}</div>
    ),
  },
  {
    accessorKey: "annee",
    header: "Année",
    cell: ({ row }) => <div>{row.getValue("annee")}</div>,
  },
  {
    accessorKey: "categorie",
    header: "Catégorie",
    cell: ({ row }) => {
      const categorie = row.getValue("categorie") as VehiculeCategorie;
      const config = CATEGORIE_CONFIG[categorie];
      return (
        <Badge variant="outline" className={config.className}>
          {categorie}
        </Badge>
      );
    },
  },
  {
    accessorKey: "agence",
    header: "Agence",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("agence")}</div>
    ),
  },
  {
    accessorKey: "prixJour",
    header: "Prix / jour",
    cell: ({ row }) => {
      const prix = row.getValue("prixJour") as number;
      return <div>{formatPrix(prix)}</div>;
    },
  },
  {
    accessorKey: "statut",
    header: "Statut",
    cell: ({ row }) => {
      const vehicule = row.original;
      const statutCfg = STATUT_CONFIG[vehicule.statut];
      return (
        <Badge
          variant="outline"
          className={statutCfg.className}
        >
          {statutCfg.label}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const vehicule = row.original;

      return (
        <NoSSR>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(vehicule.id)}
              >
                Copier l'ID du véhicule
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NoSSR>
      );
    },
  },
];
