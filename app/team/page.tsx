import reviewImage from '@/public/images/document-review.jpg'
import { PageHero } from '@/components/sections/PageHero'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { TeamCard } from '@/components/sections/TeamCard'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow, SectionHeading } from '@/components/ui/SectionHeading'
import { commitments, team } from '@/lib/team'
import { pageMetadata, site } from '@/lib/site'

export const metadata = pageMetadata(
  'Our Team',
  'Professional accounting services built around reliable support and personalized guidance for individuals and businesses.',
  '/team',
)

export default function TeamPage() {
  return (
    <>
      <PageHero
        crumb="Our Team"
        eyebrow="Our Team"
        title="People You Can Work With"
        intro="Professional accounting services built around reliable support and personalized guidance."
        image={reviewImage}
        imageAlt="An accountant and a client reviewing documents together at a table"
      />

      {/* Introduction */}
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading className="lg:col-span-5" eyebrow="Introduction" title="A Practice Built on Personal Service" />
          <div className="reveal space-y-5 text-[1.0625rem] leading-relaxed text-ink/80 lg:col-span-7 lg:pt-12" style={{ '--i': 1 }}>
            <p>
              When you work with {site.name}, {site.designation}, you work with a practice that values reliable support and
              personalized guidance. Every client is different, so every engagement starts with understanding your situation and what
              you need.
            </p>
            <p>
              Whether you are an individual managing your personal taxes or a business owner with ongoing accounting obligations, you
              can expect careful work, clear communication and practical advice.
            </p>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="border-y border-line bg-paper py-20 sm:py-24 lg:py-28">
        <div className="shell">
          <SectionHeading centered eyebrow="Our Commitment" title="What You Can Expect" />
          <ul className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
            {commitments.map(({ title, text }, i) => (
              <li key={title} style={{ '--i': i }} className="reveal bg-white p-8 sm:p-10">
                <span aria-hidden className="font-serif text-4xl text-blue/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-serif text-[1.75rem] text-navy">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <ButtonLink href="/contact">Request a Consultation</ButtonLink>
          </div>
        </div>
      </section>

      {/* Renders automatically once real profiles are added to lib/team.ts. */}
      {team.length > 0 && (
        <section aria-labelledby="team-title" className="bg-white py-20 sm:py-24 lg:py-28">
          <div className="shell">
            <Eyebrow as="h2" id="team-title">
              Meet the Team
            </Eyebrow>
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTA />
    </>
  )
}
