import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/SectionHeading'

export default function NotFound() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow centered>Page Not Found</Eyebrow>
          <h1 className="mt-6 font-serif text-[clamp(2.5rem,1.6rem+3vw,4rem)] leading-tight text-forest">This page could not be found</h1>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-muted">
            The page may have moved or no longer exists. You can return home or contact the office directly.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/">Back to Home</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact the Office
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
