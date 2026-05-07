const stats = [
  { value: "-96%", label: "CI/CD 构建耗时", detail: "5m13s → 12s" },
  { value: "-90%", label: "首屏资源体积", detail: "11MB → ~1MB" },
  { value: "-48%", label: "Docker 镜像体积", detail: "1.33GB → 691MB" },
];

export default function Stats() {
  return (
    <section className="border-y border-[var(--border)] px-6 py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group text-center transition-colors"
          >
            <p className="font-serif text-5xl font-bold text-[var(--accent)] transition-transform group-hover:scale-110">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--t-primary)]">
              {stat.label}
            </p>
            <p className="mt-1 font-mono text-xs text-[var(--t-dim)]">
              {stat.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
