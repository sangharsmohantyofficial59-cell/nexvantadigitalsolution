/**
 * app/process-pricing/page.tsx  ->  "/process-pricing"
 * ---------------------------------------------------------------
 * Explains how a project runs, shows the three packages (without amounts),
 * lists what affects the price, and answers common questions.
 *
 * The FAQ is also written as "FAQPage" structured data, which lets Google
 * show the questions directly in search results.
 */
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { FAQ } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { Steps } from '@/components/Steps';
import { PlanCards } from '@/components/PlanCards';
import { FaqList } from '@/components/FaqList';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';
import { CtaBand } from '@/components/CtaBand';

export const metadata: Metadata = buildMetadata({
  title: 'Our Process and Website Packages',
  description:
    'See how a NEXVANTA project runs from discovery to launch, and compare our Starter, Business and Custom packages. Contact us for a clear quote.',
  path: '/process-pricing',
});

/** What changes the final price. Plain facts help clients understand a quote. */
const PRICE_FACTORS = [
  'The number of pages or screens',
  'Custom features such as bookings, logins or dashboards',
  'Integrations with other tools',
  'How ready your text, photos and logo are',
  'The timeline you need',
  'Ongoing maintenance and marketing after launch',
];

export default function ProcessPricingPage() {
  // FAQPage structured data built from the same list that is shown on screen.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <PageHero
        eyebrow="Process and pricing"
        title="A clear process and a clear quote"
        lead="No surprises. You know the steps, the scope and the cost before we start building."
        crumbs={[{ name: 'Process and pricing', href: '/process-pricing' }]}
      />

      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">How we work</p>
            <h2>Four steps from idea to launch</h2>
          </div>
          <Steps />
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Packages</p>
            <h2>Starting points, tailored to you</h2>
            <p className="lead">
              Prices depend on the scope of your project, so every package is quoted after a short conversation. You will always get a
              written quote before any work begins.
            </p>
          </div>
          <PlanCards />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Transparent quotes</p>
            <h2>What affects the price</h2>
            <p className="lead">Understanding these points helps you decide what to include now and what to add later.</p>
          </div>
          <ul className="checklist">
            {PRICE_FACTORS.map((factor) => (
              <li key={factor}>
                <Icon name="check" size={18} />
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container container--narrow">
          <div className="section__head">
            <p className="eyebrow">FAQ</p>
            <h2>Questions we hear most</h2>
          </div>
          <FaqList items={FAQ} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
