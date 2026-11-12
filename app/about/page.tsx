/**
 * app/about/page.tsx  ->  the ABOUT page, at "/about"
 * ---------------------------------------------------------------
 * Tells the story of the company and its values, without naming individuals.
 * To add a team section later, add a "Team" block here using real names and photos.
 */
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { BRAND } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/lib/site';
import { CtaBand } from '@/components/CtaBand';

export const metadata: Metadata = buildMetadata({
  title: 'About NEXVANTA',
  description:
    'NEXVANTA is a Bhubaneswar-based team of developers, digital marketers and client managers building premium websites and web apps for growing businesses.',
  path: '/about',
});

/** Our four working values. Each has an icon, a short title and one sentence. */
const VALUES: { title: string; text: string; icon: IconName }[] = [
  { title: 'Clarity', text: 'Plain language, clear scope and honest advice, from the first call to the final handover.', icon: 'search' },
  { title: 'Craft', text: 'Careful design and clean code, because details are what make a business look professional.', icon: 'layers' },
  { title: 'Care', text: 'We treat your business, your customers and your data with the respect we would want for our own.', icon: 'heart' },
  { title: 'Commitment', text: 'We stay with you after launch, with maintenance and marketing that keep your results growing.', icon: 'handshake' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A digital team that builds, launches and grows with you"
        lead={`${BRAND.fullName} is a focused team of developers, digital marketers and client managers based in ${BRAND.city}, ${BRAND.region}.`}
        crumbs={[{ name: 'About', href: '/about' }]}
      />

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Our story</p>
            <h2>Why NEXVANTA exists</h2>
          </div>
          <div className="prose">
            <p>
              Many businesses know they need a strong online presence, but face a confusing choice: a designer for the look, a
              developer for the code, another person for marketing, and nobody responsible for the whole picture.
            </p>
            <p>
              NEXVANTA brings those pieces together. We combine web development, design and digital marketing in one team, so your
              website is not just beautiful, but fast, secure, easy to find and built to bring in customers.
            </p>
            <p>
              We are especially passionate about helping clinics, local businesses and professionals, with websites and web apps that
              replace guesswork and paperwork with something clear and dependable.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">What guides us</p>
            <h2>Four values behind every project</h2>
          </div>
          <div className="grid grid--4">
            {VALUES.map((value) => (
              <div key={value.title} className="card">
                <span className="card__icon">
                  <Icon name={value.icon} size={26} />
                </span>
                <h3 className="card__title card__title--sm">{value.title}</h3>
                <p className="card__text">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Where we are</p>
            <h2>Based in Bhubaneswar, working with clients anywhere</h2>
          </div>
          <div className="prose">
            <p>
              Our team is based in {BRAND.city}, {BRAND.region}. Projects are run online with clear milestones, video calls and
              regular updates, so we can work with businesses across the country as comfortably as with those next door.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
