/**
 * app/industries/page.tsx  ->  the INDUSTRIES page, at "/industries"
 * ---------------------------------------------------------------
 * Shows the kinds of businesses we build for. Dental clinics link to their
 * own dedicated page; the others are informational cards for now. When you
 * want a dedicated page for another industry, copy the dental-clinics folder.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { INDUSTRIES } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { Icon } from '@/components/Icon';
import { CtaBand } from '@/components/CtaBand';

export const metadata: Metadata = buildMetadata({
  title: 'Industries We Build Websites and Apps For',
  description:
    'Websites and web apps for dental clinics, healthcare, shops, professionals, institutes, hospitality, suppliers, creators and startups.',
  path: '/industries',
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Digital solutions shaped around your kind of business"
        lead="Every industry has its own customers and its own questions. We design around both."
        crumbs={[{ name: 'Industries', href: '/industries' }]}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--4">
            {INDUSTRIES.map((industry) => {
              // Cards with an `href` become links; the rest are plain cards.
              const content = (
                <>
                  <span className="card__icon">
                    <Icon name={industry.icon} size={26} />
                  </span>
                  <h2 className="card__title card__title--sm">{industry.title}</h2>
                  <p className="card__text">{industry.text}</p>
                  {industry.href && (
                    <span className="card__more">
                      See the solution <Icon name="arrow" size={18} />
                    </span>
                  )}
                </>
              );
              return industry.href ? (
                <Link key={industry.title} href={industry.href} className="card card--link">
                  {content}
                </Link>
              ) : (
                <div key={industry.title} className="card">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand title="Do not see your industry?" text="We build for many kinds of businesses. Tell us about yours and we will suggest the right approach." />
    </>
  );
}
