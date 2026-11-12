/**
 * components/PlanCards.tsx
 * ---------------------------------------------------------------
 * The three package cards (Starter, Business, Custom). They show what is
 * included but deliberately say "Contact for price", because the amount is
 * agreed after we understand the project. Used on the Home page and on the
 * Process and Pricing page, so the content lives in one place (lib/site.ts).
 */
import Link from 'next/link';
import { PLANS } from '@/lib/site';
import { Icon } from './Icon';

export function PlanCards() {
  return (
    <div className="grid grid--3">
      {PLANS.map((plan) => (
        // The highlighted plan gets an extra CSS class so it stands out visually.
        <article key={plan.name} className={`plan${plan.highlight ? ' plan--highlight' : ''}`}>
          {plan.highlight && <span className="plan__flag">Most popular</span>}
          <h3 className="plan__name">{plan.name}</h3>
          <p className="plan__suits">{plan.suits}</p>
          <p className="plan__blurb">{plan.blurb}</p>
          <ul className="checklist">
            {plan.features.map((feature) => (
              <li key={feature}>
                <Icon name="check" size={18} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <p className="plan__price">Contact for price</p>
          <Link href="/contact" className={`btn ${plan.highlight ? 'btn--gold' : 'btn--outline'}`}>
            Request a quote
          </Link>
        </article>
      ))}
    </div>
  );
}
