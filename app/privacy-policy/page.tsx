/**
 * app/privacy-policy/page.tsx  ->  "/privacy-policy"
 * ---------------------------------------------------------------
 * A plain-language privacy policy. The contact form collects personal
 * details (name, email, phone), and India's Digital Personal Data Protection
 * Act, 2023 expects businesses to explain what they collect and why.
 *
 * IMPORTANT: this is a sensible starting template, not legal advice.
 * Before launch, have it reviewed by a legal professional, and update it if
 * you add analytics, cookies, newsletters or other data collection.
 */
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { BRAND, CONTACT } from '@/lib/site';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How NEXVANTA collects, uses and protects the personal details you share through our website.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        lead="How we handle the details you share with us."
        crumbs={[{ name: 'Privacy Policy', href: '/privacy-policy' }]}
      />

      <section className="section">
        <div className="container container--narrow prose">
          <p>
            This policy explains how {BRAND.fullName} (&quot;we&quot;, &quot;us&quot;) collects and uses personal information on this
            website, in line with India&apos;s Digital Personal Data Protection Act, 2023.
          </p>

          <h2>What we collect</h2>
          <p>
            When you use our contact form, we collect your name, email address, optional phone number, the service you are interested
            in, and the message you write. We do not ask for anything more than we need to reply to you.
          </p>

          <h2>Why we collect it</h2>
          <p>
            We use these details only to respond to your enquiry, prepare a quote, and communicate about your project. We do not sell
            your information and we do not use it for unrelated marketing without asking you first.
          </p>

          <h2>Who handles your data</h2>
          <p>
            To run this website we use trusted service providers: a hosting provider to serve the website, and an email delivery service
            to pass your enquiry to our inbox. They process data only to provide those services.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep enquiry details for as long as needed to respond and to manage any resulting project, and delete them when they are
            no longer required.
          </p>

          <h2>Cookies and tracking</h2>
          <p>This website does not currently use advertising or tracking cookies. If that changes, we will update this page.</p>

          <h2>Your rights</h2>
          <p>
            You may ask us what personal data we hold about you, ask us to correct it, ask us to delete it, or withdraw your consent at
            any time. To do so, or to raise a concern, write to us at {CONTACT.email}.
          </p>

          <p className="prose__meta">Last updated: November 2026</p>
        </div>
      </section>
    </>
  );
}
