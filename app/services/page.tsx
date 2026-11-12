/**
 * app/services/page.tsx  ->  the SERVICES overview, at "/services"
 * ---------------------------------------------------------------
 * Lists all six services as cards. Each card links to its own detailed page
 * (see app/services/[slug]/page.tsx).
 */
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { SERVICES } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { ServiceCard } from '@/components/ServiceCard';
import { Steps } from '@/components/Steps';
import { CtaBand } from '@/components/CtaBand';

export const metadata: Metadata = buildMetadata({
  title: 'Web Design, Web Apps and Digital Marketing Services',
  description:
    'Websites, web apps, landing pages, portfolios, website maintenance and digital marketing from one team in Bhubaneswar, Odisha.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need to be found, trusted and chosen online"
        lead="Six connected services, one accountable team. Start with what you need today and add more as you grow."
        crumbs={[{ name: 'Services', href: '/services' }]}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">How we work</p>
            <h2>The same clear process on every project</h2>
          </div>
          <Steps />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
