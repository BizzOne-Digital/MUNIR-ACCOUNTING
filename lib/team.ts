import type { StaticImageData } from 'next/image'

export type TeamMember = {
  name: string
  role: string
  bio?: string
  photo?: StaticImageData
}

// Add real team members here once the client supplies names, roles and photos — pages update automatically.
// Example: { name: 'Full Name', role: 'Chartered Professional Accountant', bio: '…', photo: importedPortrait }
export const team: TeamMember[] = []

export const commitments = [
  { title: 'Personal attention', text: 'Your file is handled with care, discretion and attention to detail.' },
  { title: 'Clear communication', text: 'Straightforward explanations of your obligations and your options.' },
  { title: 'Practical guidance', text: 'Advice grounded in your circumstances and what you want to achieve.' },
]
