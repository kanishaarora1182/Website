"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";
import Image from "next/image";
import { ThreeSun } from "./ThreeSun";
import { contentAssets } from "@/data/portfolioData";

const codeLines = [
  "const system = simulate(powerGrid)",
  "trainDRL(agent, rewardSignal)",
  "if (entropy > threshold) alert(host)",
  "esp32.send(BLE_COMMAND)",
  "normalize(apiResponse).filter(recent)",
  "analyze(responseCurve)"
];

export function CinematicSky() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const morningOpacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.28],
    [1, 1, 0]
  );
  const noonOpacity = useTransform(
    scrollYProgress,
    [0.16, 0.3, 0.48, 0.62],
    [0, 1, 1, 0]
  );
  const eveningOpacity = useTransform(
    scrollYProgress,
    [0.48, 0.62, 0.78, 0.9],
    [0, 1, 1, 0]
  );
  const nightOpacity = useTransform(
    scrollYProgress,
    [0.76, 0.9, 1],
    [0, 1, 1]
  );

  const sunLeft = useTransform(
    scrollYProgress,
    [0, 0.08, 0.36, 0.64, 0.78, 0.84],
    ["9vw", "16vw", "73vw", "64vw", "22vw", "12vw"]
  );
  const sunTop = useTransform(
    scrollYProgress,
    [0, 0.08, 0.36, 0.64, 0.78, 0.84],
    ["86vh", "58vh", "13vh", "42vh", "84vh", "104vh"]
  );
  const sunOpacity = useTransform(
    scrollYProgress,
    [0, 0.72, 0.82, 0.88],
    [1, 1, 0.3, 0]
  );
  const sunScale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.36, 0.76, 0.86],
    [0.74, 1, 0.86, 1.04, 0.62]
  );

  const moonLeft = useTransform(
    scrollYProgress,
    [0.74, 0.9, 1],
    ["78vw", "66vw", "58vw"]
  );
  const moonTop = useTransform(
    scrollYProgress,
    [0.74, 0.9, 1],
    ["106vh", "28vh", "18vh"]
  );
  const moonOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.84, 1],
    [0, 1, 1]
  );

  const starsOpacity = useTransform(
    scrollYProgress,
    [0.68, 0.82, 1],
    [0, 0.75, 1]
  );
  const codeOpacity = useTransform(
    scrollYProgress,
    [0.16, 0.32, 0.66, 0.8],
    [0, 0.42, 0.34, 0]
  );
  const cloudShift = useTransform(scrollYProgress, [0, 1], ["-6vw", "9vw"]);

  const noMotion = shouldReduceMotion
    ? {
        opacity: 1,
        transform: "none"
      }
    : undefined;

  return (
    <div className="cinematic-sky" aria-hidden="true">
      <motion.div
        className="sky-backdrop"
        style={shouldReduceMotion ? noMotion : { opacity: morningOpacity }}
      >
        <Image
          src={contentAssets.backgrounds.morning}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <motion.div
        className="sky-backdrop"
        style={shouldReduceMotion ? { opacity: 0 } : { opacity: noonOpacity }}
      >
        <Image
          src={contentAssets.backgrounds.noon}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <motion.div
        className="sky-backdrop"
        style={
          shouldReduceMotion ? { opacity: 0 } : { opacity: eveningOpacity }
        }
      >
        <Image
          src={contentAssets.backgrounds.evening}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <motion.div
        className="sky-backdrop"
        style={shouldReduceMotion ? { opacity: 0 } : { opacity: nightOpacity }}
      >
        <Image
          src={contentAssets.backgrounds.night}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div className="sky-stars" style={{ opacity: starsOpacity }}>
        {Array.from({ length: 70 }, (_, index) => (
          <span
            key={index}
            style={{
              left: `${(index * 29 + 7) % 100}%`,
              top: `${(index * 41 + 3) % 78}%`,
              animationDelay: `${(index % 11) * 0.28}s`
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="engineering-constellation"
        style={shouldReduceMotion ? { opacity: 0.22 } : { opacity: codeOpacity }}
      >
        {codeLines.map((line, index) => (
          <span key={line} style={{ animationDelay: `${index * -1.2}s` }}>
            {line}
          </span>
        ))}
      </motion.div>

      <motion.div
        className="global-cloud global-cloud-a"
        style={shouldReduceMotion ? undefined : { x: cloudShift }}
      />
      <motion.div
        className="global-cloud global-cloud-b"
        style={shouldReduceMotion ? undefined : { x: cloudShift }}
      />
      <motion.div
        className="global-cloud global-cloud-c"
        style={shouldReduceMotion ? undefined : { x: cloudShift }}
      />

      <motion.div
        className="journey-sun"
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, top: "104vh", left: "6vw", scale: 0.52 }
        }
        animate={
          shouldReduceMotion
            ? undefined
            : { opacity: 1, top: "86vh", left: "9vw", scale: 0.74 }
        }
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        style={
          shouldReduceMotion
            ? undefined
            : {
                left: sunLeft,
                top: sunTop,
                opacity: sunOpacity,
                scale: sunScale
              }
        }
      >
        <span className="journey-sun-rays" />
        <ThreeSun />
      </motion.div>

      <motion.div
        className="journey-moon"
        style={
          shouldReduceMotion
            ? undefined
            : { left: moonLeft, top: moonTop, opacity: moonOpacity }
        }
      >
        <span />
      </motion.div>

      <motion.div
        className="sky-color-wash"
        style={shouldReduceMotion ? undefined : { opacity: nightOpacity }}
      />
    </div>
  );
}

export function FixedLand() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const morningOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.3],
    [1, 1, 0]
  );
  const noonOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.3, 0.5, 0.64],
    [0, 1, 1, 0]
  );
  const eveningOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.64, 0.78, 0.9],
    [0, 1, 1, 0]
  );
  const nightOpacity = useTransform(
    scrollYProgress,
    [0.76, 0.9, 1],
    [0, 1, 1]
  );

  return (
    <div className="fixed-land" aria-hidden="true">
      <motion.div
        className="land land-morning"
        style={shouldReduceMotion ? undefined : { opacity: morningOpacity }}
      />
      <motion.div
        className="land land-noon"
        style={shouldReduceMotion ? undefined : { opacity: noonOpacity }}
      />
      <motion.div
        className="land land-evening"
        style={shouldReduceMotion ? undefined : { opacity: eveningOpacity }}
      />
      <motion.div
        className="land land-night"
        style={shouldReduceMotion ? undefined : { opacity: nightOpacity }}
      />
    </div>
  );
}
