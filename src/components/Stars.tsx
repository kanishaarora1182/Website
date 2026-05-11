"use client";

import type { RefObject } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";

const stars = Array.from({ length: 52 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 23 + 7) % 72}%`,
  size: index % 9 === 0 ? 3 : index % 4 === 0 ? 2 : 1,
  delay: `${(index % 10) * 0.42}s`
}));

type StarsProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function Stars({ sectionRef }: StarsProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0, 0.55, 1]);

  return (
    <motion.div
      className="stars-field"
      aria-hidden="true"
      style={shouldReduceMotion ? undefined : { opacity }}
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay
          }}
        />
      ))}
      <span className="shooting-star" />
    </motion.div>
  );
}
