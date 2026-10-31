import type { Metadata } from 'next'
import { DM_Serif_Display, Manrope } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Splash } from '@/components/layout/Splash'
import { site } from '@/lib/site'
import './globals.css'

const serif = DM_Serif_Display({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'], variable: '--font-dm-serif' })
const sans = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.designation}`, template: `%s | ${site.name}, CPA` },
  description: site.description,
}

// Just after the splash's paper curtain ends (see components/layout/splash.css): releases the page even if React never hydrates.
const SPLASH_FAILSAFE_MS = 3400

// Runs before first paint: show the intro once per browser session, never with reduced motion or without JS.
const splashGate = `(function(){try{var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('mn-splash'))return;sessionStorage.setItem('mn-splash','1');d.dataset.splash='active';setTimeout(function(){if(d.dataset.splash==='active')d.dataset.splash='done'},${SPLASH_FAILSAFE_MS})}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" data-scroll-behavior="smooth" suppressHydrationWarning className={`${serif.variable} ${sans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashGate }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <Splash />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
