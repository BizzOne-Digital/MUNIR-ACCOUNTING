import type { Metadata } from 'next'
import { Mail, Phone, Smartphone } from 'lucide-react'

// Central business details. The name is provisional — change it here if the client confirms a registered business name.
export const site = {
  name: 'Munir Nadeem',
  designation: 'Chartered Professional Accountant',
  // Wording on the client-supplied logo (public/images/logo/).
  businessName: 'Munir Accounting and Tax Professional Corporation',
  monogram: 'M',
  description: 'Reliable and personalized accounting and tax services for individuals and businesses.',
  // Client-provided wording — keep verbatim.
  mission:
    "Our mission is to provide reliable, accurate, and personalized accounting and tax services that help individuals and businesses make informed financial decisions. We are committed to building lasting relationships through integrity, professionalism, and practical financial guidance tailored to each client's needs.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
  email: 'munirnadeem@live.com',
  office: { label: 'Office', display: '289-224-2152', href: 'tel:+12892242152' },
  cell: { label: 'Cell', display: '416-893-4360', href: 'tel:+14168934360' },
}

// Page metadata with canonical URL and Open Graph. Page-level openGraph replaces the layout's, so shared fields live here.
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: path === '/' ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', locale: 'en_CA', siteName: `${site.name}, ${site.designation}`, title, description, url: path },
  }
}

export const contacts = [
  { ...site.office, icon: Phone },
  { ...site.cell, icon: Smartphone },
  { label: 'Email', display: site.email, href: `mailto:${site.email}`, icon: Mail },
]

export const navigation = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/team', label: 'Our Team' },
  { href: '/contact', label: 'Contact' },
]
