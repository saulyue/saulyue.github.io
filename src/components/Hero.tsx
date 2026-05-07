export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-16">
      <div className="mx-auto w-full max-w-6xl">
        {/* Tag */}
        <div className="animate-fade-up">
          <span className="inline-block rounded-full border border-[var(--border)] px-4 py-1.5 font-mono text-xs text-[var(--accent)]">
            Frontend Engineer &middot; Tencent Cloud
          </span>
        </div>

        {/* Title */}
        <div className="mt-8 animate-fade-up-delay-1">
          <h1 className="font-serif text-6xl font-bold leading-tight tracking-tight text-[var(--t-primary)] md:text-8xl">
            乐祥孚
          </h1>
          <p className="mt-2 font-mono text-2xl text-[var(--t-dim)] md:text-3xl">
            saulyue
          </p>
        </div>

        {/* Tagline */}
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--t-secondary)] animate-fade-up-delay-2">
          9 年前端工程经验，专注 AI 驱动的研发效能提升。
          <br />
          构建高性能 Web 应用与开发者工具。
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4 animate-fade-up-delay-3">
          <a
            href="https://github.com/saulyue"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-hover inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[#0a0a0a] transition-transform hover:scale-105"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="mailto:saulyue@foxmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--t-primary)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            发邮件
          </a>
        </div>
      </div>

      {/* Background Glow */}
      <div className="pointer-events-none absolute right-[-20%] top-1/4 h-[600px] w-[600px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-[120px]" />
      <div className="pointer-events-none absolute right-[10%] top-[60%] h-[300px] w-[300px] rounded-full bg-[var(--accent)] opacity-[0.06] blur-[80px]" />
    </section>
  );
}
