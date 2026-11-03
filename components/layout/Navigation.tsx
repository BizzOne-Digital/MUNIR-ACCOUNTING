'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { contacts, navigation, site } from '@/lib/site'
import { ButtonLink } from '@/components/ui/Button'

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
        <ul className="flex items-center gap-8">
          {navigation.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? 'page' : undefined}
                className="relative py-2 text-[0.9375rem] font-medium whitespace-nowrap text-ink/75 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-navy after:transition-transform after:duration-300 hover:text-navy hover:after:scale-x-100 aria-[current=page]:text-navy aria-[current=page]:after:scale-x-100"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden xl:block">
          <ButtonLink href="/contact">Request a Consultation</ButtonLink>
        </div>
      </nav>

      <div className="-mr-2.5 flex shrink-0 items-center lg:hidden">
        <a href={site.office.href} aria-label={`Call the office at ${site.office.display}`} className="hidden size-11 place-items-center text-navy min-[375px]:grid">
          <Phone aria-hidden className="size-5" strokeWidth={1.75} />
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
          className="grid size-11 place-items-center text-navy"
        >
          {open ? <X aria-hidden className="size-6" strokeWidth={1.5} /> : <Menu aria-hidden className="size-6" strokeWidth={1.5} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-line bg-white shadow-soft lg:hidden"
      >
        {/* Any link tap (page, phone or email) closes the menu. */}
        <nav aria-label="Mobile" className="shell py-4" onClick={(e) => (e.target as HTMLElement).closest('a') && setOpen(false)}>
          <ul className="divide-y divide-line">
            {navigation.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  className="flex items-center justify-between py-4 font-serif text-[1.375rem] text-ink transition-colors hover:text-navy aria-[current=page]:text-navy"
                >
                  {label}
                  {isActive(href) && <span aria-hidden className="size-1.5 rounded-full bg-blue" />}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 pb-2">
            <ButtonLink href="/contact" className="w-full">
              Request a Consultation
            </ButtonLink>
          </div>
          <ul className="mt-5 grid gap-3 border-t border-line pt-5 pb-3 text-[0.9375rem] text-ink/80">
            {contacts.map(({ label, display, href, icon: Icon }) => (
              <li key={href}>
                <a href={href} className="inline-flex min-h-11 items-center gap-3 hover:text-navy">
                  <Icon aria-hidden className="size-4 text-blue" strokeWidth={1.75} />
                  <span className="text-muted">{label}</span> {display}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
