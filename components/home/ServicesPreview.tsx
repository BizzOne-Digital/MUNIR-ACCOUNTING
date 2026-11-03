import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { services } from '@/lib/services'
import { ButtonLink } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function ServicesPreview() {
  return (
    <section className="bg-paper py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          centered
          eyebrow="Our Services"
          title="Accounting & Tax Services"
          intro="Professional support for your personal finances and business obligations."
        />

        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {services.map(({ id, title, summary, icon: Icon }, i) => (
            <li
              key={id}
              style={{ '--i': i % 4 }}
              className="reveal group relative flex flex-col bg-white p-7 transition-colors duration-300 hover:bg-paper sm:p-8"
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-navy transition-transform duration-500 ease-(--ease-soft) group-hover:scale-x-100" />
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center border border-line text-blue transition-colors duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                  <Icon aria-hidden className="size-[1.375rem]" strokeWidth={1.4} />
                </span>
                <span aria-hidden className="font-serif text-lg text-navy/35">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-7 text-[1.0625rem] leading-snug font-bold text-ink">
                <Link href={`/services#${id}`} className="after:absolute after:inset-0">
                  {title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{summary}</p>
              <span aria-hidden className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy">
                Explore service
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </li>
          ))}
          <li style={{ '--i': 3 }} className="surface-dark reveal flex flex-col justify-between gap-8 bg-navy p-7 text-white sm:p-8">
            <div>
              <p className="font-serif text-[1.75rem] leading-tight">Not sure where to start?</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/75">
                Tell us what you need help with and we will discuss the right service for you.
              </p>
            </div>
            <ButtonLink href="/contact" variant="light" className="self-start">
              Contact Us
            </ButtonLink>
          </li>
        </ul>
      </div>
    </section>
  )
}
