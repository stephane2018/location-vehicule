// ClientLayout.tsx — Template that wraps all client-facing pages.
// Composes Header + main content area + Footer into a min-height screen layout.
// Server component — no "use client" needed; Header itself is the only client island.

import * as React from "react";

import Header from "@/shared/components/Layout/Header";
import Footer from "@/shared/components/Layout/Footer";

// ---------------------------------------------------------------------------
// Template: ClientLayout
// ---------------------------------------------------------------------------

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    // Full-viewport flex column: header stays at top, footer stays at bottom,
    // and <main> grows to fill any remaining vertical space.
    <div className="flex min-h-screen flex-col">
      <Header />

      <main
        id="main-content"
        className="flex-1"
        // Skip-to-content target for keyboard / screen-reader users.
        tabIndex={-1}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
