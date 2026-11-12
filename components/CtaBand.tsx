/**
 * components/CtaBand.tsx
 * ---------------------------------------------------------------
 * "CTA" means "call to action". This is the maroon band near the bottom of
 * pages that invites the visitor to take the next step: request a quote or
 * start a WhatsApp chat. Having one on every page means a visitor never has
 * to hunt for how to contact us.
 */
import Link from 'next/link';
import { whatsappLink } from '@/lib/links';
import { Icon } from './Icon';

export function CtaBand({
  title = 'Ready to build something your business can be proud of?',
  text = 'Tell us what you need. We will reply with a clear plan and a quote, with no obligation.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band__buttons">
          <Link href="/contact" className="btn btn--gold btn--lg">
            Get a free quote
          </Link>
          <a href={whatsappLink()} className="btn btn--outline-light btn--lg" target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={20} /> WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
