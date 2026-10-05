import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { photoUrl, photos } from "@/data/photos"

interface LightboxProps {
  slug: string | null
  onChange: (slug: string | null) => void
}

export function Lightbox({ slug, onChange }: LightboxProps) {
  const index = slug ? photos.findIndex((p) => p.slug === slug) : -1
  const photo = index >= 0 ? photos[index] : null

  const go = React.useCallback(
    (delta: number) => {
      if (index < 0) return
      onChange(photos[(index + delta + photos.length) % photos.length].slug)
    },
    [index, onChange],
  )

  React.useEffect(() => {
    if (!photo) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [photo, go])

  return (
    <Dialog open={!!photo} onOpenChange={(open) => !open && onChange(null)}>
      <DialogContent className="max-h-[95svh] w-auto max-w-[min(95vw,1600px)] gap-3 border-0 bg-black/95 p-3 text-white sm:max-w-[min(95vw,1600px)]">
        {photo && (
          <>
            <img
              src={photoUrl(photo, "full")}
              alt={photo.alt}
              className="max-h-[78svh] w-auto rounded-sm object-contain"
            />
            <div className="flex items-start justify-between gap-4 px-1">
              <div>
                <DialogTitle className="font-heading text-2xl font-normal">{photo.title}</DialogTitle>
                <DialogDescription className="text-sm text-white/70">
                  {photo.place} · {photo.year} — {photo.description}
                </DialogDescription>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button variant="ghost" size="icon" onClick={() => go(-1)} aria-label="Previous photo">
                  <ChevronLeft />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => go(1)} aria-label="Next photo">
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
