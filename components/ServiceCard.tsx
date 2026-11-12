/**
 * components/ServiceCard.tsx
 * ---------------------------------------------------------------
 * One clickable card for a service (icon, name, one-line summary).
 * Used on the Home page and the Services page. The whole card is a link
 * to that service's own page, which helps both visitors and search engines.
 */
import Link from 'next/link';
import type { Service } from '@/lib/site';
import { Icon } from './Icon';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/services/${service.slug}`} className="card card--link">
      <span className="card__icon">
        <Icon name={service.icon} size={28} />
      </span>
      <h3 className="card__title">{service.title}</h3>
      <p className="card__text">{service.summary}</p>
      <span className="card__more">
        Learn more <Icon name="arrow" size={18} />
      </span>
    </Link>
  );
}
