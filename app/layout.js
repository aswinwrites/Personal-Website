import './globals.css'
import { Providers } from './providers'
import Script from 'next/script'
import CommandPalette from '@/components/CommandPalette'
import EasterEgg from '@/components/EasterEgg'

const SITE_URL = 'https://aswinsampathkumar.in'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Aswin Sampath Kumar | Growth Specialist',
    template: '%s | Aswin Sampath Kumar',
  },
  description: 'Aswin Sampath Kumar is a growth specialist who figures out what actually moves metrics in meaningful ways — from performance marketing and product analytics to go-to-market strategy.',
  keywords: ['Aswin Sampath Kumar','growth specialist','performance marketing','product analytics','go-to-market strategy','user acquisition','digital marketing','Meta Ads','Google Ads'],
  authors: [{ name: 'Aswin Sampath Kumar', url: SITE_URL }],
  creator: 'Aswin Sampath Kumar',
  publisher: 'Aswin Sampath Kumar',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Aswin Sampath Kumar',
    title: 'Aswin Sampath Kumar | Growth Specialist',
    description: 'Growth specialist focused on performance marketing, product analytics, and go-to-market strategy.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Aswin Sampath Kumar — Growth Specialist' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aswinwrites',
    creator: '@aswinwrites',
    title: 'Aswin Sampath Kumar | Growth Specialist',
    description: 'Growth specialist focused on performance marketing, product analytics, and go-to-market strategy.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  alternates: { canonical: SITE_URL },
  category: 'portfolio',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': SITE_URL + '/#person',
      name: 'Aswin Sampath Kumar',
      url: SITE_URL,
      email: 'aswinwrites@gmail.com',
      jobTitle: 'Growth Specialist',
      description: 'Growth specialist who figures out what actually moves metrics in meaningful ways. Specializes in performance marketing, product analytics, and go-to-market strategy.',
      sameAs: ['https://linkedin.com/in/aswinwrites','https://twitter.com/aswinwrites','https://github.com/aswinwrites'],
      knowsAbout: ['Growth Marketing','Performance Marketing','Product Analytics','Go-to-Market Strategy','User Acquisition','Retention Optimization','A/B Testing','Meta Ads','Google Ads','Firebase','Data-Driven Decision Making'],
    },
    {
      '@type': 'WebSite',
      '@id': SITE_URL + '/#website',
      url: SITE_URL,
      name: 'Aswin Sampath Kumar',
      description: 'Personal portfolio of Aswin Sampath Kumar, a growth specialist focused on performance marketing and product analytics.',
      publisher: { '@id': SITE_URL + '/#person' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'FAQPage',
      '@id': SITE_URL + '/#faq',
      mainEntity: [
        { '@type': 'Question', name: 'Who is Aswin Sampath Kumar?', acceptedAnswer: { '@type': 'Answer', text: 'Aswin Sampath Kumar is a growth specialist who figures out what actually moves metrics in meaningful ways. He works at the intersection of performance marketing, product analytics, and go-to-market strategy.' } },
        { '@type': 'Question', name: 'What does Aswin Sampath Kumar specialize in?', acceptedAnswer: { '@type': 'Answer', text: 'Aswin specializes in growth marketing, performance advertising (Meta Ads, Google Ads), product analytics, user acquisition, and go-to-market strategy.' } },
        { '@type': 'Question', name: 'What tools does Aswin Sampath Kumar use?', acceptedAnswer: { '@type': 'Answer', text: 'Aswin works with Claude, ChatGPT, Meta Ads, Google Ads, Firebase, Google Analytics, Metabase, Notion, Figma, Supabase, GitHub, Vercel, Airtable, and Zapier.' } },
        { '@type': 'Question', name: 'How can I contact Aswin Sampath Kumar?', acceptedAnswer: { '@type': 'Answer', text: 'You can reach Aswin at aswinwrites@gmail.com.' } },
      ],
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <Providers>
          {children}
          <CommandPalette />
          <EasterEgg />
        </Providers>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-TV464FT5S4" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TV464FT5S4');
        `}</Script>
      </body>
    </html>
  )
}
