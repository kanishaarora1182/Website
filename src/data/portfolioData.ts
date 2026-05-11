import {
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  Home,
  Mail,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Wrench
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SectionId = "home" | "development" | "projects" | "contact";

export type DevelopmentCard = {
  id: "education" | "experience" | "research" | "skills";
  title: string;
  eyebrow: string;
  meta: string[];
  description: string;
  icon: LucideIcon;
};

export type ProjectCategory =
  | "embedded"
  | "cybersecurity"
  | "data"
  | "full-stack";

export type Project = {
  id: string;
  title: string;
  award?: string;
  category: ProjectCategory;
  tags: string[];
  description: string;
  featured?: boolean;
};

export const contentAssets = {
  backgrounds: {
    morning: "/content/backgrounds/morning-sunrise.png",
    noon: "/content/backgrounds/noon-sky.png",
    evening: "/content/backgrounds/evening-sunset.png",
    night: "/content/backgrounds/night-sky.png"
  },
  elements: {
    sun: "/content/elements/sun.png",
    moon: "/content/elements/moon.png",
    cloudSoft: "/content/elements/cloud-soft.png",
    cloudWide: "/content/elements/cloud-wide.png",
    cloudSunset: "/content/elements/cloud-sunset.png",
    cloudNight: "/content/elements/cloud-night.png",
    plane: "/content/elements/plane.png",
    planeTrail: "/content/elements/plane-trail.png",
    kite: "/content/elements/kite.png",
    kiteTail: "/content/elements/kite-tail.png",
    stars: "/content/elements/stars-overlay.png"
  },
  documents: {
    resume: "/content/documents/Kanisha-Arora-Resume.pdf"
  },
  linksManifest: "/content/links/social-links.json"
};

export const navigationItems = [
  { id: "home" as SectionId, label: "Home", icon: Home },
  {
    id: "development" as SectionId,
    label: "Professional Development",
    shortLabel: "Development",
    icon: GraduationCap
  },
  { id: "projects" as SectionId, label: "Projects", icon: FolderKanban },
  { id: "contact" as SectionId, label: "Contact", icon: Mail }
];

export const hero = {
  name: "Kanisha Arora",
  subtitle: "Computer Science & Engineering Student",
  intro:
    "I build practical software, research-driven systems, and interactive technology solutions across web development, cybersecurity, simulation, and embedded systems.",
  about:
    "I am a Computer Science & Engineering student at the University of Toledo who enjoys building systems that connect software, security, data, and hardware into useful real-world tools.",
  skillsPreview: [
    "Full-stack web apps",
    "Cybersecurity analysis",
    "Embedded systems",
    "Simulation workflows",
    "Data dashboards"
  ]
};

export const education = {
  school: "University of Toledo",
  degree: "B.S. in Computer Science & Engineering",
  gpa: "GPA: 3.7",
  graduation: "Expected Graduation: Aug 2026"
};

export const developmentCards: DevelopmentCard[] = [
  {
    id: "education",
    title: "Education",
    eyebrow: education.school,
    meta: [education.degree, education.gpa, education.graduation],
    description:
      "Building a foundation across software engineering, computer systems, data, security, and practical engineering design.",
    icon: GraduationCap
  },
  {
    id: "experience",
    title: "Research Co-op",
    eyebrow: "Deep Reinforcement Learning for Electric Ships",
    meta: ["University of Toledo, EECS Department", "May 2026 - Present"],
    description:
      "Working on simulation workflows, DRL training/testing, reward trends, system-response analysis, and evaluation outputs.",
    icon: BriefcaseBusiness
  },
  {
    id: "research",
    title: "Research",
    eyebrow: "Cybersecurity of Smart Grids",
    meta: ["May 2025 - Aug 2025"],
    description:
      "Studied cybersecurity vulnerabilities in hydrogen-based integrated energy systems using simulation and digital twin models.",
    icon: ShieldCheck
  },
  {
    id: "skills",
    title: "Additional Experience & Projects",
    eyebrow: "Campus Work, Co-op Credit & Software Projects",
    meta: ["May 2024 - Present"],
    description:
      "Kids Camp Counselor at UToledo Recreational Services, completed an Academic Industry Immersion Seminar designing an SQL database and building a Python ETL workflow, and built Invest-In-Box and Tech Market software projects involving Python, SQL, API integration, Firebase, Clerk authentication, full-stack development, and AI-powered profile evaluation using Llama/OpenAI models.",
    icon: BriefcaseBusiness
  }
];

export const technicalSkills = [
  "Python",
  "Java",
  "C",
  "C++",
  "SQL",
  "JavaScript",
  "HTML",
  "CSS",
  "React",
  "Next.js",
  "Node.js",
  "Streamlit",
  "Pandas",
  "REST APIs",
  "Firebase",
  "Clerk",
  "Git",
  "VS Code",
  "MATLAB",
  "DRL",
  "Anomaly detection",
  "PCAP/DNS analysis",
  "Linux",
  "Windows",
  "macOS",
  "ESP32",
  "BLE",
  "Wi-Fi video streaming"
];

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "embedded", label: "Embedded" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "data", label: "Data" },
  { id: "full-stack", label: "Full-stack" }
] as const;

export const projects: Project[] = [
  {
    id: "rc-trailer-jack",
    title: "RC Trailer Jack",
    award: "1st Place, 2026 KEEN Senior Design Capstone Project Competition",
    category: "embedded",
    featured: true,
    tags: ["ESP32", "BLE", "Motor control", "Android", "Video streaming"],
    description:
      "Designed and built a smartphone-controlled motorized trailer jack to automate trailer parking and hitching in tight spaces. Integrated embedded firmware, motor control, Android app logic, ESP32 communication, BLE commands, Wi-Fi video streaming, emergency stop, command timeout, and automatic motor shutdown on disconnect."
  },
  {
    id: "dns-tunneling",
    title: "DNS Tunneling Detection System",
    category: "cybersecurity",
    tags: ["Python", "PCAP", "Entropy", "Security analytics"],
    description:
      "Built a Python tool to analyze PCAP traffic and flag suspicious hosts using DNS query volume, unique domains, TXT usage, query length, and entropy-based randomness indicators. Implemented anomaly scoring, alerts, and graphs for network security investigation."
  },
  {
    id: "job-market-dashboard",
    title: "Job Market Analytics Dashboard",
    category: "data",
    tags: ["Python", "Streamlit", "Pandas", "Greenhouse API", "Lever API"],
    description:
      "Built a Python/Streamlit dashboard integrating Greenhouse and Lever APIs to process 1,900+ U.S.-based job postings with cleaned JSON data, state filters, search, and 7-day recency filtering. Developed a Pandas ETL workflow to normalize API data."
  },
  {
    id: "invest-in-box",
    title: "Invest-In-Box / Tech Market",
    category: "full-stack",
    tags: ["Python", "SQL", "Firebase", "Clerk", "AI evaluation"],
    description:
      "Built full-stack software projects involving Python, SQL, API integration, Firebase, Clerk authentication, and AI-powered profile evaluation using Llama/OpenAI models."
  }
];

export const achievements = [
  {
    icon: Sparkles,
    label: "Capstone recognition",
    detail: "1st place at the 2026 KEEN Senior Design Capstone Project Competition."
  },
  {
    icon: Wrench,
    label: "Engineering breadth",
    detail: "Work spans embedded control, cloud-connected apps, security tooling, and data products."
  },
  {
    icon: MapPinned,
    label: "Research direction",
    detail: "Focused on simulation-backed evaluation for resilient, intelligent technical systems."
  }
];

export const contact = {
  heading: "Let's Connect",
  message:
    "I am always open to discussing new opportunities, collaborations, research, internships, and technical projects.",
  email: "Nfn.Kanisha@rockets.utoledo.edu",
  phone: "+1-419-392-7405",
  social: {
    linkedin: "https://www.linkedin.com/in/kanisha-arora",
    github: "https://github.com/kanishaarora"
  }
};
