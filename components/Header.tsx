'use client';
/**
 * components/Header.tsx
 * ---------------------------------------------------------------
 * The top bar: logo, navigation links and the "Get a free quote" button.
 *
 * Why does this file start with 'use client'?
 * In Next.js, components are rendered on the SERVER by default, which is fast
 * and good for search engines. But a menu that opens and closes needs to
 * react to clicks inside the browser. 'use client' marks this file as one of
 * the few that also run in the browser.
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV } from '@/lib/site';
import { Logo } from './Logo';
import { Icon } from './Icon';

export function Header() {
  // usePathname() gives the current page address, for example "/services".
  // We use it to highlight the active link.
  const pathname = usePathname();

  // useState keeps a value that, when changed, redraws the component.
  // Here: is the mobile menu open (true) or closed (false)?
  const [open, setOpen] = useState(false);

  // useEffect runs code AFTER the page draws, whenever the listed values change.
  // This one closes the mobile menu every time the visitor moves to a new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // This one lets the Escape key close the menu while it is open.
  // The function returned at the end is a "cleanup": it removes the listener
  // when the menu closes, so we never leave listeners piling up.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // A link is "active" when we are on that page or any page below it.
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo priority />

        {/* The menu button, only visible on phones. aria-expanded tells screen readers if the menu is open. */}
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? 'close' : 'menu'} size={26} />
        </button>

        <nav id="primary-nav" className={`nav${open ? ' nav--open' : ''}`} aria-label="Primary">
          {/* "Contact" is left out of the list because the gold button below already goes there. */}
          {NAV.filter((item) => item.href !== '/contact').map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav__link${isActive(item.href) ? ' nav__link--active' : ''}`}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn--gold btn--sm nav__cta">
            Get a free quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
