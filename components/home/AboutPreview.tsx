import Image from 'next/image'
import deskImage from '@/public/images/planning-desk.jpg'
import { site } from '@/lib/site'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/SectionHeading'

export function AboutPreview() {
  return (
    <div className="grid gap-10 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:items-center lg:gap-12">
      <div className="reveal group relative isolate mr-4 mb-4 sm:mr-0">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={deskImage}
            alt="A hand-drawn financial chart with pens and a ruler on an accountant's desk"
            placeholder="blur"
            sizes="(min-width: 1024px) 24vw, (min-width: 640px) 40vw, 100vw"
            className="size-full object-cover transition-[scale] duration-700 ease-(--ease-soft) group-hover:scale-[1.03]"
          />
        </div>
        <span aria-hidden className="absolute -right-4 -bottom-4 -z-10 size-2/3 bg-sage" />
      </div>
      <div className="reveal" style={{ '--i': 1 }}>
        <Eyebrow>About Us</Eyebrow>
        <h2 className="mt-5 font-serif text-[clamp(2rem,1.5rem+1.5vw,2.75rem)] leading-[1.1] text-forest">
          Accounting Built Around Your Needs
        </h2>
        <p className="mt-5 leading-relaxed text-muted">{site.mission}</p>
        <ButtonLink href="/about" className="mt-8">
          Learn More
        </ButtonLink>
      </div>
    </div>
  )
}
