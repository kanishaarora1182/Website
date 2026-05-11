"use client";

import { motion, useReducedMotion } from "framer-motion";

type AnimatedKiteProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  compact?: boolean;
};

export function AnimatedKite({
  label,
  onClick,
  className = "",
  compact = false
}: AnimatedKiteProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`kite ${compact ? "kite-compact" : ""} ${className}`}
      animate={
        shouldReduceMotion
          ? undefined
          : { y: [0, -16, 8, 0], rotate: [-3, 4, -2, -3] }
      }
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
    >
      <span className="kite-body">
        <span />
      </span>
      <span className="kite-tail" />
    </motion.button>
  );
}
