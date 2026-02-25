"use client";

// AdminLayout.tsx — Template that wraps all admin back-office pages.
// Composes AdminSidebar (desktop fixed + mobile Sheet) with a sticky top bar
// that contains mobile menu trigger, search, notifications, and user avatar.

import * as React from "react";
import Link from "next/link";
import {
  BellIcon,
  SearchIcon,
  LogOutIcon,
  UserIcon,
  SettingsIcon,
} from "lucide-react";

import AdminSidebar, {
  AdminSidebarMobileTrigger,
} from "@/shared/components/Layout/AdminSidebar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Badge } from "@/shared/components/ui/badge";

// ---------------------------------------------------------------------------
// Atom: NotificationBell — icon button with an unread count badge.
// ---------------------------------------------------------------------------

interface NotificationBellProps {
  count?: number;
}

function NotificationBell({ count = 0 }: NotificationBellProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      aria-label={
        count > 0
          ? `${count} notification${count > 1 ? "s" : ""} non lue${count > 1 ? "s" : ""}`
          : "Notifications"
      }
    >
      <BellIcon className="size-5" aria-hidden="true" />
      {count > 0 && (
        <Badge
          className={
            "absolute -top-1 -right-1 flex size-4 items-center justify-center " +
            "rounded-full p-0 text-[10px] font-bold leading-none"
          }
          aria-hidden="true"
        >
          {count > 9 ? "9+" : count}
        </Badge>
      )}
    </Button>
  );
}

// ---------------------------------------------------------------------------
// Atom: AdminUserMenu — avatar + dropdown with profile / logout actions.
// ---------------------------------------------------------------------------

function AdminUserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex items-center gap-2 rounded-lg px-2 py-1.5 h-auto"
          aria-label="Menu utilisateur"
        >
          <Avatar size="sm">
            <AvatarImage src="" alt="Photo de profil administrateur" />
            <AvatarFallback aria-hidden="true">AD</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium text-foreground sm:block">
            Administrateur
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">Administrateur</span>
            <span className="text-xs text-muted-foreground">admin@autoloc-ci.com</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/admin/profil" className="cursor-pointer">
            <UserIcon className="size-4" aria-hidden="true" />
            Mon profil
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/admin/parametres" className="cursor-pointer">
            <SettingsIcon className="size-4" aria-hidden="true" />
            Paramètres
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" asChild>
          <Link href="/connexion" className="cursor-pointer">
            <LogOutIcon className="size-4" aria-hidden="true" />
            Se déconnecter
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ---------------------------------------------------------------------------
// Molecule: AdminTopBar — sticky bar above the content area.
// Contains: mobile menu trigger | search | notifications | user avatar.
// ---------------------------------------------------------------------------

interface AdminTopBarProps {
  onMobileMenuOpen: () => void;
  notificationCount?: number;
}

function AdminTopBar({ onMobileMenuOpen, notificationCount = 3 }: AdminTopBarProps) {
  return (
    <header
      className={
        "sticky top-0 z-40 flex h-16 items-center gap-4 " +
        "border-b border-border bg-background/95 px-4 shadow-sm " +
        "backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6"
      }
      aria-label="Barre de navigation de l'administration"
    >
      {/* Mobile hamburger — only visible below lg breakpoint */}
      <AdminSidebarMobileTrigger onClick={onMobileMenuOpen} />

      {/* Search bar — grows to fill available space */}
      <div className="relative flex-1 max-w-md">
        <SearchIcon
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          placeholder="Rechercher..."
          className="pl-9 bg-muted/40 border-transparent focus:border-input focus:bg-background"
          aria-label="Recherche dans l'administration"
        />
      </div>

      {/* Right-side actions */}
      <div className="ml-auto flex items-center gap-1">
        <NotificationBell count={notificationCount} />
        <AdminUserMenu />
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Template: AdminLayout — full back-office shell.
//
// Layout structure (desktop):
//   ┌─────────────┬────────────────────────────────────────┐
//   │  AdminSide  │  AdminTopBar                           │
//   │   bar (lg)  ├────────────────────────────────────────┤
//   │   64px wide │  <children> (scrollable content area)  │
//   └─────────────┴────────────────────────────────────────┘
//
// On mobile the sidebar collapses and a Sheet overlay is used instead.
// ---------------------------------------------------------------------------

interface AdminLayoutProps {
  children: React.ReactNode;
  /** Number of unread notifications to show in the top bar badge. */
  notificationCount?: number;
}

export default function AdminLayout({
  children,
  notificationCount = 0,
}: AdminLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-muted/20">
      {/* Sidebar — handles both desktop (sticky) and mobile (Sheet) modes */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onMobileOpenChange={setMobileSidebarOpen}
      />

      {/* Right column: top bar + scrollable page content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminTopBar
          onMobileMenuOpen={() => setMobileSidebarOpen(true)}
          notificationCount={notificationCount}
        />

        {/* Scrollable main content */}
        <main
          id="admin-main-content"
          className="flex-1 overflow-y-auto"
          tabIndex={-1}
          aria-label="Contenu principal de l'administration"
        >
          <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
