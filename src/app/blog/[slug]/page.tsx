import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "404" };
  return {
    title: `${article.title} · saulyue`,
    description: article.description || "",
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <section className="py-24 relative z-[1] min-h-screen">
      <div className="max-w-[720px] mx-auto px-8 pt-16">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-[var(--t-secondary)] hover:text-[var(--accent)] transition-colors mb-8"
        >
          ← 返回博客
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[var(--t-secondary)]">
            <time className="font-mono">{article.date}</time>
            {article.tags && article.tags.length > 0 && (
              <div className="flex gap-2">
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
          </div>
        </header>

        {/* Content */}
        <article className="prose prose-invert max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight prose-a:text-[var(--accent)] prose-code:text-[var(--accent)] prose-pre:bg-[var(--bg-alt)] prose-pre:border prose-pre:border-[var(--border)]">
          <MDXRemote source={article.content} />
        </article>
      </div>
    </section>
  );
}
