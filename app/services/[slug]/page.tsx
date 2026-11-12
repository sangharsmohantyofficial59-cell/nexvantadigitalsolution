/**
 * app/services/[slug]/page.tsx  ->  ONE PAGE FOR EACH SERVICE
 * ---------------------------------------------------------------
 * The square brackets in the folder name [slug] mean "dynamic route": one file
 * produces many pages. /services/websites, /services/web-apps and so on all
 * use this same file, and `slug` is the last part of the address.
 *
 * Three special functions make this work:
 *  - generateStaticParams  tells Next.js which slugs exist, so every page is
 *                          built ahead of time (fast, and visible to Google).
 *  - generateMetadata      gives each page its own unique title and description.
 *  - the default export    draws the page itself.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { BRAND, SERVICES, SITE_URL } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { ServiceCard } from '@/components/ServiceCard';
import { CtaBand } from '@/components/CtaBand';

type Props = { params: { slug: string } };

/** Runs at build time: returns one entry per service so each page is pre-built. */
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

/** Runs for each page: builds a unique title, description and canonical link. */
export function generateMetadata({ params }: Props): Metadata {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.title} in ${BRAND.city}, ${BRAND.region}`,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default function ServicePage({ params }: Props) {
  // Find the service that matches the address. If none matches, show the 404 page.
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) notFound();

  // Show three other services at the bottom to keep visitors exploring.
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  // Structured data describing this service for search engines.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'India' },
  };

  return (
    <>
      <JsonLd data={schema} />
      <PageHero
        eyebrow="Service"
        title={service.headline}
        lead={service.intro}
        crumbs={[
          { name: 'Services', href: '/services' },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      >
        <div className="hero__buttons">
          <Link href="/contact" className="btn btn--gold btn--lg">
            Get a free quote
          </Link>
          <Link href="/work" className="btn btn--outline-light btn--lg">
            See our work
          </Link>
        </div>
      </PageHero>

      {/* What is included + who it suits */}
      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">What is included</p>
            <h2>Everything in a {service.title.toLowerCase()} project</h2>
            <ul className="checklist">
              {service.includes.map((item) => (
                <li key={item}>
                  <Icon name="check" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel">
            <p className="eyebrow">Ideal for</p>
            <ul className="checklist">
              {service.idealFor.map((item) => (
                <li key={item}>
                  <Icon name="check" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="panel__note">Not sure if this fits? Tell us about your business and we will advise honestly.</p>
          </div>
        </div>
      </section>

      {/* Three benefits */}
      <section className="section section--ivory">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">The result</p>
            <h2>What you gain</h2>
          </div>
          <div className="grid grid--3">
            {service.outcomes.map((outcome) => (
              <div key={outcome.title} className="card">
                <h3 className="card__title">{outcome.title}</h3>
                <p className="card__text">{outcome.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services (internal links help visitors and search engines) */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Related services</p>
            <h2>Often combined with</h2>
          </div>
          <div className="grid grid--3">
            {related.map((item) => (
              <ServiceCard key={item.slug} service={item} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
