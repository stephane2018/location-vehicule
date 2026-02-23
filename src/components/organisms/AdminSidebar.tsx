"use client";

// AdminSidebar.tsx — Collapsible admin sidebar for AutoLoc CI back-office.
// Uses shadcn Sheet for mobile overlay and CSS sidebar tokens for dark theming.
// Receives the current pathname from the parent via props to highlight active items.

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CarIcon,
  LayoutDashboardIcon,
  TruckIcon,
  BuildingIcon,
  CalendarCheckIcon,
  UsersIcon,
  BarChart3Icon,
  SettingsIcon,
  ChevronLeftIcon,
  MenuIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants — nav item definitions outside the component for stable references.
// ---------------------------------------------------------------------------

interface NavItem {
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Tableau de bord", Icon: LayoutDashboardIcon },
  { href: "/admin/vehicules", label: "Véhicules", Icon: TruckIcon },
  { href: "/admin/agences", label: "Agences", Icon: BuildingIcon },
  { href: "/admin/reservations", label: "Réservations", Icon: CalendarCheckIcon },
  { href: "/admin/clients", label: "Clients", Icon: UsersIcon },
  { href: "/admin/rapports", label: "Rapports", Icon: BarChart3Icon },
  { href: "/admin/parametres", label: "Paramètres", Icon: SettingsIcon },
];

// ---------------------------------------------------------------------------
// Atom: SidebarNavItem — single nav row with icon, label, and active state.
// ---------------------------------------------------------------------------

interface SidebarNavItemProps extends NavItem {
  currentPath: string;
  collapsed?: boolean;
  onClick?: () => void;
}

function SidebarNavItem({
  href,
  label,
  Icon,
  currentPath,
  collapsed = false,
  onClick,
}: SidebarNavItemProps) {
  // Match exact path for Dashboard; prefix-match for nested admin routes.
  const isActive =
    href === "/admin" ? currentPath === "/admin" : currentPath.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      title={collapsed ? label : undefined}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        collapsed && "justify-center px-2"
      )}
    >
      <Icon
        className={cn(
          "shrink-0 transition-transform group-hover:scale-110",
          collapsed ? "size-5" : "size-4",
          isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground"
        )}
        aria-hidden="true"
      />
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Atom: SidebarLogo — brand mark shown at top of sidebar.
// ---------------------------------------------------------------------------

interface SidebarLogoProps {
  collapsed?: boolean;
}

function SidebarLogo({ collapsed = false }: SidebarLogoProps) {
  return (
    <Link
      href="/admin"
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-3 py-2 transition-opacity hover:opacity-80",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        collapsed && "justify-center px-2"
      )}
      aria-label="AutoLoc CI Admin — retour au tableau de bord"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <CarIcon className="size-4" aria-hidden="true" />
      </div>
      {!collapsed && (
        <div className="flex flex-col leading-none">
          <span className="text-sm font-bold tracking-tight text-sidebar-foreground">
            AutoLoc <span className="text-primary">CI</span>
          </span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-sidebar-foreground/50">
            Administration
          </span>
        </div>
      )}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Organism: AdminSidebar
//
// Renders in two modes:
//   1. Desktop — collapsible fixed sidebar (icon-only or full labels).
//   2. Mobile  — hidden by default; revealed via a Sheet overlay.
//
// The collapsed state is managed internally; parent components do not need
// to control it. Use the exported AdminSidebarTrigger on mobile.
// ---------------------------------------------------------------------------

interface AdminSidebarProps {
  /** Forwarded from AdminLayout to sync the mobile Sheet open state. */
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
}

export default function AdminSidebar({
  mobileOpen = false,
  onMobileOpenChange,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  const sharedNavItems = (
    <nav className="flex flex-col gap-1 px-2 py-3" aria-label="Navigation admin">
      {NAV_ITEMS.map((item) => (
        <SidebarNavItem
          key={item.href}
          {...item}
          currentPath={pathname}
          collapsed={collapsed}
          onClick={() => onMobileOpenChange?.(false)}
        />
      ))}
    </nav>
  );

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Desktop sidebar — hidden on mobile                                  */}
      {/* ------------------------------------------------------------------ */}
      <aside
        className={cn(
          "hidden lg:flex lg:flex-col",
          "h-screen sticky top-0",
          "bg-sidebar text-sidebar-foreground",
          "border-r border-sidebar-border",
          "transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64"
        )}
        aria-label="Barre de navigation administrateur"
      >
        {/* Logo area */}
        <div className="flex h-16 items-center border-b border-sidebar-border px-2">
          <SidebarLogo collapsed={collapsed} />
        </div>

        {/* Navigation links — grows to fill remaining height */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {sharedNavItems}
        </div>

        {/* Collapse toggle button at the bottom */}
        <div className="border-t border-sidebar-border p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className={cn(
              "w-full text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              collapsed ? "justify-center" : "justify-end px-3"
            )}
            aria-label={collapsed ? "Agrandir la barre latérale" : "Réduire la barre latérale"}
          >
            <ChevronLeftIcon
              className={cn(
                "size-4 shrink-0 transition-transform duration-300",
                collapsed && "rotate-180"
              )}
              aria-hidden="true"
            />
            {!collapsed && (
              <span className="sr-only">Réduire</span>
            )}
          </Button>
        </div>
      </aside>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile sidebar — Sheet overlay, triggered from AdminLayout top bar  */}
      {/* ------------------------------------------------------------------ */}
      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent
          side="left"
          className="w-72 bg-sidebar p-0 text-sidebar-foreground [&>button]:text-sidebar-foreground/70"
          // Override the default white background from SheetContent
        >
          <SheetHeader className="border-b border-sidebar-border px-4 py-0">
            <SheetTitle className="flex h-16 items-center" asChild>
              <div>
                <SidebarLogo />
              </div>
            </SheetTitle>
          </SheetHeader>
          {sharedNavItems}
        </SheetContent>
      </Sheet>
    </>
  );
}

// ---------------------------------------------------------------------------
// Named export: AdminSidebarMobileTrigger — standalone hamburger button
// intended to be placed in the AdminLayout top bar on mobile.
// ---------------------------------------------------------------------------

interface AdminSidebarMobileTriggerProps {
  onClick: () => void;
}

export function AdminSidebarMobileTrigger({
  onClick,
}: AdminSidebarMobileTriggerProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="lg:hidden"
      aria-label="Ouvrir le menu de navigation"
    >
      <MenuIcon className="size-5" aria-hidden="true" />
    </Button>
  );
}
