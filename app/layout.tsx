/**
 * app/layout.tsx
 * ---------------------------------------------------------------
 * The "frame" that wraps EVERY page: fonts, header, footer, the WhatsApp
 * button and the default page information. Each page's own content is
 * dropped in where `{children}` appears.
 *
 * In Next.js's App Router, the folder structure inside /app creates the
 * website's addresses. A file called layout.tsx wraps all pages below it.
 */
import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { BRAND, SITE_URL } from '@/lib/site';
import { organizationSchema } from '@/lib/seo';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { JsonLd } from '@/components/JsonLd';

/**
 * FONTS. next/font downloads the font files at build time and serves them from
 * our own site, so visitors do not need to contact Google (faster and more private).
 *  - Cormorant Garamond: an elegant serif for headings
 *  - Inter: a very readable sans-serif for body text
 * `variable` creates a CSS variable (--font-serif, --font-sans) that globals.css uses.
 * `display: 'swap'` shows text immediately in a fallback font while the real one loads.
 */
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});
const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

/**
 * DEFAULT METADATA for the whole site. Individual pages override pieces of it.
 *  - metadataBase: the root address, so relative links like "/og.png" become full addresses
 *  - title.template: every page title is shown as "<Page> | NEXVANTA"
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'NEXVANTA | Premium Websites and Web Apps in Bhubaneswar',
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  applicationName: BRAND.name,
  openGraph: {
    siteName: BRAND.fullName,
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: BRAND.fullName }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
};

/** Viewport settings: how the page scales on phones, and the browser bar colour on Android. */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#5C0504',
};

/**
 * RootLayout wraps all pages.
 *  - `children` is the page being shown right now.
 *  - lang="en-IN" tells browsers and search engines the language is English (India).
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {/* Business details for search engines, added once for the whole site. */}
        <JsonLd data={organizationSchema()} />

        {/* "Skip link": lets keyboard users jump past the menu straight to the content. */}
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
