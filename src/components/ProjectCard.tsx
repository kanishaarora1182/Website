"use client";

import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolioData";
import { GlassCard } from "./GlassCard";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const content = (
    <GlassCard
      tone="warm"
      className="group flex h-full flex-col gap-5 p-6 hover:border-blue-400/24"
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -12, scale: 1.04, filter: "brightness(1.08)", transition: { duration: 0.4 } }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-900/70">
            {project.category.replace("-", " ")}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950">
            {project.title}
          </h3>
        </div>
        <span className="rounded-full border border-white/50 bg-white/36 p-2 text-slate-900 transition group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:rotate-45">
          <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </div>
      {project.award ? (
        <p className="rounded-xl border border-amber-200/60 bg-amber-100/45 px-3 py-2 text-sm font-semibold text-amber-950">
          {project.award}
        </p>
      ) : null}
      <p className="text-sm leading-6 text-slate-900/82">{project.description}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg border border-white/12 bg-white/6 px-3 py-1.5 text-xs font-medium text-white/70 hover:text-white/90 transition"
          >
            {tag}
          </span>
        ))}
      </div>
    </GlassCard>
  );

  if (!project.url) {
    return content;
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.title} project website`}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
    >
      {content}
    </a>
  );
}
