"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type UseScrollOptions
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  intensity?: "subtle" | "moderate" | "bold";
  direction?: "up" | "down";
  offset?: UseScrollOptions["offset"];
};

const intensityValues = {
  subtle: 40,
  moderate: 80,
  bold: 120
};

export function ScrollParallax({
  children,
  className = "",
  intensity = "moderate",
  direction = "up",
  offset = ["start end", "end start"]
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset
  });

  const moveValue = intensityValues[intensity];
  const yMovement = direction === "up" ? [-moveValue, moveValue] : [moveValue, -moveValue];

  const y = useTransform(scrollYProgress, [0, 1], yMovement);

  return (
    <motion.div
      ref={ref}
      className={`scroll-parallax ${className}`}
      style={shouldReduceMotion ? undefined : { y }}
    >
      {children}
    </motion.div>
  );
}
