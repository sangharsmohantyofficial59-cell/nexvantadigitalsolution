/**
 * next.config.mjs
 * ---------------------------------------------------------------
 * Settings for the Next.js framework itself.
 * Everything here runs on the server at build/start time, never in the browser.
 */

// Security headers sent with every response. They tell the browser to be
// stricter about what this site is allowed to do, which blocks whole
// classes of attacks (clickjacking, MIME sniffing, and so on).
const securityHeaders = [
  // Forces HTTPS for two years, including subdomains.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Stops other websites from putting our pages inside an invisible frame (clickjacking).
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Stops the browser from guessing file types, which can be abused to run hidden scripts.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // When a visitor clicks a link to another site, only share our domain, not the full page address.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Switches off browser features we never use (camera, microphone, location).
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Extra warnings in development to catch mistakes early. No effect in production.
  reactStrictMode: true,

  // Removes the "X-Powered-By: Next.js" header so we do not advertise our tech stack.
  poweredByHeader: false,

  // Do not publish readable source code maps in production (checklist item).
  productionBrowserSourceMaps: false,

  // "async headers()" lets us attach the headers above to every URL ("/:path*").
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
