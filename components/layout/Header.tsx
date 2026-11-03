import { contacts } from '@/lib/site'
import { Logo } from './Logo'
import { Navigation } from './Navigation'

export function Header() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-navy px-4 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <div className="surface-dark bg-navy text-white/85">
        <ul className="shell flex h-10 items-center justify-center gap-5 text-[0.8125rem] sm:gap-0 sm:divide-x sm:divide-white/20">
          {contacts.map(({ label, display, href, icon: Icon }, i) => (
            <li key={href} className={`sm:px-6 ${i === 2 ? 'hidden md:block' : ''}`}>
              <a href={href} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                <Icon aria-hidden className="size-3.5 text-white/70" strokeWidth={1.75} />
                <span className="max-[400px]:sr-only">{label}:</span> {display}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <header className="elevate sticky top-0 z-50 border-b border-line bg-white">
        <div className="shell flex h-[4.5rem] items-center justify-between gap-3 sm:gap-6 lg:h-[5.5rem]">
          <Logo />
          <Navigation />
        </div>
      </header>
    </>
  )
}
