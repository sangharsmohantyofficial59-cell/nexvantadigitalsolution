/**
 * components/Footer.tsx
 * ---------------------------------------------------------------
 * The bottom of every page: logo, short description, links to services and
 * pages, contact details and social links. Footer links are also valuable
 * for search engines, because they connect every page to every other page.
 *
 * This is a "server component": it has no clicks or state of its own, so it
 * is built once on the server and sent as plain HTML (fast and SEO friendly).
 */
import Link from 'next/link';
import Image from 'next/image';
import { BRAND, CONTACT, NAV, SERVICES, SOCIALS } from '@/lib/site';
import { mailLink, telLink, whatsappLink } from '@/lib/links';
import { Logo } from './Logo';
import { Icon } from './Icon';

const SOCIAL_ICONS: Record<string, string> = {
  Instagram: '/social.png',
  LinkedIn: '/linkedin.png',
  YouTube: '/youtube.png',
};

export function Footer() {
  // Only show social links that have a real address filled in.
  const socials = SOCIALS.filter((s) => s.href);
  // The current year, so the copyright line never goes out of date.
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          {/* The logo has a white background, so it sits inside a white rounded box on the maroon footer. */}
          <div className="site-footer__logo">
            <Logo />
          </div>
          <p>{BRAND.tagline}</p>
          <p className="site-footer__small">
            {BRAND.city}, {BRAND.region}, India
          </p>
        </div>

        <div>
          <h2 className="site-footer__title">Services</h2>
          <ul>
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="site-footer__title">Company</h2>
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="site-footer__title">Contact</h2>
          <ul className="site-footer__contact">
            <li>
              <Icon name="phone" size={18} />
              <a href={telLink()}>{CONTACT.phoneDisplay}</a>
            </li>
            <li>
              <Icon name="whatsapp" size={18} />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </a>
            </li>
            <li>
              <Icon name="mail" size={18} />
              <a href={mailLink()}>{CONTACT.email}</a>
            </li>
          </ul>
          {socials.length > 0 && (
            <ul className="site-footer__social" aria-label="Social media">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer__social-link"
                    aria-label={`Visit NEXVANTA on ${s.label} (opens in a new tab)`}
                    title={s.label}
                  >
                    {SOCIAL_ICONS[s.label] ? (
                      <Image src={SOCIAL_ICONS[s.label]} alt="" width={30} height={30} />
                    ) : s.label === 'Facebook' ? (
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M13.5 8H16V4.5c-.4-.05-1.8-.2-3.4-.2-3.3 0-5.5 2-5.5 5.7V13H4v4h3.1v7h4.2v-7h3.5l.6-4h-4.1v-2.6c0-1.2.3-2.4 2.2-2.4z" />
                      </svg>
                    ) : (
                      s.label
                    )}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          <p>
            &copy; {year} {BRAND.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
