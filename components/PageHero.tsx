/**
 * components/PageHero.tsx
 * ---------------------------------------------------------------
 * The maroon banner at the top of every inner page (Services, Work, About...).
 * It holds the breadcrumbs, the ONE main heading (h1) of the page, and an
 * optional short introduction. Every page should have exactly one h1,
 * because search engines use it to understand what the page is about.
 */
import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';

/**
 * PageHero
 *  - eyebrow:  small label above the heading (optional)
 *  - title:    the h1 text
 *  - lead:     the introduction paragraph (optional)
 *  - crumbs:   breadcrumb trail after "Home"
 *  - children: anything extra to show underneath, such as buttons
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow eyebrow--light">{eyebrow}</p>}
        <h1>{title}</h1>
        {lead && <p className="lead lead--light">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
