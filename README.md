# NEXVANTA Website

Website for **NEXVANTA Digital Solutions & Technology**: premium websites, web apps, landing pages, portfolios, maintenance and digital marketing. Built with Next.js, TypeScript and Three.js, in the maroon and gold colours of the NEXVANTA logo.

Every code file has plain-language comments that explain what each function and call does, so you can read the code top to bottom and explain it to anyone.

---

## 1. Run it on your computer

You need **Node.js 18.18 or newer** (https://nodejs.org). Then, in this folder:

```bash
npm install          # downloads the libraries listed in package.json (first time only)
npm run dev          # starts the site at http://localhost:3000
```

Other commands:

| Command             | What it does                                                          |
| ------------------- | --------------------------------------------------------------------- |
| `npm run dev`       | Development mode. Changes appear instantly in the browser.            |
| `npm run build`     | Builds the fast, optimised production version and reports any errors. |
| `npm run start`     | Runs the production build locally (run `build` first).                |
| `npm run lint`      | Checks the code for common mistakes.                                  |
| `npm run typecheck` | Checks that all TypeScript types are consistent.                      |

> Please run `npm run build` once after installing. It is the final check that everything fits together.

---

## 2. What to change before going live

Almost everything you will want to change is in **one file: `lib/site.ts`**.

1. **Contact details.** Replace the placeholder phone, WhatsApp number and email in `CONTACT`.
2. **Social links.** Fill in `href` for each entry in `SOCIALS`. Empty ones stay hidden.
3. **Project screenshots.** Save a picture (about 1280 x 800) in `public/work/`, then add `image: '/work/your-file.png'` to the project in `PROJECTS`. Until then a branded placeholder shows.
4. **Project links.** Add `link: 'https://...'` to any project that is public.
5. **Website address.** Set `NEXT_PUBLIC_SITE_URL` (see section 4) to your real address.
6. **Privacy policy.** Have a legal professional review `app/privacy-policy/page.tsx`.

---

## 3. Configure the contact form

The contact form sends enquiries from the Next.js server to a Google Apps Script
Web App. The Apps Script URL is intentionally blank until that Web App is
deployed. Copy `.env.example` to `.env.local`; keep
`GOOGLE_APPS_SCRIPT_URL` and `GOOGLE_APPS_SCRIPT_SECRET` server-only, and set
them in the deployment environment after setup. Configure `CONTACT_RECEIVER`
as the fixed business notification recipient in Apps Script; visitors cannot
choose or override the recipient.

Until the URL and shared secret are configured, `/api/contact` returns a
configuration error and the form does not show a success message.

After deploying the Apps Script Web App:

1. Configure its shared secret to match `GOOGLE_APPS_SCRIPT_SECRET`.
2. Set `GOOGLE_APPS_SCRIPT_URL` to the deployed HTTPS Web App URL.
3. Configure the Apps Script to record the enquiry and return JSON confirming
   the enquiry ID and business notification delivery. Treat `enquiryId` as
   an idempotency key so retries do not create duplicate records or alerts.
4. Restart `npm run dev` locally or redeploy after setting production variables.
5. Submit a test enquiry and verify the sheet entry and business email.

---

## 4. Put it online with Vercel (free)

1. Upload this folder to a new **GitHub** repository (`.env.local` is excluded automatically).
2. Go to https://vercel.com, choose **Add New > Project**, and import the repository. Vercel detects Next.js automatically.
3. Under **Environment Variables**, add the variables from `.env.example`. Set `NEXT_PUBLIC_SITE_URL` to your Vercel address first (for example `https://nexvanta.vercel.app`); keep the Apps Script URL and secret private.
4. Press **Deploy**. Every future `git push` redeploys the site automatically.
5. When you buy a domain, add it in **Vercel > Project > Settings > Domains**, then update `NEXT_PUBLIC_SITE_URL` and redeploy. Next, add the site in **Google Search Console** and submit `/sitemap.xml`.

---

## 5. Pages and their web addresses

In the Next.js "App Router", **folders inside `app/` become web addresses**, and a file named `page.tsx` is the page.

| Address                      | File                                          |
| ---------------------------- | --------------------------------------------- |
| `/`                          | `app/page.tsx` (Home)                         |
| `/services`                  | `app/services/page.tsx`                       |
| `/services/websites` etc.    | `app/services/[slug]/page.tsx` (one file, six pages) |
| `/work`                      | `app/work/page.tsx`                           |
| `/industries`                | `app/industries/page.tsx`                     |
| `/industries/dental-clinics` | `app/industries/dental-clinics/page.tsx`      |
| `/process-pricing`           | `app/process-pricing/page.tsx`                |
| `/about`                     | `app/about/page.tsx`                          |
| `/contact`                   | `app/contact/page.tsx`                        |
| `/privacy-policy`            | `app/privacy-policy/page.tsx`                 |
| any unknown address          | `app/not-found.tsx` (custom 404)              |
| `/sitemap.xml`               | `app/sitemap.ts` (generated)                  |
| `/robots.txt`                | `app/robots.ts` (generated)                   |
| `/api/contact`               | `app/api/contact/route.ts` (form handler)     |

## 6. Folder map: what every file is for

```
nexvanta-site/
  app/
    layout.tsx            Frame around every page: fonts, header, footer, default SEO
    globals.css           ALL styling (colours, layout, buttons, mobile rules)
    icon.png, apple-icon.png   Favicon, made from the logo's "N"
    ...pages listed above
  components/
    Header.tsx            Top menu (client component: mobile menu open/close)
    Footer.tsx            Bottom links, contact, socials
    Logo.tsx              Logo image linking to home
    Hero3D.tsx            The Three.js gold 3D shape
    HeroScene.tsx         Loads Hero3D lazily, only in the browser
    ContactForm.tsx       Quote form (client component, sends to /api/contact)
    PageHero.tsx          Maroon banner with the page's one h1 and breadcrumbs
    Breadcrumbs.tsx       Home / Page trail, plus structured data for Google
    JsonLd.tsx            Adds structured data (invisible info for search engines)
    ServiceCard.tsx, ProjectCard.tsx, PlanCards.tsx, Steps.tsx, FaqList.tsx
    BrowserMock.tsx       Drawn browser window used as a visual
    CtaBand.tsx           "Get a free quote" band
    WhatsAppButton.tsx    Floating WhatsApp button
    Icon.tsx              Small set of line icons
  lib/
    site.ts               ALL CONTENT: contact, services, projects, FAQ, packages
    seo.ts                Builds each page's title, description, share preview, schema
    links.ts              Builds phone, email and WhatsApp links
  public/
    logo.png              Logo
    og.png                Share image (WhatsApp, Facebook, LinkedIn previews)
    work/                 Put project screenshots here
  next.config.mjs         Security headers and framework settings
  package.json            Libraries and commands
  tsconfig.json           TypeScript settings
  .env.example            Names of the secret settings you need
```

---

## 7. Key ideas, in plain words (for explaining the code)

- **Next.js** is a framework built on React. It builds pages on the server before sending them, so they load fast and Google can read them easily.
- **Server component vs client component.** By default a component is built once on the server and sent as plain HTML. A file starting with `'use client'` also runs in the browser, which is only needed when something reacts to clicks or typing (the menu, the form, the 3D shape).
- **Metadata.** Each page exports a title and description. Google uses them in search results, and WhatsApp uses them for link previews. `lib/seo.ts` builds them in one consistent way.
- **Canonical tag.** Tells Google the official address of each page so duplicates do not compete.
- **Structured data (JSON-LD).** Invisible information (business details, breadcrumbs, FAQs, services) in a standard format that lets Google show richer results.
- **Dynamic route `[slug]`.** One file produces many pages. `generateStaticParams` lists the pages, `generateMetadata` gives each its own title.
- **Lazy loading.** `HeroScene.tsx` loads Three.js only after the page appears, so the first view is fast.
- **Three.js.** A library for 3D in the browser. A Scene (stage), Camera (viewpoint) and Renderer (draws to a canvas) show Geometry (shapes) with Materials (looks). Details are explained line by line in `components/Hero3D.tsx`.
- **API route.** `app/api/contact/route.ts` runs only on the server, so it can use the secret Resend key safely. It checks the origin, limits repeat requests, blocks robots with a hidden "honeypot" field, validates every field and escapes the text before emailing.
- **Environment variables.** Secret or changeable settings kept outside the code (`.env.local` locally, Vercel settings online).
- **Security headers.** Set in `next.config.mjs`; they instruct browsers to block clickjacking, content sniffing and similar attacks.

---

## 8. Website checklist status

| Item                                   | Status                                                             |
| -------------------------------------- | ------------------------------------------------------------------ |
| Custom domain                          | Ready: add in Vercel, then update `NEXT_PUBLIC_SITE_URL`          |
| A URL for every page                   | Done (16 addresses)                                                |
| Unique titles and meta descriptions    | Done, one per page                                                 |
| Canonical tags                         | Done                                                               |
| One h1 per page                        | Done                                                               |
| Proper 404 page                        | Done                                                               |
| sitemap.xml and robots.txt             | Done (generated)                                                   |
| Server-side rendering                  | Done (Next.js default)                                             |
| Internal links                         | Done (footer, cards, related services)                             |
| Favicon and share (OG) image           | Done, made from the logo                                           |
| Breadcrumbs and business schema        | Done (also Service and FAQ schema)                                 |
| Alt text                               | Done on all images                                                 |
| Production source maps off             | Done (`productionBrowserSourceMaps: false`)                        |
| Small JS bundles                       | Three.js is imported part by part and loaded lazily                |
| No purple gradients, em dashes, lorem  | Checked                                                            |
| Security headers, form protection      | Done                                                               |
| DPDP consent on the form               | Done (consent checkbox and privacy policy)                         |

## 9. Honest notes and next steps

- **Placeholders to replace:** phone, WhatsApp, email, social links, project screenshots, the real domain.
- **Rate limiting** in the form is held in server memory. It is a good first defence. For heavy traffic, move it to a shared store such as Upstash Redis.
- **Content-Security-Policy** is not set, because it needs a careful per-site setup. It is a good future hardening step.
- **Backups and load testing** from the Security and Scale list apply once you add a database (for example for the dental front desk app). This site has no database.
- Run `npm run build` and test the contact form once after setup, and check the site on a real phone.
