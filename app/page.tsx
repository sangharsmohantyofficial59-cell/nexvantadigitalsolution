/**
 * app/page.tsx  ->  the HOME PAGE, at the address "/"
 * ---------------------------------------------------------------
 * A file named page.tsx inside the app folder is the page for that address.
 * This page is a "server component": it is built on the server and sent as
 * finished HTML, which is fast and good for Google. The only parts that run
 * in the browser are the 3D shape (HeroScene) and the header menu.
 *
 * SECTIONS, TOP TO BOTTOM
 *   1. Hero (headline, buttons, 3D shape)
 *   2. Services strip
 *   3. Service cards
 *   4. Featured work: dental clinics
 *   5. More work
 *   6. Why NEXVANTA
 *   7. Process
 *   8. Industries
 *   9. Packages
 *  10. FAQ
 *  11. Call to action
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { BRAND, DENTAL, FAQ, INDUSTRIES, PROJECTS, SERVICES, WHY_US } from '@/lib/site';
import { HeroScene } from '@/components/HeroScene';
import { ServiceCard } from '@/components/ServiceCard';
import { ProjectCard } from '@/components/ProjectCard';
import { BrowserMock } from '@/components/BrowserMock';
import { Steps } from '@/components/Steps';
import { PlanCards } from '@/components/PlanCards';
import { FaqList } from '@/components/FaqList';
import { CtaBand } from '@/components/CtaBand';
import { Icon } from '@/components/Icon';

/**
 * Page metadata. For the home page we replace the title completely with
 * `title.absolute` (so the "| NEXVANTA" suffix is not added twice).
 */
export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Premium Websites and Web Apps in Bhubaneswar',
    description: BRAND.description,
    path: '/',
  }),
  title: { absolute: 'NEXVANTA | Premium Websites and Web Apps in Bhubaneswar' },
};

export default function HomePage() {
  // The first three projects after the featured dental one.
  const moreWork = PROJECTS.slice(1, 4);

  return (
    <>
      {/* 1. HERO */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--light">NEXVANTA — DIGITAL SOLUTIONS &amp; TECHNOLOGY</p>
            {/* The ONE h1 of the home page. */}
            <h1>Web Development, App Development &amp; Digital Solutions for Growing Businesses</h1>
            <p className="lead lead--light">
              NEXVANTA provides web development services, including custom website development and web application development, alongside
              mobile app development and business automation solutions. We help startups, small businesses and established organizations
              build a stronger digital presence with scalable, reliable and technology-driven solutions.
            </p>
            <div className="hero__buttons">
              <Link href="/contact" className="btn btn--gold btn--lg">
                Get a Free Consultation
              </Link>
              <Link href="/services" className="btn btn--outline-light btn--lg">
                Explore Our Services
              </Link>
            </div>
            <ul className="hero__badges">
              <li>
                <Icon name="bolt" size={18} /> Custom-Built Solutions
              </li>
              <li>
                <Icon name="search" size={18} /> Scalable Technology
              </li>
              <li>
                <Icon name="shield" size={18} /> Business-Focused Approach
              </li>
            </ul>
          </div>
          <HeroScene />
        </div>
      </section>

      {/* 2. SERVICES STRIP: one line listing everything we do */}
      <section className="strip" aria-label="Our services at a glance">
        <ul className="container strip__list">
          {[
            'Website Development',
            'App Development',
            'Business Solutions',
            'Project Reports',
            'IT Consulting',
            'Digital Marketing',
          ].map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </section>

      {/* 3. SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">What we do</p>
            <h2>One team for everything your business needs online</h2>
            <p className="lead">
              From your first website to ongoing growth, we handle design, development, upkeep and marketing, so you deal with one
              partner instead of many.
            </p>
          </div>
          <div className="grid grid--3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED WORK: dental clinics */}
      <section className="section section--ivory">
        <div className="container split">
          <div>
            <p className="eyebrow">Featured: healthcare</p>
            <h2>Websites and front desk apps for dental clinics</h2>
            <p className="lead">
              A calm, professional website that helps patients find and book you, plus a secure front desk app for appointments and
              patient records.
            </p>
            <ul className="checklist">
              {DENTAL.patientSite.slice(0, 4).map((item) => (
                <li key={item}>
                  <Icon name="check" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="button-row">
              <Link href="/industries/dental-clinics" className="btn btn--maroon">
                See the dental clinic solution
              </Link>
              <Link href="/work" className="btn btn--outline">
                View all work
              </Link>
            </div>
          </div>
          <BrowserMock />
        </div>
      </section>

      {/* 5. MORE WORK */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Selected work</p>
            <h2>Sites and systems we have built</h2>
          </div>
          <div className="grid grid--3">
            {moreWork.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <p className="section__more">
            <Link href="/work" className="text-link">
              See all projects <Icon name="arrow" size={18} />
            </Link>
          </p>
        </div>
      </section>

      {/* 6. WHY NEXVANTA */}
      <section className="section section--maroon">
        <div className="container">
          <div className="section__head section__head--light">
            <p className="eyebrow eyebrow--light">Why NEXVANTA</p>
            <h2>Built to look premium and perform like it</h2>
          </div>
          <div className="grid grid--3">
            {WHY_US.map((item) => (
              <div key={item.title} className="feature">
                <span className="feature__icon">
                  <Icon name={item.icon} size={26} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PROCESS */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">How we work</p>
            <h2>A clear path from first call to live website</h2>
          </div>
          <Steps />
        </div>
      </section>

      {/* 8. INDUSTRIES */}
      <section className="section section--sand">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Who we help</p>
            <h2>Industries we build for</h2>
          </div>
          <ul className="chips">
            {INDUSTRIES.map((industry) => (
              <li key={industry.title}>
                {industry.href ? <Link href={industry.href}>{industry.title}</Link> : <span>{industry.title}</span>}
              </li>
            ))}
          </ul>
          <p className="section__more">
            <Link href="/industries" className="text-link">
              Explore industries <Icon name="arrow" size={18} />
            </Link>
          </p>
        </div>
      </section>

      {/* 9. PACKAGES */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Packages</p>
            <h2>Choose the starting point that fits your goals</h2>
            <p className="lead">Every project is quoted after a short conversation, so you only pay for what you need.</p>
          </div>
          <PlanCards />
        </div>
      </section>

      {/* 10. FAQ: the first four questions; the full list is on the Process and Pricing page */}
      <section className="section section--ivory">
        <div className="container container--narrow">
          <div className="section__head">
            <p className="eyebrow">Questions</p>
            <h2>Frequently asked questions</h2>
          </div>
          <FaqList items={FAQ.slice(0, 4)} />
          <p className="section__more">
            <Link href="/process-pricing" className="text-link">
              More answers on process and pricing <Icon name="arrow" size={18} />
            </Link>
          </p>
        </div>
      </section>

      {/* 11. CALL TO ACTION */}
      <CtaBand />
    </>
  );
}
