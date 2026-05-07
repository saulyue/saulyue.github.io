"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { href: "#about", label: "关于" },
  { href: "#skills", label: "技能" },
  { href: "#experience", label: "经历" },
  { href: "#projects", label: "项目" },
  { href: "#blog", label: "博客" },
  { href: "#contact", label: "联系" },
];

export default function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#" className="font-serif text-xl font-bold tracking-tight text-[var(--t-primary)]">
          乐祥孚<span className="text-[var(--accent)]">.</span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-[var(--t-dim)] transition-colors hover:text-[var(--t-primary)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-sm text-[var(--t-secondary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            aria-label="切换主题"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-sm text-[var(--t-secondary)] md:hidden"
            aria-label="菜单"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-[var(--t-dim)] transition-colors hover:bg-[var(--bg-card)] hover:text-[var(--t-primary)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
