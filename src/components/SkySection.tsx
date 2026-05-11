"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";
import {
  forwardRef,
  useCallback,
  useRef,
  type ForwardedRef,
  type ReactNode
} from "react";

export type SkyTheme = "morning" | "noon" | "evening" | "night";

type SkySectionProps = {
  id: string;
  theme: SkyTheme;
  background: string;
  children: ReactNode;
  priority?: boolean;
  className?: string;
};

const overlayClasses: Record<SkyTheme, string> = {
  morning:
    "from-slate-950/8 via-slate-950/2 to-slate-950/12 after:from-transparent after:via-transparent after:to-slate-950/18",
  noon:
    "from-slate-950/6 via-slate-950/0 to-slate-950/8 after:from-transparent after:via-transparent after:to-slate-950/12",
  evening:
    "from-slate-950/12 via-slate-950/4 to-slate-950/16 after:from-transparent after:via-transparent after:to-slate-950/22",
  night:
    "from-slate-950/28 via-slate-950/12 to-slate-950/38 after:from-transparent after:via-transparent after:to-slate-950/42"
};

export const SkySection = forwardRef<HTMLElement, SkySectionProps>(
  function SkySection(
    { id, theme, background, children, priority = false, className = "" },
    ref
  ) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"]
    });
    const sectionVeilOpacity = useTransform(
      scrollYProgress,
      [0, 0.18, 0.72, 1],
      [0.12, 0, 0, 0.16]
    );
    const contentY = useTransform(scrollYProgress, [0, 0.2, 0.82, 1], [24, 0, 0, -16]);

    const setRefs = useCallback(
      (node: HTMLElement | null) => {
        sectionRef.current = node;
        assignRef(ref, node);
      },
      [ref]
    );

    return (
      <section
        ref={setRefs}
        id={id}
        data-section={id}
        className={`sky-section relative isolate flex min-h-screen overflow-hidden ${className}`}
      >
        <div className="sr-only" data-background={background} data-priority={priority} />
        <div
          className={`absolute inset-0 z-0 bg-gradient-to-b ${overlayClasses[theme]} after:absolute after:inset-0 after:bg-gradient-to-b`}
          aria-hidden="true"
        />
        <motion.div
          className="absolute inset-0 z-[1] bg-slate-950"
          aria-hidden="true"
          style={shouldReduceMotion ? { opacity: 0 } : { opacity: sectionVeilOpacity }}
        />
        <div
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/8 to-transparent"
          aria-hidden="true"
        />
        <motion.div
          className="relative z-20 flex w-full flex-col px-5 pb-[14vh] pt-32 sm:px-8 lg:px-12"
          style={shouldReduceMotion ? undefined : { y: contentY }}
        >
          {children}
        </motion.div>
      </section>
    );
  }
);

function assignRef<T>(ref: ForwardedRef<T>, value: T | null) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}
