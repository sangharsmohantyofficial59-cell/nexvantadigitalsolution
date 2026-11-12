'use client';
/**
 * components/HeroScene.tsx
 * ---------------------------------------------------------------
 * A thin wrapper that loads the 3D hero (Hero3D.tsx) only in the browser,
 * and only after the main page has appeared.
 *
 * WHY?
 * Three.js is a fairly large library. If it were bundled into the main page,
 * every visitor would wait for it before seeing anything. With `dynamic()`
 * (called "lazy loading"), the text and buttons appear instantly and the 3D
 * shape fades in a moment later. `ssr: false` means "do not try to build this
 * on the server", because a server has no screen or graphics card.
 */
import dynamic from 'next/dynamic';

const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => null, // show nothing while it loads
});

export function HeroScene() {
  // aria-hidden: the 3D shape is decoration, so screen readers skip it.
  return (
    <div className="hero__scene" aria-hidden="true">
      <Hero3D />
    </div>
  );
}
