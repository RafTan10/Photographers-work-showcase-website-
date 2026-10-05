import * as React from "react"

import { AboutContact } from "@/components/sections/about-contact"
import { Hero } from "@/components/sections/hero"
import { Intro } from "@/components/sections/intro"
import { Lightbox } from "@/components/sections/lightbox"
import { WorkGrid } from "@/components/sections/work-grid"
import { PHOTOGRAPHER } from "@/data/photos"

export default function App() {
  const [openSlug, setOpenSlug] = React.useState<string | null>(null)

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-4 text-sm mix-blend-difference sm:px-8">
        <a href="#top" className="font-heading text-xl text-white">
          {PHOTOGRAPHER.name}
        </a>
        <div className="flex gap-5 text-white/80">
          <a href="#work" className="hover:text-white">
            Work
          </a>
          <a href="#about" className="hover:text-white">
            About
          </a>
          <a href="#contact" className="hover:text-white">
            Contact
          </a>
        </div>
      </nav>

      <main>
        <Hero onOpenPhoto={setOpenSlug} />
        <Intro />
        <WorkGrid onOpenPhoto={setOpenSlug} />
        <AboutContact />
      </main>

      <Lightbox slug={openSlug} onChange={setOpenSlug} />
    </>
  )
}
