export interface Experience {
  period: string;
  company: string;
  role: string;
  description: string;
}

interface TimelineProps {
  experiences: Experience[];
}

export default function Timeline({ experiences }: TimelineProps) {
  return (
    <div className="relative pl-8">
      {/* Vertical line */}
      <div className="absolute left-3 top-2 bottom-2 w-px bg-[var(--border)]" />

      <div className="flex flex-col gap-12">
        {experiences.map((exp, i) => (
          <div key={i} className="relative">
            {/* Dot */}
            <div className="absolute -left-8 top-1.5 flex h-6 w-6 items-center justify-center">
              <div className="h-2.5 w-2.5 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)]" />
            </div>

            {/* Content */}
            <div>
              <span className="font-mono text-xs text-[var(--accent)]">
                {exp.period}
              </span>
              <h3 className="mt-1 font-serif text-xl font-bold text-[var(--t-primary)]">
                {exp.company}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-[var(--t-dim)]">
                {exp.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--t-secondary)]">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
