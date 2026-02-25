"use client";

// Header.tsx — Client-facing sticky navigation header for AutoLoc CI.
// Uses shadcn Sheet for the mobile hamburger drawer and Next.js Link for routing.
// All colors are CSS-variable design tokens (Tailwind CSS v4 / shadcn pattern).

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { MenuIcon, CarIcon, PhoneIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/shared/components/ui/sheet";
import { cn } from "@/core/lib/utils";

// ---------------------------------------------------------------------------
// Constants — navigation link definitions kept outside the component so the
// array reference is stable and never triggers accidental re-renders.
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/vehicules", label: "Véhicules" },
  { href: "/agences", label: "Agences" },
  { href: "/contact", label: "Contact" },
] as const;

// ---------------------------------------------------------------------------
// Atom: NavLink — a single navigation anchor styled to highlight when active.
// ---------------------------------------------------------------------------

interface NavLinkProps {
  href: string;
  label: string;
  currentPath: string;
  onClick?: () => void;
  className?: string;
}

function NavLink({ href, label, currentPath, onClick, className }: NavLinkProps) {
  const isActive = currentPath === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative text-sm font-medium transition-colors duration-200",
        "text-foreground/70 hover:text-primary",
        // Underline indicator for the active route
        "after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary after:transition-transform after:duration-200",
        isActive
          ? "text-primary after:scale-x-100"
          : "after:scale-x-0 hover:after:scale-x-100",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Organism: Header — sticky client-facing header with mobile Sheet drawer.
// ---------------------------------------------------------------------------

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
        "border-b border-border shadow-sm"
      )}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ---- Logo ---- */}
        <Link
          href="/"
          className="flex items-center gap-2 text-primary transition-opacity hover:opacity-80"
          aria-label="AutoLoc CI — retour à l'accueil"
        >
          <div
            className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
            aria-hidden="true"
          >
            <CarIcon className="size-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            AutoLoc <span className="text-primary">CI</span>
          </span>
        </Link>

        {/* ---- Desktop navigation ---- */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Navigation principale"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              currentPath={pathname}
            />
          ))}
        </nav>

        {/* ---- Desktop CTA area ---- */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/connexion"
            className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
            aria-label="Se connecter à mon compte"
          >
            Connexion
          </Link>

          <Button 
            size="sm" 
            className="font-semibold shadow-sm"
            onClick={() => router.push("/reservation")}
          >
            <PhoneIcon className="size-3.5" aria-hidden="true" />
            Réserver maintenant
          </Button>
        </div>

        {/* ---- Mobile hamburger (Sheet) ---- */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Ouvrir le menu de navigation"
            >
              <MenuIcon className="size-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-72 p-0">
            <SheetHeader className="border-b border-border px-6 py-4">
              <SheetTitle className="flex items-center gap-2 text-left">
                <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <CarIcon className="size-3.5" aria-hidden="true" />
                </div>
                <span className="font-bold tracking-tight">
                  AutoLoc <span className="text-primary">CI</span>
                </span>
              </SheetTitle>
            </SheetHeader>

            {/* Mobile nav links */}
            <nav
              className="flex flex-col gap-1 px-4 py-6"
              aria-label="Navigation mobile"
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    router.push(link.href);
                    closeMobileMenu();
                  }}
                  className={cn(
                    "flex items-center rounded-md px-3 py-3 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-accent hover:text-accent-foreground"
                  )}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Mobile CTA area */}
            <div className="flex flex-col gap-3 border-t border-border px-4 py-6">
              <button
                onClick={() => {
                  router.push("/connexion");
                  closeMobileMenu();
                }}
                className="flex items-center justify-center rounded-md px-3 py-2.5 text-sm font-medium text-foreground/70 ring-1 ring-border transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Connexion
              </button>

              <Button 
                className="w-full font-semibold"
                onClick={() => {
                  router.push("/reservation");
                  closeMobileMenu();
                }}
              >
                <PhoneIcon className="size-3.5" aria-hidden="true" />
                Réserver maintenant
              </Button>
            </div>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  );
}
