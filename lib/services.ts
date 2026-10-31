import { Calculator, ClipboardCheck, Compass, FileText, Globe, Landmark, MessageSquare, ShieldCheck, Sprout, type LucideIcon } from 'lucide-react'

export type Audience = 'individuals' | 'businesses'

export type Service = {
  id: string
  title: string
  summary: string
  description: string
  audience: string
  group: (typeof serviceGroups)[number]['id']
  for: Audience[]
  icon: LucideIcon
}

export const serviceGroups = [
  {
    id: 'business-accounting',
    eyebrow: 'Business Accounting',
    title: 'Records, Reporting & Audits',
    intro: 'Dependable support for the accounting obligations that keep a business organized and compliant.',
  },
  {
    id: 'tax',
    eyebrow: 'Tax Filing & Consultation',
    title: 'Tax Returns & Consultation',
    intro: 'Careful preparation of tax filings and clear consultation on your tax and immigration-related questions.',
  },
  {
    id: 'financing',
    eyebrow: 'Financing & Registration',
    title: 'Financing & New Business Registration',
    intro: 'Guidance for business owners exploring financing and entrepreneurs getting a new business started.',
  },
] as const

export const services: Service[] = [
  {
    id: 'bookkeeping-payroll',
    title: 'Bookkeeping & Payroll',
    summary: 'Bookkeeping, payroll and financial record management services.',
    description:
      'Accurate, well-organized records are the foundation of sound business decisions and timely filings. We provide bookkeeping, payroll and financial record management services to help keep your records current and your payroll obligations on track.',
    audience: 'Small and medium-sized businesses, corporations and business owners who need dependable record-keeping and payroll support.',
    group: 'business-accounting',
    for: ['businesses'],
    icon: Calculator,
  },
  {
    id: 'tax-returns',
    title: 'Personal, Corporate & Trust Tax Returns',
    summary: 'Tax preparation and filing services for individuals, corporations and trusts.',
    description:
      'We prepare and file tax returns for individuals, corporations and trusts, with careful attention to accuracy and to the details of your situation.',
    audience: 'Individuals, incorporated businesses and those responsible for trust filings.',
    group: 'tax',
    for: ['individuals', 'businesses'],
    icon: FileText,
  },
  {
    id: 'compilation-review',
    title: 'Compilation & Review Engagements',
    summary: 'Compilation engagements and review engagement services.',
    description:
      'Compilation and review engagements involve the preparation or review of financial statements for business owners, lenders and other stakeholders. We will discuss which type of engagement is appropriate for your needs.',
    audience: 'Businesses and corporations that require compiled or reviewed financial statements.',
    group: 'business-accounting',
    for: ['businesses'],
    icon: ClipboardCheck,
  },
  {
    id: 'audits',
    title: 'HST / GST / QST / WSIB / Payroll Audits',
    summary: 'Audits relating to HST, GST, QST, WSIB and payroll matters.',
    description:
      'Support with audits relating to HST, GST, QST, WSIB and payroll matters. We help you understand what is being requested and work with you through the process.',
    audience: 'Businesses dealing with a sales tax, WSIB or payroll audit, or with questions about these obligations.',
    group: 'business-accounting',
    for: ['businesses'],
    icon: ShieldCheck,
  },
  {
    id: 'tax-immigration',
    title: 'Tax & Immigration Consultation',
    summary: 'Consultation on taxation and immigration-related matters.',
    description:
      'Consultation on taxation and immigration-related matters, with clear explanations to help you understand your position and plan your next steps.',
    audience: 'Individuals and business owners seeking professional consultation on tax or immigration-related matters.',
    group: 'tax',
    for: ['individuals', 'businesses'],
    icon: Globe,
  },
  {
    id: 'financing',
    title: 'Financing',
    summary: 'Financing guidance involving BDC, five banks and CBFSL.',
    description:
      'Guidance on financing options involving BDC, the five banks and CBFSL, helping you understand the options available to your business. References to these institutions describe the financing options we can discuss and do not indicate a partnership or affiliation.',
    audience: 'Business owners and entrepreneurs exploring financing for a new or growing business.',
    group: 'financing',
    for: ['businesses'],
    icon: Landmark,
  },
  {
    id: 'business-registration',
    title: 'New Business Registration',
    summary: 'Assistance with new business registration.',
    description:
      'Starting a business involves important early decisions. We assist with new business registration so you can begin with the right foundation in place.',
    audience: 'Entrepreneurs and new business owners preparing to register a business.',
    group: 'financing',
    for: ['businesses'],
    icon: Sprout,
  },
]

// Client-supplied pricing categories. No amounts have been provided, so every category is "Contact for Pricing".
export const pricing: { title: string; text: string; icon: LucideIcon }[] = [
  { title: 'Bookkeeping & Payroll', text: 'Bookkeeping, payroll and financial record management.', icon: Calculator },
  { title: 'Audits', text: 'HST, GST, QST, WSIB and payroll audits.', icon: ShieldCheck },
  { title: 'Tax Filing', text: 'Personal, corporate and trust tax returns.', icon: FileText },
  { title: 'Tax Planning', text: 'Tax planning for individuals and businesses.', icon: Compass },
  { title: 'Consultation', text: 'Consultation on tax and immigration-related matters.', icon: MessageSquare },
]

// "bookkeeping & payroll, audits, tax filing, tax planning and consultation"
export const pricingList = new Intl.ListFormat('en-CA').format(pricing.map((p) => p.title.toLowerCase()))
