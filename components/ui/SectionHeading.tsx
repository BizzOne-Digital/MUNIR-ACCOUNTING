type EyebrowProps = { children: React.ReactNode; centered?: boolean; light?: boolean; className?: string; as?: 'p' | 'h2'; id?: string }

export function Eyebrow({ children, centered, light, className = '', as: Tag = 'p', id }: EyebrowProps) {
  const rule = `h-px w-10 shrink-0 sm:w-14 ${light ? 'bg-white/30' : 'bg-emerald/35'}`
  return (
    <Tag
      id={id}
      className={`flex items-center gap-4 text-xs font-bold tracking-[0.22em] uppercase ${light ? 'text-white/80' : 'text-emerald'} ${centered ? 'justify-center' : ''} ${className}`}
    >
      {centered && <span aria-hidden className={rule} />}
      {children}
      <span aria-hidden className={rule} />
    </Tag>
  )
}

type Props = {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
  centered?: boolean
  className?: string
}

export function SectionHeading({ eyebrow, title, intro, centered, className = '' }: Props) {
  return (
    <div className={`reveal ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      <Eyebrow centered={centered}>{eyebrow}</Eyebrow>
      <h2 className="mt-5 font-serif text-[clamp(2.1rem,1.5rem+1.9vw,3.25rem)] leading-[1.08] text-forest">{title}</h2>
      {intro && <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">{intro}</p>}
    </div>
  )
}
