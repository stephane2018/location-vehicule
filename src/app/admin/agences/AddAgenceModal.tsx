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

const VILLES = [
  "Abidjan",
  "Yamoussoukro",
  "Bouaké",
  "San Pedro",
  "Daloa",
  "Korhogo",
  "Man",
];

const INITIAL_STATE = {
  nom: "",
  ville: "" as string,
  adresse: "",
  telephone: "",
  responsable: "",
};

export function AddAgenceModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_STATE);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: persist to API
    console.log("Nouvelle agence:", form);
    setForm(INITIAL_STATE);
    setOpen(false);
  }

  const isValid =
    form.nom.trim() &&
    form.ville &&
    form.adresse.trim() &&
    form.telephone.trim() &&
    form.responsable.trim();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 self-start sm:self-auto">
          <Plus className="size-4" />
          Ajouter une agence
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouvelle agence</DialogTitle>
          <DialogDescription>
            Créez une nouvelle agence AutoLoc CI.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom */}
          <div className="space-y-1.5">
            <Label htmlFor="ag-nom">Nom de l&apos;agence</Label>
            <Input
              id="ag-nom"
              placeholder="Ex: AutoLoc Marcory"
              value={form.nom}
              onChange={(e) => updateField("nom", e.target.value)}
            />
          </div>

          {/* Ville + Téléphone */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Ville</Label>
              <Select
                value={form.ville}
                onValueChange={(v) => updateField("ville", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {VILLES.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ag-tel">Téléphone</Label>
              <Input
                id="ag-tel"
                type="tel"
                placeholder="+225 07 XX XX XX XX"
                value={form.telephone}
                onChange={(e) => updateField("telephone", e.target.value)}
              />
            </div>
          </div>

          {/* Adresse */}
          <div className="space-y-1.5">
            <Label htmlFor="ag-adresse">Adresse complète</Label>
            <Input
              id="ag-adresse"
              placeholder="Ex: Rue des Jardins, Cocody, Abidjan"
              value={form.adresse}
              onChange={(e) => updateField("adresse", e.target.value)}
            />
          </div>

          {/* Responsable */}
          <div className="space-y-1.5">
            <Label htmlFor="ag-resp">Responsable</Label>
            <Input
              id="ag-resp"
              placeholder="Nom complet du responsable"
              value={form.responsable}
              onChange={(e) => updateField("responsable", e.target.value)}
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
              Créer l&apos;agence
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
