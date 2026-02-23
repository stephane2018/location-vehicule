import React from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Car,
  CheckCircle2,
  Wrench,
  ChevronRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type VehiculeStatut = "disponible" | "en_location" | "maintenance";
type VehiculeCategorie =
  | "SUV"
  | "Berline"
  | "Pick-up"
  | "Citadine"
  | "Premium"
  | "Utilitaire";

interface Vehicule {
  id: string;
  nom: string;
  marque: string;
  modele: string;
  annee: number;
  categorie: VehiculeCategorie;
  agence: string;
  prixJour: number;
  statut: VehiculeStatut;
  immatriculation: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STATS_DATA = [
  {
    label: "Total",
    value: 45,
    icon: Car,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    label: "Disponibles",
    value: 23,
    icon: CheckCircle2,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    label: "En location",
    value: 18,
    icon: ChevronRight,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
  {
    label: "En maintenance",
    value: 4,
    icon: Wrench,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
] as const;

const VEHICULES_MOCK: Vehicule[] = [
  {
    id: "VEH-001",
    nom: "Toyota RAV4",
    marque: "Toyota",
    modele: "RAV4",
    annee: 2023,
    categorie: "SUV",
    agence: "Abidjan-Cocody",
    prixJour: 75000,
    statut: "disponible",
    immatriculation: "AB 1234 CI",
  },
  {
    id: "VEH-002",
    nom: "Mercedes Classe C",
    marque: "Mercedes",
    modele: "Classe C",
    annee: 2023,
    categorie: "Premium",
    agence: "Abidjan-Plateau",
    prixJour: 140000,
    statut: "en_location",
    immatriculation: "AB 5678 CI",
  },
  {
    id: "VEH-003",
    nom: "Toyota Corolla",
    marque: "Toyota",
    modele: "Corolla",
    annee: 2022,
    categorie: "Berline",
    agence: "Yamoussoukro",
    prixJour: 55000,
    statut: "disponible",
    immatriculation: "YK 4321 CI",
  },
  {
    id: "VEH-004",
    nom: "Ford Ranger",
    marque: "Ford",
    modele: "Ranger",
    annee: 2023,
    categorie: "Pick-up",
    agence: "Abidjan-Plateau",
    prixJour: 95000,
    statut: "en_location",
    immatriculation: "AB 8765 CI",
  },
  {
    id: "VEH-005",
    nom: "Hyundai Tucson",
    marque: "Hyundai",
    modele: "Tucson",
    annee: 2022,
    categorie: "SUV",
    agence: "Bouaké",
    prixJour: 70000,
    statut: "maintenance",
    immatriculation: "BK 1122 CI",
  },
  {
    id: "VEH-006",
    nom: "Kia Sportage",
    marque: "Kia",
    modele: "Sportage",
    annee: 2022,
    categorie: "SUV",
    agence: "Abidjan-Cocody",
    prixJour: 68000,
    statut: "disponible",
    immatriculation: "AB 3344 CI",
  },
  {
    id: "VEH-007",
    nom: "Peugeot 3008",
    marque: "Peugeot",
    modele: "3008",
    annee: 2023,
    categorie: "SUV",
    agence: "San Pedro",
    prixJour: 72000,
    statut: "en_location",
    immatriculation: "SP 5566 CI",
  },
  {
    id: "VEH-008",
    nom: "Renault Duster",
    marque: "Renault",
    modele: "Duster",
    annee: 2022,
    categorie: "SUV",
    agence: "Yamoussoukro",
    prixJour: 60000,
    statut: "disponible",
    immatriculation: "YK 7788 CI",
  },
  {
    id: "VEH-009",
    nom: "Toyota Hilux",
    marque: "Toyota",
    modele: "Hilux",
    annee: 2023,
    categorie: "Pick-up",
    agence: "Bouaké",
    prixJour: 90000,
    statut: "disponible",
    immatriculation: "BK 9900 CI",
  },
  {
    id: "VEH-010",
    nom: "Dacia Sandero",
    marque: "Dacia",
    modele: "Sandero",
    annee: 2022,
    categorie: "Citadine",
    agence: "Abidjan-Cocody",
    prixJour: 35000,
    statut: "maintenance",
    immatriculation: "AB 1357 CI",
  },
];

const STATUT_CONFIG: Record<
  VehiculeStatut,
  { label: string; className: string }
> = {
  disponible: {
    label: "Disponible",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
  en_location: {
    label: "En location",
    className: "bg-amber-500/10 text-amber-700 border-amber-200",
  },
  maintenance: {
    label: "Maintenance",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

const CATEGORIE_CONFIG: Record<
  VehiculeCategorie,
  { className: string }
> = {
  SUV: { className: "bg-primary/10 text-primary border-primary/20" },
  Berline: { className: "bg-secondary text-secondary-foreground border-border" },
  "Pick-up": { className: "bg-amber-500/10 text-amber-700 border-amber-200" },
  Citadine: { className: "bg-violet-500/10 text-violet-700 border-violet-200" },
  Premium: { className: "bg-emerald-500/10 text-emerald-700 border-emerald-200" },
  Utilitaire: { className: "bg-secondary text-secondary-foreground border-border" },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatPrix(prix: number): string {
  return prix.toLocaleString("fr-CI") + " FCFA";
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

// Placeholder for vehicle image
function VehicleThumbnail({ vehicule }: { vehicule: Vehicule }) {
  return (
    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted">
      <Car className="size-6 text-muted-foreground" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function VehiculesPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Gestion des Véhicules
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gérez la flotte complète de véhicules AutoLoc CI.
          </p>
        </div>
        <Button className="gap-2 self-start sm:self-auto">
          <Plus className="size-4" />
          Ajouter un véhicule
        </Button>
      </div>

      {/* Stats bar */}
      <StatBar />

      {/* Table card */}
      <Card className="gap-0 py-0">
        <CardHeader className="px-6 py-5 border-b">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">
              Liste des véhicules
            </CardTitle>
            {/* Search input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Rechercher un véhicule..."
                className="pl-8 h-9 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6 w-[56px]">Image</TableHead>
                <TableHead>Véhicule</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Catégorie
                </TableHead>
                <TableHead className="hidden md:table-cell">Agence</TableHead>
                <TableHead className="hidden lg:table-cell">
                  Prix / jour
                </TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {VEHICULES_MOCK.map((vehicule) => {
                const statutCfg = STATUT_CONFIG[vehicule.statut];
                const catCfg = CATEGORIE_CONFIG[vehicule.categorie];
                return (
                  <TableRow key={vehicule.id}>
                    <TableCell className="pl-6">
                      <VehicleThumbnail vehicule={vehicule} />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          {vehicule.nom} {vehicule.annee}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {vehicule.immatriculation}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        variant="outline"
                        className={catCfg.className}
                      >
                        {vehicule.categorie}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {vehicule.agence}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm font-medium text-foreground">
                      {formatPrix(vehicule.prixJour)}
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
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:text-primary"
                          aria-label={`Modifier ${vehicule.nom}`}
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:text-destructive"
                          aria-label={`Supprimer ${vehicule.nom}`}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
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
