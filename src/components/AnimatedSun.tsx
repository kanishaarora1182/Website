"use client";

import type { RefObject } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";

type AnimatedSunProps = {
  phase: "morning" | "noon" | "evening";
  sectionRef: RefObject<HTMLElement | null>;
  onClick?: () => void;
  label: string;
  className?: string;
};

const movement = {
  morning: { x: [-8, 18], y: [36, -26], scale: [0.9, 1.03] },
  noon: { x: [-12, 12], y: [0, -18], scale: [1, 1] },
  evening: { x: [-8, 14], y: [-22, 34], scale: [1.02, 0.9] }
};

export function AnimatedSun({
  phase,
  sectionRef,
  onClick,
  label,
  className = ""
}: AnimatedSunProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const x = useTransform(scrollYProgress, [0, 1], movement[phase].x);
  const y = useTransform(scrollYProgress, [0, 1], movement[phase].y);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    movement[phase].scale
  );

  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`sun-orb sun-orb-${phase} group ${className}`}
      style={shouldReduceMotion ? undefined : { x, y, scale }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
    >
      <span className="sun-core" />
      <span className="sun-ring" />
    </motion.button>
  );
}
