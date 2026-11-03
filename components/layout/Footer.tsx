import Link from 'next/link'
import { contacts, navigation, site } from '@/lib/site'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="surface-dark relative overflow-hidden bg-navy text-white">
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-5">
          <Logo light className="h-24 sm:h-28" />
          <p className="mt-7 max-w-sm leading-relaxed text-white/70">{site.description}</p>
        </div>

        <nav aria-labelledby="footer-nav" className="lg:col-span-3">
          <h2 id="footer-nav" className="text-xs font-bold tracking-[0.22em] text-white/55 uppercase">
            Navigate
          </h2>
          <ul className="mt-6 grid gap-3.5">
            {navigation.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-white/85 transition-colors hover:text-white hover:underline hover:underline-offset-4">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="text-xs font-bold tracking-[0.22em] text-white/55 uppercase">Contact</h2>
          <ul className="mt-6 grid gap-4">
            {contacts.map(({ label, display, href, icon: Icon }) => (
              <li key={href}>
                <a href={href} className="group inline-flex items-center gap-3.5 text-white/85 transition-colors hover:text-white">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/20 transition-colors group-hover:border-white/60">
                    <Icon aria-hidden className="size-4" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block text-xs tracking-[0.12em] text-white/55 uppercase">{label}</span>
                    <span className="break-all">{display}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.designation}</p>
        </div>
      </div>
    </footer>
  )
}
