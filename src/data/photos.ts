/**
 * Single source of truth for the portfolio's photographs.
 *
 * Images live in /public/photos:
 *   full/  — 2400px long edge, for the lightbox
 *   card/  — 1000px long edge, for gallery cards & grid
 *
 * TODO(photographer): titles, places and descriptions below are working drafts written
 * from the images themselves. Confirm every one with the photographer before launch —
 * especially anything about events, people or locations.
 */
import type { GalleryItem } from "@/components/ui/circular-gallery"

export const PHOTOGRAPHER = {
  name: "Tanvir Jawad",
  tagline: "Documentary & street photographer · Bangladesh",
  /** One line shown under the name in the hero. */
  intro: "Documenting the everyday lives of Bangladesh's people — and the politics that shape them.",
  /** Full bio for the About section, one string per paragraph. */
  bio: [
    "Tanvir Jawad is a documentary and street photographer and a third-year journalism student at Daffodil International University (DIU). His work follows the day-to-day lives of people across Bangladesh — on its streets, in its open landscapes, and in the political moments whose consequences fall on ordinary people.",
    "Trained as a journalist, he photographs with one aim: to bring the truth to light.",
    "Alongside his documentary work, Tanvir shoots events and fests for mobile brands in Bangladesh and event-management companies, and is a key member of DIU's photography club.",
  ],
  portrait: "/photos/tanvir.webp",
  portraitAlt: "Tanvir Jawad holding a camera on a gimbal, framing a shot outdoors among green trees",
  email: "hello@example.com", // TODO
  instagram: "https://www.instagram.com/the_all_rounder_kid/",
  facebook: "https://www.facebook.com/tanvir.jawad1",
  location: "Dhaka, Bangladesh", // TODO: confirm
}

export interface Photo {
  slug: string
  title: string
  place: string
  year: string
  description: string
  alt: string
  /** object-position used when the photo is cropped into a portrait card. */
  focus?: string
  /** Show in the hero ring. */
  featured?: boolean
}

export const photos: Photo[] = [
  {
    slug: "01-through-the-window",
    title: "Through the Window",
    place: "Bangladesh",
    year: "2025",
    featured: true,
    focus: "50% 50%",
    alt: "Black-and-white photo of a lone figure framed by an empty window in a bare concrete room",
    description:
      "A lone figure, small against the frame of an empty room — stillness in a city that rarely stops.",
  },
  {
    slug: "02-the-rush",
    title: "The Rush",
    place: "Bangladesh",
    year: "2025",
    focus: "45% 50%",
    alt: "Men carry an elderly man through a surging crowd on a tree-lined street",
    description: "In the middle of a surging crowd, men lift an elderly man to safety.",
  },
  {
    slug: "03-running-the-street",
    title: "Running the Street",
    place: "Bangladesh",
    year: "2025",
    featured: true,
    focus: "40% 50%",
    alt: "Young men running down a city street past a rickshaw, one carrying a stick",
    description: "Momentum, dust and morning light as a street turns into a stampede.",
  },
  {
    slug: "04-effigy",
    title: "Effigy",
    place: "Bangladesh",
    year: "2025",
    focus: "35% 50%",
    alt: "A burning effigy held up above a dense crowd between tall buildings",
    description: "Fire, smoke and faces — an effigy burns above the crowd.",
  },
  {
    slug: "05-spin",
    title: "Spin",
    place: "Bangladesh",
    year: "2025",
    featured: true,
    focus: "60% 40%",
    alt: "Slow-shutter photo of a rider in red and yellow swinging high against a blurred sky",
    description: "A slow shutter turns a fairground ride into a streak of colour and speed.",
  },
  {
    slug: "06-wheels",
    title: "Wheels",
    place: "Bangladesh",
    year: "2025",
    featured: true,
    focus: "25% 50%",
    alt: "A woman in a blue headscarf walks past a wall of stacked rickshaw-van wheels",
    description: "Pattern and pause: a woman walks past a wall of stacked cycle-vans.",
  },
  {
    slug: "07-mother",
    title: "Mother",
    place: "Bangladesh",
    year: "2025",
    featured: true,
    focus: "35% 50%",
    alt: "A woman in a magenta scarf holds a baby while a child stands beside her",
    description: "A mother in magenta, a child in her arms and another at her side.",
  },
  {
    slug: "08-gaze",
    title: "Gaze",
    place: "Bangladesh",
    year: "2025",
    featured: true,
    focus: "50% 50%",
    alt: "Portrait of a shirtless young boy looking straight into the camera against a blue sky",
    description: "A boy holds the lens with a steady, unblinking look.",
  },
  {
    slug: "09-embrace",
    title: "Embrace",
    place: "Bangladesh",
    year: "2025",
    focus: "50% 50%",
    alt: "A woman clutches a child in red while a man's arm wraps around them",
    description: "A moment of grief or relief — held close, held together.",
  },
  {
    slug: "10-aftermath",
    title: "Aftermath",
    place: "Bangladesh",
    year: "2025",
    focus: "30% 60%",
    alt: "A child walks through the rubble of demolished homes",
    description: "A child crosses what is left of a neighbourhood reduced to rubble.",
  },
  {
    slug: "11-open-field",
    title: "Open Field",
    place: "Bangladesh",
    year: "2025",
    focus: "30% 60%",
    alt: "Cattle grazing on a wide green field under an overcast sky",
    description: "Quiet green distance — cattle grazing under a heavy monsoon sky.",
  },
  {
    slug: "12-the-flag",
    title: "The Flag",
    place: "Bangladesh",
    year: "2025",
    featured: true,
    focus: "55% 40%",
    alt: "A Bangladeshi flag waves above a vast crowd at an evening rally",
    description: "Red and green held high above a sea of people at dusk.",
  },
  {
    slug: "13-lattice",
    title: "Lattice",
    place: "Bangladesh",
    year: "2025",
    focus: "50% 50%",
    alt: "A small figure walks past a tall cream wall with geometric lattice openings",
    description: "Geometry and scale: one walker against a wall of light and pattern.",
  },
  {
    slug: "14-tear-gas",
    title: "Tear Gas",
    place: "Bangladesh",
    year: "2025",
    featured: true,
    focus: "75% 50%",
    alt: "A man with a backpack stands under an overpass as tear-gas smoke fills the road",
    description: "Smoke rolls under the flyover while one man stands his ground.",
  },
  {
    slug: "15-the-line",
    title: "The Line",
    place: "Bangladesh",
    year: "2025",
    focus: "60% 50%",
    alt: "Riot police in formation on a debris-strewn street, silhouetted onlookers in front",
    description: "A line of riot police, watched from the shadows.",
  },
  {
    slug: "16-fires-on-the-road",
    title: "Fires on the Road",
    place: "Bangladesh",
    year: "2025",
    featured: true,
    focus: "40% 60%",
    alt: "Small fires burn on a dark road with figures gathered in the distance",
    description: "Flames on the asphalt and figures waiting at the end of the road.",
  },
  {
    slug: "17-wounds",
    title: "Wounds",
    place: "Bangladesh",
    year: "2025",
    focus: "45% 50%",
    alt: "Close-up of hands tending small wounds on a person's arm",
    description: "Close and unflinching — hands tending to an injured arm.",
  },
  {
    slug: "18-the-march",
    title: "The March",
    place: "Bangladesh",
    year: "2025",
    featured: true,
    focus: "50% 50%",
    alt: "A huge crowd marches beneath a flyover, framed by two dark silhouettes",
    description: "A river of people flows beneath the flyover.",
  },
  {
    slug: "19-red-rose",
    title: "Red Rose",
    place: "Bangladesh",
    year: "2025",
    featured: true,
    focus: "35% 50%",
    alt: "Black-and-white photo of a girl on steps holding a single red rose",
    description: "A single red rose — the only colour on the staircase.",
  },
  {
    slug: "20-bangladesh-railway",
    title: "Bangladesh Railway",
    place: "Bangladesh",
    year: "2025",
    featured: true,
    focus: "50% 50%",
    alt: "Two girls in red look out of a train window beneath Bangla lettering",
    description: "Two girls in red framed by a train window, the railway's name above them.",
  },
]

export const photoUrl = (p: Photo, size: "full" | "card" = "card") => `/photos/${size}/${p.slug}.webp`

export const toGalleryItem = (p: Photo): GalleryItem => ({
  title: p.title,
  subtitle: `${p.place} · ${p.year}`,
  photo: { url: photoUrl(p, "card"), text: p.alt, pos: p.focus, by: PHOTOGRAPHER.name },
})
