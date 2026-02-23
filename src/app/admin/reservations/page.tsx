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
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

type ReservationStatut =
  | "confirmee"
  | "en_attente"
  | "en_cours"
  | "terminee"
  | "annulee";

interface Reservation {
  id: string;
  client: string;
  telephone: string;
  vehicule: string;
  agenceRetrait: string;
  agenceRetour: string;
  dateDebut: string;
  dateFin: string;
  jours: number;
  statut: ReservationStatut;
  montant: number;
  paiement: "Orange Money" | "MTN MoMo" | "Wave" | "Moov Money" | "Carte bancaire";
}

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

const RESERVATIONS_MOCK: Reservation[] = [
  {
    id: "RES-001",
    client: "Kouamé Yves",
    telephone: "+225 07 12 34 56 78",
    vehicule: "Toyota RAV4 2023",
    agenceRetrait: "Abidjan-Cocody",
    agenceRetour: "Abidjan-Cocody",
    dateDebut: "20 fév. 2026",
    dateFin: "25 fév. 2026",
    jours: 5,
    statut: "confirmee",
    montant: 375000,
    paiement: "Orange Money",
  },
  {
    id: "RES-002",
    client: "Adjoua Mariam",
    telephone: "+225 07 98 76 54 32",
    vehicule: "Hyundai Tucson 2022",
    agenceRetrait: "Abidjan-Plateau",
    agenceRetour: "Abidjan-Plateau",
    dateDebut: "21 fév. 2026",
    dateFin: "23 fév. 2026",
    jours: 2,
    statut: "en_attente",
    montant: 150000,
    paiement: "MTN MoMo",
  },
  {
    id: "RES-003",
    client: "Bamba Cheick",
    telephone: "+225 07 11 22 33 44",
    vehicule: "Mercedes Classe C 2023",
    agenceRetrait: "Yamoussoukro",
    agenceRetour: "Abidjan-Cocody",
    dateDebut: "18 fév. 2026",
    dateFin: "22 fév. 2026",
    jours: 4,
    statut: "en_cours",
    montant: 560000,
    paiement: "Wave",
  },
  {
    id: "RES-004",
    client: "Touré Fatoumata",
    telephone: "+225 07 55 66 77 88",
    vehicule: "Kia Sportage 2022",
    agenceRetrait: "Bouaké",
    agenceRetour: "Bouaké",
    dateDebut: "22 fév. 2026",
    dateFin: "24 fév. 2026",
    jours: 2,
    statut: "annulee",
    montant: 160000,
    paiement: "Orange Money",
  },
  {
    id: "RES-005",
    client: "N'Goran Pierre",
    telephone: "+225 07 44 33 22 11",
    vehicule: "Peugeot 3008 2023",
    agenceRetrait: "San Pedro",
    agenceRetour: "San Pedro",
    dateDebut: "23 fév. 2026",
    dateFin: "27 fév. 2026",
    jours: 4,
    statut: "confirmee",
    montant: 320000,
    paiement: "Moov Money",
  },
  {
    id: "RES-006",
    client: "Konan Evelyne",
    telephone: "+225 07 22 44 66 88",
    vehicule: "Toyota Corolla 2022",
    agenceRetrait: "Abidjan-Cocody",
    agenceRetour: "Yamoussoukro",
    dateDebut: "19 fév. 2026",
    dateFin: "21 fév. 2026",
    jours: 2,
    statut: "terminee",
    montant: 120000,
    paiement: "Carte bancaire",
  },
  {
    id: "RES-007",
    client: "Diabaté Ismaël",
    telephone: "+225 07 77 88 99 00",
    vehicule: "Ford Ranger 2023",
    agenceRetrait: "Abidjan-Plateau",
    agenceRetour: "Abidjan-Plateau",
    dateDebut: "23 fév. 2026",
    dateFin: "28 fév. 2026",
    jours: 5,
    statut: "confirmee",
    montant: 475000,
    paiement: "MTN MoMo",
  },
  {
    id: "RES-008",
    client: "Aka Sylvie",
    telephone: "+225 07 33 44 55 66",
    vehicule: "Renault Duster 2022",
    agenceRetrait: "Yamoussoukro",
    agenceRetour: "Yamoussoukro",
    dateDebut: "24 fév. 2026",
    dateFin: "26 fév. 2026",
    jours: 2,
    statut: "en_attente",
    montant: 130000,
    paiement: "Wave",
  },
  {
    id: "RES-009",
    client: "Traoré Moussa",
    telephone: "+225 07 66 55 44 33",
    vehicule: "Toyota Land Cruiser 2023",
    agenceRetrait: "Abidjan-Cocody",
    agenceRetour: "Abidjan-Cocody",
    dateDebut: "15 fév. 2026",
    dateFin: "20 fév. 2026",
    jours: 5,
    statut: "terminee",
    montant: 750000,
    paiement: "Orange Money",
  },
  {
    id: "RES-010",
    client: "Coulibaly Awa",
    telephone: "+225 07 88 77 66 55",
    vehicule: "Dacia Sandero 2022",
    agenceRetrait: "Bouaké",
    agenceRetour: "Bouaké",
    dateDebut: "25 fév. 2026",
    dateFin: "28 fév. 2026",
    jours: 3,
    statut: "en_attente",
    montant: 105000,
    paiement: "Moov Money",
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
