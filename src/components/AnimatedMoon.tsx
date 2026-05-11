"use client";

import type { RefObject } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";

type AnimatedMoonProps = {
  sectionRef: RefObject<HTMLElement | null>;
  label?: string;
};

export function AnimatedMoon({
  sectionRef,
  label = "Moon rising in the night sky"
}: AnimatedMoonProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [90, -12]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 0.55, 1]);

  return (
    <motion.div
      aria-label={label}
      role="img"
      className="moon-orb"
      style={shouldReduceMotion ? undefined : { y, opacity }}
    >
      <span />
    </motion.div>
  );
}
