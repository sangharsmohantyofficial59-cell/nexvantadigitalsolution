/**
 * components/Logo.tsx
 * ---------------------------------------------------------------
 * The NEXVANTA logo, wrapped in a link back to the home page.
 *
 * We use Next.js's <Image> instead of a plain <img> because it automatically
 * serves a smaller, modern-format copy of the picture to each device,
 * which makes pages load faster.
 */
import Image from 'next/image';
import Link from 'next/link';

/**
 * Logo
 *  - priority: set true for the logo in the header. It tells the browser to
 *    load this image first because it is visible immediately.
 *  - width/height: the real size of the image file. They let the browser
 *    reserve the right amount of space before the image arrives, which stops
 *    the page from jumping around while loading.
 *  - alt: the text read by screen readers and shown if the image fails.
 */
export function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <Link href="/" className="logo" aria-label="NEXVANTA, go to home page">
      <Image
        src="/logo.png"
        alt="NEXVANTA Digital Solutions and Technology logo"
        width={900}
        height={267}
        priority={priority}
        className="logo__img"
      />
    </Link>
  );
}
