import Link from "next/link";
import { CalendarCheck, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
      aria-labelledby="cta-heading"
    >
      {/* Dark editorial background matching hero */}
      <div className="absolute inset-0 bg-[oklch(0.13_0.02_250)]" />

      {/* Gradient accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, oklch(0.3 0.15 260 / 0.2), transparent)",
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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: text */}
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Prêt à partir ?
            </p>
            <h2
              id="cta-heading"
              className="text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
            >
              Réservez en 2 minutes,
              <span className="block mt-1 text-white/60">
                roulez en toute sérénité
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/45 max-w-md">
              Processus de réservation simplifié, paiement Mobile Money
              sécurisé, et véhicule prêt à votre arrivée en agence.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="gap-2 font-semibold"
                asChild
              >
                <Link href="/reservation">
                  <CalendarCheck className="size-4" />
                  Réserver maintenant
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white/15 bg-transparent text-white hover:bg-white/5 hover:text-white"
                asChild
              >
                <Link href="/contact">
                  <Phone className="size-4" />
                  Nous contacter
                </Link>
              </Button>
            </div>

            <p className="mt-6 text-xs text-white/30">
              Annulation gratuite 48h avant · Aucune carte bancaire requise · Assurance tous risques incluse
            </p>
          </div>

          {/* Right: steps */}
          <div className="relative">
            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Choisissez votre véhicule",
                  description: "Parcourez notre catalogue et sélectionnez le véhicule qui vous convient.",
                },
                {
                  step: "02",
                  title: "Renseignez vos dates",
                  description: "Indiquez les dates de location et l'agence de retrait souhaitée.",
                },
                {
                  step: "03",
                  title: "Payez par Mobile Money",
                  description: "Réglez en toute sécurité via Orange Money, MTN MoMo, Wave ou Moov Money.",
                },
                {
                  step: "04",
                  title: "Prenez la route",
                  description: "Présentez-vous en agence avec votre confirmation et partez immédiatement.",
                },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className="flex gap-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm transition-colors hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-sm font-bold text-primary">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-white/40 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top border gradient */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
    </section>
  );
}
