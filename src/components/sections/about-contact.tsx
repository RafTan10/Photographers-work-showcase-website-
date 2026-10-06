import { ArrowUpRight } from "lucide-react"

import { PHOTOGRAPHER } from "@/data/photos"

const YEAR = new Date().getFullYear()

/** Credit for whoever built the site, shown in the footer. */
const SITE_CREDIT = { name: "Rafid Tanim", url: "https://raftans-business-card.vercel.app/" }

/** Contact + footer. The bio and social links live in the Intro section above the work grid. */
export function AboutContact() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
        <h2 className="font-heading text-4xl sm:text-6xl">Contact</h2>
        <p className="mt-6 text-muted-foreground">For assignments, licensing and print enquiries:</p>
        <a
          href={`mailto:${PHOTOGRAPHER.email}`}
          className="mt-2 inline-block font-heading text-3xl italic underline-offset-8 hover:underline"
        >
          {PHOTOGRAPHER.email}
        </a>
        <p className="mt-4 text-sm text-muted-foreground">Based in {PHOTOGRAPHER.location}</p>
      </div>
      <footer className="flex flex-col items-center gap-3 border-t border-border px-4 py-8 text-center text-xs text-muted-foreground">
        <p>
          © {YEAR} {PHOTOGRAPHER.name}. All photographs are copyrighted and may not be used without
          permission.
        </p>
        <p>
          Website by{" "}
          <a
            href={SITE_CREDIT.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 font-medium text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
          >
            {SITE_CREDIT.name}
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </a>
        </p>
      </footer>
    </section>
  )
}
