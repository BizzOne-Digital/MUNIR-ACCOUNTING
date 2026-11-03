import Link from 'next/link'
import { ArrowRight, Building2, Users } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'

const audiences = [
  {
    icon: Users,
    title: 'For Individuals',
    text: 'Personal tax returns, tax planning and practical financial guidance tailored to your needs.',
    cta: 'Explore Individual Services',
    href: '/services#individuals',
  },
  {
    icon: Building2,
    title: 'For Businesses',
    text: 'Bookkeeping, payroll, corporate tax filings and accounting services for your business.',
    cta: 'Explore Business Services',
    href: '/services#businesses',
  },
]

export function AudienceSection({ title }: { title?: string }) {
  const Title = title ? 'h3' : 'h2'
  return (
    <section aria-label={title ? undefined : 'Who we help'} className={`border-y border-navy/10 bg-mist ${title ? 'pt-20 sm:pt-24' : ''}`}>
      {title && (
        <div className="shell">
          <SectionHeading eyebrow="Who We Help" title={title} />
        </div>
      )}
      <div className={`shell grid md:grid-cols-2 md:divide-x md:divide-navy/15 ${title ? 'mt-6 pb-8' : ''}`}>
        {audiences.map(({ icon: Icon, title: heading, text, cta, href }, i) => (
          <div
            key={href}
            style={{ '--i': i }}
            className={`reveal group relative flex gap-6 py-10 sm:gap-8 sm:py-12 lg:py-14 ${i ? 'border-t border-navy/15 md:border-t-0 md:pl-12 lg:pl-16' : 'md:pr-12 lg:pr-16'}`}
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-navy/20 bg-white/50 text-navy transition-colors duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white sm:size-16">
              <Icon aria-hidden className="size-6 sm:size-7" strokeWidth={1.25} />
            </span>
            <div>
              <Title className="font-serif text-[1.75rem] leading-tight text-navy sm:text-[2rem]">{heading}</Title>
              <p className="mt-3 max-w-md leading-relaxed text-ink/75">{text}</p>
              <Link
                href={href}
                className="mt-5 inline-flex items-center gap-2 font-semibold text-navy underline decoration-navy/30 underline-offset-[7px] transition-colors group-hover:decoration-navy after:absolute after:inset-0"
              >
                {cta}
                <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
