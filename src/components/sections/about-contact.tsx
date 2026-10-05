import { PHOTOGRAPHER } from "@/data/photos"

const YEAR = new Date().getFullYear()

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
      <footer className="border-t border-border px-4 py-8 text-center text-xs text-muted-foreground">
        © {YEAR} {PHOTOGRAPHER.name}. All photographs are copyrighted and may not be used without permission.
      </footer>
    </section>
  )
}
