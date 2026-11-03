import Image from 'next/image'
import { Check } from 'lucide-react'
import heroImage from '@/public/images/hero-consultation.jpg'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/SectionHeading'

const trust = ['Personalized Support', 'Practical Guidance', 'Professional Service']

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="shell relative z-10 lg:flex lg:min-h-[min(46rem,calc(100svh-7.5rem))] lg:items-center">
        <div className="py-14 sm:py-20 lg:w-[58%] lg:py-24 lg:pr-6">
          <Eyebrow className="rise">Chartered Professional Accountant</Eyebrow>
          <h1 className="rise mt-6 font-serif text-[clamp(2.5rem,0.3rem+3.85vw,3.75rem)] leading-[1.04] text-navy" style={{ '--d': 1 }}>
            <span className="block">Clear Financial Guidance.</span>
            <span className="block">Confident Decisions.</span>
          </h1>
          <p className="rise mt-7 max-w-[34rem] text-lg leading-relaxed text-ink/75 sm:text-[1.1875rem]" style={{ '--d': 2 }}>
            Reliable, accurate, and personalized accounting and tax services that help individuals and businesses make informed
            financial decisions.
          </p>
          <div className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-5" style={{ '--d': 3 }}>
            <ButtonLink href="/contact">Request a Consultation</ButtonLink>
            <ButtonLink href="/services" variant="text">
              Explore Our Services
            </ButtonLink>
          </div>
          <ul
            className="rise mt-12 flex flex-col gap-3 text-[0.9375rem] text-ink/80 sm:flex-row sm:gap-0 sm:divide-x sm:divide-navy/20 lg:flex-col lg:gap-3 lg:divide-x-0 xl:flex-row xl:gap-0 xl:divide-x"
            style={{ '--d': 4 }}
          >
            {trust.map((item) => (
              <li key={item} className="flex items-center gap-2.5 whitespace-nowrap sm:px-5 sm:first:pl-0 lg:px-0 xl:px-5 xl:first:pl-0">
                <Check aria-hidden className="size-4 text-blue" strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[45%] lg:[mask-image:linear-gradient(to_right,transparent,black_16%)]">
        <Image
          src={heroImage}
          alt="An accountant talking through financial matters with a client in a bright, modern office"
          fill
          placeholder="blur"
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="settle object-cover object-[28%_center]"
        />
        <div className="rise absolute bottom-10 left-[22%] hidden max-w-[18rem] border-l-2 border-navy bg-white/95 p-6 shadow-soft lg:block" style={{ '--d': 5 }}>
          <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-blue uppercase">Accounting &amp; Tax</p>
          <p className="mt-2 font-serif text-[1.375rem] leading-snug text-navy">Services for individuals and businesses</p>
        </div>
      </div>
    </section>
  )
}
