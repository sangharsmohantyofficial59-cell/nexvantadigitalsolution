/**
 * app/contact/page.tsx  ->  the CONTACT page, at "/contact"
 * ---------------------------------------------------------------
 * The quote form on the left, contact details and "what happens next" on
 * the right. The form itself is a separate client component
 * (components/ContactForm.tsx) because it needs to react to typing.
 */
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { BRAND, CONTACT } from '@/lib/site';
import { mailLink, telLink, whatsappLink } from '@/lib/links';
import { PageHero } from '@/components/PageHero';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us and Get a Free Quote',
  description: 'Tell NEXVANTA about your website, web app or digital marketing project and get a clear quote. Call, WhatsApp or send an enquiry.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let us talk about your project"
        lead="Share a few details and we will reply with a clear plan and a quote. Prefer a quick chat? Use WhatsApp or call."
        crumbs={[{ name: 'Contact', href: '/contact' }]}
      />

      <section className="section">
        <div className="container contact-grid">
          <div className="form-card">
            <h2>Send an enquiry</h2>
            <ContactForm />
          </div>

          <aside className="contact-side">
            <h2>Reach us directly</h2>
            <ul className="contact-list">
              <li>
                <span className="contact-list__icon">
                  <Icon name="phone" size={20} />
                </span>
                <div>
                  <strong>Call</strong>
                  <a href={telLink()}>{CONTACT.phoneDisplay}</a>
                </div>
              </li>
              <li>
                <span className="contact-list__icon">
                  <Icon name="whatsapp" size={20} />
                </span>
                <div>
                  <strong>WhatsApp</strong>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    Start a chat
                  </a>
                </div>
              </li>
              <li>
                <span className="contact-list__icon">
                  <Icon name="mail" size={20} />
                </span>
                <div>
                  <strong>Email</strong>
                  <a href={mailLink()}>{CONTACT.email}</a>
                </div>
              </li>
              <li>
                <span className="contact-list__icon">
                  <Icon name="pin" size={20} />
                </span>
                <div>
                  <strong>Location</strong>
                  <span>
                    {BRAND.city}, {BRAND.region}, India
                  </span>
                </div>
              </li>
            </ul>

            <div className="panel">
              <h3 className="list-title">What happens next</h3>
              <ol className="mini-steps">
                <li>We read your enquiry and reply within one working day.</li>
                <li>We have a short call to understand your goals.</li>
                <li>You receive a clear written plan and quote.</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
