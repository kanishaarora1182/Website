"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  exitDistance?: number;
  scale?: boolean;
  rotate?: boolean;
  intensity?: "soft" | "medium" | "strong";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
};

const opacityStops = {
  soft: [0, 1, 1, 0.2],
  medium: [0, 1, 1, 0],
  strong: [0, 1, 0.85, -0.1]
};

const blurStops = {
  soft: ["blur(6px)", "blur(0px)", "blur(0px)", "blur(2px)"],
  medium: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(4px)"],
  strong: ["blur(14px)", "blur(0px)", "blur(0px)", "blur(6px)"]
};

export function ScrollReveal({
  children,
  className = "",
  distance = 48,
  exitDistance = 24,
  scale = true,
  rotate = false,
  intensity = "medium",
  direction = "up",
  delay = 0
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 15%"]
  });

  const getAxisValues = (distance: number) => {
    const values = { up: [0, -distance], down: [0, distance], left: [-distance, 0], right: [distance, 0] };
    return values[direction];
  };

  const exitAxisValue = getAxisValues(exitDistance)[1];

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.75, 1],
    opacityStops[intensity]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.24, 0.78, 1],
    direction === "up" || direction === "down" ? [getAxisValues(distance)[0], 0, 0, exitAxisValue] : [0, 0, 0, 0]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 0.24, 0.78, 1],
    direction === "left" || direction === "right" ? [getAxisValues(distance)[0], 0, 0, exitAxisValue] : [0, 0, 0, 0]
  );

  const itemScale = useTransform(
    scrollYProgress,
    [0, 0.24, 0.78, 1],
    scale ? [0.92, 1, 1, 0.96] : [1, 1, 1, 1]
  );

  const rotation = useTransform(
    scrollYProgress,
    [0, 0.24, 0.78, 1],
    rotate ? [-8, 0, 0, 6] : [0, 0, 0, 0]
  );

  const filter = useTransform(
    scrollYProgress,
    [0, 0.2, 0.78, 1],
    blurStops[intensity]
  );

  return (
    <motion.div
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={
        shouldReduceMotion
          ? undefined
          : {
              opacity,
              y,
              x,
              scale: scale ? itemScale : undefined,
              rotate: rotate ? rotation : undefined,
              filter,
              transitionDelay: `${delay}ms`
            }
      }
    >
      {children}
    </motion.div>
  );
}
