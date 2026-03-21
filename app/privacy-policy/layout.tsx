import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | AutoSharm - Car Rentals & Sales Sharm El Sheikh',
  description: 'Read AutoSharm privacy policy. Learn how we collect, use, and protect your personal information when booking vehicles in Sharm El Sheikh, Egypt.',
  keywords: 'privacy policy, data protection, AutoSharm, vehicle rental Egypt',
  openGraph: {
    title: 'Privacy Policy | AutoSharm',
    description: 'AutoSharm privacy policy - Data protection and user information.',
    type: 'website',
    url: 'https://autosharm.com/privacy-policy',
  },
  twitter: {
    title: 'Privacy Policy | AutoSharm',
    description: 'AutoSharm privacy policy - Learn how we protect your data.',
    card: 'summary',
  },
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
