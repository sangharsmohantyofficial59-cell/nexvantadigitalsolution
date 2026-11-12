/**
 * components/Breadcrumbs.tsx
 * ---------------------------------------------------------------
 * The small "Home / Services / Websites" trail shown near the top of inner
 * pages. It helps visitors see where they are, and it also writes the same
 * trail as structured data, so Google can show it in search results.
 */
import Link from 'next/link';
import { SITE_URL } from '@/lib/site';
import { JsonLd } from './JsonLd';

export type Crumb = { name: string; href: string };

/**
 * Breadcrumbs
 *  - items: the trail AFTER "Home", in order. The last item is the current page.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  // Always start with Home. The spread (...) copies the given items after it.
  const all: Crumb[] = [{ name: 'Home', href: '/' }, ...items];

  // The structured-data version of the trail (schema.org "BreadcrumbList").
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    // .map() turns each crumb into a numbered list entry with a full web address.
    itemListElement: all.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {all.map((crumb, index) => (
            <li key={crumb.href}>
              {/* Every crumb is a link except the last, which is the page we are on. */}
              {index < all.length - 1 ? (
                <Link href={crumb.href}>{crumb.name}</Link>
              ) : (
                <span aria-current="page">{crumb.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
