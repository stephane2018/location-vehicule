import React from "react";
import {
  Building2,
  Bell,
  CreditCard,
  Globe,
  Lock,
  Mail,
  Phone,
  Save,
  Shield,
  User,
  Palette,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SettingSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="gap-0 py-0">
      <CardHeader className="px-6 py-5 border-b">
        <CardTitle className="text-base flex items-center gap-2">
          <Icon className="size-4 text-primary" />
          {title}
        </CardTitle>
        <CardDescription className="mt-0.5">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}

function ToggleRow({
  label,
  description,
  defaultChecked = false,
}: {
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={defaultChecked}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
          defaultChecked ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`pointer-events-none inline-block size-5 rounded-full bg-white shadow-sm ring-0 transition-transform ${
            defaultChecked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function ParametresPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Paramètres
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configurez les paramètres généraux de votre plateforme AutoLoc CI.
        </p>
      </div>

      {/* Company info */}
      <SettingSection
        icon={Building2}
        title="Informations de l'entreprise"
        description="Les informations affichées sur la plateforme et les documents."
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nom de l&apos;entreprise</Label>
              <Input
                id="company-name"
                defaultValue="AutoLoc CI"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-phone">Téléphone principal</Label>
              <Input
                id="company-phone"
                defaultValue="+225 27 00 00 00"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company-email">Email principal</Label>
              <Input
                id="company-email"
                type="email"
                defaultValue="contact@autoloc-ci.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-website">Site web</Label>
              <Input
                id="company-website"
                defaultValue="https://autoloc-ci.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company-address">Adresse du siège</Label>
            <Input
              id="company-address"
              defaultValue="Rue des Jardins, Plateau, Abidjan, Côte d'Ivoire"
            />
          </div>
          <div className="flex justify-end">
            <Button className="gap-2">
              <Save className="size-4" />
              Enregistrer
            </Button>
          </div>
        </div>
      </SettingSection>

      {/* Notifications */}
      <SettingSection
        icon={Bell}
        title="Notifications"
        description="Gérez les notifications email et SMS envoyées par la plateforme."
      >
        <div className="divide-y">
          <ToggleRow
            label="Nouvelle réservation"
            description="Recevoir un email à chaque nouvelle réservation"
            defaultChecked={true}
          />
          <ToggleRow
            label="Annulation de réservation"
            description="Notification en cas d'annulation par un client"
            defaultChecked={true}
          />
          <ToggleRow
            label="Paiement reçu"
            description="Confirmation à chaque paiement Mobile Money reçu"
            defaultChecked={true}
          />
          <ToggleRow
            label="Rappel de retour"
            description="Envoyer un SMS de rappel au client 24h avant le retour"
            defaultChecked={false}
          />
          <ToggleRow
            label="Rapport hebdomadaire"
            description="Recevoir un résumé des performances chaque lundi"
            defaultChecked={true}
          />
        </div>
      </SettingSection>

      {/* Payment config */}
      <SettingSection
        icon={CreditCard}
        title="Moyens de paiement"
        description="Configurez les méthodes de paiement acceptées sur la plateforme."
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { name: "Orange Money", enabled: true, color: "bg-orange-500" },
              { name: "MTN MoMo", enabled: true, color: "bg-amber-500" },
              { name: "Moov Money", enabled: true, color: "bg-blue-500" },
              { name: "Wave", enabled: true, color: "bg-cyan-500" },
              { name: "Carte bancaire", enabled: false, color: "bg-slate-500" },
            ].map((method) => (
              <div
                key={method.name}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`size-3 rounded-full ${method.color}`}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {method.name}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className={
                    method.enabled
                      ? "bg-emerald-500/10 text-emerald-700 border-emerald-200"
                      : "bg-secondary text-secondary-foreground border-border"
                  }
                >
                  {method.enabled ? "Activé" : "Désactivé"}
                </Badge>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Contactez le support pour modifier l&apos;intégration avec l&apos;agrégateur de paiement.
          </p>
        </div>
      </SettingSection>

      {/* Security */}
      <SettingSection
        icon={Shield}
        title="Sécurité"
        description="Gérez les paramètres de sécurité de votre compte administrateur."
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="current-password">Mot de passe actuel</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <div />
            <div className="space-y-2">
              <Label htmlFor="new-password">Nouveau mot de passe</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">
                Confirmer le mot de passe
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Separator />

          <div className="divide-y">
            <ToggleRow
              label="Authentification à deux facteurs"
              description="Ajouter une couche de sécurité supplémentaire à votre compte"
              defaultChecked={false}
            />
            <ToggleRow
              label="Sessions actives"
              description="Déconnecter automatiquement après 30 minutes d'inactivité"
              defaultChecked={true}
            />
          </div>

          <div className="flex justify-end">
            <Button className="gap-2">
              <Lock className="size-4" />
              Mettre à jour le mot de passe
            </Button>
          </div>
        </div>
      </SettingSection>

      {/* Appearance */}
      <SettingSection
        icon={Palette}
        title="Apparence"
        description="Personnalisez l'apparence de l'interface d'administration."
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Langue de l&apos;interface</Label>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Globe className="size-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Français</span>
                <Badge variant="outline" className="ml-auto text-xs">
                  Par défaut
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Devise</Label>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <CreditCard className="size-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  FCFA (Franc CFA)
                </span>
                <Badge variant="outline" className="ml-auto text-xs">
                  XOF
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </SettingSection>
    </div>
  );
}
