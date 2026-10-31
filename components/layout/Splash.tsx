'use client'

import { useEffect, useRef, useState } from 'react'
import { preload } from 'react-dom'
import { site } from '@/lib/site'
import './splash.css'

// The logo split into stackable parts (same canvas size) so it can assemble piece by piece.
const DIR = '/images/logo/splash'
const LAYERS = ['mark', 'swoosh', 'munir', 'line', 'band', 'leaf']
const MASK = `${DIR}/mask.avif`
const TAGLINE = ['Clear', 'Financial', 'Guidance.', 'Confident', 'Decisions.']
// The fly starts at 2.35s; past this point switching from the fade fallback would jump.
const FLY_DEADLINE_MS = 2000

// All motion is CSS (splash.css) so it starts on first paint; this handles the fly target, skipping and clean-up.
export function Splash() {
  const [phase, setPhase] = useState<'intro' | 'skipping' | 'exiting' | 'gone'>('intro')
  const rootRef = useRef<HTMLDivElement>(null)
  const flyRef = useRef<HTMLDivElement>(null)
  LAYERS.forEach((name) => preload(`${DIR}/${name}.avif`, { as: 'image', fetchPriority: 'high' }))

  // Measure where the header logo sits so the splash logo can land exactly on it.
  useEffect(() => {
    const root = rootRef.current
    const fly = flyRef.current
    const target = document.querySelector('header img')
    if (!root || !fly || !target || document.documentElement.dataset.splash !== 'active' || performance.now() > FLY_DEADLINE_MS) return
    const measure = () => {
      const from = fly.getBoundingClientRect()
      const to = target.getBoundingClientRect()
      root.style.setProperty('--fly-x', `${to.left + to.width / 2 - (from.left + from.width / 2)}px`)
      root.style.setProperty('--fly-y', `${to.top + to.height / 2 - (from.top + from.height / 2)}px`)
      root.style.setProperty('--fly-s', String(to.width / from.width))
      root.dataset.fly = ''
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    if (phase !== 'intro' || document.documentElement.dataset.splash !== 'active') return
    const skip = () => setPhase('skipping')
    const events = ['keydown', 'wheel', 'touchstart'] as const
    events.forEach((type) => window.addEventListener(type, skip, { passive: true }))
    return () => events.forEach((type) => window.removeEventListener(type, skip))
  }, [phase])

  if (phase === 'gone') return null

  const panel = (e: React.AnimationEvent) => (e.animationName === 'splash-lift' ? (e.target as HTMLElement).dataset.panel : undefined)

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={`splash ${phase === 'skipping' ? 'is-skipping' : ''}`}
      onClick={() => phase === 'intro' && setPhase('skipping')}
      // Once the curtain starts lifting, skipping would only restart it.
      onAnimationStart={(e) => panel(e) === 'paper' && setPhase((p) => (p === 'intro' ? 'exiting' : p))}
      onAnimationEnd={(e) => {
        if (panel(e) === 'paper') document.documentElement.dataset.splash = 'done'
        const flying = rootRef.current?.hasAttribute('data-fly')
        if (e.animationName === 'splash-handoff' || (panel(e) === 'trail' && !flying)) setPhase('gone')
      }}
    >
      <div className="splash-trail" data-panel="trail" />
      <div className="splash-panel" data-panel="paper">
        <div className="splash-grid" />
        <div className="splash-halo" />

        <div className="splash-chrome">
          <div className="splash-row splash-hide-sm">
            <span>{site.designation}</span>
            <span>Individuals &amp; Businesses</span>
          </div>
          <div className="splash-row">
            <span className="splash-count">
              <small>%</small>
            </span>
            <span className="splash-bar" />
            <span className="splash-hide-sm">Accounting &amp; Tax Services</span>
          </div>
        </div>

        <div className="splash-caption">
          <span className="splash-divider" />
          <p className="splash-tagline">
            {TAGLINE.map((word, i) => (
              <span key={word} className="splash-word">
                <span style={{ '--i': i }}>{word}</span>
              </span>
            ))}
          </p>
        </div>
      </div>

      <div ref={flyRef} className="splash-fly">
        {LAYERS.map((name) => (
          // eslint-disable-next-line @next/next/no-img-element -- exact-URL layers, stacked pixel-for-pixel
          <img key={name} src={`${DIR}/${name}.avif`} alt="" width={900} height={502} className={`l-${name}`} />
        ))}
        <span className="splash-glint" />
        <span className="splash-sheen" style={{ maskImage: `url(${MASK})`, WebkitMaskImage: `url(${MASK})` }} />
      </div>
    </div>
  )
}
