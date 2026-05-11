"use client";

import type { RefObject } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";

export type CloudConfig = {
  id: string;
  label: string;
  top: string;
  left?: string;
  right?: string;
  width?: string;
  tone?: "light" | "warm" | "night";
  interactive?: boolean;
};

type AnimatedCloudsProps = {
  sectionRef: RefObject<HTMLElement | null>;
  clouds: CloudConfig[];
  onSelect?: (id: string) => void;
  className?: string;
};

export function AnimatedClouds({
  sectionRef,
  clouds,
  onSelect,
  className = ""
}: AnimatedCloudsProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const x = useTransform(scrollYProgress, [0, 1], [-30, 36]);

  return (
    <div className={`pointer-events-none absolute inset-0 z-10 ${className}`}>
      {clouds.map((cloud, index) => {
        const cloudStyle = {
          top: cloud.top,
          left: cloud.left,
          right: cloud.right,
          width: cloud.width ?? "18rem",
          x: shouldReduceMotion ? 0 : x
        };
        const cloudShape = (
          <span
            className="cloud-shape"
            style={{
              animationDelay: `${index * -2}s`,
              animationDuration: `${18 + index * 4}s`
            }}
          />
        );

        if (cloud.interactive) {
          return (
            <motion.button
              key={cloud.id}
              type="button"
              aria-label={cloud.label}
              data-label={cloud.label}
              className={`sky-cloud sky-cloud-${cloud.tone ?? "light"} pointer-events-auto cursor-pointer`}
              style={cloudStyle}
              onClick={() => onSelect?.(cloud.id)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={
                !shouldReduceMotion ? { y: -8, scale: 1.04 } : undefined
              }
            >
              {cloudShape}
            </motion.button>
          );
        }

        return (
          <motion.div
            key={cloud.id}
            aria-label={cloud.label}
            className={`sky-cloud sky-cloud-${cloud.tone ?? "light"}`}
            style={cloudStyle}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
          >
            {cloudShape}
          </motion.div>
        );
      })}
    </div>
  );
}
