/**
 * app/sitemap.ts  ->  creates "/sitemap.xml" automatically
 * ---------------------------------------------------------------
 * A sitemap is a list of every page on the site, written for search engines.
 * Submitting it in Google Search Console helps Google discover all pages
 * faster. Because it is generated from code, new service pages are added
 * automatically when you add a service in lib/site.ts.
 */
import type { MetadataRoute } from 'next';
import { SERVICES, SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  // Fixed pages.
  const pages = [
    '/',
    '/services',
    '/work',
    '/industries',
    '/industries/dental-clinics',
    '/process-pricing',
    '/about',
    '/contact',
    '/privacy-policy',
  ];
  // One extra entry per service page.
  const servicePages = SERVICES.map((service) => `/services/${service.slug}`);
  const now = new Date();

  return [...pages, ...servicePages].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    // Hints for search engines: the home page changes most, so it gets the highest priority.
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/services/') ? 0.8 : 0.7,
  }));
}
