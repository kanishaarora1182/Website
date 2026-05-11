"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type ScrollStaggerProps = {
  children: ReactNode;
  className?: string;
  intensity?: "soft" | "medium" | "strong";
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
};

const distances = {
  soft: 32,
  medium: 48,
  strong: 64
};

const opacityStops = {
  soft: [0, 1, 1, 0.3],
  medium: [0, 1, 1, 0],
  strong: [0, 1, 0.85, -0.1]
};

const blurStops = {
  soft: ["blur(6px)", "blur(0px)", "blur(0px)", "blur(2px)"],
  medium: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(4px)"],
  strong: ["blur(14px)", "blur(0px)", "blur(0px)", "blur(6px)"]
};

export function ScrollStagger({
  children,
  className = "",
  intensity = "medium",
  staggerDelay = 0.1,
  direction = "up"
}: ScrollStaggerProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 20%"]
  });

  const distance = distances[intensity];

  const getDirectionValue = (isStart: boolean) => {
    if (direction === "up") return isStart ? distance : 0;
    if (direction === "down") return isStart ? -distance : 0;
    if (direction === "left") return isStart ? distance : 0;
    if (direction === "right") return isStart ? -distance : 0;
    return 0;
  };

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.75, 1],
    opacityStops[intensity]
  );

  const yTransform = useTransform(
    scrollYProgress,
    [0, 0.24, 0.78, 1],
    direction === "up" || direction === "down"
      ? [getDirectionValue(true), 0, 0, -getDirectionValue(true) / 2]
      : [0, 0, 0, 0]
  );

  const xTransform = useTransform(
    scrollYProgress,
    [0, 0.24, 0.78, 1],
    direction === "left" || direction === "right"
      ? [getDirectionValue(true), 0, 0, -getDirectionValue(true) / 2]
      : [0, 0, 0, 0]
  );

  const filter = useTransform(
    scrollYProgress,
    [0, 0.2, 0.78, 1],
    blurStops[intensity]
  );

  const containerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <motion.div
      ref={ref}
      className={`scroll-stagger ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      style={
        shouldReduceMotion
          ? undefined
          : {
              opacity,
              y: yTransform,
              x: xTransform,
              filter
            }
      }
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
}
