/**
 * lib/site.ts
 * ---------------------------------------------------------------
 * THE ONE FILE TO EDIT FOR CONTENT.
 *
 * Every page reads its text, links and lists from here. If you want to change
 * a phone number, add a project, or reword a service, change it in this file
 * and the whole website updates. Nothing in this file runs any logic; it is
 * just organised data ("constants") that other files import.
 *
 * TypeScript note: the `type` blocks below describe the SHAPE of each item
 * (for example, a Service must have a slug, a title, and so on). If you forget
 * a field, your editor warns you before the site can break.
 */

/* ------------------------------------------------------------------ */
/* 1. Basics                                                            */
/* ------------------------------------------------------------------ */

/**
 * The public web address, with no trailing slash. It is used for canonical
 * tags, the sitemap and share images. It is read from an environment variable
 * so you can change it without touching code. The fallback below is only a
 * placeholder until you deploy.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nexvanta.vercel.app').replace(/\/$/, '');

export const BRAND = {
  name: 'NEXVANTA',
  fullName: 'NEXVANTA Digital Solutions & Technology',
  tagline: 'Premium websites. Smarter digital growth.',
  description:
    'NEXVANTA builds premium websites, web apps, landing pages and portfolios, then grows your business with maintenance and digital marketing. Bhubaneswar, Odisha.',
  city: 'Bhubaneswar',
  region: 'Odisha',
  country: 'IN',
} as const;

/**
 * PLACEHOLDER CONTACT DETAILS.
 * TODO: replace every value below with the real ones before going live.
 *  - phoneDisplay : how the number looks on screen
 *  - phoneHref    : same number with country code and no spaces (used by "tel:" links)
 *  - whatsapp     : number for wa.me links, digits only, with country code (no + sign)
 *  - email        : public business email
 */
export const CONTACT = {
  phoneDisplay: '+91 90000 00000',
  phoneHref: '+919000000000',
  whatsapp: '919000000000',
  email: 'nexvantadigitalsolutions@gmail.com',
  whatsappMessage: 'Hello NEXVANTA, I would like to discuss a project.',
} as const;

/**
 * Social media links. Fill in `href` when you have them.
 * Any entry with an empty href is automatically hidden in the footer and
 * left out of the search-engine data, so it is safe to leave blanks.
 */
export const SOCIALS: { label: string; href: string }[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/nexvanta_digital_solutions?obrf=MXJzNWpma3NjcnQzMw==' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/nexvanta' },
  { label: 'Facebook', href: 'https://www.facebook.com/nexvanta' },
  { label: 'YouTube', href: 'https://www.youtube.com/@NEXVANTA' },
];

/* ------------------------------------------------------------------ */
/* 2. Navigation                                                        */
/* ------------------------------------------------------------------ */

export const NAV: { label: string; href: string }[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Industries', href: '/industries' },
  { label: 'Process & Pricing', href: '/process-pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/* ------------------------------------------------------------------ */
/* 3. Services (each one gets its own page at /services/<slug>)         */
/* ------------------------------------------------------------------ */

export type IconName =
  | 'globe'
  | 'app'
  | 'target'
  | 'user'
  | 'wrench'
  | 'megaphone'
  | 'check'
  | 'arrow'
  | 'menu'
  | 'close'
  | 'phone'
  | 'mail'
  | 'whatsapp'
  | 'pin'
  | 'shield'
  | 'bolt'
  | 'search'
  | 'layers'
  | 'heart'
  | 'handshake';

export type Service = {
  slug: string; // becomes the URL: /services/<slug>
  title: string; // short name used on cards and in menus
  icon: IconName;
  summary: string; // one sentence for the card
  headline: string; // the big H1 on the service page
  intro: string; // opening paragraph on the service page
  includes: string[]; // "What is included" checklist
  outcomes: { title: string; text: string }[]; // three benefit blocks
  idealFor: string[]; // who this suits
};

export const SERVICES: Service[] = [
  {
    slug: 'websites',
    title: 'Business Websites',
    icon: 'globe',
    summary: 'Fast, search-ready websites that present your business with confidence and turn visitors into enquiries.',
    headline: 'Business websites that earn trust and bring in enquiries',
    intro:
      'Your website is often the first thing a customer sees. We design and build multi-page websites that load quickly, read clearly on every phone, and guide visitors toward one action: contacting you.',
    includes: [
      'Custom design in your own brand colours',
      'Mobile-first layouts for every screen size',
      'Search-ready structure: titles, descriptions, schema and sitemap',
      'Contact forms, WhatsApp and call buttons',
      'Google Maps and Google Business Profile linking',
      'Speed and security setup at launch',
    ],
    outcomes: [
      { title: 'A clear first impression', text: 'Visitors understand what you do and why you are trustworthy within seconds.' },
      { title: 'Easier to find', text: 'Search-friendly pages help local customers discover you on Google.' },
      { title: 'Built to convert', text: 'Every page leads to a clear next step, so visits become conversations.' },
    ],
    idealFor: [
      'Clinics and healthcare practices',
      'Shops and local service businesses',
      'Consultants and professionals',
      'Schools, institutes and organisations',
    ],
  },
  {
    slug: 'web-apps',
    title: 'Web Apps',
    icon: 'app',
    summary: 'Booking systems, front desk tools, dashboards and portals that run the daily work of your business.',
    headline: 'Web apps that replace paperwork and manual follow-ups',
    intro:
      'When a spreadsheet or a notebook stops being enough, a custom web app takes over. We build secure, easy-to-use tools for bookings, records, approvals and reporting, so your team spends less time on admin.',
    includes: [
      'Staff login with role-based access',
      'Appointment and booking management',
      'Customer or patient records',
      'Dashboards and simple reports',
      'Email or WhatsApp notifications where suitable',
      'Secure database, backups and access rules',
    ],
    outcomes: [
      { title: 'Less manual work', text: 'Repeated tasks are handled by the system, not by your staff.' },
      { title: 'One place for your data', text: 'Everyone sees the same up-to-date information, from any device.' },
      { title: 'Secure by design', text: 'Logins, permissions and backups are planned from day one, not added later.' },
    ],
    idealFor: [
      'Clinics managing appointments and records',
      'Service businesses that take bookings',
      'Teams tracking leads and follow-ups',
      'Institutes handling enquiries and admissions',
    ],
  },
  {
    slug: 'landing-pages',
    title: 'Landing Pages',
    icon: 'target',
    summary: 'Focused single pages for campaigns, launches and offers, built around one clear action.',
    headline: 'Landing pages that turn attention into action',
    intro:
      'A landing page has one job. We write and design it around a single offer, remove distractions, and make the next step obvious, whether that is a call, a form or a WhatsApp message.',
    includes: [
      'Message and layout planned around one goal',
      'Fast-loading, mobile-first design',
      'Lead form or WhatsApp click-to-chat',
      'Ready for ads and analytics tracking',
      'Clear sections: offer, proof, process and FAQ',
      'Easy to update for new campaigns',
    ],
    outcomes: [
      { title: 'Clear focus', text: 'One page, one message, one action for the visitor to take.' },
      { title: 'Ready for ads', text: 'Built so that paid traffic lands on something fast and relevant.' },
      { title: 'Quick to launch', text: 'A small scope means you can go live and start learning sooner.' },
    ],
    idealFor: [
      'New product or service launches',
      'Seasonal offers and events',
      'Ad campaigns on Google or social media',
      'Admission and enrolment drives',
    ],
  },
  {
    slug: 'portfolios',
    title: 'Portfolio Websites',
    icon: 'user',
    summary: 'Elegant portfolios for professionals, creators and artists who want their work to stand out.',
    headline: 'Portfolio websites that present your work with confidence',
    intro:
      'Your portfolio is your pitch. We build polished sites that showcase your work, tell your story and make it simple for the right people to reach you, from clean classic layouts to immersive 3D experiences.',
    includes: [
      'Gallery and case study layouts',
      'Optional 3D and scroll-driven effects',
      'About, services and contact sections',
      'Social media and showreel links',
      'Downloadable profile or CV',
      'Your own domain, ready for a matching email address',
    ],
    outcomes: [
      { title: 'Stand apart', text: 'A distinctive site makes you memorable next to template-based profiles.' },
      { title: 'Always up to date', text: 'Add new work easily, without waiting for a designer.' },
      { title: 'Easy to share', text: 'One clean link for your bio, your proposals and your social profiles.' },
    ],
    idealFor: [
      'Actors, artists and creators',
      'Consultants, coaches and advocates',
      'Architects, designers and photographers',
      'Students and early-career professionals',
    ],
  },
  {
    slug: 'maintenance',
    title: 'Website Maintenance',
    icon: 'wrench',
    summary: 'Updates, fixes, security checks and hosting care so your site stays fast and online.',
    headline: 'Website care so your site stays fast, secure and current',
    intro:
      'Launching is only the start. Software ages, content changes and small problems grow if nobody looks. Our maintenance plans keep your website healthy, so you can focus on running your business.',
    includes: [
      'Content and image updates',
      'Software and security updates',
      'Backups and restore checks',
      'Uptime and speed monitoring',
      'Bug fixes and small improvements',
      'A short summary of the work done each month',
    ],
    outcomes: [
      { title: 'Fewer surprises', text: 'Problems are caught early, before customers notice them.' },
      { title: 'Faster fixes', text: 'One trusted team already knows your site and can act quickly.' },
      { title: 'Peace of mind', text: 'Updates and backups are handled, so nothing is left to chance.' },
    ],
    idealFor: [
      'Any business with a live website',
      'Sites built by someone else that need care',
      'Web apps with real users',
      'Owners with no time for technical upkeep',
    ],
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    icon: 'megaphone',
    summary: 'Social media, content and campaigns that bring the right customers to your door.',
    headline: 'Digital marketing that builds presence and brings customers',
    intro:
      'A good website needs visitors. We manage your social media, create posts and reels, and improve your search visibility, so people find you, remember you and get in touch.',
    includes: [
      'Social media account setup and management',
      'Post, poster and reel creation',
      'Video editing with captions',
      'A content calendar planned around your business',
      'Search engine optimisation (SEO) basics',
      'Google Business Profile support',
    ],
    outcomes: [
      { title: 'Consistent presence', text: 'Regular, professional content keeps your brand visible.' },
      { title: 'Local reach', text: 'Content aimed at the people and places that matter to your business.' },
      { title: 'A voice that sounds like you', text: 'We learn how you speak, so your posts feel genuine.' },
    ],
    idealFor: [
      'Local shops and service businesses',
      'Clinics and wellness practices',
      'Professionals building a personal brand',
      'Institutes and organisations growing their reach',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 4. Work (case studies)                                               */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  title: string;
  category: string;
  status: string; // short badge text, for example "Live" or "In development"
  summary: string;
  tags: string[];
  link?: string; // live website address, if public
  image?: string; // screenshot path, for example "/work/sanjib.png" (file goes in /public/work)
  initials: string; // shown on the placeholder until a screenshot is added
};

/**
 * HOW TO ADD A SCREENSHOT:
 *  1. Save the picture (about 1280x800, PNG or JPG) inside the "public/work" folder.
 *  2. Add `image: '/work/your-file.png'` to the project below.
 * Until then, a clean branded placeholder is shown.
 */
export const PROJECTS: Project[] = [
  {
    slug: 'dental-clinic',
    title: 'Dental clinic website and front desk app',
    category: 'Healthcare',
    status: 'Demo available',
    summary:
      'A patient-facing website with online appointment requests, paired with a secure front desk app for bookings, time slots and patient records. The demo uses a fictional clinic.',
    tags: ['Website', 'Web app', 'Bookings', 'Secure login'],
    initials: 'DC',
  },
  {
    slug: 'mani-jal',
    title: 'Mani Jal, packaged drinking water brand',
    category: 'Cinematic 3D website',
    status: 'In development',
    summary:
      'A premium scroll-driven 3D website for a new packaged water brand, built with React, Three.js and GSAP, with a bulk enquiry form for hotels, caterers and retailers.',
    tags: ['3D', 'Three.js', 'Scroll animation', 'Enquiry form'],
    initials: 'MJ',
  },
  {
    slug: 'consultant-website',
    title: 'Professional website for a consultant and author',
    category: 'Personal brand website',
    status: 'Client project',
    summary:
      'A personal brand website for a project consultant, legal professional and author, with complete search optimisation: meta tags, schema, sitemap and robots file.',
    tags: ['Website', 'SEO', 'Schema', 'Personal brand'],
    link: 'https://sanjib-website.vercel.app/',
    initials: 'PW',
  },
  {
    slug: 'actor-portfolios',
    title: 'Immersive portfolio websites for actors',
    category: 'Portfolio websites',
    status: 'Delivered',
    summary:
      'Two scroll-driven 3D portfolio websites for actors, built with Next.js and React Three Fiber, ready for GitHub and Vercel deployment.',
    tags: ['3D', 'Next.js', 'Portfolio'],
    initials: 'AP',
  },
  {
    slug: 'portfolio-templates',
    title: 'Profession-specific portfolio templates',
    category: 'Templates',
    status: 'Product',
    summary:
      'Reusable portfolio website templates designed for different professions, so individuals can launch a polished personal site quickly and affordably.',
    tags: ['Templates', 'Portfolio', 'Quick launch'],
    initials: 'PT',
  },
  {
    slug: 'consulting-landing',
    title: 'Landing page for a digital and AI consultancy',
    category: 'Landing page',
    status: 'Live',
    summary:
      'An interactive landing page built around the journey Build, Brand, Automate and Grow, designed to explain a consulting offer in one scroll.',
    tags: ['Landing page', 'Interactive', 'Consulting'],
    link: 'https://sangharsmohanty.vercel.app/',
    initials: 'CL',
  },
];

/* ------------------------------------------------------------------ */
/* 5. Industries                                                        */
/* ------------------------------------------------------------------ */

export type Industry = { title: string; text: string; icon: IconName; href?: string };

export const INDUSTRIES: Industry[] = [
  {
    title: 'Dental clinics and healthcare',
    text: 'Patient-friendly websites, appointment requests and front desk apps for clinics.',
    icon: 'heart',
    href: '/industries/dental-clinics',
  },
  { title: 'Retail and local shops', text: 'Show your products, hours and location, and make it easy to call or message.', icon: 'pin' },
  { title: 'Professionals and consultants', text: 'Credible personal websites for advocates, coaches, consultants and advisors.', icon: 'handshake' },
  { title: 'Education and institutes', text: 'Course pages, admission enquiries and clear information for parents and students.', icon: 'layers' },
  { title: 'Food and hospitality', text: 'Menus, bookings and gallery pages for restaurants, cafes and stays.', icon: 'heart' },
  { title: 'Manufacturing and suppliers', text: 'Product catalogues and bulk enquiry forms for businesses that sell to businesses.', icon: 'app' },
  { title: 'Creators and artists', text: 'Portfolios for actors, designers, photographers and performers.', icon: 'user' },
  { title: 'Startups and new brands', text: 'Launch pages and brand websites that look established from day one.', icon: 'bolt' },
];

/* ------------------------------------------------------------------ */
/* 6. Why us, process, packages, FAQ                                    */
/* ------------------------------------------------------------------ */

export const WHY_US: { title: string; text: string; icon: IconName }[] = [
  { title: 'Fast by default', text: 'Lightweight pages that load quickly, even on slower mobile connections.', icon: 'bolt' },
  { title: 'Found on Google', text: 'Search-ready structure, schema and sitemaps built in from the start.', icon: 'search' },
  { title: 'Secure and reliable', text: 'Security headers, safe forms and careful access rules on every build.', icon: 'shield' },
  { title: 'Mobile first', text: 'Designed for the phone in your customer hand, then scaled up to desktop.', icon: 'app' },
  { title: 'Build and grow in one place', text: 'Development and digital marketing under one team, working to one plan.', icon: 'layers' },
  { title: 'Clear communication', text: 'Plain language, clear scope and regular updates, with no jargon.', icon: 'handshake' },
];

export const PROCESS: { title: string; text: string }[] = [
  { title: 'Discover', text: 'We listen to your goals, your customers and your budget, then agree a clear scope together.' },
  { title: 'Design', text: 'You see how your site will look before we build it, and you approve each step.' },
  { title: 'Build', text: 'We develop clean, fast pages with search-ready structure and mobile-first layouts.' },
  { title: 'Launch and grow', text: 'We go live, set up tracking, and support you with maintenance and marketing.' },
];

export type Plan = {
  name: string;
  suits: string;
  blurb: string;
  features: string[];
  highlight?: boolean;
};

/** Pricing is shown as "Contact for price" by design. Amounts are agreed after discovery. */
export const PLANS: Plan[] = [
  {
    name: 'Starter',
    suits: 'Landing pages and portfolios',
    blurb: 'A sharp, single-purpose page to launch an offer or present your work.',
    features: [
      'One focused page',
      'Mobile-first custom design',
      'Contact form and WhatsApp button',
      'Basic search setup',
      'Launch support',
    ],
  },
  {
    name: 'Business',
    suits: 'Multi-page business websites',
    blurb: 'A complete website for a clinic, shop or firm that wants to be found and trusted.',
    features: [
      'Multiple pages with their own web addresses',
      'Custom design in your brand colours',
      'Full search setup: schema, sitemap, meta tags',
      'Google Business Profile guidance',
      'Optional maintenance plan',
    ],
    highlight: true,
  },
  {
    name: 'Custom',
    suits: 'Web apps and complex projects',
    blurb: 'Tailor-made tools such as booking systems, dashboards and secure portals.',
    features: [
      'Planned around your workflow',
      'Secure logins and access rules',
      'Database, backups and reporting',
      'Integrations where needed',
      'Ongoing support and maintenance',
    ],
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: 'What do I need to get started?',
    a: 'Just a conversation. Tell us about your business and goals, and we will propose a clear scope and quote. Logos, photos and text can be collected as we go.',
  },
  {
    q: 'How long does a project take?',
    a: 'It depends on the size of the project. A landing page is much quicker than a web app. You will get a realistic timeline in your quote, after we understand the scope.',
  },
  {
    q: 'Do you help with the domain name and hosting?',
    a: 'Yes. We can guide you through choosing a domain and set up reliable hosting, so you do not need any technical knowledge.',
  },
  {
    q: 'Will my website work well on mobile phones?',
    a: 'Yes. Every site is designed for mobile first, because most visitors will find you on their phone.',
  },
  {
    q: 'Can you build a booking or patient record system?',
    a: 'Yes. We build secure web apps with staff logins, appointment management and records, planned around how your team already works.',
  },
  {
    q: 'What happens after the website goes live?',
    a: 'You can choose a maintenance plan for updates, security and backups, and add digital marketing to bring in visitors.',
  },
  {
    q: 'How does payment work?',
    a: 'Projects are usually split into milestones. The exact schedule is written into your quote, so there are no surprises.',
  },
  {
    q: 'Who owns the website after it is finished?',
    a: 'Ownership and handover terms are written clearly into every quote and agreement, so you always know where you stand.',
  },
];

/* ------------------------------------------------------------------ */
/* 7. Dental clinics page content                                       */
/* ------------------------------------------------------------------ */

export const DENTAL = {
  patientSite: [
    'Clear treatment pages for check-ups, cleaning, braces, implants and more',
    'Doctor and clinic profiles that build trust',
    'Online appointment request form and WhatsApp booking button',
    'Clinic address, opening hours and Google Maps',
    'Gallery of the clinic and team',
    'Your real Google reviews displayed, never invented ones',
  ],
  frontDesk: [
    'Appointment calendar with time slots',
    'Patient records in one searchable place',
    'Staff login with roles, for example doctor and receptionist',
    'Daily schedule view for the front desk',
    'Follow-up and reminder lists',
    'Simple reports for the clinic owner',
  ],
  security: [
    'The front desk app lives on its own private address, separate from the public site',
    'Staff-only login, with access rules for every kind of data',
    'Protection against tampering with bookings and records',
    'Regular backups of patient and appointment data',
    'Consent captured on forms, in line with India data protection rules (DPDP)',
  ],
};
