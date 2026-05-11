"use client";

import { navigationItems } from "@/data/portfolioData";

export function FloatingNav() {
  return (
    <aside
      className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 lg:block"
      aria-label="Section shortcuts"
    >
      <div className="flex items-center gap-2 rounded-full border border-white/28 bg-white/18 px-3 py-2 shadow-glass backdrop-blur-xl">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const label =
            item.id === "home" ? "About" : item.shortLabel ?? item.label;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group relative rounded-full p-3 text-white transition hover:bg-white/22 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={label}
            >
              <Icon size={19} aria-hidden="true" />
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-full border border-white/26 bg-slate-950/62 px-3 py-1 text-xs font-semibold opacity-0 shadow-lg backdrop-blur-md transition group-hover:opacity-100 group-focus-visible:opacity-100">
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
