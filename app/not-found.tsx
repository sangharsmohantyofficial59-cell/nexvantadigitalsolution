/**
 * app/not-found.tsx  ->  the custom 404 page
 * ---------------------------------------------------------------
 * Shown automatically when someone visits an address that does not exist
 * (or when a page calls notFound()). A helpful 404 keeps visitors on the
 * site by offering useful links instead of a dead end. Next.js sends the
 * correct "404" status code with it, so search engines know the page is missing.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICES } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="container container--narrow">
        <p className="notfound__code">404</p>
        <h1>This page could not be found</h1>
        <p className="lead">The link may be old or mistyped. Here are some helpful places to go next.</p>
        <div className="button-row button-row--center">
          <Link href="/" className="btn btn--maroon btn--lg">
            Go to home page
          </Link>
          <Link href="/contact" className="btn btn--outline btn--lg">
            Contact us
          </Link>
        </div>
        <ul className="chips chips--center">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`}>{service.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
