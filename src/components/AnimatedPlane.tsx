"use client";

import type { RefObject } from "react";
import { Plane } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";

type AnimatedPlaneProps = {
  sectionRef: RefObject<HTMLElement | null>;
  label: string;
  onActivate?: () => void;
  tone?: "light" | "sunset" | "night";
};

export function AnimatedPlane({
  sectionRef,
  label,
  onActivate,
  tone = "light"
}: AnimatedPlaneProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const x = useTransform(scrollYProgress, [0, 1], [-180, 220]);
  const y = useTransform(scrollYProgress, [0, 1], [70, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.86, 1], [0, 1, 1, 0]);

  return (
    <motion.button
      type="button"
      aria-label={label}
      className={`plane-path plane-path-${tone}`}
      onClick={onActivate}
      style={shouldReduceMotion ? undefined : { x, y, opacity }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
    >
      <span className="plane-trail" />
      <Plane aria-hidden="true" size={54} strokeWidth={1.5} />
    </motion.button>
  );
}
