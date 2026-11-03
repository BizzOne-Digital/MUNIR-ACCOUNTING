import Link from 'next/link'
import { ArrowRight, Building2, Phone, Plus, Users } from 'lucide-react'
import calculatorImage from '@/public/images/calculator.jpg'
import { PageHero } from '@/components/sections/PageHero'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow, SectionHeading } from '@/components/ui/SectionHeading'
import { pricing, pricingList, serviceGroups, services, type Audience } from '@/lib/services'
import { pageMetadata, site } from '@/lib/site'

export const metadata = pageMetadata(
  'Accounting & Tax Services',
  'Bookkeeping and payroll, personal, corporate and trust tax returns, compilation and review engagements, tax audits, tax and immigration consultation, financing guidance and new business registration.',
  '/services',
)

const audiences: { id: Audience; icon: typeof Users; eyebrow: string; title: string; text: string }[] = [
  {
    id: 'individuals',
    icon: Users,
    eyebrow: 'For Individuals',
    title: 'Individual Accounting Services',
    text: 'Personal tax returns, tax planning and practical financial guidance tailored to your needs.',
  },
  {
    id: 'businesses',
    icon: Building2,
    eyebrow: 'For Businesses',
    title: 'Business Accounting Services',
    text: 'Bookkeeping, payroll, corporate tax filings and accounting services for small and medium-sized businesses, corporations and new business owners.',
  },
]

const faqs = [
  {
    q: 'Do you offer accounting services for individuals and businesses?',
    a: 'Yes. Services are available to individuals as well as small and medium-sized businesses, corporations and entrepreneurs starting a new business. The services listed on this page outline the areas we can help with.',
  },
  {
    q: 'How can I enquire about bookkeeping services?',
    a: `Call ${site.office.display} or ${site.cell.display}, email ${site.email}, or send an enquiry through the contact form and select “Bookkeeping & Payroll” as the service.`,
  },
  {
    q: 'How can I discuss my tax filing requirements?',
    a: 'Request a consultation and let us know whether your enquiry relates to a personal, corporate or trust tax return. We will then discuss your requirements with you.',
  },
  {
    q: 'How can I request a consultation?',
    a: `Use the form on the contact page, call the office at ${site.office.display} or ${site.cell.display}, or email ${site.email}.`,
  },
  {
    q: 'How do I obtain pricing?',
    a: `Contact for pricing. Pricing is available for ${pricingList}, and depends on the services you need and the details of your situation. Please get in touch to discuss your requirements.`,
  },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="Our Services"
        title="Accounting & Tax Services"
        intro="Professional support for your personal finances and business obligations, from bookkeeping and tax returns to financing guidance and new business registration."
        image={calculatorImage}
        imageAlt="A white calculator on a clean, light grey desk surface"
      />

      {/* Introduction & index */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            className="lg:col-span-5"
            eyebrow="Overview"
            title="Support for Individuals and Businesses"
            intro="Whether you need help with a personal tax return, ongoing bookkeeping for your company or guidance on starting a new business, each service is delivered with accuracy, professionalism and personal attention."
          />
          <nav aria-label="Service index" className="reveal lg:col-span-7" style={{ '--i': 1 }}>
            <ol className="border-t border-line">
              {services.map(({ id, title }, i) => (
                <li key={id} className="border-b border-line">
                  <Link href={`#${id}`} className="group flex items-center gap-5 py-4 transition-colors hover:text-navy">
                    <span className="w-7 font-serif text-lg text-blue/60">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1 font-semibold">{title}</span>
                    <ArrowRight aria-hidden className="size-4 text-navy/40 transition-[translate,color] duration-300 group-hover:translate-x-1 group-hover:text-navy" />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* Individuals & businesses */}
      <section aria-label="Services by client type" className="border-y border-navy/10 bg-mist">
        <div className="shell grid md:grid-cols-2 md:divide-x md:divide-navy/15">
          {audiences.map(({ id, icon: Icon, eyebrow, title, text }, i) => (
            <div
              key={id}
              id={id}
              style={{ '--i': i }}
              className={`reveal py-14 sm:py-16 lg:py-20 ${i ? 'border-t border-navy/15 md:border-t-0 md:pl-12 lg:pl-16' : 'md:pr-12 lg:pr-16'}`}
            >
              <span className="grid size-14 place-items-center rounded-full border border-navy/20 bg-white/50 text-navy">
                <Icon aria-hidden className="size-6" strokeWidth={1.25} />
              </span>
              <Eyebrow className="mt-8">{eyebrow}</Eyebrow>
              <h2 className="mt-4 font-serif text-[clamp(1.85rem,1.5rem+1vw,2.5rem)] leading-tight text-navy">{title}</h2>
              <p className="mt-4 max-w-md leading-relaxed text-ink/75">{text}</p>
              <h3 className="mt-8 text-xs font-bold tracking-[0.18em] text-navy/70 uppercase">Relevant services</h3>
              <ul className="mt-3 border-t border-navy/15">
                {services
                  .filter((s) => s.for.includes(id))
                  .map((s) => (
                    <li key={s.id} className="border-b border-navy/15">
                      <Link href={`#${s.id}`} className="group flex items-center justify-between gap-4 py-3.5 text-ink/85 transition-colors hover:text-navy">
                        {s.title}
                        <ArrowRight aria-hidden className="size-4 shrink-0 text-navy/50 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
              </ul>
              <ButtonLink href="/contact" className="mt-8">
                Request a Consultation
              </ButtonLink>
            </div>
          ))}
        </div>
      </section>

      {/* Service detail, grouped */}
      {serviceGroups.map((group, g) => (
        <section key={group.id} aria-labelledby={`${group.id}-title`} className={`py-20 sm:py-24 lg:py-28 ${g % 2 ? 'bg-white' : 'bg-paper'}`}>
          <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="reveal lg:sticky lg:top-32">
                <Eyebrow>{group.eyebrow}</Eyebrow>
                <h2 id={`${group.id}-title`} className="mt-5 font-serif text-[clamp(2rem,1.5rem+1.5vw,2.75rem)] leading-[1.1] text-navy">
                  {group.title}
                </h2>
                <p className="mt-5 leading-relaxed text-muted">{group.intro}</p>
              </div>
            </div>
            <div className="lg:col-span-8">
              {services
                .filter((s) => s.group === group.id)
                .map(({ id, title, description, audience, icon: Icon }) => (
                  <article key={id} id={id} className="reveal border-t border-line py-10 first:border-t-0 first:pt-0 last:pb-0 sm:py-12">
                    <div className="flex items-center gap-5">
                      <span className="grid size-14 shrink-0 place-items-center border border-line bg-white text-blue">
                        <Icon aria-hidden className="size-6" strokeWidth={1.4} />
                      </span>
                      <h3 className="font-serif text-[clamp(1.6rem,1.35rem+0.8vw,2.1rem)] leading-tight text-navy">{title}</h3>
                    </div>
                    <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-ink/80">{description}</p>
                    <dl className="mt-8 grid gap-6 border-y border-line py-6 sm:grid-cols-[1fr_auto] sm:gap-10">
                      <div>
                        <dt className="text-xs font-bold tracking-[0.18em] text-blue uppercase">Who it’s for</dt>
                        <dd className="mt-2 leading-relaxed text-muted">{audience}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-bold tracking-[0.18em] text-blue uppercase">Pricing</dt>
                        <dd className="mt-2 font-semibold whitespace-nowrap text-navy">Contact for Pricing</dd>
                      </div>
                    </dl>
                    <ButtonLink href="/contact" variant="text" className="mt-6">
                      Request a Consultation
                    </ButtonLink>
                  </article>
                ))}
            </div>
          </div>
        </section>
      ))}

      {/* Pricing */}
      <section id="pricing" aria-labelledby="pricing-title" className="border-y border-navy/10 bg-mist py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <div className="reveal mx-auto max-w-3xl text-center">
            <Eyebrow centered>Pricing</Eyebrow>
            <h2 id="pricing-title" className="mt-5 font-serif text-[clamp(2.1rem,1.5rem+1.9vw,3.25rem)] leading-[1.08] text-navy">
              Pricing Tailored to Your Needs
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink/75">
              Every client’s situation is different, so pricing is based on the services you need. Contact the office for pricing on
              any of the following.
            </p>
          </div>

          <ul className="mt-14 grid gap-px border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-3">
            {pricing.map(({ title, text, icon: Icon }, i) => (
              <li key={title} style={{ '--i': i % 3 }} className="reveal group flex flex-col bg-white p-7 sm:p-9">
                <span className="grid size-12 place-items-center border border-line text-blue transition-colors duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                  <Icon aria-hidden className="size-[1.375rem]" strokeWidth={1.4} />
                </span>
                <h3 className="mt-7 font-serif text-[1.75rem] leading-tight text-navy">{title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{text}</p>
                <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-6">
                  <div>
                    <p className="text-xs font-bold tracking-[0.18em] text-blue uppercase">Price</p>
                    <p className="mt-1 font-serif text-xl text-navy">Contact for Pricing</p>
                  </div>
                  <ButtonLink href="/contact" variant="text">
                    Request Pricing
                  </ButtonLink>
                </div>
              </li>
            ))}
            <li style={{ '--i': 2 }} className="surface-dark reveal flex flex-col justify-between gap-8 bg-navy p-7 text-white sm:p-9">
              <div>
                <p className="font-serif text-[1.75rem] leading-tight">Need more than one service?</p>
                <p className="mt-3 leading-relaxed text-white/75">Tell us what you need and we will provide pricing for your situation.</p>
              </div>
              <div className="flex flex-col items-start gap-4">
                <ButtonLink href="/contact" variant="light">
                  Request a Quote
                </ButtonLink>
                <a href={site.office.href} className="inline-flex items-center gap-2.5 text-white/80 transition-colors hover:text-white">
                  <Phone aria-hidden className="size-4" strokeWidth={1.75} />
                  or call {site.office.display}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <h2 id="faq-title" className="mt-5 font-serif text-[clamp(2rem,1.5rem+1.5vw,2.75rem)] leading-[1.1] text-navy">
              Frequently Asked Questions
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Have a question that is not answered here?{' '}
              <Link href="/contact" className="font-semibold text-navy underline underline-offset-4">
                Contact the office
              </Link>
              .
            </p>
          </div>
          <div className="reveal border-t border-line lg:col-span-8" style={{ '--i': 1 }}>
            {faqs.map(({ q, a }) => (
              <details key={q} name="faq" className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-[1.0625rem] font-semibold text-ink transition-colors hover:text-navy [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-navy transition-[rotate,background-color] duration-300 group-open:rotate-45 group-open:bg-mist">
                    <Plus aria-hidden className="size-4" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 leading-relaxed text-muted">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
