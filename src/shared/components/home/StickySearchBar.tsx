"use client";

import { useEffect, useRef, useState } from "react";
import { SearchForm } from "./search-form";

export function StickySearchBar() {
  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sentinel — when this scrolls out of view, the bar is "stuck" */}
      <div ref={sentinelRef} className="h-0" />

      <div
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isStuck
            ? "py-3 top-15 shadow-sm"
            : "bg-[oklch(0.10_0.02_250)] pb-10 sm:pb-14 lg:pb-6 -mt-2 py-12"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SearchForm />
        </div>
      </div>
    </>
  );
}
