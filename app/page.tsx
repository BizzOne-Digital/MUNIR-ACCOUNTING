import { Hero } from '@/components/home/Hero'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { AboutPreview } from '@/components/home/AboutPreview'
import { TeamPreview } from '@/components/home/TeamPreview'
import { AudienceSection } from '@/components/sections/AudienceSection'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { pageMetadata, site } from '@/lib/site'
import { services } from '@/lib/services'

const description =
  'Professional accounting and tax services for individuals and businesses. Contact Munir Nadeem to discuss bookkeeping, tax filings, audits and accounting consultation.'

export const metadata = pageMetadata(`${site.name} | ${site.designation}`, description, '/')

// Only client-supplied facts: no address or service area has been provided.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  name: site.name,
  description,
  url: site.url,
  email: site.email,
  telephone: '+1-289-224-2152',
  knowsAbout: services.map((s) => s.title),
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <Hero />
      <AudienceSection />
      <ServicesPreview />
      <section className="border-t border-line bg-white py-20 sm:py-24 lg:py-28">
        <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-0">
          <div className="lg:col-span-7 lg:pr-14">
            <AboutPreview />
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-14">
            <TeamPreview />
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  )
}
