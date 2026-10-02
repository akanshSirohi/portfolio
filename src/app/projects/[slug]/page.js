import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../data/projects";
import { Header, Footer } from "../../components/site-chrome";
import { ProjectVisual } from "../../components/project-visual";
import { Arrow } from "../../components/icons";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — Akansh Sirohi`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <>
      <Header />
      <main id="main" className="project-detail">
        <Link href="/#work" className="page-back mono">
          <Arrow /> ALL WORK
        </Link>
        <div className="detail-intro">
          <div>
            <p className="eyebrow">{project.kind}</p>
            <h1>
              {project.title}
              <span className="accent">.</span>
            </h1>
            <p>{project.description}</p>
            <div className="project-tags mono">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="detail-links">
              {project.live && (
                <a
                  className="button button-dark"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.liveLabel}
                  <Arrow diagonal />
                </a>
              )}
              {project.github && (
                <a
                  className="text-link"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore the source
                  <Arrow diagonal />
                </a>
              )}
            </div>
          </div>
          <div className="detail-art">
            <ProjectVisual slug={project.slug} />
          </div>
        </div>
        <div className="detail-content">
          <h2>{project.headline}</h2>
          <p>{project.body}</p>
          <ul>
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          {project.note && <p className="project-note">{project.note}</p>}
          <Link href={`/projects/${next.slug}`} className="project-next">
            <span>
              <span className="mono">NEXT EXPLORATION</span>
              {next.title}
            </span>
            <Arrow diagonal />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
