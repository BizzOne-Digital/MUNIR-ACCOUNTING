import { commitments, team } from '@/lib/team'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/SectionHeading'
import { TeamCard } from '@/components/sections/TeamCard'

export function TeamPreview() {
  return (
    <div className="reveal" style={{ '--i': 2 }}>
      <Eyebrow>Our Team</Eyebrow>
      <h2 className="mt-5 font-serif text-[clamp(2rem,1.5rem+1.5vw,2.75rem)] leading-[1.1] text-navy">People You Can Work With</h2>
      <p className="mt-5 leading-relaxed text-muted">
        Professional accounting services built around reliable support and personalized guidance.
      </p>

      {/* Until real team profiles are supplied, show how clients are looked after rather than placeholder people. */}
      {team.length ? (
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
          {team.slice(0, 3).map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      ) : (
        <ul className="mt-8 border-b border-line">
          {commitments.map(({ title, text }, i) => (
            <li key={title} className="flex gap-5 border-t border-line py-5">
              <span aria-hidden className="font-serif text-lg leading-7 text-blue">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-bold text-ink">{title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ButtonLink href="/team" variant="outline" className="mt-8">
        Meet Our Team
      </ButtonLink>
    </div>
  )
}
