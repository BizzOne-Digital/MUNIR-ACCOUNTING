import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/images/logo/logo.png'
import logoReversed from '@/public/images/logo/logo-reversed.png'
import { site } from '@/lib/site'

// `light` uses the reversed artwork (white lettering) for dark backgrounds.
export function Logo({ light = false, className = 'h-[3.75rem] lg:h-20' }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className="shrink-0">
      <Image
        src={light ? logoReversed : logo}
        alt={`${site.businessName} — Home`}
        loading={light ? 'lazy' : 'eager'}
        sizes="(min-width: 1024px) 180px, 130px"
        className={`w-auto ${className}`}
      />
    </Link>
  )
}
