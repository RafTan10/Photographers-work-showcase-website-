import type * as React from "react"

import { FacebookIcon, InstagramIcon } from "@/components/ui/social-icons"
import { cn } from "@/lib/utils"
import { PHOTOGRAPHER } from "@/data/photos"

const SOCIALS = [
  { label: "Instagram", href: PHOTOGRAPHER.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: PHOTOGRAPHER.facebook, Icon: FacebookIcon },
]

/** About the photographer, between the hero ring and the work grid: bio + socials left, portrait right. */
export function Intro() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 pt-28 sm:px-8">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_minmax(0,26rem)] md:gap-16">
        <div>
          <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">About</p>
          <h2 className="mt-3 font-heading text-4xl sm:text-6xl">{PHOTOGRAPHER.name}</h2>
          <p className="mt-2 text-muted-foreground">{PHOTOGRAPHER.tagline}</p>

          <div className="mt-8 max-w-prose space-y-4 text-lg leading-relaxed text-foreground/85">
            {PHOTOGRAPHER.bio.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <ul className="mt-8 flex gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <SocialLink label={label} href={href}>
                  <Icon className="size-5" />
                </SocialLink>
              </li>
            ))}
          </ul>
        </div>

        <figure className="mx-auto w-full max-w-sm md:max-w-none">
          <img
            src={PHOTOGRAPHER.portrait}
            alt={PHOTOGRAPHER.portraitAlt}
            loading="lazy"
            decoding="async"
            className="aspect-[595/726] w-full rounded-md object-cover shadow-2xl"
          />
        </figure>
      </div>
    </section>
  )
}

function SocialLink({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  const className =
    "flex size-11 items-center justify-center rounded-full border border-border text-foreground/80 transition-colors"
  // Until the profile URL is filled in, show the icon but don't link anywhere.
  if (!href) {
    return (
      <span
        aria-label={`${label} (link coming soon)`}
        title="Link coming soon"
        className={cn(className, "opacity-40")}
      >
        {children}
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${PHOTOGRAPHER.name} on ${label}`}
      className={cn(className, "hover:bg-foreground hover:text-background")}
    >
      {children}
    </a>
  )
}
