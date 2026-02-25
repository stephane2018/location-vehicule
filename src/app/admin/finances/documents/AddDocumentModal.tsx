"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import { VEHICULES_MOCK } from "@/core/data/mock/vehicules";
import { formatMontant } from "@/core/utils/adminHelpers";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LigneForm {
  description: string;
  quantite: string;
  prixUnitaire: string;
}

const EMPTY_LIGNE: LigneForm = {
  description: "",
  quantite: "1",
  prixUnitaire: "",
};

const TAUX_TAXE = 0.18; // 18% TVA

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AddDocumentModal() {
  const [open, setOpen] = useState(false);

  // Client info
  const [clientNom, setClientNom] = useState("");
  const [clientTelephone, setClientTelephone] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  // Vehicle
  const [vehiculeId, setVehiculeId] = useState("");

  // Date
  const [dateEcheance, setDateEcheance] = useState("");

  // Lignes
  const [lignes, setLignes] = useState<LigneForm[]>([{ ...EMPTY_LIGNE }]);

  // ---------------------------------------------------------------------------
  // Ligne helpers
  // ---------------------------------------------------------------------------

  function addLigne() {
    setLignes((prev) => [...prev, { ...EMPTY_LIGNE }]);
  }

  function removeLigne(index: number) {
    setLignes((prev) => prev.filter((_, i) => i !== index));
  }

  function updateLigne(index: number, field: keyof LigneForm, value: string) {
    setLignes((prev) =>
      prev.map((l, i) => (i === index ? { ...l, [field]: value } : l))
    );
  }

  // ---------------------------------------------------------------------------
  // Totals
  // ---------------------------------------------------------------------------

  const sousTotal = lignes.reduce((sum, l) => {
    const qty = Number(l.quantite) || 0;
    const price = Number(l.prixUnitaire) || 0;
    return sum + qty * price;
  }, 0);

  const taxe = Math.round(sousTotal * TAUX_TAXE);
  const total = sousTotal + taxe;

  // ---------------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------------

  const isValid =
    clientNom.trim() &&
    clientTelephone.trim() &&
    vehiculeId &&
    dateEcheance &&
    lignes.length > 0 &&
    lignes.every(
      (l) =>
        l.description.trim() &&
        Number(l.quantite) > 0 &&
        Number(l.prixUnitaire) > 0
    );

  // ---------------------------------------------------------------------------
  // Submit
  // ---------------------------------------------------------------------------

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const vehicule = VEHICULES_MOCK.find((v) => v.id === vehiculeId);

    const document = {
      type: "pro_forma" as const,
      statut: "brouillon" as const,
      dateCreation: new Date().toISOString().split("T")[0],
      dateEcheance,
      client: {
        nom: clientNom,
        telephone: clientTelephone,
        email: clientEmail,
      },
      vehicule: vehicule
        ? {
            id: vehicule.id,
            nom: `${vehicule.marque} ${vehicule.modele}`,
            immatriculation: vehicule.immatriculation,
          }
        : null,
      lignes: lignes.map((l) => ({
        description: l.description,
        quantite: Number(l.quantite),
        prixUnitaire: Number(l.prixUnitaire),
        montant: Number(l.quantite) * Number(l.prixUnitaire),
      })),
      sousTotal,
      taxe,
      total,
    };

    // TODO: persist to API
    console.log("Nouveau pro-forma:", document);
    resetForm();
    setOpen(false);
  }

  function resetForm() {
    setClientNom("");
    setClientTelephone("");
    setClientEmail("");
    setVehiculeId("");
    setDateEcheance("");
    setLignes([{ ...EMPTY_LIGNE }]);
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) resetForm();
      }}
    >
      <DialogTrigger asChild>
        <Button className="shrink-0">
          <Plus className="size-4" />
          Nouveau pro-forma
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nouveau pro-forma</DialogTitle>
          <DialogDescription>
            Créez un devis pro-forma pour un client.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ---- Client ---- */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-foreground">
              Client
            </legend>

            <div className="space-y-1.5">
              <Label htmlFor="doc-client-nom">Nom complet</Label>
              <Input
                id="doc-client-nom"
                placeholder="Ex: Kouamé Yao Jean-Baptiste"
                value={clientNom}
                onChange={(e) => setClientNom(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="doc-client-tel">Téléphone</Label>
                <Input
                  id="doc-client-tel"
                  type="tel"
                  placeholder="+225 07 XX XX XX XX"
                  value={clientTelephone}
                  onChange={(e) => setClientTelephone(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="doc-client-email">Email</Label>
                <Input
                  id="doc-client-email"
                  type="email"
                  placeholder="email@exemple.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          <Separator />

          {/* ---- Véhicule + Date ---- */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Véhicule</Label>
              <Select value={vehiculeId} onValueChange={setVehiculeId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {VEHICULES_MOCK.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.marque} {v.modele} — {v.immatriculation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="doc-echeance">Date d&apos;échéance</Label>
              <Input
                id="doc-echeance"
                type="date"
                value={dateEcheance}
                onChange={(e) => setDateEcheance(e.target.value)}
              />
            </div>
          </div>

          <Separator />

          {/* ---- Lignes ---- */}
          <fieldset className="space-y-3">
            <div className="flex items-center justify-between">
              <legend className="text-sm font-semibold text-foreground">
                Lignes du document
              </legend>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={addLigne}
              >
                <Plus className="size-3.5" />
                Ajouter
              </Button>
            </div>

            <div className="space-y-3">
              {lignes.map((ligne, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[1fr_80px_120px_32px] items-end gap-2"
                >
                  <div className="space-y-1">
                    {idx === 0 && (
                      <Label className="text-xs text-muted-foreground">
                        Description
                      </Label>
                    )}
                    <Input
                      placeholder="Ex: Location véhicule - 5 jours"
                      value={ligne.description}
                      onChange={(e) =>
                        updateLigne(idx, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    {idx === 0 && (
                      <Label className="text-xs text-muted-foreground">
                        Qté
                      </Label>
                    )}
                    <Input
                      type="number"
                      min={1}
                      value={ligne.quantite}
                      onChange={(e) =>
                        updateLigne(idx, "quantite", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    {idx === 0 && (
                      <Label className="text-xs text-muted-foreground">
                        Prix unit.
                      </Label>
                    )}
                    <Input
                      type="number"
                      min={0}
                      step={1000}
                      placeholder="FCFA"
                      value={ligne.prixUnitaire}
                      onChange={(e) =>
                        updateLigne(idx, "prixUnitaire", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 size-9"
                    onClick={() => removeLigne(idx)}
                    disabled={lignes.length === 1}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </fieldset>

          <Separator />

          {/* ---- Totaux ---- */}
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Sous-total</span>
              <span>{formatMontant(sousTotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>TVA (18%)</span>
              <span>{formatMontant(taxe)}</span>
            </div>
            <div className="flex justify-between font-semibold text-foreground text-base pt-1 border-t">
              <span>Total</span>
              <span>{formatMontant(total)}</span>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={!isValid}>
              Créer le pro-forma
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
