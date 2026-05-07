interface SectionHeadProps {
  num: string;
  title: string;
}

export default function SectionHead({ num, title }: SectionHeadProps) {
  return (
    <div className="mb-12 flex items-center gap-4">
      <span className="font-mono text-sm text-[var(--accent)]">{num}</span>
      <h2 className="font-serif text-2xl font-bold text-[var(--t-primary)]">{title}</h2>
      <div className="h-px flex-1 bg-[var(--border)]" />
    </div>
  );
}
