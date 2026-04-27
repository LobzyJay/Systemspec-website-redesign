import type { Metadata } from 'next';
import Script from 'next/script';
import { Plus_Jakarta_Sans, Geist, Source_Serif_4, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CookieConsent } from '../components/CookieConsent';

// Type system — three faces, each with a job:
//   Display  · Plus Jakarta Sans (medium 500)  — wordmark sibling, editorial headlines
//   Editorial · Source Serif 4                  — pull-quotes, callouts, capability lede
//   Body     · Geist                            — replaces Inter (skill-banned default)
//   Mono     · JetBrains Mono                  — captions, tokens, code
const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const body = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-geist',
  display: 'swap',
});

const editorial = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jb-mono',
  display: 'swap',
});

const SITE_URL = 'https://design.stsl.ng';
const SITE_NAME = 'SystemSpecs Design System';
const DESCRIPTION =
  'The design system behind SystemSpecs Technology Solutions — tokens, brand identity, primitives, and composed components. Built as a three-layer monorepo so it can re-skin across SystemSpecs Holdings subsidiaries with token swaps alone.';
const TITLE = 'SystemSpecs Design System';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: '/site.webmanifest',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: 'en_NG',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/stsl-logo-VKg-MqQs.png`,
  foundingDate: '1992',
  parentOrganization: {
    '@type': 'Organization',
    name: 'SystemSpecs Holdings Limited',
  },
  sameAs: [
    'https://www.linkedin.com/company/systemspecs-technology-solutions/',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: [
    {
      '@type': 'SiteNavigationElement',
      name: 'Solutions',
      url: `${SITE_URL}/solutions`,
    },
    {
      '@type': 'SiteNavigationElement',
      name: 'Products',
      url: `${SITE_URL}/products`,
    },
    {
      '@type': 'SiteNavigationElement',
      name: 'Company',
      url: `${SITE_URL}/company`,
    },
    {
      '@type': 'SiteNavigationElement',
      name: 'Contact',
      url: `${SITE_URL}/contact`,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning silences a React 19 warning triggered by
    // browser extensions (Bybit, MetaMask, Grammarly, etc.) that inject
    // attributes onto <html> client-side. Not a bug in our code.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${editorial.variable} ${mono.variable}`}
    >
      <body>
        <Script
          id="ld-json-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="ld-json-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
