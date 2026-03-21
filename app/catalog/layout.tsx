import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Car Rentals & Sales in Sharm El Sheikh Egypt | AutoSharm',
  description: 'Browse our premium selection of cars for rent and sale in Sharm El Sheikh. Find the perfect vehicle for your holiday at the best prices. Fully insured, 24/7 support.',
  keywords: 'car rental Sharm El Sheikh, luxury car rental Egypt, best car rental prices, affordable car rental, tourists car rental, scooter rental, vehicle rental',
  openGraph: {
    title: 'Car Rentals & Sales in Sharm El Sheikh | AutoSharm',
    description: 'Premium cars for rent and sale in Sharm El Sheikh, Egypt. Best prices, fully insured vehicles.',
    type: 'website',
    url: 'https://autosharm.com/catalog',
  },
  twitter: {
    title: 'Car Rentals & Sales in Sharm El Sheikh | AutoSharm',
    description: 'Premium vehicles at the best prices in Sharm El Sheikh, Egypt.',
    card: 'summary_large_image',
  },
}

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
