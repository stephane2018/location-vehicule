"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  ArrowRight,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  Shield,
  Star,
  User,
} from "lucide-react";
import { VEHICLES, AGENCIES } from "@/core/utils/vehicleData";

// ─── Steps ───────────────────────────────────────────────────────────────────

const STEPS = [
  { number: 1, label: "Véhicule & Dates", icon: Car },
  { number: 2, label: "Vos informations", icon: User },
  { number: 3, label: "Paiement", icon: CreditCard },
  { number: 4, label: "Confirmation", icon: CheckCircle2 },
] as const;

const PAYMENT_METHODS = [
  { id: "orange", name: "Orange Money", color: "bg-orange-500" },
  { id: "mtn", name: "MTN MoMo", color: "bg-amber-500" },
  { id: "moov", name: "Moov Money", color: "bg-blue-500" },
  { id: "wave", name: "Wave", color: "bg-cyan-500" },
] as const;

// ─── Step indicator ──────────────────────────────────────────────────────────

function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const isActive = currentStep === step.number;
        const isDone = currentStep > step.number;
        return (
          <React.Fragment key={step.number}>
            {i > 0 && (
              <div
                className={`hidden sm:block h-px w-10 transition-colors ${
                  isDone ? "bg-primary" : "bg-border/50"
                }`}
              />
            )}
            <div className="flex items-center gap-2">
              <div
                className={`flex size-9 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : isDone
                    ? "bg-primary/15 text-primary"
                    : "bg-muted/60 text-muted-foreground"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="size-4" />
                ) : (
                  <Icon className="size-4" />
                )}
              </div>
              <span
                className={`hidden sm:inline text-xs font-medium transition-colors ${
                  isActive
                    ? "text-foreground"
                    : isDone
                    ? "text-primary"
                    : "text-muted-foreground/60"
                }`}
              >
                {step.label}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ReservationPage() {
  const [step, setStep] = React.useState(1);
  const [selectedVehicle, setSelectedVehicle] = React.useState("");
  const [selectedPayment, setSelectedPayment] = React.useState("");

  const vehicle = VEHICLES.find((v) => v.id === selectedVehicle);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero banner ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[oklch(0.13_0.02_250)]" />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 60% 30%, oklch(0.3 0.15 260 / 0.2), transparent)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            Réservation
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Réserver un véhicule
          </h1>
          <p className="mt-3 text-white/40 max-w-lg mx-auto">
            Complétez les étapes ci-dessous pour finaliser votre réservation
            en toute simplicité.
          </p>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { icon: Shield, label: "Paiement sécurisé" },
              { icon: Clock, label: "Annulation gratuite 48h" },
              { icon: Star, label: "Assurance incluse" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-1.5 text-xs text-white/35"
              >
                <badge.icon className="size-3.5 text-primary/70" />
                {badge.label}
              </div>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"
        />
      </section>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {/* Step indicator */}
        <div className="mb-8 rounded-2xl border border-border/50 bg-card px-4 py-4 shadow-sm">
          <StepIndicator currentStep={step} />
        </div>

        {/* Step 1: Vehicle & Dates */}
        {step === 1 && (
          <Card className="gap-0 py-0 border-border/50 shadow-sm">
            <CardHeader className="px-6 py-5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/8">
                  <Car className="size-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Véhicule & Dates</CardTitle>
                  <CardDescription className="text-xs">
                    Choisissez votre véhicule, les dates et l&apos;agence de retrait.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="vehicule">Véhicule</Label>
                <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                  <SelectTrigger id="vehicule" className="border-border/60">
                    <SelectValue placeholder="Choisir un véhicule" />
                  </SelectTrigger>
                  <SelectContent>
                    {VEHICLES.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        {v.name} — {v.pricePerDay.toLocaleString("fr-FR")} FCFA/jour
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date-debut">Date de début</Label>
                  <Input id="date-debut" type="date" className="border-border/60" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-fin">Date de fin</Label>
                  <Input id="date-fin" type="date" className="border-border/60" required />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="agence-retrait">Agence de retrait</Label>
                  <Select>
                    <SelectTrigger id="agence-retrait" className="border-border/60">
                      <SelectValue placeholder="Choisir une agence" />
                    </SelectTrigger>
                    <SelectContent>
                      {AGENCIES.map((a) => (
                        <SelectItem key={a} value={a}>
                          {a}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agence-retour">Agence de retour</Label>
                  <Select>
                    <SelectTrigger id="agence-retour" className="border-border/60">
                      <SelectValue placeholder="Même agence" />
                    </SelectTrigger>
                    <SelectContent>
                      {AGENCIES.map((a) => (
                        <SelectItem key={a} value={a}>
                          {a}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Selected vehicle preview */}
              {vehicle && (
                <>
                  <div className="h-px bg-border/50" />
                  <div className="flex items-center gap-4 rounded-xl border border-border/50 bg-muted/20 p-4">
                    <div
                      className="relative size-14 overflow-hidden rounded-lg shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${vehicle.gradientFrom}, ${vehicle.gradientTo})`,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm">
                        {vehicle.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {vehicle.category} · {vehicle.transmission} · {vehicle.seats} places
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-bold text-primary">
                        {vehicle.pricePerDay.toLocaleString("fr-FR")}
                      </p>
                      <p className="text-[10px] text-muted-foreground">FCFA / jour</p>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} className="gap-2">
                  Continuer
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: User info */}
        {step === 2 && (
          <Card className="gap-0 py-0 border-border/50 shadow-sm">
            <CardHeader className="px-6 py-5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/8">
                  <User className="size-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Vos informations</CardTitle>
                  <CardDescription className="text-xs">
                    Renseignez vos coordonnées pour la réservation.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="res-prenom">Prénom</Label>
                  <Input id="res-prenom" placeholder="Yves" className="border-border/60" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="res-nom">Nom</Label>
                  <Input id="res-nom" placeholder="Kouamé" className="border-border/60" required />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="res-telephone">Téléphone</Label>
                  <Input
                    id="res-telephone"
                    type="tel"
                    placeholder="+225 07 XX XX XX XX"
                    className="border-border/60"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="res-email">Email</Label>
                  <Input
                    id="res-email"
                    type="email"
                    placeholder="votre@email.com"
                    className="border-border/60"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="res-permis">N° de permis de conduire</Label>
                <Input
                  id="res-permis"
                  placeholder="Ex: CI-AB-1234-5678"
                  className="border-border/60"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="res-notes">Notes (optionnel)</Label>
                <Input
                  id="res-notes"
                  placeholder="Siège bébé, GPS, etc."
                  className="border-border/60"
                />
              </div>

              <div className="flex justify-between pt-1">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="border-border/50"
                >
                  Retour
                </Button>
                <Button onClick={() => setStep(3)} className="gap-2">
                  Continuer
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <Card className="gap-0 py-0 border-border/50 shadow-sm">
            <CardHeader className="px-6 py-5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/8">
                  <CreditCard className="size-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Paiement</CardTitle>
                  <CardDescription className="text-xs">
                    Choisissez votre moyen de paiement Mobile Money.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              {/* Summary */}
              <div className="rounded-xl border border-border/50 bg-muted/20 p-5 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Récapitulatif
                </h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Véhicule</span>
                    <span className="font-medium text-foreground">
                      {vehicle?.name ?? "Toyota Corolla 2023"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Durée</span>
                    <span className="font-medium text-foreground">5 jours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tarif journalier</span>
                    <span className="font-medium text-foreground">
                      {(vehicle?.pricePerDay ?? 25000).toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                  <div className="h-px bg-border/50" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-primary">
                      {((vehicle?.pricePerDay ?? 25000) * 5).toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment methods */}
              <div className="space-y-3">
                <Label>Moyen de paiement</Label>
                <div className="grid grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPayment(method.id)}
                      className={`flex items-center gap-3 rounded-xl border p-4 transition-all cursor-pointer ${
                        selectedPayment === method.id
                          ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                          : "border-border/50 hover:border-primary/30 hover:bg-muted/20"
                      }`}
                    >
                      <div className={`size-3.5 rounded-full ${method.color}`} />
                      <span className="text-sm font-medium text-foreground">
                        {method.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedPayment && (
                <div className="space-y-2">
                  <Label htmlFor="pay-phone">Numéro Mobile Money</Label>
                  <Input
                    id="pay-phone"
                    type="tel"
                    placeholder="+225 07 XX XX XX XX"
                    className="border-border/60"
                    required
                  />
                </div>
              )}

              <div className="flex items-center gap-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 px-4 py-3 text-xs text-muted-foreground">
                <Shield className="size-4 text-emerald-500 shrink-0" />
                Paiement sécurisé. Vos données sont protégées par un chiffrement SSL.
              </div>

              <div className="flex justify-between pt-1">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="border-border/50"
                >
                  Retour
                </Button>
                <Button onClick={() => setStep(4)} className="gap-2">
                  Payer maintenant
                  <CreditCard className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <Card className="gap-0 py-0 border-border/50 shadow-sm">
            <CardContent className="p-8 sm:p-10 text-center space-y-6">
              <div className="flex size-20 items-center justify-center rounded-2xl bg-emerald-500/10 mx-auto">
                <CheckCircle2 className="size-10 text-emerald-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Réservation confirmée !
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Votre réservation a été enregistrée avec succès.
                </p>
              </div>

              <div className="rounded-xl border border-border/50 bg-muted/20 p-5 text-left space-y-3 max-w-sm mx-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Référence</span>
                  <Badge
                    variant="outline"
                    className="font-mono border-border/50"
                  >
                    RES-2026-0342
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Véhicule</span>
                  <span className="font-medium">
                    {vehicle?.name ?? "Toyota Corolla 2023"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Montant payé</span>
                  <span className="font-bold text-primary">
                    {((vehicle?.pricePerDay ?? 25000) * 5).toLocaleString(
                      "fr-FR"
                    )}{" "}
                    FCFA
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Un SMS de confirmation a été envoyé à votre numéro.
                Présentez-vous à l&apos;agence avec votre pièce d&apos;identité
                et votre permis de conduire.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link href="/">Retour à l&apos;accueil</Link>
                </Button>
                <Button variant="outline" className="border-border/50" asChild>
                  <Link href="/vehicules">Voir d&apos;autres véhicules</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
