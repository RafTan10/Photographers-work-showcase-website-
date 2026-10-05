import * as React from "react"
import { ArrowDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CircularGallery } from "@/components/ui/circular-gallery"
import { PHOTOGRAPHER, photos, toGalleryItem } from "@/data/photos"

const featured = photos.filter((p) => p.featured)

interface HeroProps {
  onOpenPhoto: (slug: string) => void
}

/**
 * Same structure as the 21st.dev demo: a 500vh section provides the scroll distance,
 * a sticky full-screen viewport holds the ring, and the ring makes one full turn
 * as you scroll through it before the page continues into the work grid.
 */
export function Hero({ onOpenPhoto }: HeroProps) {
  const sectionRef = React.useRef<HTMLElement>(null)
  const items = React.useMemo(() => featured.map(toGalleryItem), [])

  return (
    <section ref={sectionRef} id="top" className="relative h-[500vh] w-full bg-background text-foreground">
      <div className="sticky top-0 flex h-svh w-full flex-col items-center overflow-hidden">
        {/* Heading sits in the flow (not over the ring) so the ring always fills the space below it. */}
        <div className="pointer-events-none relative z-10 shrink-0 px-4 pt-16 text-center sm:pt-20">
          <h1 className="font-heading text-4xl sm:text-5xl">{PHOTOGRAPHER.name}</h1>
          <p className="text-sm text-muted-foreground sm:text-base">{PHOTOGRAPHER.tagline}</p>
        </div>

        <div className="min-h-0 w-full flex-1">
          <CircularGallery
            items={items}
            scrollContainerRef={sectionRef}
            onItemClick={(i) => onOpenPhoto(featured[i].slug)}
          />
        </div>

        <div className="relative z-10 flex shrink-0 flex-col items-center gap-2 pt-3 pb-6 sm:pb-8">
          <p className="hidden text-[11px] tracking-[0.3em] text-muted-foreground uppercase sm:block">
            Scroll to rotate
          </p>
          <Button
            asChild
            variant="outline"
            className="h-11 gap-2 rounded-full border-foreground/40 bg-background/60 px-6 text-sm text-foreground shadow-lg backdrop-blur-md hover:border-foreground hover:bg-foreground hover:text-background dark:border-foreground/40 dark:bg-background/60 dark:hover:bg-foreground"
          >
            <a href="#work">
              View the work
              <ArrowDown className="size-4 motion-safe:animate-bounce" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
