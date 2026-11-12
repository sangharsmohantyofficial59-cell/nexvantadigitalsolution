/**
 * app/robots.ts  ->  creates "/robots.txt" automatically
 * ---------------------------------------------------------------
 * robots.txt is the first file search-engine crawlers read. It says which
 * parts of the site they may visit and where the sitemap is.
 * Here: everything is allowed except /api/ (our form handler), and the
 * sitemap address is announced.
 */
import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
