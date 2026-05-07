export interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  href?: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const content = (
    <div className="group block overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--glow)]">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-[var(--bg-alt)] to-[var(--bg)]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-[var(--accent)] opacity-10 blur-xl" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-[var(--t-primary)]">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--t-secondary)]">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--border)] px-2.5 py-0.5 font-mono text-xs text-[var(--t-dim)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (project.href) {
    return (
      <a href={project.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
