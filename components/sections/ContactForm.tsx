'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react'
import { CLIENT_TYPES, ENQUIRY_SERVICES, LIMITS, checkEnquiry, toEnquiry, type Enquiry, type EnquiryErrors } from '@/lib/validation'
import { site } from '@/lib/site'

type Status = 'idle' | 'sending' | 'sent' | 'unavailable' | 'failed'

const control =
  'w-full min-h-12 rounded-sm border border-muted/80 bg-white px-4 text-base text-ink transition-colors placeholder:text-muted/80 hover:border-navy/60 focus:border-navy focus:ring-3 focus:ring-navy/10 focus:outline-none aria-[invalid=true]:border-danger'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const startedAt = useRef(0)
  const formRef = useRef<HTMLFormElement>(null)

  // Spam timing starts when the form appears; no real visitor can fill it in and send within two seconds.
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const read = () => Object.fromEntries(new FormData(formRef.current!)) as Record<string, string>
  const fieldName = (e: React.SyntheticEvent) => (e.target as HTMLInputElement).name

  // Validate a field once the visitor leaves it; clear its error as soon as they start correcting it.
  const onBlur = (e: React.FocusEvent) => {
    const name = fieldName(e)
    if (!name || name === 'website') return
    setErrors((prev) => ({ ...prev, [name]: checkEnquiry(toEnquiry(read()))[name as keyof Enquiry] }))
  }
  const onInput = (e: React.FormEvent) => {
    const name = fieldName(e) as keyof Enquiry
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const form = e.currentTarget
    const data = read()

    const found = checkEnquiry(toEnquiry(data))
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, elapsed: Date.now() - startedAt.current }),
      })
      const body = await res.json().catch(() => ({}))
      if (res.ok && body.ok) return setStatus('sent')
      if (res.status === 400 && body.errors) {
        setErrors(body.errors)
        return setStatus('idle')
      }
      setStatus(res.status === 503 ? 'unavailable' : 'failed')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="flex flex-col items-start py-6">
        <span className="grid size-14 place-items-center rounded-full bg-mist text-navy">
          <CircleCheck aria-hidden className="size-7" strokeWidth={1.5} />
        </span>
        <h2 ref={(el) => el?.focus()} tabIndex={-1} className="mt-6 font-serif text-3xl text-navy focus:outline-none">
          Thank you — your enquiry has been sent.
        </h2>
        <p className="mt-4 max-w-lg leading-relaxed text-muted">
          We will be in touch using the details you provided. If your matter is time-sensitive, please call the office at{' '}
          <a href={site.office.href} className="font-semibold text-navy underline underline-offset-4">
            {site.office.display}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            startedAt.current = Date.now()
            setStatus('idle')
          }}
          className="mt-8 font-semibold text-navy underline decoration-navy/30 underline-offset-[7px] hover:decoration-navy"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  const err = (name: keyof Enquiry) =>
    errors[name] && (
      <p id={`${name}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
        <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
        {errors[name]}
      </p>
    )
  const a11y = (name: keyof Enquiry) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })
  const label = 'mb-2 block text-sm font-semibold text-ink'
  const req = (
    <span aria-hidden className="text-blue">
      {' '}
      *
    </span>
  )

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      onBlur={onBlur}
      onInput={onInput}
      className="relative grid gap-6 sm:grid-cols-2"
    >
      <p className="text-sm text-muted sm:col-span-2">
        Fields marked <span className="text-blue">*</span> are required.
      </p>

      <div>
        <label htmlFor="name" className={label}>
          Full Name{req}
        </label>
        <input id="name" name="name" type="text" required autoComplete="name" maxLength={LIMITS.name} className={control} {...a11y('name')} />
        {err('name')}
      </div>

      <div>
        <label htmlFor="email" className={label}>
          Email Address{req}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          autoCapitalize="off"
          spellCheck={false}
          maxLength={LIMITS.email}
          className={control}
          {...a11y('email')}
        />
        {err('email')}
      </div>

      <div>
        <label htmlFor="phone" className={label}>
          Phone Number <span className="font-normal text-muted">(optional)</span>
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={LIMITS.phone} className={control} {...a11y('phone')} />
        {err('phone')}
      </div>

      <fieldset>
        <legend className={label}>Client Type</legend>
        <div className="flex gap-3">
          {CLIENT_TYPES.map((type) => (
            <label
              key={type}
              className="flex min-h-12 flex-1 cursor-pointer items-center gap-3 rounded-sm border border-muted/80 px-4 text-ink transition-colors hover:border-navy/60 has-checked:border-navy has-checked:bg-mist/60"
            >
              <input type="radio" name="clientType" value={type} className="size-4 accent-navy" />
              {type}
            </label>
          ))}
        </div>
        {err('clientType')}
      </fieldset>

      <div className="sm:col-span-2">
        <label htmlFor="service" className={label}>
          Service Required
        </label>
        <div className="relative">
          <select id="service" name="service" defaultValue="" className={`${control} appearance-none pr-11`} {...a11y('service')}>
            <option value="">Select a service</option>
            {ENQUIRY_SERVICES.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
          <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted" />
        </div>
        {err('service')}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>
          Message{req}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={LIMITS.message}
          aria-describedby={errors.message ? 'message-error message-hint' : 'message-hint'}
          aria-invalid={errors.message ? true : undefined}
          className={`${control} py-3 leading-relaxed`}
        />
        {err('message')}
        <p id="message-hint" className="mt-2 text-sm text-muted">
          Please do not include sensitive details such as your SIN or banking information.
        </p>
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {(status === 'unavailable' || status === 'failed') && (
        <div role="alert" className="flex gap-3 rounded-sm border border-danger/30 bg-danger/5 p-4 text-sm leading-relaxed text-ink sm:col-span-2">
          <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-danger" />
          <p>
            {status === 'unavailable'
              ? 'Our online form is not available at the moment, so your enquiry has not been sent. Please contact'
              : 'Sorry, we could not send your enquiry. Please try again, or contact'}{' '}
            the office directly at{' '}
            <a href={site.office.href} className="font-semibold text-navy underline underline-offset-2">
              {site.office.display}
            </a>
            , cell{' '}
            <a href={site.cell.href} className="font-semibold text-navy underline underline-offset-2">
              {site.cell.display}
            </a>{' '}
            or{' '}
            <a href={`mailto:${site.email}`} className="font-semibold text-navy underline underline-offset-2">
              {site.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-sm bg-navy px-8 font-semibold text-white transition-colors hover:bg-blue disabled:cursor-wait disabled:opacity-80 sm:w-auto"
        >
          {status === 'sending' ? (
            <>
              <LoaderCircle aria-hidden className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Enquiry
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
