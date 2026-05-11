import { Variants } from "framer-motion";

export const easeOut = {
  type: "spring",
  stiffness: 60,
  damping: 30
};

export const easeInOut = {
  type: "spring",
  stiffness: 50,
  damping: 25
};

export const smoothEase = {
  duration: 0.8,
  ease: [0.25, 0.46, 0.45, 0.94]
};

export const cinemaEase = {
  duration: 1,
  ease: [0.16, 1, 0.3, 1]
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(8px)" }
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 64, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -32, filter: "blur(8px)" }
};

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -64, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: 32, filter: "blur(8px)" }
};

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 64, filter: "blur(12px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -32, filter: "blur(8px)" }
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -64, filter: "blur(12px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: 32, filter: "blur(8px)" }
};

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(12px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.95, filter: "blur(8px)" }
};

export const scaleDownVariants: Variants = {
  hidden: { opacity: 0, scale: 1.08, filter: "blur(12px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.98, filter: "blur(8px)" }
};

export const rotateInVariants: Variants = {
  hidden: { opacity: 0, rotate: -12, scale: 0.92, filter: "blur(12px)" },
  visible: { opacity: 1, rotate: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, rotate: 12, scale: 0.95, filter: "blur(8px)" }
};

export const flipInVariants: Variants = {
  hidden: { opacity: 0, rotateY: 90, filter: "blur(12px)" },
  visible: { opacity: 1, rotateY: 0, filter: "blur(0px)" },
  exit: { opacity: 0, rotateY: -90, filter: "blur(8px)" }
};

export const parallaxConfig = {
  subtle: { multiplier: 0.3 },
  moderate: { multiplier: 0.6 },
  bold: { multiplier: 1 }
};

export const staggerContainerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
      type: "spring",
      stiffness: 60,
      damping: 30
    }
  }
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

export const whileHoverScale = { scale: 1.06, transition: { duration: 0.3 } };
export const whileTapScale = { scale: 0.94, transition: { duration: 0.2 } };

export const scrollRevealTransition = {
  duration: 0.8,
  ease: [0.25, 0.46, 0.45, 0.94]
};

export const getScrollRevealConfig = (intensity: "soft" | "medium" | "strong") => {
  const configs = {
    soft: {
      distance: 48,
      exitDistance: 24,
      opacityStops: [0, 1, 0.8, 0.2],
      blurStart: 6,
      blurEnd: 2
    },
    medium: {
      distance: 64,
      exitDistance: 32,
      opacityStops: [0, 1, 0.9, 0],
      blurStart: 10,
      blurEnd: 4
    },
    strong: {
      distance: 80,
      exitDistance: 40,
      opacityStops: [0, 1, 0.95, -0.1],
      blurStart: 14,
      blurEnd: 6
    }
  };
  return configs[intensity];
};
