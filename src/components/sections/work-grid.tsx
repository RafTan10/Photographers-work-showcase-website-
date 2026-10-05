import { photoUrl, photos } from "@/data/photos"

interface WorkGridProps {
  onOpenPhoto: (slug: string) => void
}

/** All 20 photographs with title and description, in a masonry-style column layout. */
export function WorkGrid({ onOpenPhoto }: WorkGridProps) {
  return (
    <section id="work" className="mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-8">
      <header className="mb-14 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-heading text-4xl sm:text-6xl">Selected Work</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          {photos.length} photographs. Select any image to view it full size.
        </p>
      </header>

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <figure key={p.slug} className="mb-10 break-inside-avoid">
            <button
              type="button"
              onClick={() => onOpenPhoto(p.slug)}
              className="group block w-full cursor-zoom-in overflow-hidden rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src={photoUrl(p, "card")}
                alt={p.alt}
                loading={i < 3 ? "eager" : "lazy"}
                decoding="async"
                className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </button>
            <figcaption className="mt-3">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-heading text-2xl">{p.title}</h3>
                <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="text-xs tracking-wider text-muted-foreground uppercase">
                {p.place} · {p.year}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{p.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
