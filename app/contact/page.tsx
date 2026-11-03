import Link from 'next/link'
import { PageHero } from '@/components/sections/PageHero'
import { ContactForm } from '@/components/sections/ContactForm'
import { pricingList } from '@/lib/services'
import { contacts, pageMetadata } from '@/lib/site'

export const metadata = pageMetadata(
  'Contact',
  'Contact Munir Nadeem, Chartered Professional Accountant. Call 289-224-2152 or 416-893-4360, email munirnadeem@live.com, or send an enquiry online.',
  '/contact',
)

const steps = [
  { title: 'Get in touch', text: 'Call, email or send an enquiry using the form.' },
  { title: 'Discuss your needs', text: 'We talk through your situation and what you need help with.' },
  { title: 'Clear next steps', text: 'You receive the information you need to move forward, including pricing.' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Contact"
        title="Let’s Discuss Your Accounting Needs"
        intro="Whether you are an individual or a business owner, get in touch to discuss your accounting and tax requirements."
      />

      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="shell grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8">
          <aside aria-labelledby="contact-direct" className="surface-dark rise bg-navy p-6 text-white sm:p-10 lg:col-span-4 lg:row-start-1">
            <h2 id="contact-direct" className="font-serif text-[1.75rem] leading-tight">
              Speak With the Office
            </h2>
            <p className="mt-3 text-white/70">Prefer to talk? Call or email directly.</p>
            <ul className="mt-8 grid gap-2">
              {contacts.map(({ label, display, href, icon: Icon }) => (
                <li key={href}>
                  <a href={href} className="group -mx-3 flex items-center gap-4 rounded-sm p-3 transition-colors hover:bg-white/[0.06]">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 transition-colors group-hover:border-white/60">
                      <Icon aria-hidden className="size-[1.125rem]" strokeWidth={1.6} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs tracking-[0.16em] text-white/60 uppercase">{label}</span>
                      <span className="block text-base font-semibold [overflow-wrap:anywhere] min-[400px]:text-lg">{display}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="rise border border-line bg-white p-6 shadow-soft sm:p-10 lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1 lg:p-12" style={{ '--d': 1 }}>
            <h2 className="font-serif text-[clamp(1.85rem,1.5rem+1vw,2.5rem)] leading-tight text-navy">Send an Enquiry</h2>
            <p className="mt-3 mb-8 leading-relaxed text-muted">Tell us a little about what you need and we will be in touch.</p>
            <ContactForm />
          </div>

          <div className="rise border border-line bg-white p-8 sm:p-10 lg:col-span-4 lg:row-start-2 lg:self-start" style={{ '--d': 2 }}>
            <h2 className="text-xs font-bold tracking-[0.22em] text-blue uppercase">What Happens Next</h2>
            <ol className="mt-6 grid gap-6">
              {steps.map(({ title, text }, i) => (
                <li key={title} className="flex gap-4">
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-mist font-serif text-navy">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 border-t border-line pt-6">
              <p className="text-xs font-bold tracking-[0.18em] text-blue uppercase">Pricing</p>
              <p className="mt-2 font-semibold text-navy">Contact for Pricing</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                Available for {pricingList}.{' '}
                <Link href="/services#pricing" className="font-semibold text-navy underline underline-offset-4">
                  View pricing
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
