export interface SkillGroup {
  category: string;
  skills: string[];
}

interface SkillCloudProps {
  groups: SkillGroup[];
}

export default function SkillCloud({ groups }: SkillCloudProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <div
          key={group.category}
          className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 transition-all hover:shadow-lg hover:shadow-[var(--glow)]"
        >
          <span className="font-mono text-xs font-medium text-[var(--accent)]">
            {group.category}
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-[var(--bg-alt)] px-3 py-1 text-xs text-[var(--t-primary)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
