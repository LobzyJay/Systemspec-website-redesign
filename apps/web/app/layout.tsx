import type { Metadata, Viewport } from 'next';
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

// Root layout metadata = the STSL marketing site (root `/` is the homepage,
// every (marketing)/* route inherits this). The /design route overrides
// with its own metadata via apps/web/app/design/layout.tsx.
// SITE_URL is the absolute base used for canonical + OpenGraph URLs.
// On the GitHub Pages preview build it points at the Pages subpath so
// link previews (Slack, LinkedIn, etc.) load the OG image from the
// deploy that actually serves it. Vercel + production stsl.ng builds
// fall through to the canonical apex.
const SITE_URL =
  process.env.GITHUB_PAGES === 'true'
    ? 'https://lobzyjay.github.io/Systemspec-website-redesign'
    : 'https://stsl.ng';
const OG_IMAGE_URL = `${SITE_URL}/og-image.jpg`;
const SITE_NAME = 'SystemSpecs Technology Solutions';
const DESCRIPTION =
  'The infrastructure behind Africa’s payment, government, and financial technology systems. A SystemSpecs Holdings company, building for Nigerian banks, federal MDAs, and fintech operators since 1992.';
const TITLE = {
  default: 'SystemSpecs Technology Solutions',
  template: '%s · SystemSpecs Technology Solutions',
};

// Viewport — viewport-fit=cover is REQUIRED for env(safe-area-inset-*)
// to return the actual iOS notch / Dynamic Island inset values. Without
// it, those env() values resolve to 0 and the sticky header leaves a
// transparent gap above itself on iPhone 15 Pro Max. themeColor matches
// the page bg so the iOS dynamic status-bar tint reads in-tone instead
// of flashing white when the bar transitions.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E8F2EE' },
    { media: '(prefers-color-scheme: dark)',  color: '#0A0B0E' },
  ],
};

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
    title: TITLE.default,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: 'en_NG',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE.default,
    description: DESCRIPTION,
    images: [OG_IMAGE_URL],
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
      {/* Pre-paint splash gate — runs synchronously in <head> BEFORE
          the body paints:
            1. Set data-splash="active" so the body bg is forced white
               until the splash dismisses (no flash of cream-canvas).
            2. Disable browser scroll restoration so a refresh on a
               scrolled page doesn't restore the previous offset.
            3. Reset scroll to top so the splash always plays over the
               top of the page — when it dismisses, the user sees the
               hero, not a mid-page reveal. */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.setAttribute('data-splash','active');try{if('scrollRestoration' in history)history.scrollRestoration='manual';}catch(e){}window.scrollTo(0,0);})();`,
          }}
        />
      </head>
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
