import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { site } from '@/lib/site'

type Props = {
  eyebrow: string
  title: string
  intro: string
  crumb: string
  image?: StaticImageData
  imageAlt?: string
  imagePosition?: string
}

// With an image: full-bleed photo under a forest-green scrim, white text. Without: light paper banner.
export function PageHero({ eyebrow, title, intro, crumb, image, imageAlt = '', imagePosition = 'center' }: Props) {
  return (
    <section className={`relative isolate overflow-hidden ${image ? 'surface-dark bg-forest text-white' : 'border-b border-line bg-paper'}`}>
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            placeholder="blur"
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="settle -z-20 object-cover"
            style={{ objectPosition: imagePosition }}
          />
          {/* Solid enough under the text on phones; opens up toward the photo on wide screens. */}
          <span
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(7_61_46/0.72),rgb(7_61_46/0.9))] lg:bg-[linear-gradient(90deg,rgb(7_61_46/0.94)_0%,rgb(7_61_46/0.82)_38%,rgb(7_61_46/0.35)_75%,rgb(7_61_46/0.2)_100%)]"
          />
        </>
      ) : (
        <span
          aria-hidden
          className="pointer-events-none absolute right-[4%] -bottom-[0.3em] hidden font-serif text-[22rem] leading-none tracking-[-0.09em] text-forest/[0.045] select-none lg:block"
        >
          {site.monogram}
        </span>
      )}

      <div className={`shell flex items-center py-16 sm:py-20 lg:py-24 ${image ? 'min-h-[26rem] sm:min-h-[30rem] lg:min-h-[36rem]' : ''}`}>
        <div className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="rise">
            <ol className={`flex items-center gap-2 text-sm ${image ? 'text-white/70' : 'text-muted'}`}>
              <li>
                <Link href="/" className={`transition-colors ${image ? 'hover:text-white' : 'hover:text-forest'}`}>
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className={image ? 'text-white' : 'text-forest'}>
                {crumb}
              </li>
            </ol>
          </nav>
          <Eyebrow light={!!image} className="rise mt-8">
            {eyebrow}
          </Eyebrow>
          <h1
            className={`rise mt-5 font-serif text-[clamp(2.5rem,1.6rem+3vw,4.5rem)] leading-[1.03] ${image ? 'text-white' : 'text-forest'}`}
            style={{ '--d': 1 }}
          >
            {title}
          </h1>
          <p className={`rise mt-6 max-w-xl text-lg leading-relaxed ${image ? 'text-white/85' : 'text-ink/75'}`} style={{ '--d': 2 }}>
            {intro}
          </p>
        </div>
      </div>
    </section>
  )
}
