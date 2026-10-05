/**
 * CircularGallery — 3D rotating ring of photo cards.
 *
 * Faithful port of the 21st.dev "circular-gallery" component. Same look and motion:
 * 300×400 cards, radius 600 / perspective 2000 (for 10 items), the far side of the ring
 * stays visible at 30% opacity, scroll sets the rotation directly and auto-rotation
 * pauses while scrolling. Adaptations for this portfolio:
 *  - uses the shared shadcn `cn` helper instead of a local copy
 *  - animates via refs + requestAnimationFrame (no React re-render every frame)
 *  - scroll rotation is measured against an optional container, not the whole page,
 *    and is ADDED to auto-rotation (no jump when you start/stop scrolling)
 *  - radius grows with item count (perspective scales with it, so the front card keeps
 *    the original apparent size); the whole ring scales down on small screens
 *  - respects prefers-reduced-motion, browser-safe timer types
 *  - item fields renamed for photography: title / subtitle (was common / binomial)
 */
import * as React from "react"

import { cn } from "@/lib/utils"

export interface GalleryItem {
  /** Card heading, e.g. the photo title. */
  title: string
  /** Secondary line, e.g. place · year. */
  subtitle?: string
  photo: {
    url: string
    /** Alt text — describe what is in the picture. */
    text: string
    /** CSS object-position, e.g. "40% 50%". Cards are portrait, photos mostly landscape. */
    pos?: string
    by?: string
  }
}

export interface CircularGalleryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  items: GalleryItem[]
  /** Distance of cards from the centre (px) at full size. Defaults to the original 600, grown to fit. */
  radius?: number
  /** Auto-rotation speed in degrees per frame at 60fps. */
  autoRotateSpeed?: number
  /** Full turns the ring makes while `scrollContainerRef` scrolls past. */
  scrollRotations?: number
  /** Element whose scroll progress drives rotation. Defaults to the whole document. */
  scrollContainerRef?: React.RefObject<HTMLElement | null>
  /** Called when a card is clicked / activated with the keyboard. */
  onItemClick?: (index: number) => void
}

const CARD_W = 300
const CARD_H = 400
/** Arc length per card in the original (10 items on a 600px radius). */
const ARC_PER_CARD = (2 * Math.PI * 600) / 10
/**
 * How much the original's perspective (2000) enlarges the front card (at z = 600): 2000 / 1400.
 * We render cards at that on-screen size and push the ring back by its radius so the front card
 * sits at z = 0 — identical geometry, but text and photos stay sharp instead of being upscaled.
 */
const FRONT_MAG = 2000 / (2000 - 600)

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    {
      items,
      className,
      radius = 600,
      autoRotateSpeed = 0.02,
      scrollRotations = 1,
      scrollContainerRef,
      onItemClick,
      style,
      ...props
    },
    ref,
  ) => {
    const ringRef = React.useRef<HTMLDivElement>(null)
    const itemRefs = React.useRef<(HTMLDivElement | null)[]>([])
    const wrapperRef = React.useRef<HTMLDivElement | null>(null)
    const [scale, setScale] = React.useState(1)

    const setWrapperRef = (node: HTMLDivElement | null) => {
      wrapperRef.current = node
      if (typeof ref === "function") ref(node)
      else if (ref) ref.current = node
    }

    // Shrink the whole ring uniformly on small viewports; full size on desktop.
    React.useEffect(() => {
      const el = wrapperRef.current
      if (!el) return
      const ro = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect
        // Fit the front card's height (+ some room) and keep the ring proportionate on narrow screens.
        const fit = Math.min(width / 1100, height / (CARD_H * FRONT_MAG * 1.2))
        setScale(Math.min(1, Math.max(0.45, fit)))
      })
      ro.observe(el)
      return () => ro.disconnect()
    }, [])

    const count = Math.max(items.length, 1)
    const anglePerItem = 360 / count
    const baseRadius = Math.max(radius, (count * ARC_PER_CARD) / (2 * Math.PI))
    // Original ratio perspective:radius = 2000:600 → same apparent size at any radius.
    const perspective = baseRadius * scale * (2000 / 600)
    const r = baseRadius * scale * FRONT_MAG
    const cardW = CARD_W * scale * FRONT_MAG
    const cardH = CARD_H * scale * FRONT_MAG
    // The rAF loop reads the radius from a ref so resizing doesn't restart (and reset) the rotation.
    const radiusRef = React.useRef(r)
    React.useLayoutEffect(() => {
      radiusRef.current = r
    }, [r])

    // Animation loop: auto-rotation + scroll rotation, written straight to the DOM.
    React.useEffect(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      let autoAngle = 0
      let scrollAngle = 0
      let lastScroll = -Infinity
      let last = performance.now()
      let frame = 0

      const readScroll = () => {
        const el = scrollContainerRef?.current
        let progress: number
        if (el) {
          const rect = el.getBoundingClientRect()
          const travel = rect.height - window.innerHeight
          progress = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0
        } else {
          const travel = document.documentElement.scrollHeight - window.innerHeight
          progress = travel > 0 ? window.scrollY / travel : 0
        }
        scrollAngle = progress * 360 * scrollRotations
      }

      const onScroll = () => {
        lastScroll = performance.now()
        readScroll()
      }

      const tick = (now: number) => {
        const dt = Math.min(now - last, 64) / (1000 / 60) // frames elapsed at 60fps
        last = now
        // Like the original: auto-rotation pauses while the user is scrolling.
        const scrolling = now - lastScroll < 150
        if (!reduceMotion && !scrolling) autoAngle += autoRotateSpeed * dt
        const rotation = autoAngle + scrollAngle

        if (ringRef.current) {
          ringRef.current.style.transform = `translateZ(${-radiusRef.current}px) rotateY(${rotation}deg)`
        }

        itemRefs.current.forEach((node, i) => {
          if (!node) return
          const relative = (((i * anglePerItem + rotation) % 360) + 360) % 360
          const distance = relative > 180 ? 360 - relative : relative
          node.style.opacity = String(Math.max(0.3, 1 - distance / 180))
        })
        frame = requestAnimationFrame(tick)
      }

      readScroll()
      window.addEventListener("scroll", onScroll, { passive: true })
      window.addEventListener("resize", readScroll)
      frame = requestAnimationFrame(tick)
      return () => {
        window.removeEventListener("scroll", onScroll)
        window.removeEventListener("resize", readScroll)
        cancelAnimationFrame(frame)
      }
    }, [anglePerItem, autoRotateSpeed, scrollRotations, scrollContainerRef])

    return (
      <div
        ref={setWrapperRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured photographs"
        className={cn("relative flex h-full w-full items-center justify-center", className)}
        style={{ perspective: `${perspective}px`, ...style }}
        {...props}
      >
        <div
          ref={ringRef}
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d", transform: `translateZ(${-r}px)` }}
        >
          {items.map((item, i) => (
            <div
              key={item.photo.url}
              ref={(node) => {
                itemRefs.current[i] = node
              }}
              role="group"
              aria-label={item.title}
              className="absolute top-1/2 left-1/2"
              style={{
                width: cardW,
                height: cardH,
                marginLeft: -cardW / 2,
                marginTop: -cardH / 2,
                transform: `rotateY(${i * anglePerItem}deg) translateZ(${r}px)`,
                transition: "opacity 0.3s linear",
              }}
            >
              <button
                type="button"
                onClick={() => onItemClick?.(i)}
                disabled={!onItemClick}
                className="group relative block h-full w-full overflow-hidden rounded-lg border border-border bg-card/70 shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring enabled:cursor-pointer dark:bg-card/30"
              >
                <img
                  src={item.photo.url}
                  alt={item.photo.text}
                  decoding="async"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: item.photo.pos || "center" }}
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-left text-white">
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  {item.subtitle && <em className="text-sm italic opacity-80">{item.subtitle}</em>}
                  {item.photo.by && <p className="mt-2 text-xs opacity-70">Photo by: {item.photo.by}</p>}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  },
)

CircularGallery.displayName = "CircularGallery"

export { CircularGallery }
