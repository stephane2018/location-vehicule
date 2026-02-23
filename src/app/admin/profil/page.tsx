import React from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Calendar,
  Key,
  Bell,
  Save,
  LogOut,
  Camera,
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PROFILE_DATA = {
  prenom: "Kouadio",
  nom: "Aimé",
  email: "aime.kouadio@autoloc-ci.com",
  telephone: "+225 07 00 00 00",
  role: "Super Admin",
  agence: "Siège — Abidjan",
  dateInscription: "15 mars 2018",
  derniereConnexion: "23 fév. 2026 à 09:15",
};

const RECENT_ACTIVITY = [
  { action: "Connexion au tableau de bord", date: "23 fév. 2026, 09:15", type: "connexion" },
  { action: "Modification du véhicule VEH-003", date: "22 fév. 2026, 16:42", type: "modification" },
  { action: "Validation de la réservation RES-007", date: "22 fév. 2026, 14:20", type: "validation" },
  { action: "Ajout du véhicule VEH-011", date: "21 fév. 2026, 11:05", type: "ajout" },
  { action: "Export du rapport mensuel", date: "20 fév. 2026, 09:30", type: "export" },
  { action: "Modification des paramètres de notification", date: "19 fév. 2026, 15:10", type: "modification" },
];

const ACTIVITY_COLORS: Record<string, string> = {
  connexion: "bg-primary/10 text-primary",
  modification: "bg-amber-500/10 text-amber-600",
  validation: "bg-emerald-500/10 text-emerald-600",
  ajout: "bg-violet-500/10 text-violet-600",
  export: "bg-cyan-500/10 text-cyan-600",
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function ProfilPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Mon Profil
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gérez vos informations personnelles et votre compte administrateur.
        </p>
      </div>

      {/* Profile header card */}
      <Card className="gap-0 py-0">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="size-24">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  KA
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
                aria-label="Changer la photo de profil"
              >
                <Camera className="size-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-bold text-foreground">
                {PROFILE_DATA.prenom} {PROFILE_DATA.nom}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {PROFILE_DATA.email}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                <Badge className="bg-primary/10 text-primary border-primary/20" variant="outline">
                  <Shield className="size-3 mr-1" />
                  {PROFILE_DATA.role}
                </Badge>
                <Badge variant="outline">
                  <MapPin className="size-3 mr-1" />
                  {PROFILE_DATA.agence}
                </Badge>
              </div>
            </div>

            {/* Meta info */}
            <div className="text-center sm:text-right space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground justify-center sm:justify-end">
                <Calendar className="size-3" />
                Membre depuis {PROFILE_DATA.dateInscription}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground justify-center sm:justify-end">
                <Key className="size-3" />
                Dernière connexion : {PROFILE_DATA.derniereConnexion}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Edit form (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal info */}
          <Card className="gap-0 py-0">
            <CardHeader className="px-6 py-5 border-b">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="size-4 text-primary" />
                Informations personnelles
              </CardTitle>
              <CardDescription className="mt-0.5">
                Modifiez vos informations de profil.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="profil-prenom">Prénom</Label>
                  <Input
                    id="profil-prenom"
                    defaultValue={PROFILE_DATA.prenom}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profil-nom">Nom</Label>
                  <Input
                    id="profil-nom"
                    defaultValue={PROFILE_DATA.nom}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="profil-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="profil-email"
                      type="email"
                      className="pl-10"
                      defaultValue={PROFILE_DATA.email}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profil-telephone">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="profil-telephone"
                      type="tel"
                      className="pl-10"
                      defaultValue={PROFILE_DATA.telephone}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="size-4" />
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Change password */}
          <Card className="gap-0 py-0">
            <CardHeader className="px-6 py-5 border-b">
              <CardTitle className="text-base flex items-center gap-2">
                <Key className="size-4 text-primary" />
                Changer le mot de passe
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profil-current-pwd">Mot de passe actuel</Label>
                <Input
                  id="profil-current-pwd"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="profil-new-pwd">Nouveau mot de passe</Label>
                  <Input
                    id="profil-new-pwd"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profil-confirm-pwd">Confirmer</Label>
                  <Input
                    id="profil-confirm-pwd"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" className="gap-2">
                  <Key className="size-4" />
                  Mettre à jour
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Activity log (1/3) */}
        <div className="space-y-6">
          {/* Notifications preferences */}
          <Card className="gap-0 py-0">
            <CardHeader className="px-5 py-4 border-b">
              <CardTitle className="text-sm flex items-center gap-2">
                <Bell className="size-4 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-1">
              {[
                { label: "Nouvelles réservations", enabled: true },
                { label: "Annulations", enabled: true },
                { label: "Paiements reçus", enabled: true },
                { label: "Rapports hebdomadaires", enabled: false },
              ].map((notif) => (
                <div
                  key={notif.label}
                  className="flex items-center justify-between py-2"
                >
                  <span className="text-xs text-foreground">
                    {notif.label}
                  </span>
                  <div
                    className={`size-2 rounded-full ${
                      notif.enabled ? "bg-emerald-500" : "bg-muted-foreground/30"
                    }`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent activity */}
          <Card className="gap-0 py-0">
            <CardHeader className="px-5 py-4 border-b">
              <CardTitle className="text-sm">Activité récente</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {RECENT_ACTIVITY.map((activity, i) => {
                const color =
                  ACTIVITY_COLORS[activity.type] ?? "bg-muted text-muted-foreground";
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs ${color}`}
                    >
                      {activity.type.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-foreground leading-snug">
                        {activity.action}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Danger zone */}
          <Card className="gap-0 py-0 border-destructive/30">
            <CardContent className="p-4 space-y-3">
              <p className="text-xs font-semibold text-destructive">
                Zone de danger
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <LogOut className="size-3.5" />
                Se déconnecter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
