import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const variants = {
  primary: 'bg-gold text-navy hover:bg-navy hover:text-white',
  light: 'bg-white text-navy hover:bg-mist',
  outline: 'border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white',
}

type Props = {
  href: string
  children: React.ReactNode
  variant?: keyof typeof variants | 'text'
  className?: string
}

export function ButtonLink({ href, children, variant = 'primary', className = '' }: Props) {
  const look =
    variant === 'text'
      ? 'gap-2 text-navy underline decoration-navy/30 decoration-1 underline-offset-[7px] hover:decoration-navy'
      : `min-h-12 justify-center gap-2.5 rounded-sm px-6 ${variants[variant]}`
  const classes = `group inline-flex items-center text-[0.9375rem] font-semibold tracking-[0.01em] transition-colors duration-300 ${look} ${className}`
  const content = (
    <>
      {children}
      <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform duration-300 ease-(--ease-soft) group-hover:translate-x-1" />
    </>
  )

  return href.startsWith('/') ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <a href={href} className={classes}>
      {content}
    </a>
  )
}
