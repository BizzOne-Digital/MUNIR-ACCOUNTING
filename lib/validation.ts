// Shared by the contact form (instant feedback) and /api/contact (the real gatekeeper).

export const CLIENT_TYPES = ['Individual', 'Business'] as const

export const ENQUIRY_SERVICES = [
  'Bookkeeping & Payroll',
  'Personal Tax Returns',
  'Corporate Tax Returns',
  'Trust Tax Returns',
  'Tax Planning',
  'Compilation Engagements',
  'Review Engagements',
  'HST / GST / QST Audits',
  'WSIB / Payroll Audits',
  'Tax & Immigration Consultation',
  'Financing',
  'New Business Registration',
  'Other',
] as const

export type Enquiry = {
  name: string
  email: string
  phone: string
  clientType: string
  service: string
  message: string
}

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>

export const LIMITS = { name: 100, email: 254, phone: 30, message: 3000 }

// Submissions faster than this were not typed by a person.
const MIN_FILL_MS = 2000

export function checkEnquiry(e: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {}
  if (e.name.length < 2) errors.name = 'Please enter your full name.'
  else if (e.name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`

  if (!e.email) errors.email = 'Please enter your email address.'
  else if (e.email.length > LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.email))
    errors.email = 'Please enter a valid email address, for example name@example.com.'

  if (e.phone && (e.phone.length > LIMITS.phone || !/^[+()\-.\s\d]+$/.test(e.phone) || e.phone.replace(/\D/g, '').length < 10))
    errors.phone = 'Please enter a valid phone number, including area code.'

  if (e.clientType && !CLIENT_TYPES.includes(e.clientType as (typeof CLIENT_TYPES)[number]))
    errors.clientType = 'Please choose Individual or Business.'
  if (e.service && !ENQUIRY_SERVICES.includes(e.service as (typeof ENQUIRY_SERVICES)[number]))
    errors.service = 'Please choose a service from the list.'

  if (!e.message) errors.message = 'Please tell us how we can help.'
  else if (e.message.length < 10) errors.message = 'Please add a little more detail (at least 10 characters).'
  else if (e.message.length > LIMITS.message) errors.message = `Please keep your message under ${LIMITS.message} characters.`
  return errors
}

export function toEnquiry(data: Record<string, unknown>): Enquiry {
  const s = (k: string) => (typeof data[k] === 'string' ? (data[k] as string).trim() : '')
  return {
    name: s('name').replace(/\s+/g, ' '),
    email: s('email').toLowerCase(),
    phone: s('phone'),
    clientType: s('clientType'),
    service: s('service'),
    message: s('message'),
  }
}

/** Server-side parse of a raw request body: the clean enquiry, field errors, or a silent spam verdict. */
export function parseEnquiry(input: unknown): { enquiry: Enquiry } | { errors: EnquiryErrors } | { spam: true } {
  const data = input && typeof input === 'object' ? (input as Record<string, unknown>) : {}
  // Honeypot field is invisible to people; `elapsed` is measured on the visitor's own clock.
  if (data.website) return { spam: true }
  if (typeof data.elapsed !== 'number' || data.elapsed < MIN_FILL_MS) return { spam: true }

  const enquiry = toEnquiry(data)
  const errors = checkEnquiry(enquiry)
  return Object.keys(errors).length ? { errors } : { enquiry }
}
