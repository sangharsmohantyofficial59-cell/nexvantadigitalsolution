/**
 * components/Icon.tsx
 * ---------------------------------------------------------------
 * A small set of line icons drawn as SVG (a format that stays sharp at any
 * size and can take any colour). Instead of installing an icon library, which
 * would make the site heavier, we keep the few shapes we need right here.
 *
 * Usage:  <Icon name="globe" size={28} />
 * The icon uses `currentColor`, which means it automatically takes the text
 * colour of whatever it sits inside, so CSS controls its colour.
 */
import type { IconName } from '@/lib/site';

/**
 * Each entry holds the SVG shapes for one icon, drawn on a 24 by 24 grid.
 * "path" draws a line or curve described by a short command string;
 * "circle" and "rect" draw the shapes their names suggest.
 */
const SHAPES: Record<IconName, JSX.Element> = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" />
    </>
  ),
  app: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" />,
  megaphone: (
    <>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
      <path d="M15 9a4 4 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.5L3 21z" />
      <path d="M9 9.5c.5 2 2.5 4 5 5l1.5-1.5-2-1-1 .8c-.8-.4-1.6-1.2-2-2l.8-1-1-2L9 9.5z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  heart: <path d="M12 20s-8-4.7-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.3 12 20 12 20z" />,
  handshake: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M2 20a7 7 0 0 1 14 0" />
      <path d="M16 14a5 5 0 0 1 6 5" />
    </>
  ),
};

/**
 * Icon: draws the chosen icon.
 *  - name: which icon (the list of valid names lives in lib/site.ts as IconName)
 *  - size: width and height in pixels (default 24)
 * `aria-hidden` hides the icon from screen readers, because icons here are
 * decoration; the nearby text already says what the thing is.
 */
export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {SHAPES[name]}
    </svg>
  );
}
