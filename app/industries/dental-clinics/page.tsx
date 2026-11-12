/**
 * app/industries/dental-clinics/page.tsx  ->  "/industries/dental-clinics"
 * ---------------------------------------------------------------
 * Our flagship showcase: a patient website plus a staff-only front desk app
 * for dental clinics. This page is written for a dentist deciding whether to
 * work with us, and it is also valuable for Google searches such as
 * "dental clinic website developer in Bhubaneswar".
 *
 * Because it is a fixed address (not a [slug] pattern), the folder name
 * itself is the web address.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { DENTAL } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { BrowserMock } from '@/components/BrowserMock';
import { Icon } from '@/components/Icon';
import { CtaBand } from '@/components/CtaBand';

export const metadata: Metadata = buildMetadata({
  title: 'Dental Clinic Website and Front Desk App',
  description:
    'A patient-friendly dental clinic website with online appointment requests, plus a secure front desk app for bookings, time slots and patient records.',
  path: '/industries/dental-clinics',
});

/** A small helper component used only in this file: a heading plus a tick list. */
function FeatureList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="list-title">{title}</h3>
      <ul className="checklist">
        {items.map((item) => (
          <li key={item}>
            <Icon name="check" size={18} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DentalClinicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries: dental clinics"
        title="Websites and front desk apps for dental clinics"
        lead="Help new patients find and trust your clinic online, and give your front desk one simple system for bookings and records."
        crumbs={[
          { name: 'Industries', href: '/industries' },
          { name: 'Dental clinics', href: '/industries/dental-clinics' },
        ]}
      >
        <div className="hero__buttons">
          <Link href="/contact" className="btn btn--gold btn--lg">
            Ask for a demo walk-through
          </Link>
        </div>
      </PageHero>

      {/* Part 1: the public website */}
      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Part one</p>
            <h2>The patient website</h2>
            <p className="lead">
              The first impression of your clinic. Calm, clear and easy to use on a phone, so a worried patient can find answers and book
              in a minute.
            </p>
            <FeatureList title="What patients get" items={DENTAL.patientSite} />
          </div>
          <BrowserMock />
        </div>
      </section>

      {/* Part 2: the staff app */}
      <section className="section section--ivory">
        <div className="container split split--reverse">
          <div className="panel panel--maroon">
            <p className="eyebrow eyebrow--light">Part two</p>
            <h2>The front desk app</h2>
            <p>
              A private, staff-only web app that replaces paper registers and scattered messages with one organised system.
            </p>
          </div>
          <FeatureList title="What your team gets" items={DENTAL.frontDesk} />
        </div>
      </section>

      {/* Security */}
      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Safe and private</p>
            <h2>Patient data deserves real protection</h2>
            <p className="lead">
              Security is planned from the first day, not added at the end. Patient details are sensitive, and we treat them that way.
            </p>
          </div>
          <FeatureList title="How we protect it" items={DENTAL.security} />
        </div>
      </section>

      {/* An honest note about the demo */}
      <section className="section section--sand">
        <div className="container container--narrow">
          <h2>See it before you decide</h2>
          <p className="lead">
            We have a working demo built around a fictional clinic. Ask us for a walk-through and we will show you how a booking is taken,
            how the front desk sees the day, and how your own clinic would look.
          </p>
          <div className="button-row">
            <Link href="/contact" className="btn btn--maroon btn--lg">
              Request a demo
            </Link>
            <Link href="/services/web-apps" className="btn btn--outline btn--lg">
              About our web app service
            </Link>
          </div>
        </div>
      </section>

      <CtaBand title="Ready to bring your clinic online?" text="Tell us about your clinic and we will propose the right website and system, with no obligation." />
    </>
  );
}
