// Footer.tsx — Client-facing footer for AutoLoc CI.
// Uses CSS-variable design tokens for a dark navy/sidebar background.
// Fully responsive: stacks on mobile, 4-column grid on large screens.

import * as React from "react";
import Link from "next/link";
import {
  CarIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

// ---------------------------------------------------------------------------
// Constants — link groups and contact details extracted for easy maintenance.
// ---------------------------------------------------------------------------

const SERVICES_LINKS = [
  { href: "/vehicules", label: "Nos Véhicules" },
  { href: "/agences", label: "Nos Agences" },
  { href: "/reservation", label: "Réserver" },
  { href: "/tarifs", label: "Tarifs" },
] as const;

const COMPANY_LINKS = [
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
  { href: "/cgv", label: "Conditions Générales" },
  { href: "/mentions-legales", label: "Mentions Légales" },
] as const;

const SOCIAL_LINKS = [
  {
    href: "https://facebook.com",
    label: "Facebook AutoLoc CI",
    Icon: FacebookIcon,
  },
  {
    href: "https://instagram.com",
    label: "Instagram AutoLoc CI",
    Icon: InstagramIcon,
  },
  {
    href: "https://twitter.com",
    label: "Twitter AutoLoc CI",
    Icon: TwitterIcon,
  },
] as const;

const CURRENT_YEAR = new Date().getFullYear();

// ---------------------------------------------------------------------------
// Atom: FooterLinkGroup — a labelled column of navigation links.
// ---------------------------------------------------------------------------

interface FooterLinkGroupProps {
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-sidebar-foreground/60">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5" role="list">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-sidebar-foreground/80 transition-colors hover:text-sidebar-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Organism: Footer — dark-background footer with company info, links,
// contact details, social icons, and copyright notice.
// ---------------------------------------------------------------------------

export default function Footer() {
  return (
    <footer
      className="bg-sidebar text-sidebar-foreground"
      aria-label="Pied de page"
    >
      {/* ---- Main footer content grid ---- */}
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Column 1: Brand & description */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
              aria-label="AutoLoc CI — retour à l'accueil"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <CarIcon className="size-5" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                AutoLoc <span className="text-primary">CI</span>
              </span>
            </Link>

            {/* Company description */}
            <p className="text-sm leading-relaxed text-sidebar-foreground/70">
              La référence de la location de véhicules en Côte d'Ivoire. Des
              véhicules récents, un service de qualité et des tarifs
              compétitifs disponibles à Abidjan et dans tout le pays.
            </p>

            {/* Social media icons */}
            <div className="flex items-center gap-3 pt-1">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={
                    "flex size-9 items-center justify-center rounded-full " +
                    "bg-sidebar-accent text-sidebar-foreground/70 " +
                    "transition-colors hover:bg-primary hover:text-primary-foreground"
                  }
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Services */}
          <FooterLinkGroup title="Services" links={SERVICES_LINKS} />

          {/* Column 3: Entreprise */}
          <FooterLinkGroup title="Entreprise" links={COMPANY_LINKS} />

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-sidebar-foreground/60">
              Contact
            </h3>
            <address className="not-italic">
              <ul className="flex flex-col gap-3.5" role="list">
                <li>
                  <a
                    href="tel:+22527000000"
                    className="flex items-start gap-3 text-sm text-sidebar-foreground/80 transition-colors hover:text-sidebar-foreground"
                    aria-label="Appeler le +225 27 00 00 00"
                  >
                    <PhoneIcon
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    +225 27 00 00 00
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@autoloc-ci.com"
                    className="flex items-start gap-3 text-sm text-sidebar-foreground/80 transition-colors hover:text-sidebar-foreground"
                    aria-label="Envoyer un email à contact@autoloc-ci.com"
                  >
                    <MailIcon
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    contact@autoloc-ci.com
                  </a>
                </li>
                <li>
                  <span className="flex items-start gap-3 text-sm text-sidebar-foreground/80">
                    <MapPinIcon
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>
                      Rue des Jardins, Plateau
                      <br />
                      Abidjan, Côte d&apos;Ivoire
                    </span>
                  </span>
                </li>
              </ul>
            </address>
          </div>

        </div>
      </div>

      {/* ---- Copyright bar ---- */}
      <Separator className="bg-sidebar-border" />
      <div className="container mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-3 text-xs text-sidebar-foreground/50 sm:flex-row">
          <p>
            &copy; {CURRENT_YEAR} AutoLoc CI. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/cgv"
              className="transition-colors hover:text-sidebar-foreground"
            >
              CGV
            </Link>
            <Link
              href="/mentions-legales"
              className="transition-colors hover:text-sidebar-foreground"
            >
              Mentions légales
            </Link>
            <Link
              href="/confidentialite"
              className="transition-colors hover:text-sidebar-foreground"
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
