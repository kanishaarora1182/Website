"use client";

import { useEffect, useState } from "react";
import { navigationItems, type SectionId } from "@/data/portfolioData";

export function Navbar() {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const sections = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActive(visible[0].target.id as SectionId);
        }
      },
      {
        rootMargin: "-24% 0px -52% 0px",
        threshold: [0.18, 0.35, 0.55, 0.75]
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-white/30 bg-white/18 px-3 py-2 text-slate-950 shadow-glass backdrop-blur-xl">
        <a
          href="#home"
          className="rounded-full px-3 py-2 font-display text-lg font-semibold text-white drop-shadow"
          aria-label="Kanisha Arora home"
        >
          KA
        </a>
        <div className="flex min-w-0 flex-1 justify-end gap-1 overflow-x-auto">
          {navigationItems.map((item) => {
            const isActive = active === item.id;
            const label = item.shortLabel ?? item.label;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${isActive ? "nav-link-active" : ""}`}
              >
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
