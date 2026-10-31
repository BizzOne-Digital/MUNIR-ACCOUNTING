import { parseEnquiry } from '@/lib/validation'
import { site } from '@/lib/site'

const MAX_BODY_CHARS = 20_000

// ponytail: no rate limiting; honeypot + fill-time trap cover casual bots. Add Vercel Firewall / Upstash rate limits if abuse appears.
export async function POST(request: Request) {
  const raw = await request.text()
  if (raw.length > MAX_BODY_CHARS) return Response.json({ error: 'too_large' }, { status: 413 })

  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return Response.json({ error: 'invalid' }, { status: 400 })
  }

  const result = parseEnquiry(body)
  if ('spam' in result) return Response.json({ ok: true }) // look successful so bots move on
  if ('errors' in result) return Response.json({ errors: result.errors }, { status: 400 })

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !from) {
    console.error('Contact form: RESEND_API_KEY or CONTACT_FROM_EMAIL is not configured')
    return Response.json({ error: 'not_configured' }, { status: 503 })
  }

  const e = result.enquiry
  const text = [
    'New enquiry from the website',
    '',
    `Name: ${e.name}`,
    `Email: ${e.email}`,
    `Phone: ${e.phone || 'Not provided'}`,
    `Client type: ${e.clientType || 'Not specified'}`,
    `Service: ${e.service || 'Not specified'}`,
    '',
    'Message:',
    e.message,
  ].join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [process.env.CONTACT_TO_EMAIL || site.email],
      reply_to: e.email,
      subject: `Website enquiry: ${e.service || 'General'} — ${e.name}`,
      text,
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null)

  if (!res?.ok) {
    // Status only — never log the visitor's details.
    console.error('Contact form: email provider error', res?.status ?? 'network/timeout')
    return Response.json({ error: 'send_failed' }, { status: 502 })
  }
  return Response.json({ ok: true })
}
