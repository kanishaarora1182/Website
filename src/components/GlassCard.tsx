"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type GlassCardProps = HTMLMotionProps<"article"> & {
  children: ReactNode;
  tone?: "light" | "dark" | "warm";
};

const toneClasses = {
  light:
    "border-white/16 bg-white/6 text-slate-950 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md",
  dark:
    "border-white/12 bg-white/4 text-white shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-md",
  warm:
    "border-blue-400/12 bg-gradient-to-br from-blue-50/8 to-blue-100/4 text-slate-950 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md"
};

export function GlassCard({
  children,
  className = "",
  tone = "light",
  ...props
}: GlassCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 48, scale: 0.92, rotate: -6, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -24, scale: 0.95, rotate: 4, filter: "blur(8px)" }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
      className={`rounded-xl border p-6 ${toneClasses[tone]} ${className}`}
      {...props}
    >
      {children}
    </motion.article>
  );
}
