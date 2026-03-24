import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#D4AF37',
}

export const metadata: Metadata = {
  title: 'AutoSharm | Premium Vehicle Rentals & Sales in Sharm El Sheikh Egypt',
  description: 'Book premium cars for sale, car rentals, and scooters in Sharm El Sheikh, Egypt. Best prices, 24/7 support, fully insured vehicles. Perfect for tourists!',
  keywords: 'car rental Sharm El Sheikh, car sale Egypt, scooter rental Sharm El Sheikh, tourist car rental, luxury vehicle rental, cheapest car rental, best deals',
  generator: 'v0.app',
  applicationName: 'AutoSharm',
  authors: [{ name: 'AutoSharm' }],
  creator: 'AutoSharm',
  publisher: 'AutoSharm',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://autosharm.com',
    siteName: 'AutoSharm',
    title: 'AutoSharm | Premium Vehicle Rentals & Sales in Sharm El Sheikh',
    description: 'Book premium cars for sale, car rentals, and scooters in Sharm El Sheikh, Egypt. Best prices, 24/7 support, fully insured.',
    images: [
      {
        url: '/logo.png',
        width: 140,
        height: 140,
        alt: 'AutoSharm Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AutoSharm | Premium Vehicle Rentals & Sales in Sharm El Sheikh',
    description: 'Book premium cars and scooters in Sharm El Sheikh, Egypt. Best prices, 24/7 support, fully insured!',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://autosharm.com',
  },
  verification: {
    google: 'YOUR-GOOGLE-VERIFICATION-CODE', // Update this after Google Search Console setup
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const localBusinessSchema = {
    '@context': 'https://schema.org/',
    '@type': 'LocalBusiness',
    '@id': 'https://autosharm.com',
    name: 'AutoSharm',
    description: 'Premium vehicle rentals and sales in Sharm El Sheikh, Egypt',
    url: 'https://autosharm.com',
    telephone: '+201055777826',
    email: 'sharmrental@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sharm El Sheikh',
      addressLocality: 'Sharm El Sheikh',
      addressRegion: 'South Sinai',
      postalCode: '',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '27.9428',
      longitude: '34.3397',
    },
    image: '/logo.png',
    priceRange: '$$',
    areaServed: 'EG',
    serviceType: ['Car Rental', 'Car Sales', 'Scooter Rental'],
    sameAs: [
      'https://www.instagram.com/autosharm.eg?igsh=OXhndGRqb3UwMGp5',
      'https://www.facebook.com/share/188NggBcnw/?mibextid=wwXIfr',
    ],
  };

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4040F0" />
        <meta name="msapplication-TileColor" content="#4040F0" />
        <link rel="canonical" href="https://autosharm.com" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="favicon" href="/favicon.ico" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon-light-32x32.png" type="image/png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/icon-dark-32x32.png" type="image/png" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className=\"font-sans antialiased bg-background text-foreground dark:bg-slate-950 dark:text-slate-50\">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="autosharm-theme"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
