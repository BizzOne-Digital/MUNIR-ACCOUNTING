import Image from 'next/image'
import { Check, Quote } from 'lucide-react'
import officeImage from '@/public/images/bright-office.jpg'
import notebookImage from '@/public/images/notebook.jpg'
import signingImage from '@/public/images/signing.jpg'
import { PageHero } from '@/components/sections/PageHero'
import { AudienceSection } from '@/components/sections/AudienceSection'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow, SectionHeading } from '@/components/ui/SectionHeading'
import { pageMetadata, site } from '@/lib/site'

export const metadata = pageMetadata(
  'About Us',
  'Learn about Munir Nadeem, Chartered Professional Accountant, and our approach to reliable, accurate and personalized accounting and tax services.',
  '/about',
)

const principles = [
  { title: 'Accuracy', text: 'Careful, thorough work, so the figures you rely on are correct and complete.' },
  { title: 'Integrity', text: 'Honest, professional advice and the discretion your financial affairs deserve.' },
  { title: 'Clarity', text: 'Plain-language explanations, so you understand your obligations and your options.' },
  { title: 'Practicality', text: 'Guidance tailored to your circumstances that you can put into action.' },
]

const personalService = [
  'Attention to the details of your personal or business situation',
  'Clear explanations of your obligations and options',
  'Direct communication by phone or email',
  'Support for individuals and businesses alike',
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About Us"
        eyebrow="About Us"
        title="About Munir Nadeem"
        intro="A Chartered Professional Accountant providing reliable, accurate and personalized accounting and tax services to individuals and businesses."
        image={officeImage}
        imageAlt="A bright, modern office workspace with a laptop beside floor-to-ceiling windows"
      />

      {/* Introduction */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <Eyebrow>Introduction</Eyebrow>
            <p className="mt-6 font-serif text-[clamp(1.85rem,1.4rem+1.4vw,2.6rem)] leading-[1.2] text-forest">
              Your financial matters deserve accuracy, professionalism and personal attention.
            </p>
          </div>
          <div className="reveal space-y-5 text-[1.0625rem] leading-relaxed text-ink/80 lg:col-span-7 lg:pt-12" style={{ '--i': 1 }}>
            <p>
              {site.name} is a {site.designation} providing accounting and tax services to individuals and businesses. The practice
              supports clients with bookkeeping and payroll; personal, corporate and trust tax returns; compilation and review
              engagements; HST, GST, QST, WSIB and payroll audits; tax and immigration consultation; financing guidance; and new
              business registration.
            </p>
            <p>
              Every client relationship begins with understanding your situation. From there, the focus is on accurate work, clear
              explanations and practical guidance you can act on with confidence.
            </p>
            <ButtonLink href="/services" variant="text" className="mt-3">
              View All Services
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section aria-labelledby="mission-title" className="relative overflow-hidden border-y border-forest/10 bg-sage py-20 sm:py-24 lg:py-28">
        <div className="shell reveal mx-auto max-w-5xl text-center">
          <Quote aria-hidden className="mx-auto size-10 text-emerald/40" strokeWidth={1} />
          <Eyebrow as="h2" id="mission-title" centered className="mt-6">
            Our Mission
          </Eyebrow>
          <blockquote className="mt-8 font-serif text-[clamp(1.5rem,1.1rem+1.3vw,2.35rem)] leading-[1.35] text-forest">
            <p>{site.mission}</p>
          </blockquote>
        </div>
      </section>

      {/* Philosophy & approach */}
      <section className="bg-paper py-20 sm:py-24 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Our Approach"
              title="An Accounting Philosophy Built on Trust"
              intro="Good accounting is more than numbers. It is about giving you information you can rely on and advice you can use."
            />
            <div className="reveal relative mt-10 aspect-[3/2] overflow-hidden">
              <Image
                src={notebookImage}
                alt="An open notebook with a fountain pen and reading glasses on a desk"
                placeholder="blur"
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="size-full object-cover"
              />
            </div>
          </div>
          <ol className="grid gap-px self-start border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {principles.map(({ title, text }, i) => (
              <li key={title} style={{ '--i': i % 2 }} className="reveal bg-white p-8 sm:p-10">
                <span aria-hidden className="font-serif text-4xl text-emerald/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-serif text-[1.75rem] text-forest">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Personalized client service */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="reveal group relative isolate mr-4 mb-4 lg:col-span-6 lg:mr-0">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={signingImage}
                alt="A client reviewing and signing a document with a pen"
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="size-full object-cover transition-[scale] duration-700 ease-(--ease-soft) group-hover:scale-[1.03]"
              />
            </div>
            <span aria-hidden className="absolute -right-4 -bottom-4 -z-10 size-2/3 bg-sage" />
          </div>
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Personalized Service"
              title="Service That Starts With Understanding You"
              intro="No two clients have the same circumstances. Whether you are managing your personal taxes or the finances of a growing company, you receive service shaped around your needs."
            />
            <ul className="reveal mt-8 grid gap-4" style={{ '--i': 1 }}>
              {personalService.map((item) => (
                <li key={item} className="flex gap-3.5 leading-relaxed text-ink/85">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-sage text-forest">
                    <Check aria-hidden className="size-3.5" strokeWidth={2.25} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/contact" className="mt-10">
              Request a Consultation
            </ButtonLink>
          </div>
        </div>
      </section>

      <AudienceSection title="Accounting Support for Individuals and Businesses" />
      <ContactCTA />
    </>
  )
}
