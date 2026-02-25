"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  Building2,
  CalendarCheck,
  Users,
  BarChart3,
  Settings,
  Menu,
  Bell,
  Search,
  ChevronRight,
  LogOut,
  UserCircle,
  Shield,
  Wallet,
  Activity,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/vehicules", label: "Véhicules", icon: Car },
  { href: "/admin/agences", label: "Agences", icon: Building2 },
  { href: "/admin/reservations", label: "Réservations", icon: CalendarCheck },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/finances", label: "Finances", icon: Wallet },
  { href: "/admin/exploitation", label: "Exploitation", icon: Activity },
  { href: "/admin/garage", label: "Garage", icon: Wrench },
  { href: "/admin/rapports", label: "Rapports", icon: BarChart3 },
  { href: "/admin/parametres", label: "Paramètres", icon: Settings },
] as const;

// ---------------------------------------------------------------------------
// Helper: breadcrumb label derived from pathname
// ---------------------------------------------------------------------------

const ROUTE_LABELS: Record<string, string> = {
  documents: "Documents",
  interventions: "Interventions",
  vehicules: "Véhicules",
  inspection: "Inspection",
};

function getBreadcrumb(pathname: string): { label: string; href: string }[] {
  if (pathname === "/admin") {
    return [{ label: "Tableau de bord", href: "/admin" }];
  }

  const crumbs: { label: string; href: string }[] = [
    { label: "Tableau de bord", href: "/admin" },
  ];

  // Find the matching top-level nav item (prefix match, excluding /admin exact)
  const found = NAV_ITEMS.find(
    (item) => item.href !== "/admin" && pathname.startsWith(item.href)
  );

  if (!found) {
    return crumbs;
  }

  crumbs.push({ label: found.label, href: found.href });

  // Handle sub-routes (e.g. /admin/finances/documents or /admin/reservations/RES-001/inspection)
  const rest = pathname.slice(found.href.length).replace(/^\//, "");
  if (rest) {
    const segments = rest.split("/");
    let currentPath = found.href;
    for (const segment of segments) {
      currentPath += "/" + segment;
      const label = ROUTE_LABELS[segment] || segment;
      crumbs.push({ label, href: currentPath });
    }
  }

  return crumbs;
}

// ---------------------------------------------------------------------------
// Sidebar nav link atom
// ---------------------------------------------------------------------------

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  onClick?: () => void;
}

function NavLink({ href, label, icon: Icon, active, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Sidebar organism (shared between desktop & mobile Sheet)
// ---------------------------------------------------------------------------

interface SidebarContentProps {
  pathname: string;
  onNavClick?: () => void;
}

function SidebarContent({ pathname, onNavClick }: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
          <Car className="size-4 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm font-bold text-sidebar-foreground leading-tight">
            AutoLoc CI
          </p>
          <p className="text-[10px] font-medium text-sidebar-foreground/50 uppercase tracking-wider">
            Admin
          </p>
        </div>
      </div>

      <Separator className="bg-sidebar-border mx-4 w-auto" />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href)
            }
            onClick={onNavClick}
          />
        ))}
      </nav>

      <Separator className="bg-sidebar-border mx-4 w-auto" />

      {/* Bottom user info */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <Avatar size="sm">
            <AvatarImage src="" alt="Admin" />
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-sidebar-foreground">
              Admin Principal
            </p>
            <p className="truncate text-[10px] text-sidebar-foreground/50">
              admin@autoloc.ci
            </p>
          </div>
          <Shield className="size-3.5 shrink-0 text-primary" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Top bar organism
// ---------------------------------------------------------------------------

interface TopBarProps {
  pathname: string;
}

function TopBar({ pathname }: TopBarProps) {
  const breadcrumbs = getBreadcrumb(pathname);

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b bg-card/80 backdrop-blur-sm px-4 gap-4">
      {/* Mobile hamburger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-sidebar border-sidebar-border">
          <SheetHeader className="sr-only">
            <SheetTitle>Menu de navigation</SheetTitle>
          </SheetHeader>
          <MobileSidebarWrapper pathname={pathname} />
        </SheetContent>
      </Sheet>

      {/* Breadcrumb */}
      <nav
        aria-label="Fil d'Ariane"
        className="flex items-center gap-1.5 text-sm min-w-0 flex-1"
      >
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            {index > 0 && (
              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="font-semibold text-foreground truncate">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-muted-foreground hover:text-foreground transition-colors truncate"
              >
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Search — hidden on small screens */}
      <div className="relative hidden md:flex items-center w-56 lg:w-72">
        <Search className="absolute left-2.5 size-3.5 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Rechercher..."
          className="pl-8 h-8 text-sm bg-muted/50 border-transparent focus:border-border focus:bg-card"
        />
      </div>

      {/* Notification bell */}
      <Button
        variant="ghost"
        size="icon"
        className="relative shrink-0"
        aria-label="Notifications"
      >
        <Bell className="size-4.5" />
        <Badge
          className="absolute -top-0.5 -right-0.5 size-4 p-0 text-[9px] flex items-center justify-center"
          aria-label="3 nouvelles notifications"
        >
          3
        </Badge>
      </Button>

      {/* User dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative shrink-0 flex items-center gap-2 px-2 h-9"
            aria-label="Menu utilisateur"
          >
            <Avatar size="sm">
              <AvatarImage src="" alt="Admin" />
              <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                AD
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:block text-sm font-medium">
              Admin
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel className="font-normal">
            <p className="font-semibold text-sm">Admin Principal</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              admin@autoloc.ci
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserCircle className="size-4" />
            Mon profil
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="size-4" />
            Paramètres
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <LogOut className="size-4" />
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Mobile sidebar wrapper — client state for Sheet close
// ---------------------------------------------------------------------------

function MobileSidebarWrapper({ pathname }: { pathname: string }) {
  // Sheet close is handled automatically by radix via SheetClose,
  // but nav link clicks need the sheet to close. We rely on the
  // fact that navigation triggers a re-render which remounts the
  // Sheet and it closes naturally in Next.js App Router.
  return <SidebarContent pathname={pathname} />;
}

// ---------------------------------------------------------------------------
// Admin layout root
// ---------------------------------------------------------------------------

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex lg:w-60 xl:w-64 shrink-0 flex-col bg-sidebar border-r border-sidebar-border"
        aria-label="Navigation principale"
      >
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Main column */}
      <div className="flex flex-1 flex-col min-w-0">
        <TopBar pathname={pathname} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
