import { Phone } from 'lucide-react'
import { site } from '@/lib/site'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/SectionHeading'

export function ContactCTA() {
  return (
    <section aria-labelledby="cta-title" className="bg-paper py-16 sm:py-20 lg:py-24">
      <div className="shell">
        <div className="surface-dark reveal relative isolate overflow-hidden bg-forest px-6 py-14 text-white sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-4 -bottom-[0.32em] -z-10 font-serif text-[13rem] leading-none tracking-[-0.09em] text-white/[0.045] select-none sm:text-[20rem]"
          >
            {site.monogram}
          </span>
          <svg aria-hidden viewBox="0 0 200 200" fill="none" stroke="currentColor" className="absolute -top-28 -left-28 -z-10 size-80 text-white/10">
            <circle cx="100" cy="100" r="99.5" strokeWidth="0.6" />
            <circle cx="100" cy="100" r="72" strokeWidth="0.6" />
          </svg>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div>
              <Eyebrow light>Get in Touch</Eyebrow>
              <h2 id="cta-title" className="mt-5 font-serif text-[clamp(2.1rem,1.3rem+2.6vw,3.6rem)] leading-[1.05]">
                Let’s Bring <em className="text-sage">Clarity</em> to Your Finances
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                Speak with an accountant about your personal or business accounting needs.
              </p>
            </div>
            <div className="flex flex-col items-start gap-5">
              <ButtonLink href="/contact" variant="light">
                Contact Our Office
              </ButtonLink>
              <a href={site.office.href} className="inline-flex items-center gap-2.5 text-white/80 transition-colors hover:text-white">
                <Phone aria-hidden className="size-4" strokeWidth={1.75} />
                or call {site.office.display}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
