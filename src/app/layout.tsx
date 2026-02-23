// Root layout — sets global metadata, French locale, and Geist fonts.
// All page trees (client-facing and admin) are nested under this shell.

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ---------------------------------------------------------------------------
// Font configuration — Geist variable fonts for consistent typography.
// ---------------------------------------------------------------------------

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ---------------------------------------------------------------------------
// Metadata — site-wide SEO defaults; individual pages can override these.
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: {
    default: "AutoLoc CI — Location de véhicules en Côte d'Ivoire",
    template: "%s | AutoLoc CI",
  },
  description:
    "AutoLoc CI est votre partenaire de confiance pour la location de véhicules en Côte d'Ivoire. " +
    "Large choix de voitures récentes, tarifs compétitifs et service disponible à Abidjan et dans tout le pays.",
  keywords: [
    "location voiture",
    "location véhicule",
    "Côte d'Ivoire",
    "Abidjan",
    "AutoLoc",
    "louer voiture Abidjan",
  ],
  authors: [{ name: "AutoLoc CI" }],
  creator: "AutoLoc CI",
  openGraph: {
    type: "website",
    locale: "fr_CI",
    siteName: "AutoLoc CI",
    title: "AutoLoc CI — Location de véhicules en Côte d'Ivoire",
    description:
      "Votre partenaire de confiance pour la location de véhicules en Côte d'Ivoire.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoLoc CI — Location de véhicules en Côte d'Ivoire",
    description:
      "Votre partenaire de confiance pour la location de véhicules en Côte d'Ivoire.",
  },
  // Prevent indexing of admin pages via robots meta on individual layouts.
  robots: {
    index: true,
    follow: true,
  },
};

// ---------------------------------------------------------------------------
// RootLayout — minimal shell; specific layouts (ClientLayout, AdminLayout)
// handle chrome (header, sidebar, footer) for their respective route groups.
// ---------------------------------------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang="fr" for correct screen-reader pronunciation and SEO signals.
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
