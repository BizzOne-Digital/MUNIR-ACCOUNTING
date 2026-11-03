import Image from 'next/image'
import type { TeamMember } from '@/lib/team'

export function TeamCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`Portrait of ${member.name}`}
            placeholder="blur"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
            className="size-full object-cover transition-[scale] duration-700 ease-(--ease-soft) group-hover:scale-[1.03]"
          />
        ) : (
          <span aria-hidden className="grid size-full place-items-center font-serif text-7xl text-navy/25">
            {initials}
          </span>
        )}
      </div>
      <h3 className="mt-5 font-serif text-2xl text-navy">{member.name}</h3>
      <p className="mt-1 text-xs font-bold tracking-[0.18em] text-blue uppercase">{member.role}</p>
      {member.bio && <p className="mt-3 leading-relaxed text-muted">{member.bio}</p>}
    </article>
  )
}
