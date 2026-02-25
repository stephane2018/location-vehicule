"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  FileText,
  FileCheck,
  FileClock,
  Wrench,
  Search,
  Lock,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

import { DOCUMENTS } from "@/data/mock/documents";
import { formatMontant, formatDate } from "@/utils/adminHelpers";
import type { DocumentType, DocumentStatut } from "@/types/admin";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getTypeBadge(type: DocumentType) {
  const config: Record<DocumentType, { label: string; className: string }> = {
    pro_forma: {
      label: "Pro-forma",
      className: "bg-blue-500/10 text-blue-700 border-blue-200",
    },
    facture: {
      label: "Facture",
      className: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    },
    facture_reparation: {
      label: "Facture r\u00e9paration",
      className: "bg-amber-500/10 text-amber-700 border-amber-200",
    },
  };
  const c = config[type];
  return (
    <Badge variant="outline" className={c.className}>
      {c.label}
    </Badge>
  );
}

function getStatutBadge(statut: DocumentStatut) {
  const config: Record<DocumentStatut, { label: string; className: string }> = {
    brouillon: {
      label: "Brouillon",
      className: "bg-gray-500/10 text-gray-700 border-gray-200",
    },
    envoyee: {
      label: "Envoy\u00e9e",
      className: "bg-blue-500/10 text-blue-700 border-blue-200",
    },
    payee: {
      label: "Pay\u00e9e",
      className: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    },
    annulee: {
      label: "Annul\u00e9e",
      className: "bg-red-500/10 text-red-700 border-red-200",
    },
  };
  const c = config[statut];
  return (
    <Badge variant="outline" className={c.className}>
      {c.label}
    </Badge>
  );
}

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

const totalDocuments = DOCUMENTS.length;
const totalProFormas = DOCUMENTS.filter((d) => d.type === "pro_forma").length;
const totalFactures = DOCUMENTS.filter((d) => d.type === "facture").length;
const totalReparations = DOCUMENTS.filter(
  (d) => d.type === "facture_reparation"
).length;

const STATS = [
  {
    label: "Total documents",
    value: totalDocuments,
    icon: FileText,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    label: "Pro-formas",
    value: totalProFormas,
    icon: FileClock,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    label: "Factures",
    value: totalFactures,
    icon: FileCheck,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
  },
  {
    label: "Factures garage",
    value: totalReparations,
    icon: Wrench,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-600",
  },
] as const;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DocumentsPage() {
  const [typeFilter, setTypeFilter] = useState<string>("tous");
  const [statutFilter, setStatutFilter] = useState<string>("tous");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return DOCUMENTS.filter((doc) => {
      if (typeFilter !== "tous" && doc.type !== typeFilter) return false;
      if (statutFilter !== "tous" && doc.statut !== statutFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesNumero = doc.numero.toLowerCase().includes(q);
        const matchesClient = doc.client.nom.toLowerCase().includes(q);
        const matchesVehicule = doc.vehicule.nom.toLowerCase().includes(q);
        if (!matchesNumero && !matchesClient && !matchesVehicule) return false;
      }
      return true;
    });
  }, [typeFilter, statutFilter, search]);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/finances"
            className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Retour aux finances
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Documents financiers
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gestion des pro-formas, factures et documents comptables
          </p>
        </div>
        <Button className="shrink-0">
          <Plus className="size-4" />
          Nouveau pro-forma
        </Button>
      </div>

      {/* Stats cards */}
      <section aria-label="Statistiques documents">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="gap-0 py-5">
                <CardContent className="px-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </p>
                      <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
                    >
                      <Icon className={`size-5 ${stat.iconColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Filters */}
      <section aria-label="Filtres">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous les types</SelectItem>
              <SelectItem value="pro_forma">Pro-forma</SelectItem>
              <SelectItem value="facture">Facture</SelectItem>
              <SelectItem value="facture_reparation">
                Facture r&eacute;paration
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={statutFilter} onValueChange={setStatutFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous les statuts</SelectItem>
              <SelectItem value="brouillon">Brouillon</SelectItem>
              <SelectItem value="envoyee">Envoy&eacute;e</SelectItem>
              <SelectItem value="payee">Pay&eacute;e</SelectItem>
              <SelectItem value="annulee">Annul&eacute;e</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par num&eacute;ro, client ou v&eacute;hicule..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </section>

      {/* Documents table */}
      <section aria-label="Liste des documents">
        <Card className="gap-0 py-0">
          <CardHeader className="px-6 py-5 border-b">
            <CardTitle className="text-base">
              Documents ({filtered.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <FileText className="size-12 text-muted-foreground/40 mb-4" />
                <p className="text-sm font-medium text-foreground">
                  Aucun document trouv&eacute;
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Modifiez vos filtres ou cr&eacute;ez un nouveau document.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Num&eacute;ro</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>V&eacute;hicule</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Montant</TableHead>
                    <TableHead className="text-center">Statut</TableHead>
                    <TableHead className="pr-6 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="pl-6">
                        <Link
                          href={`/admin/finances/documents/${doc.id}`}
                          className="font-medium text-foreground hover:text-primary transition-colors text-sm"
                        >
                          {doc.numero}
                        </Link>
                      </TableCell>
                      <TableCell>{getTypeBadge(doc.type)}</TableCell>
                      <TableCell>
                        <p className="text-sm text-foreground">
                          {doc.client.nom}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-foreground">
                          {doc.vehicule.nom}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {doc.vehicule.immatriculation}
                        </p>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(doc.dateCreation)}
                      </TableCell>
                      <TableCell className="text-right text-sm font-semibold text-foreground">
                        {formatMontant(doc.total)}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatutBadge(doc.statut)}
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        {doc.type === "facture" ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled
                            className="text-muted-foreground"
                            title="Les factures ne peuvent pas \u00eatre supprim\u00e9es"
                          >
                            <Lock className="size-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            title="Supprimer"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
