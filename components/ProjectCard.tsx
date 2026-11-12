/**
 * components/ProjectCard.tsx
 * ---------------------------------------------------------------
 * One project in the Work section: a screenshot (or a branded placeholder
 * until a screenshot is added), the project name, a status badge, a short
 * description, tags and, if the site is public, a "Visit website" link.
 */
import Image from 'next/image';
import type { Project } from '@/lib/site';
import { Icon } from './Icon';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project">
      <div className="project__media">
        {project.image ? (
          // A real screenshot. Width and height reserve space so the page does not jump while it loads.
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width={1280}
            height={800}
            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px"
          />
        ) : (
          // No screenshot yet: show the initials on a branded background.
          <div className="project__placeholder" role="img" aria-label={`Preview placeholder for ${project.title}`}>
            <span className="project__initials">{project.initials}</span>
            <span className="project__soon">Screenshot coming soon</span>
          </div>
        )}
        <span className="badge">{project.status}</span>
      </div>

      <div className="project__body">
        <p className="eyebrow">{project.category}</p>
        <h3 className="project__title">{project.title}</h3>
        <p className="project__text">{project.summary}</p>

        <ul className="tags" aria-label="Technologies and features">
          {project.tags.map((tag) => (
            <li key={tag} className="pill">
              {tag}
            </li>
          ))}
        </ul>

        {project.link && (
          <a className="text-link" href={project.link} target="_blank" rel="noopener noreferrer">
            Visit website <Icon name="arrow" size={18} />
          </a>
        )}
      </div>
    </article>
  );
}
