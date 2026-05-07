export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-[var(--t-dim)] sm:flex-row">
        <p>&copy; 2026 乐祥孚 &middot; saulyue</p>
        <p>
          Built with{" "}
          <span className="text-[var(--t-primary)]">Next.js</span> +{" "}
          <span className="text-[var(--t-primary)]">Tailwind</span>
        </p>
      </div>
    </footer>
  );
}
