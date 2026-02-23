"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Shield,
  ArrowRight,
} from "lucide-react";

// ─── Constants ───────────────────────────────────────────────────────────────

const CONTACT_REASONS = [
  "Demande de réservation",
  "Information sur un véhicule",
  "Modification de réservation",
  "Annulation",
  "Réclamation",
  "Partenariat",
  "Autre",
] as const;

const AGENCES_CONTACT = [
  {
    nom: "AutoLoc Cocody",
    adresse: "Rue des Jardins, Cocody, Abidjan",
    telephone: "+225 07 11 22 33 44",
    email: "cocody@autoloc-ci.com",
  },
  {
    nom: "AutoLoc Plateau",
    adresse: "Avenue Houphouët-Boigny, Plateau, Abidjan",
    telephone: "+225 07 55 66 77 88",
    email: "plateau@autoloc-ci.com",
  },
  {
    nom: "AutoLoc Yamoussoukro",
    adresse: "Boulevard de la Paix, Yamoussoukro",
    telephone: "+225 07 22 33 44 55",
    email: "yamoussoukro@autoloc-ci.com",
  },
  {
    nom: "AutoLoc Bouaké",
    adresse: "Quartier Commerce, Bouaké",
    telephone: "+225 07 44 55 66 77",
    email: "bouake@autoloc-ci.com",
  },
  {
    nom: "AutoLoc San Pedro",
    adresse: "Zone Industrielle, San Pedro",
    telephone: "+225 07 88 99 00 11",
    email: "sanpedro@autoloc-ci.com",
  },
];

const FAQ = [
  {
    q: "Quels documents sont nécessaires pour louer un véhicule ?",
    a: "Vous aurez besoin d'une pièce d'identité valide (CNI ou passeport), d'un permis de conduire en cours de validité, et d'un justificatif de domicile de moins de 3 mois.",
  },
  {
    q: "Puis-je restituer le véhicule dans une autre agence ?",
    a: "Oui, la restitution inter-agences est possible moyennant des frais supplémentaires. Contactez-nous pour obtenir un devis.",
  },
  {
    q: "Quels sont les moyens de paiement acceptés ?",
    a: "Nous acceptons les paiements par Mobile Money (Orange Money, MTN MoMo, Moov Money, Wave) ainsi que par carte bancaire.",
  },
  {
    q: "L'assurance est-elle incluse dans le tarif ?",
    a: "Oui, une assurance tous risques est incluse dans tous nos tarifs de location. Une franchise s'applique en cas de sinistre.",
  },
];

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

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
              "radial-gradient(ellipse 50% 70% at 70% 30%, oklch(0.3 0.15 260 / 0.2), transparent)",
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

        <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Contact
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Parlons de votre
              <span className="block mt-1 text-white/50">prochain trajet</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/40 max-w-lg">
              Une question, une demande de réservation ou une réclamation ?
              Notre équipe est disponible pour vous accompagner.
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        />
      </section>

      <main className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
        {/* ── Quick contact cards ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-12 -mt-8 relative z-10">
          {[
            {
              icon: Phone,
              label: "Téléphone",
              value: "+225 27 00 00 00",
              description: "Lun-Sam, 08h-18h",
              href: "tel:+22527000000",
            },
            {
              icon: Mail,
              label: "Email",
              value: "contact@autoloc-ci.com",
              description: "Réponse sous 24h",
              href: "mailto:contact@autoloc-ci.com",
            },
            {
              icon: MessageSquare,
              label: "WhatsApp",
              value: "+225 07 00 00 00",
              description: "Disponible 7j/7",
              href: "https://wa.me/22507000000",
            },
          ].map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-0.5"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/8">
                <contact.icon className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {contact.label}
                </p>
                <p className="text-sm text-muted-foreground">{contact.value}</p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">
                  {contact.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* ── Main content: Form + Agencies ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Contact form (3/5) */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border/50 bg-card overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/8">
                    <Send className="size-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-foreground">
                      Envoyer un message
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Nous vous répondrons sous 24h ouvrées
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {submitted ? (
                  <div className="text-center py-12 space-y-5">
                    <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-500/10 mx-auto">
                      <CheckCircle2 className="size-8 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        Message envoyé !
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                        Merci pour votre message. Notre équipe vous répondra
                        dans les plus brefs délais.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                      className="border-border/50"
                    >
                      Envoyer un autre message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nom">Nom complet</Label>
                        <Input
                          id="nom"
                          placeholder="Ex: Kouamé Yves"
                          className="border-border/60"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telephone">Téléphone</Label>
                        <Input
                          id="telephone"
                          type="tel"
                          placeholder="+225 07 XX XX XX XX"
                          className="border-border/60"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        className="border-border/60"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motif">Motif de contact</Label>
                      <Select>
                        <SelectTrigger id="motif" className="border-border/60">
                          <SelectValue placeholder="Choisir un motif" />
                        </SelectTrigger>
                        <SelectContent>
                          {CONTACT_REASONS.map((reason) => (
                            <SelectItem key={reason} value={reason}>
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Décrivez votre demande..."
                        rows={5}
                        className="border-border/60"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Shield className="size-3.5 text-emerald-500" />
                        Vos données sont protégées
                      </div>
                      <Button
                        type="submit"
                        className="font-semibold gap-2"
                      >
                        <Send className="size-4" />
                        Envoyer
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Agencies sidebar (2/5) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/8">
                <Building2 className="size-4 text-primary" />
              </div>
              <h2 className="text-sm font-semibold text-foreground">
                Nos agences
              </h2>
            </div>

            {AGENCES_CONTACT.map((agence) => (
              <div
                key={agence.nom}
                className="rounded-xl border border-border/50 bg-card p-4 space-y-2.5 transition-all duration-200 hover:border-primary/15 hover:shadow-sm"
              >
                <h3 className="text-sm font-semibold text-foreground">
                  {agence.nom}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="size-3.5 shrink-0 text-primary mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      {agence.adresse}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="size-3.5 shrink-0 text-primary" />
                    <a
                      href={`tel:${agence.telephone.replace(/\s/g, "")}`}
                      className="text-xs text-foreground hover:text-primary transition-colors"
                    >
                      {agence.telephone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="size-3.5 shrink-0 text-primary" />
                    <a
                      href={`mailto:${agence.email}`}
                      className="text-xs text-foreground hover:text-primary transition-colors"
                    >
                      {agence.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-3.5 shrink-0 text-primary" />
                    <p className="text-xs text-muted-foreground">
                      Lun-Sam : 08h-18h
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full gap-2 border-border/50 mt-2"
              asChild
            >
              <Link href="/agences">
                Voir toutes les agences
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* ── FAQ section ── */}
        <section className="mt-16 mb-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                FAQ
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Questions fréquentes
              </h2>
              <p className="mt-3 text-muted-foreground">
                Retrouvez les réponses aux questions les plus courantes.
              </p>
            </div>

            <div className="space-y-3">
              {FAQ.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl border border-border/50 bg-card p-5 space-y-2 transition-all hover:border-primary/15 hover:shadow-sm"
                >
                  <h3 className="text-sm font-semibold text-foreground">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
