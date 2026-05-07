import Link from "next/link";
import { getAllArticles } from "@/lib/mdx";
import SectionHead from "@/components/SectionHead";

export const metadata = {
  title: "博客 · saulyue",
  description: "技术文章与实践记录",
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <section className="py-24 relative z-[1] min-h-screen">
      <div className="max-w-[1080px] mx-auto px-8 pt-16">
        <SectionHead num="B" title="博客" />

        {articles.length === 0 ? (
          <p className="text-[var(--t-secondary)]">暂无文章，敬请期待。</p>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="block p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-strong)] hover:-translate-y-1 transition-all"
              >
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h2 className="text-lg font-medium text-[var(--t-primary)]">
                    {article.title}
                  </h2>
                  <time className="font-mono text-xs text-[var(--t-secondary)] shrink-0">
                    {article.date}
                  </time>
                </div>
                {article.description && (
                  <p className="text-sm text-[var(--t-secondary)] line-clamp-2">
                    {article.description}
                  </p>
                )}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {article.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="font-mono text-[0.68rem] px-2 py-0.5 rounded border border-[var(--border)] text-[var(--accent)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
