"use client";

import { Camera } from "lucide-react";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface PhotoGalleryProps {
  photos: string[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Camera className="size-10 mb-3" />
        <p className="text-sm">Aucune photo disponible</p>
      </div>
    );
  }

  return (
    <ScrollArea className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {photos.map((photo, index) => (
          <div
            key={photo}
            className="relative flex flex-col items-center justify-center rounded-lg border bg-muted aspect-square"
          >
            <Camera className="size-8 text-muted-foreground mb-2" />
            <span className="text-xs text-muted-foreground">
              Photo {index + 1}
            </span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
