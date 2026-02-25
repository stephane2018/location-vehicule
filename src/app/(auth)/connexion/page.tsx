"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  CarIcon,
  CheckCircle2,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Shield,
} from "lucide-react";

export default function ConnexionPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [mode, setMode] = React.useState<"login" | "register">("login");

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel: dark editorial ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[oklch(0.13_0.02_250)]" />

        {/* Gradient accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 60%, oklch(0.3 0.15 260 / 0.25), transparent)",
          }}
        />

        {/* Fine grid pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative flex flex-col justify-between p-12 xl:p-16">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CarIcon className="size-4.5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              AutoLoc <span className="text-primary">CI</span>
            </span>
          </Link>

          {/* Main text */}
          <div className="max-w-md">
            <h1 className="text-3xl font-bold tracking-tight text-white xl:text-4xl">
              Louez en toute
              <span className="block mt-1 text-white/50">simplicité</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/40">
              Accédez à votre compte pour gérer vos réservations,
              suivre vos locations et profiter de nos offres exclusives.
            </p>

            {/* Features list */}
            <div className="mt-8 space-y-4">
              {[
                "Réservation en 2 minutes",
                "Paiement Mobile Money sécurisé",
                "Annulation gratuite sous 48h",
                "Assurance tous risques incluse",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-white/50"
                >
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom stats */}
          <div className="flex items-center gap-6">
            {[
              { value: "5 000+", label: "Clients" },
              { value: "4.8/5", label: "Note" },
              { value: "5", label: "Agences" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-xs text-white/30">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile-only logo */}
          <div className="text-center lg:hidden">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <CarIcon className="size-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground">
                AutoLoc <span className="text-primary">CI</span>
              </span>
            </Link>
          </div>

          {/* Form header */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {mode === "login" ? "Bon retour !" : "Créer un compte"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {mode === "login"
                ? "Connectez-vous pour accéder à vos réservations"
                : "Inscrivez-vous pour réserver un véhicule"}
            </p>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  mode === "login"
                    ? "Connexion simulée !"
                    : "Inscription simulée !"
                );
              }}
              className="space-y-4"
            >
              {mode === "register" && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input
                      id="prenom"
                      placeholder="Yves"
                      className="border-border/60"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom</Label>
                    <Input
                      id="nom"
                      placeholder="Kouamé"
                      className="border-border/60"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
                  <Input
                    id="telephone"
                    type="tel"
                    placeholder="+225 07 XX XX XX XX"
                    className="pl-10 border-border/60"
                    required
                  />
                </div>
              </div>

              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optionnel)</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      className="pl-10 border-border/60"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  {mode === "login" && (
                    <button
                      type="button"
                      className="text-xs text-primary hover:underline"
                    >
                      Mot de passe oublié ?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pr-10 border-border/60"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={
                      showPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="password-confirm">
                    Confirmer le mot de passe
                  </Label>
                  <Input
                    id="password-confirm"
                    type="password"
                    placeholder="••••••••"
                    className="border-border/60"
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full font-semibold mt-2">
                {mode === "login" ? "Se connecter" : "Créer mon compte"}
              </Button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-border/50" />
              <span className="text-xs text-muted-foreground/60">ou</span>
              <div className="h-px flex-1 bg-border/50" />
            </div>

            <p className="text-center text-sm text-muted-foreground">
              {mode === "login" ? (
                <>
                  Pas encore de compte ?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className="font-semibold text-primary hover:underline"
                  >
                    S&apos;inscrire
                  </button>
                </>
              ) : (
                <>
                  Déjà un compte ?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="font-semibold text-primary hover:underline"
                  >
                    Se connecter
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Trust + legal */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="size-3.5 text-emerald-500" />
              Connexion sécurisée · Données protégées
            </div>
            <p className="text-center text-xs text-muted-foreground/60">
              En continuant, vous acceptez nos{" "}
              <Link
                href="/cgv"
                className="text-primary/80 hover:underline"
              >
                Conditions Générales
              </Link>{" "}
              et notre{" "}
              <Link
                href="/confidentialite"
                className="text-primary/80 hover:underline"
              >
                Politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
