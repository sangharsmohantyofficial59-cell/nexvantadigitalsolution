/**
 * lib/seo.ts
 * ---------------------------------------------------------------
 * Small helpers that build the "metadata" (page title, description, share
 * preview, canonical link) for each page, so every page follows the same
 * pattern and we do not repeat ourselves.
 *
 * "Metadata" is the hidden information Google, WhatsApp and Facebook read
 * to decide how a page appears in search results and in link previews.
 */
import type { Metadata } from 'next';
import { BRAND, SITE_URL, CONTACT, SOCIALS } from './site';

/**
 * buildMetadata: creates the metadata object for one page.
 *
 * @param title        Short page title. The layout adds " | NEXVANTA" after it.
 * @param description  One or two sentences for search results (aim for under 160 characters).
 * @param path         The page address, for example "/services". Used for the canonical link.
 *
 * Why "canonical"? It tells Google which address is the official one for this
 * page, so duplicates (for example with tracking parameters) do not compete.
 *
 * Why repeat the images? In Next.js, a page's `openGraph` replaces the layout's
 * one completely instead of merging, so the share image must be repeated here.
 */
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${BRAND.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: BRAND.fullName,
      type: 'website',
      locale: 'en_IN',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: BRAND.fullName }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/og.png'],
    },
  };
}

/**
 * organizationSchema: the "business card" for search engines, written in
 * JSON-LD (a standard format from schema.org). Google can use it to show
 * your business name, logo and location in results.
 * It is added once, in the site layout, so it appears on every page.
 */
export function organizationSchema() {
  // Keep only the social links that have been filled in.
  const sameAs = SOCIALS.filter((s) => s.href).map((s) => s.href);
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#business`,
    name: BRAND.fullName,
    alternateName: BRAND.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og.png`,
    description: BRAND.description,
    email: CONTACT.email,
    telephone: CONTACT.phoneHref,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BRAND.city,
      addressRegion: BRAND.region,
      addressCountry: BRAND.country,
    },
    areaServed: { '@type': 'Country', name: 'India' },
    ...(sameAs.length ? { sameAs } : {}),
  };
}
