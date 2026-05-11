"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatedClouds, type CloudConfig } from "@/components/AnimatedClouds";
import { AnimatedKite } from "@/components/AnimatedKite";
import { AnimatedPlane } from "@/components/AnimatedPlane";
import { CinematicSky, FixedLand } from "@/components/CinematicSky";
import { ContactCard } from "@/components/ContactCard";
import { FloatingNav } from "@/components/FloatingNav";
import { GlassCard } from "@/components/GlassCard";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SkySection } from "@/components/SkySection";
import {
  achievements,
  contact,
  contentAssets,
  developmentCards,
  hero,
  projectCategories,
  projects,
  technicalSkills,
  type ProjectCategory
} from "@/data/portfolioData";

type HeroPanel = "about" | "skills" | null;
type ProjectFilter = ProjectCategory | "all";

type SocialManifest = {
  linkedin?: string;
  github?: string;
};

const heroClouds: CloudConfig[] = [
  {
    id: "skills",
    label: "Skills Preview",
    top: "22vh",
    right: "12%",
    width: "18rem",
    tone: "light",
    interactive: true
  },
  {
    id: "soft-cloud",
    label: "Morning cloud",
    top: "16vh",
    left: "6%",
    width: "15rem",
    tone: "warm"
  }
];

const noonClouds: CloudConfig[] = [
  {
    id: "education",
    label: "Education",
    top: "17vh",
    left: "8%",
    width: "16rem",
    interactive: true
  },
  {
    id: "skills",
    label: "Skills",
    top: "13vh",
    right: "9%",
    width: "19rem",
    interactive: true
  },
  {
    id: "research",
    label: "Research",
    top: "42vh",
    right: "15%",
    width: "15rem",
    interactive: true
  },
  {
    id: "experience",
    label: "Experience",
    top: "38vh",
    left: "12%",
    width: "18rem",
    interactive: true
  }
];

const eveningClouds: CloudConfig[] = [
  {
    id: "all",
    label: "All Projects",
    top: "16vh",
    left: "7%",
    width: "16rem",
    tone: "warm",
    interactive: true
  },
  {
    id: "embedded",
    label: "Embedded",
    top: "26vh",
    right: "7%",
    width: "15rem",
    tone: "warm",
    interactive: true
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    top: "46vh",
    left: "4%",
    width: "14rem",
    tone: "warm",
    interactive: true
  }
];

const nightClouds: CloudConfig[] = [
  {
    id: "night-cloud-left",
    label: "Night cloud",
    top: "22vh",
    left: "7%",
    width: "18rem",
    tone: "night"
  },
  {
    id: "night-cloud-right",
    label: "Night cloud",
    top: "48vh",
    right: "5%",
    width: "16rem",
    tone: "night"
  }
];

function useContentSocialLinks() {
  const [links, setLinks] = useState(contact.social);

  useEffect(() => {
    let isMounted = true;

    fetch(contentAssets.linksManifest)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: SocialManifest | null) => {
        if (!isMounted || !data) {
          return;
        }

        setLinks((current) => ({
          linkedin: data.linkedin ?? current.linkedin,
          github: data.github ?? current.github
        }));
      })
      .catch(() => {
        setLinks(contact.social);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return links;
}

export default function Home() {
  const homeRef = useRef<HTMLElement | null>(null);
  const developmentRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  const socialLinks = useContentSocialLinks();
  const [heroPanel, setHeroPanel] = useState<HeroPanel>(null);
  const [activeDevelopment, setActiveDevelopment] = useState("education");
  const [growthOpen, setGrowthOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>("all");
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [featuredOpen, setFeaturedOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    if (projectFilter === "all") {
      return projects;
    }

    return projects.filter((project) => project.category === projectFilter);
  }, [projectFilter]);

  const activeDevelopmentCard = developmentCards.find(
    (card) => card.id === activeDevelopment
  );
  const ActiveDevelopmentIcon = activeDevelopmentCard?.icon;

  return (
    <MotionConfig reducedMotion="user">
      <CinematicSky />
      <FixedLand />
      <Navbar />
      <FloatingNav />
      <main className="relative z-10">
        <SkySection
          ref={homeRef}
          id="home"
          theme="morning"
          background={contentAssets.backgrounds.morning}
          priority
        >
          <AnimatedClouds
            sectionRef={homeRef}
            clouds={heroClouds}
            onSelect={() => setHeroPanel("skills")}
          />
          <AnimatedKite
            label="Floating kite"
            className="right-[18%] top-[34vh] hidden sm:grid"
          />

          <div className="relative z-20 mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,420px)]">
            <ScrollReveal
              className="max-w-3xl"
              distance={64}
              exitDistance={40}
              intensity="strong"
              rotate
            >
              <p className="mb-5 inline-flex rounded-lg border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur-md">
                {hero.subtitle}
              </p>
              <h1 className="font-display text-5xl font-bold leading-[1.05] text-white drop-shadow-[0_4px_16px_rgba(15,23,42,0.3)] sm:text-6xl lg:text-7xl">
                {hero.name}
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-white/82 sm:text-xl">
                {hero.intro}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a className="button button-primary" href="#development">
                  <ArrowDown size={18} aria-hidden="true" />
                  Explore Work
                </a>
                <a
                  className="button button-secondary"
                  href={contentAssets.documents.resume}
                  target="_blank"
                  rel="noreferrer"
                  download
                >
                  <Download size={18} aria-hidden="true" />
                  Resume
                </a>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() =>
                    setHeroPanel((current) =>
                      current === "about" ? null : "about"
                    )
                  }
                >
                  System Profile
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal
              className="relative min-h-[18rem]"
              distance={56}
              exitDistance={32}
              intensity="strong"
              rotate
            >
              <AnimatePresence mode="wait">
                {heroPanel === "about" ? (
                  <GlassCard
                    key="about"
                    tone="light"
                    className="absolute inset-x-0 top-0"
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-800">
                      About Me
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                      Practical software with research instincts.
                    </h2>
                    <p className="mt-3 leading-7 text-slate-800">
                      {hero.about}
                    </p>
                  </GlassCard>
                ) : null}

                {heroPanel === "skills" ? (
                  <GlassCard
                    key="skills"
                    tone="light"
                    className="absolute inset-x-0 top-0"
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-sky-900">
                      Skills Preview
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {hero.skillsPreview.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/58 bg-white/44 px-3 py-2 text-sm font-semibold text-slate-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                ) : null}

                {heroPanel === null ? (
                  <GlassCard
                    key="default-profile"
                    tone="dark"
                    className="absolute inset-x-0 top-0 border-blue-300/20 bg-slate-950/38"
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-200">
                      Engineering Console
                    </p>
                    <div className="mt-4 space-y-3 font-mono text-sm text-blue-50/86">
                      <p>
                        <span className="text-cyan-300">focus</span>: web,
                        cybersecurity, simulation, embedded systems
                      </p>
                      <p>
                        <span className="text-cyan-300">stack</span>: Python,
                        React, Next.js, ESP32, Pandas, MATLAB
                      </p>
                      <p>
                        <span className="text-cyan-300">mode</span>: building
                        practical systems from research signals
                      </p>
                    </div>
                  </GlassCard>
                ) : null}
              </AnimatePresence>
            </ScrollReveal>
          </div>
        </SkySection>

        <SkySection
          ref={developmentRef}
          id="development"
          theme="noon"
          background={contentAssets.backgrounds.noon}
        >
          {/* <AnimatedClouds
            sectionRef={developmentRef}
            clouds={noonClouds}
            onSelect={setActiveDevelopment}
          /> */}
          <AnimatedPlane
            sectionRef={developmentRef}
            label="Open professional growth timeline"
            onActivate={() => setGrowthOpen((current) => !current)}
          />

          <div className="relative z-20 mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <ScrollReveal distance={56} exitDistance={40} intensity="strong" rotate>
              
              <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-white drop-shadow-[0_4px_16px_rgba(15,23,42,0.3)] sm:text-5xl">
                Professional Growth & Experience
              </h2>
              <p className="mt-6 max-w-xl text-base font-medium leading-8 text-white/78 sm:text-lg">
                Comprehensive experience spanning computer science education, applied research, technical practice, and systems engineering.
              </p>

              <AnimatePresence mode="wait">
                {activeDevelopmentCard && ActiveDevelopmentIcon ? (
                  <GlassCard
                    key={activeDevelopmentCard.id}
                    className="mt-6"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="rounded-2xl bg-white/52 p-3 text-sky-950">
                        <ActiveDevelopmentIcon size={24} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-sky-950/76">
                          {activeDevelopmentCard.eyebrow}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold text-slate-950">
                          {activeDevelopmentCard.title}
                        </h3>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeDevelopmentCard.meta.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-white/45 px-3 py-1 text-xs font-bold text-slate-800 "
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 leading-7 text-slate-800">
                      {activeDevelopmentCard.description}
                    </p>
                  </GlassCard>
                ) : null}
              </AnimatePresence>
            </ScrollReveal>

            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                {developmentCards.map((card, index) => {
                  const Icon = card.icon;
                  const isActive = card.id === activeDevelopment;

                  return (
                    <ScrollReveal
                      key={card.id}
                      distance={42 + index * 6}
                      exitDistance={28}
                      intensity="strong"
                      scale
                    >
                      <GlassCard
                        className={`min-h-[14rem] cursor-pointer transition border-white/12 hover:border-blue-400/24 ${
                          isActive
                            ? "ring-2 ring-blue-400/40 bg-blue-50/8"
                            : "hover:bg-blue-50/6"
                        }`}
                        onClick={() => setActiveDevelopment(card.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            setActiveDevelopment(card.id);
                          }
                        }}
                      >
                        <Icon
                          className="mb-4 text-blue-400"
                          size={28}
                          aria-hidden="true"
                        />
                        <h3 className="text-lg font-semibold text-white">
                          {card.title}
                        </h3>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/60">
                          {card.eyebrow}
                        </p>
                        <p className="mt-3 line-clamp-4 text-sm leading-6 text-white/70">
                          {card.description}
                        </p>
                      </GlassCard>
                    </ScrollReveal>
                  );
                })}
              </div>

              <ScrollReveal distance={40} exitDistance={24} intensity="strong" scale>
                <GlassCard className="mt-4 p-4">
                  <div className="flex max-h-36 flex-wrap gap-2 overflow-hidden">
                    {technicalSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/48 bg-white/34 px-3 py-1.5 text-xs font-bold text-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </ScrollReveal>
            </div>
          </div>

          <AnimatePresence>
            {growthOpen ? (
              <GlassCard
                tone="light"
                className="absolute right-5 top-28 z-30 max-w-sm sm:right-10 lg:right-[9vw]"
                initial={{ opacity: 0, y: -14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-sky-900">
                  Professional Growth
                </p>
                <p className="mt-3 leading-7 text-slate-800">
                  Kanisha&apos;s timeline connects classroom engineering, research
                  simulation, cybersecurity study, and systems-focused project
                  delivery.
                </p>
              </GlassCard>
            ) : null}
          </AnimatePresence>
        </SkySection>

        <SkySection
          ref={projectsRef}
          id="projects"
          theme="evening"
          background={contentAssets.backgrounds.evening}
        >
          {/* <AnimatedClouds
            sectionRef={projectsRef}
            clouds={eveningClouds}
            onSelect={(id) => setProjectFilter(id as ProjectFilter)}
          /> */}
          <AnimatedPlane
            sectionRef={projectsRef}
            label="Evening plane"
            tone="sunset"
          />
          <AnimatedKite
            label="Open featured projects"
            className="left-[87%] top-[26vh]"
            compact
            onClick={() => {
              setProjectFilter("all");
              setFeaturedOpen((current) => !current);
            }}
          />

          <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center">
            <ScrollReveal className="max-w-3xl" distance={56} exitDistance={36} intensity="strong" rotate>
              
              <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-white drop-shadow-[0_4px_16px_rgba(15,23,42,0.3)] sm:text-5xl">
                Technical Projects & Solutions
              </h2>
              <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/78 sm:text-lg">
                Research-driven projects spanning embedded systems, cybersecurity, data engineering, and full-stack development.
              </p>
            </ScrollReveal>

            <ScrollReveal distance={40} exitDistance={24} intensity="strong" scale>
              <div className="mt-7 flex flex-wrap gap-2 rounded-2xl border border-white/24 bg-white/14 p-2 backdrop-blur-xl">
                <button
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    achievementsOpen
                      ? "bg-white text-slate-950"
                      : "text-white hover:bg-white/20"
                  }`}
                  onClick={() => setAchievementsOpen((current) => !current)}
                >
                  Achievements
                </button>
                {projectCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                      projectFilter === category.id
                        ? "bg-white text-slate-950"
                        : "text-white hover:bg-white/20"
                    }`}
                    onClick={() => setProjectFilter(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            <div className="mt-7 grid gap-4 lg:grid-cols-2">
              {filteredProjects.map((project, index) => (
                <ScrollReveal
                  key={project.id}
                  distance={48 + index * 5}
                  exitDistance={32}
                  intensity="strong"
                  scale
                >
                  <ProjectCard project={project} index={index} />
                </ScrollReveal>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {achievementsOpen ? (
              <GlassCard
                tone="warm"
                className="absolute right-5 top-24 z-30 max-w-md sm:right-10 lg:right-[8vw]"
                initial={{ opacity: 0, y: -14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-rose-900">
                  Achievements
                </p>
                <div className="mt-4 space-y-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;

                    return (
                      <div key={achievement.label} className="flex gap-3">
                        <span className="mt-1 rounded-full bg-white/46 p-2 text-rose-900">
                          <Icon size={18} aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="font-semibold text-slate-950">
                            {achievement.label}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-slate-800">
                            {achievement.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {featuredOpen ? (
              <GlassCard
                tone="warm"
                className="absolute left-5 top-24 z-30 max-w-sm sm:left-10 lg:left-[8vw]"
                initial={{ opacity: 0, y: -14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-900">
                  Featured Projects
                </p>
                <h3 className="mt-3 text-xl font-semibold text-slate-950">
                  RC Trailer Jack
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-800">
                  Award-winning senior design work combining embedded firmware,
                  mobile control, ESP32 communication, safety logic, and video
                  streaming.
                </p>
              </GlassCard>
            ) : null}
          </AnimatePresence>
        </SkySection>

        <SkySection
          ref={contactRef}
          id="contact"
          theme="night"
          background={contentAssets.backgrounds.night}
        >
          <AnimatedClouds sectionRef={contactRef} clouds={nightClouds} />
          <AnimatedPlane
            sectionRef={contactRef}
            label="Shooting plane in the night sky"
            tone="night"
          />

          <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center text-center">
            <ScrollReveal distance={56} exitDistance={32} intensity="strong" rotate>
              <p className="mx-auto inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur-md">
                <Sparkles size={16} aria-hidden="true" />
                Get in Touch
              </p>
              <h2 className="mt-6 font-display text-4xl font-bold leading-tight text-white drop-shadow-[0_4px_16px_rgba(15,23,42,0.3)] sm:text-6xl">
                {contact.heading}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-8 text-white/78 sm:text-lg">
                {contact.message}
              </p>
            </ScrollReveal>

            <ScrollReveal className="mt-8" distance={48} exitDistance={28} intensity="strong" scale>
              <ContactCard
                linkedin={socialLinks.linkedin}
                github={socialLinks.github}
              />
            </ScrollReveal>

            <footer className="mt-8 text-sm font-medium text-white/68">
              &copy; 2026 Kanisha Arora. All rights reserved.
            </footer>
          </div>
        </SkySection>
      </main>
    </MotionConfig>
  );
}
