/**
 * app/work/page.tsx  ->  the WORK page, at "/work"
 * ---------------------------------------------------------------
 * Shows every project from lib/site.ts as a card. To add a project, add an
 * entry to the PROJECTS list there; this page updates by itself.
 */
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PROJECTS } from '@/lib/site';
import { PageHero } from '@/components/PageHero';
import { ProjectCard } from '@/components/ProjectCard';
import { CtaBand } from '@/components/CtaBand';

export const metadata: Metadata = buildMetadata({
  title: 'Our Work: Websites, Web Apps and Portfolios',
  description:
    'See websites, web apps, 3D portfolios and landing pages built by NEXVANTA, including a dental clinic website with a front desk app.',
  path: '/work',
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Websites and systems built to perform"
        lead="A selection of projects across healthcare, personal brands, portfolios and new businesses."
        crumbs={[{ name: 'Work', href: '/work' }]}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want a result like this for your business?"
        text="Share your idea and we will show you how we would approach it."
      />
    </>
  );
}
