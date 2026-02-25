"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
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

import type { VehiculeCategorie, VehiculeStatut } from "@/core/types/vehicule";

const CATEGORIES: VehiculeCategorie[] = [
  "SUV",
  "Berline",
  "Citadine",
  "Utilitaire",
  "Pick-up",
  "Premium",
];

const STATUTS: { value: VehiculeStatut; label: string }[] = [
  { value: "disponible", label: "Disponible" },
  { value: "en_location", label: "En location" },
  { value: "maintenance", label: "Maintenance" },
];

const AGENCES = [
  "Abidjan-Cocody",
  "Abidjan-Plateau",
  "Yamoussoukro",
  "Bouaké",
  "San-Pedro",
];

const INITIAL_STATE = {
  marque: "",
  modele: "",
  annee: new Date().getFullYear().toString(),
  categorie: "" as string,
  agence: "" as string,
  prixJour: "",
  immatriculation: "",
  statut: "disponible" as string,
};

export function AddVehiculeModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_STATE);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: persist to API
    console.log("Nouveau véhicule:", {
      ...form,
      annee: Number(form.annee),
      prixJour: Number(form.prixJour),
    });
    setForm(INITIAL_STATE);
    setOpen(false);
  }

  const isValid =
    form.marque.trim() &&
    form.modele.trim() &&
    form.annee &&
    form.categorie &&
    form.agence &&
    form.prixJour &&
    form.immatriculation.trim();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 self-start sm:self-auto">
          <Plus className="size-4" />
          Ajouter un véhicule
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nouveau véhicule</DialogTitle>
          <DialogDescription>
            Ajoutez un véhicule à la flotte AutoLoc CI.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Marque + Modèle */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="veh-marque">Marque</Label>
              <Input
                id="veh-marque"
                placeholder="Ex: Toyota"
                value={form.marque}
                onChange={(e) => updateField("marque", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="veh-modele">Modèle</Label>
              <Input
                id="veh-modele"
                placeholder="Ex: RAV4"
                value={form.modele}
                onChange={(e) => updateField("modele", e.target.value)}
              />
            </div>
          </div>

          {/* Année + Catégorie */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="veh-annee">Année</Label>
              <Input
                id="veh-annee"
                type="number"
                min={2015}
                max={2030}
                value={form.annee}
                onChange={(e) => updateField("annee", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Catégorie</Label>
              <Select
                value={form.categorie}
                onValueChange={(v) => updateField("categorie", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Immatriculation */}
          <div className="space-y-1.5">
            <Label htmlFor="veh-immat">Immatriculation</Label>
            <Input
              id="veh-immat"
              placeholder="Ex: AB 1234 CI"
              value={form.immatriculation}
              onChange={(e) => updateField("immatriculation", e.target.value)}
            />
          </div>

          {/* Agence + Statut */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Agence</Label>
              <Select
                value={form.agence}
                onValueChange={(v) => updateField("agence", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {AGENCES.map((ag) => (
                    <SelectItem key={ag} value={ag}>
                      {ag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Statut</Label>
              <Select
                value={form.statut}
                onValueChange={(v) => updateField("statut", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {STATUTS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Prix par jour */}
          <div className="space-y-1.5">
            <Label htmlFor="veh-prix">Prix par jour (FCFA)</Label>
            <Input
              id="veh-prix"
              type="number"
              min={0}
              step={1000}
              placeholder="Ex: 45000"
              value={form.prixJour}
              onChange={(e) => updateField("prixJour", e.target.value)}
            />
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
              Ajouter le véhicule
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
