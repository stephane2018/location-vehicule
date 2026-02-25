"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  Ban,
  Lock,
  FileText,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/shared/components/ui/table";

import { DOCUMENTS } from "@/core/data/mock/documents";
import { formatMontant, formatDate } from "@/core/utils/adminHelpers";
import type { DocumentType, DocumentStatut } from "@/core/types/admin";

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

function getTypeLabel(type: DocumentType): string {
  const labels: Record<DocumentType, string> = {
    pro_forma: "Pro-forma",
    facture: "Facture",
    facture_reparation: "Facture r\u00e9paration",
  };
  return labels[type];
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DocumentDetailPage() {
  const params = useParams<{ id: string }>();
  const document = DOCUMENTS.find((d) => d.id === params.id);

  if (!document) {
    return (
      <div className="space-y-8">
        <Link
          href="/admin/finances/documents"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Retour aux documents
        </Link>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="size-16 text-muted-foreground/40 mb-4" />
          <h1 className="text-xl font-bold text-foreground">
            Document introuvable
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Le document demand&eacute; n&apos;existe pas ou a &eacute;t&eacute;
            supprim&eacute;.
          </p>
        </div>
      </div>
    );
  }

  const isFacture = document.type === "facture";
  const isProForma = document.type === "pro_forma";
  const canCancel = isProForma && document.statut !== "annulee";

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        href="/admin/finances/documents"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Retour aux documents
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {document.numero}
          </h1>
          {getTypeBadge(document.type)}
          {getStatutBadge(document.statut)}
          {isFacture && (
            <Badge
              variant="outline"
              className="bg-gray-500/10 text-gray-700 border-gray-200"
            >
              <Lock className="size-3 mr-1" />
              Non supprimable
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => window.print()}
          >
            <Printer className="size-4" />
            Imprimer
          </Button>
          <Button
            variant="destructive"
            disabled={!canCancel}
            title={
              !canCancel
                ? "Seuls les pro-formas non annul\u00e9s peuvent \u00eatre annul\u00e9s"
                : "Annuler ce document"
            }
          >
            <Ban className="size-4" />
            Annuler
          </Button>
        </div>
      </div>

      {/* Print-friendly document */}
      <div className="print:m-0 print:p-0 print:shadow-none">
        <Card className="gap-0 py-0">
          <CardContent className="p-8 space-y-8">
            {/* Company header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  AutoLoc CI
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Abidjan, C&ocirc;te d&apos;Ivoire
                </p>
                <p className="text-sm text-muted-foreground">
                  +225 07 00 00 00 00
                </p>
                <p className="text-sm text-muted-foreground">
                  contact@autoloc.ci
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-lg font-bold text-foreground">
                  {getTypeLabel(document.type)}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {document.numero}
                </p>
              </div>
            </div>

            <Separator />

            {/* Client info */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="gap-0 py-0">
                <CardHeader className="px-5 py-4 border-b">
                  <CardTitle className="text-sm font-semibold">
                    Informations client
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 py-4 space-y-1.5">
                  <p className="text-sm font-medium text-foreground">
                    {document.client.nom}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {document.client.telephone}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {document.client.email}
                  </p>
                </CardContent>
              </Card>

              <Card className="gap-0 py-0">
                <CardHeader className="px-5 py-4 border-b">
                  <CardTitle className="text-sm font-semibold">
                    V&eacute;hicule
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 py-4 space-y-1.5">
                  <p className="text-sm font-medium text-foreground">
                    {document.vehicule.nom}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Immatriculation : {document.vehicule.immatriculation}
                  </p>
                  {document.reservationId && (
                    <p className="text-sm text-muted-foreground">
                      R&eacute;servation associ&eacute;e :{" "}
                      <span className="font-medium text-foreground">
                        {document.reservationId}
                      </span>
                    </p>
                  )}
                  {document.interventionId && (
                    <p className="text-sm text-muted-foreground">
                      Intervention associ&eacute;e :{" "}
                      <span className="font-medium text-foreground">
                        {document.interventionId}
                      </span>
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Lignes table */}
            <Card className="gap-0 py-0">
              <CardHeader className="px-6 py-5 border-b">
                <CardTitle className="text-sm font-semibold">
                  D&eacute;tail des lignes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">Description</TableHead>
                      <TableHead className="text-center">
                        Quantit&eacute;
                      </TableHead>
                      <TableHead className="text-right">
                        Prix unitaire
                      </TableHead>
                      <TableHead className="pr-6 text-right">
                        Montant
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {document.lignes.map((ligne, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="pl-6 text-sm text-foreground">
                          {ligne.description}
                        </TableCell>
                        <TableCell className="text-center text-sm text-muted-foreground">
                          {ligne.quantite}
                        </TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          {formatMontant(ligne.prixUnitaire)}
                        </TableCell>
                        <TableCell className="pr-6 text-right text-sm font-medium text-foreground">
                          {formatMontant(ligne.montant)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3} className="pl-6 text-right text-sm font-medium">
                        Sous-total
                      </TableCell>
                      <TableCell className="pr-6 text-right text-sm font-medium text-foreground">
                        {formatMontant(document.sousTotal)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} className="pl-6 text-right text-sm font-medium">
                        TVA (18%)
                      </TableCell>
                      <TableCell className="pr-6 text-right text-sm font-medium text-foreground">
                        {formatMontant(document.taxe)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} className="pl-6 text-right text-sm font-bold">
                        Total TTC
                      </TableCell>
                      <TableCell className="pr-6 text-right text-sm font-bold text-foreground">
                        {formatMontant(document.total)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardContent>
            </Card>

            {/* Dates */}
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-8 text-sm text-muted-foreground">
              <p>
                Date de cr&eacute;ation :{" "}
                <span className="font-medium text-foreground">
                  {formatDate(document.dateCreation)}
                </span>
              </p>
              <p>
                Date d&apos;&eacute;ch&eacute;ance :{" "}
                <span className="font-medium text-foreground">
                  {formatDate(document.dateEcheance)}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
