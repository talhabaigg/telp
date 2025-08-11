import { Head } from '@inertiajs/react';
import MainLayout from "./layouts/main.layout";
import TelpIcon from "@/components/icon";
import Brand from "@/components/brand";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState, type AnchorHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import {
  Check,
  ArrowRight,
  Cpu,
  Smartphone,
  Cloud,
  BarChart3,
  Users,
  Pencil,
  Code2,
  ShieldCheck,
  Rocket,
} from "lucide-react";

// -------------------- DATA -------------------- //
const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
];

// Optional: short positioning line under the logo
const SYDNEY_TAGLINE =
  "Sydney‑based IT solutions partner delivering modern software that scales beautifully.";

const heroTabs = [
  {
    label: "Our Profile",
    text:
      "TELP.com.au is a Sydney‑based IT solutions partner. We design and ship reliable software that looks sharp and measurably moves the metrics that matter—from dashboards and e‑commerce to native‑feel mobile apps.",
  },
  {
    label: "Our Vision",
    text:
      "To be the trusted APAC partner for digital transformation—helping organisations scale, connect, and innovate through purposeful design and modern engineering.",
  },
  {
    label: "Our Mission",
    text:
      "Deliver beautifully engineered systems that solve real operational pain, reduce friction, and feel effortless for end‑users—without compromising security or speed.",
  },
];

const projects = [
  {
    image:
      "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=1600&q=80&auto=format&fit=crop", // checkout/loyalty feel
    title: "E‑commerce Loyalty Platform",
    desc: "A rewards engine for retail: seamless onboarding, automated vouchers, and engagement analytics—built to scale.",
    tech: ["Laravel", "React", "MySQL", "Tailwind"],
    rating: 5,
    review:
      "TELP exceeded expectations—clear communication, fast delivery, and a best‑in‑class result.",
    client: "Nikki Pickering",
    position: "COO | Artesian Hospitality",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80&auto=format&fit=crop", // ops/logistics vibe
    title: "Logistics Management App",
    desc: "Track, optimise, and report in one place. Operational clarity at scale with a clean, mobile‑first experience.",
    tech: ["Laravel", "React Native", "AWS"],
    rating: 5,
    review:
      "Weekly demos kept us aligned. Operations are dramatically smoother now.",
    client: "Darren Lee",
    position: "Ops Manager | Bina Raya",
  },
];

const processSteps = [
  {
    num: 1,
    title: "Collaborative Discovery",
    desc: "We align on goals via stakeholder interviews, a current‑state review, and measurable success criteria.",
    note: "Phase 1",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80&auto=format&fit=crop", // discovery session
    features: ["Stakeholder interviews", "Current‑state review", "Goal mapping"],
    artifacts: ["Project brief", "Success metrics", "High‑level roadmap"],
    eta: "2–4 days",
  },
  {
    num: 2,
    title: "Blueprint & Prototyping",
    desc: "We ideate, wire, and validate with clickable prototypes so you can test the experience early and often.",
    note: "Phase 2",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=80&auto=format&fit=crop", // prototyping/whiteboard
    features: ["Wireflows", "Design tokens", "Interactive prototype"],
    artifacts: ["Screen map", "Prototype link", "Scoped estimate"],
    eta: "3–7 days",
  },
  {
    num: 3,
    title: "Agile Development",
    desc: "We ship in tight iterations with weekly demos, a transparent backlog, and quality gates (reviews & tests).",
    note: "Phase 3",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80&auto=format&fit=crop", // dev pairing
    features: ["Weekly demos", "Quality gates", "CI/CD pipeline"],
    artifacts: ["Prioritised backlog", "Release plan", "Test coverage report"],
    eta: "2–6 weeks",
  },
  {
    num: 4,
    title: "UAT & Launch",
    desc: "We run UAT on staging, harden security, and execute a calm rollout with monitoring and a clear runbook.",
    note: "Phase 4",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1600&q=80&auto=format&fit=crop", // launch metaphor
    features: ["Staging sign‑off", "Security hardening", "Rollout plan"],
    artifacts: ["Runbook", "Monitoring dashboards", "Go‑live checklist"],
    eta: "3–10 days",
  },
  {
    num: 5,
    title: "Growth & Support",
    desc: "Post‑launch we track success metrics, iterate against a roadmap, and support you under a clear SLA.",
    note: "Phase 5",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80&auto=format&fit=crop", // ongoing partnership
    features: ["Post‑launch metrics", "Iteration roadmap", "Support SLA"],
    artifacts: ["KPI report", "Backlog v2", "Support plan"],
    eta: "Ongoing",
  },
];

const faqs = [
  {
    q: "How long to launch a platform?",
    a: "MVPs and landing pages can go live within days. Bespoke systems typically take 3–8 weeks with demos every sprint so you always see progress.",
  },
  {
    q: "Can you modernise my legacy app?",
    a: "Yes. We plan and execute upgrades or migrations to a modern Laravel/React stack—minimising risk and downtime while maximising impact.",
  },
  {
    q: "Is support included after launch?",
    a: "Yes. We offer flexible support plans for rapid fixes, iterative improvements, and monthly health checks under clear SLAs.",
  },
  {
    q: "Do you cover design and branding?",
    a: "We partner with specialists for UI/UX, branding, copy, and illustration—assembling the right team for your goals.",
  },
];

const metrics = [
  { label: "Years of Experience", value: 9 },
  { label: "Clients Served", value: 500 },
  { label: "Projects Delivered", value: 200 },
  { label: "Industry Awards", value: 7 },
];

// -------------------- SERVICES DATA & HELPERS -------------------- //
const services = [
  {
    title: "Web Apps",
    desc: "Secure, scalable platforms with Laravel + React (SPA/SSR), with auth, RBAC, and payments built‑in.",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80&auto=format&fit=crop", // clean product/analytics desk
    category: "Web",
    features: ["SPA / SSR", "Auth & RBAC", "Payments"],
    Icon: Cpu,
  },
  {
    title: "Mobile Apps",
    desc: "iOS & Android via React Native—single codebase, native feel, and fast store releases.",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1600&q=80&auto=format&fit=crop", // mobile device hands-on
    category: "Mobile",
    features: ["App Store / Play", "Push & Deep Links", "Offline Mode"],
    Icon: Smartphone,
  },
  {
    title: "Cloud & DevOps",
    desc: "Deploy, scale, and observe on AWS using CI/CD, IaC, and sensible monitoring from day one.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80&auto=format&fit=crop", // code/server feel
    category: "Cloud",
    features: ["CI/CD", "Autoscaling", "Observability"],
    Icon: Cloud,
  },
  {
    title: "Data & Dashboards",
    desc: "Real‑time analytics and clean, actionable insights—so teams decide faster with confidence.",
    img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1600&q=80&auto=format&fit=crop", // charts/BI monitor
    category: "Data",
    features: ["Realtime Charts", "Cohorts", "Exports"],
    Icon: BarChart3,
  },
] as const;

type ServiceCategory = "All" | "Web" | "Mobile" | "Cloud" | "Data";

function serviceTone(cat: Exclude<ServiceCategory, "All">) {
  const map = {
    Web: {
      border: "border-indigo-200 dark:border-indigo-800",
      ring: "ring-indigo-200 dark:ring-indigo-800",
      chip: "bg-indigo-600",
      text: "text-indigo-700 dark:text-indigo-300",
    },
    Mobile: {
      border: "border-sky-200 dark:border-sky-800",
      ring: "ring-sky-200 dark:ring-sky-800",
      chip: "bg-sky-600",
      text: "text-sky-700 dark:text-sky-300",
    },
    Cloud: {
      border: "border-cyan-200 dark:border-cyan-800",
      ring: "ring-cyan-200 dark:ring-cyan-800",
      chip: "bg-cyan-600",
      text: "text-cyan-700 dark:text-cyan-300",
    },
    Data: {
      border: "border-fuchsia-200 dark:border-fuchsia-800",
      ring: "ring-fuchsia-200 dark:ring-fuchsia-800",
      chip: "bg-fuchsia-600",
      text: "text-fuchsia-700 dark:text-fuchsia-300",
    },
  } as const;
  return map[cat];
}

// -------------------- ANIMATIONS -------------------- //
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const processItemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.08 },
  }),
} as const;

// -------------------- LOCAL UI HELPERS -------------------- //
function GlassButton(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { className = "", ...rest } = props;
  return (
    <a
      {...rest}
      className={[
        "inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold",
        "bg-white/90 dark:bg-zinc-900/80 border border-indigo-200/60 dark:border-zinc-700",
        "text-indigo-700 dark:text-white transition hover:border-fuchsia-300 hover:shadow-md",
        className,
      ].join(" ")}
    />
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <span key={i} className="text-amber-400" aria-hidden>
            ★
          </span>
        ))}
    </div>
  );
}

// Decorative connector (curved arc) between alternating items
function ConnectorArc({ right }: { right: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={`absolute hidden md:block ${right ? "left-[49.8%]" : "right-[49.8%]"} top-1/2 -translate-y-1/2 w-28 h-24`}
      viewBox="0 0 112 96"
      fill="none"
    >
      <path
        d={right ? "M0,96 C56,96 56,0 112,0" : "M112,96 C56,96 56,0 0,0"}
        stroke="url(#grad)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="112" y2="96" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818cf8" />
          <stop offset="0.5" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// -------------------- PAGE -------------------- //
export default function Home(): JSX.Element {
  const { t } = useTranslation();
  const [tabIdx, setTabIdx] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [tix, setTix] = useState(0); // testimonial index
  const [serviceFilter, setServiceFilter] = useState<ServiceCategory>("All");

  const heroText = useMemo(() => t(heroTabs[tabIdx].text), [tabIdx, t]);

  useEffect(() => {
    const id = setInterval(() => setTix((v) => (v + 1) % projects.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <MainLayout
      headerProps={{
        sections: [
          { name: t("About"), id: "about" },
          { name: t("Projects"), id: "work" },
          { name: t("Services"), id: "services" },
          { name: t("Processes"), id: "processes" },
          { name: t("Clients"), id: "clients" },
          { name: t("Contact"), id: "contact" },
          { name: t("FAQ"), id: "faq" },
        ],
      }}
    >
      <Head title="Home" />
      {/* Global Background + moving blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-12rem] h-[34rem] w-[54rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-400/20 via-sky-400/15 to-fuchsia-400/10 blur-3xl animate-[floatY_8s_ease-in-out_infinite_alternate]" />
        <div className="absolute inset-0 bg-[radial-gradient(90rem_45rem_at_50%_-10%,rgba(255,255,255,0.08),transparent_60%)] dark:bg-[radial-gradient(90rem_45rem_at_50%_-10%,rgba(255,255,255,0.04),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-50/60 dark:from-zinc-900/40 to-transparent" />
      </div>

      {/* HERO — Editorial collage + tab narrative */}
      <motion.section
        id="about"
        className="pb-12 md:pb-16 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 px-4 items-center"
      >
        <div className="flex flex-col items-center md:items-start">
          <div className="flex flex-col gap-2 mb-2">
            <TelpIcon className="w-full" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400 hidden md:block">{t(SYDNEY_TAGLINE)}</p>
          </div>

          <h1 className="font-extrabold text-[2.35rem] leading-[1.05] md:text-[3.6rem] md:leading-[1.05] text-zinc-900 dark:text-white tracking-tight drop-shadow-sm text-center md:text-left">
            {t("Software that moves your business forward.")}
          </h1>

          {/* Tabs */}
          <div className="flex flex-row flex-wrap justify-center md:justify-start gap-2 mt-6 mb-5">
            {heroTabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setTabIdx(i)}
                className={`rounded-full px-4 md:px-5 py-2 text-sm md:text-[0.95rem] font-semibold border transition ${
                  tabIdx === i
                    ? "bg-gradient-to-r from-indigo-600 via-sky-600 to-fuchsia-600 text-white border-transparent shadow"
                    : "bg-white/90 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-sky-400"
                }`}
                aria-pressed={tabIdx === i}
              >
                {t(tab.label)}
              </button>
            ))}
          </div>

          {/* Copy */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tabIdx}
              variants={rise}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="text-[1.06rem] md:text-[1.2rem] text-zinc-700 dark:text-zinc-100 mb-6 min-h-[150px] text-center md:text-left font-medium leading-relaxed"
            >
              {heroText}
            </motion.div>
          </AnimatePresence>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <GlassButton className="text-center" href="#contact">
              {t("Start a project")}
            </GlassButton>
            <a
              href="#work"
              className="text-center rounded-full px-6 py-3 font-semibold text-zinc-700 dark:text-zinc-200 ring-1 ring-zinc-300/70 dark:ring-zinc-700/70 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/50 transition"
            >
              {t("See our work")}
            </a>
          </div>
        </div>

        {/* Editorial collage previews */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <motion.figure
              initial={{ opacity: 0, y: 20, rotate: -2, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, rotate: -1, scale: 1 }}
              transition={{ duration: 0.55 }}
              className="relative z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80&auto=format&fit=crop"
                alt="Product design discussion in a modern Sydney workspace"
                className="w-80 h-56 md:w-[24rem] md:h-64 rounded-3xl object-cover border border-zinc-200 dark:border-zinc-800 shadow-2xl"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 text-center">
                {t("Design systems & dashboards")}
              </figcaption>
            </motion.figure>

            <motion.figure
              initial={{ opacity: 0, y: 28, rotate: 5, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, rotate: 3, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="absolute -right-6 -bottom-10"
            >
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80&auto=format&fit=crop"
                alt="Engineer reviewing dashboards and code across multiple screens"
                className="w-64 h-44 md:w-80 md:h-56 rounded-3xl object-cover border border-zinc-200 dark:border-zinc-800 shadow-2xl"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 text-center">
                {t("Mobile experiences")}
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </motion.section>

      {/* Wave divider */}
      <div className="relative -mt-6 mb-10" aria-hidden>
        <svg viewBox="0 0 1440 110" className="w-full h-[70px] text-zinc-50 dark:text-zinc-900">
          <path
            fill="currentColor"
            d="M0,32L60,42.7C120,53,240,75,360,85.3C480,96,600,96,720,85.3C840,75,960,53,1080,48C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>
      </div>

      {/* CLIENTS marquee */}
      <section id="clients" className="pb-12 max-w-6xl mx-auto w-full px-4">
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur p-4">
          <Brand logos={logos} speed={24} />
          <div className="text-xs mt-3 text-zinc-400 dark:text-zinc-500 font-medium text-center">
            {t("Trusted by 500+ organisations and growing")}
          </div>
        </div>
      </section>

      {/* SERVICES — Editorial Mosaic */}
      <section id="services" className="pb-28 w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300">
            {t("Capabilities")}
          </div>
        </div>
        <h2 className="font-extrabold text-2xl md:text-3xl text-zinc-900 dark:text-white text-center tracking-tight">
          {t("What We Do")}
        </h2>
        <p className="max-w-2xl mx-auto text-center text-zinc-600 dark:text-zinc-300 mt-3 mb-8">
          {t("From discovery to delivery, we craft elegant, scalable products that drive outcomes.")}
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {(["All", "Web", "Mobile", "Cloud", "Data"] as ServiceCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setServiceFilter(cat)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ring-1 ${
                serviceFilter === cat
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "text-zinc-700 dark:text-zinc-300 ring-zinc-300/70 dark:ring-zinc-700/70 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/50"
              }`}
              aria-pressed={serviceFilter === cat}
            >
              {t(cat)}
            </button>
          ))}
        </div>

        {/* Cards */}
        {(() => {
          const visible = services.filter((s) => serviceFilter === "All" || s.category === serviceFilter);
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {visible.map((s, i) => {
                const tone = serviceTone(s.category as Exclude<ServiceCategory, "All">);
                const Icon = s.Icon;
                return (
                  <article
                    key={`${s.title}-${i}`}
                    className={`group rounded-2xl border ${tone.border} bg-white/80 dark:bg-zinc-900/70 backdrop-blur hover:shadow-lg transition overflow-hidden`}
                  >
                    <div className="p-6 flex items-start gap-4">
                      <div className={`shrink-0 rounded-xl p-2 border ${tone.border}`}>
                        <Icon className={`w-5 h-5 ${tone.text}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-900 dark:text-white">{t(s.title)}</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">{t(s.desc)}</p>
                      </div>
                    </div>
                    <ul className="px-6 pb-2 space-y-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                          <Check className={`w-4 h-4 ${tone.text}`} />
                          <span>{t(f)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="px-6 pb-6">
                      <a href="#contact" className={`inline-flex items-center gap-1 text-sm font-semibold ${tone.text} hover:underline`}>
                        {t("Explore")}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          );
        })()}
      </section>

      {/* WORK — mosaic */}
      <section id="work" className="pb-24 max-w-6xl mx-auto w-full px-4">
        <h2 className="font-bold text-2xl md:text-3xl mb-6 text-zinc-900 dark:text-white text-center">
          {t("Our Work & Expertise")}
        </h2>
        <p className="max-w-2xl mx-auto text-center text-zinc-600 dark:text-zinc-300 mb-12">
          {t("Selected projects that showcase speed, polish, and measurable outcomes.")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-6 gap-5">
          <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="sm:col-span-4 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white via-zinc-50 to-indigo-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-indigo-950 shadow"
          >
            <img
              src={projects[0].image}
              alt={projects[0].title}
              className="w-full h-64 object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="p-6">
              <div className="text-lg font-extrabold text-zinc-900 dark:text-white mb-1">{t(projects[0].title)}</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3">{t(projects[0].desc)}</p>
              <div className="flex flex-wrap gap-2">
                {projects[0].tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full px-3 py-1 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                  >
                    {t(tech)}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.aside
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="sm:col-span-2 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur p-6 flex flex-col justify-between"
          >
            <div>
              <div className="text-6xl font-serif text-zinc-200 dark:text-zinc-800 -mt-3 select-none">“</div>
              <p className="text-lg font-semibold text-zinc-900 dark:text-white leading-snug -mt-4">{t(projects[0].review)}</p>
            </div>
            <div className="mt-6">
              <Stars count={projects[0].rating} />
              <div className="mt-1 font-bold text-zinc-700 dark:text-zinc-100">{t(projects[0].client)}</div>
              <div className="text-sm text-zinc-400 dark:text-zinc-400">{t(projects[0].position)}</div>
            </div>
          </motion.aside>

          <motion.article
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="sm:col-span-3 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80"
          >
            <img
              src={projects[1].image}
              alt={projects[1].title}
              className="w-full h-56 object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="p-6">
              <div className="text-lg font-extrabold text-zinc-900 dark:text-white mb-1">{t(projects[1].title)}</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3">{t(projects[1].desc)}</p>
              <div className="flex flex-wrap gap-2">
                {projects[1].tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full px-3 py-1 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                  >
                    {t(tech)}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="sm:col-span-3 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700 p-6 flex items-center justify-center text-center"
          >
            <div>
              <div className="text-sm uppercase tracking-wider text-zinc-400">{t("Have something in mind?")}</div>
              <GlassButton href="#contact" className="mt-2">
                {t("Let’s talk")}
              </GlassButton>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur px-5 py-4 max-w-3xl w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={tix}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="text-center"
              >
                <div className="text-[0.9rem] text-zinc-700 dark:text-zinc-300 mb-2 italic">“{t(projects[tix].review)}”</div>
                <div className="text-xs text-zinc-400">
                  {t(projects[tix].client)} — {t(projects[tix].position)}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* METRICS strip */}
      <section className="pb-12 max-w-5xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-6 text-center px-4">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur px-4 py-6"
          >
            <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-sky-500 to-fuchsia-600 mb-1 drop-shadow">
              {m.value}
            </div>
            <div className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">{t(m.label)}</div>
          </motion.div>
        ))}
      </section>

      {/* OUR PROCESS — Flow Bands */}
      <section id="processes" className="relative pb-32 max-w-6xl mx-auto w-full px-4">
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300">
            {t("How we work")}
          </div>
        </div>
        <h2 className="font-extrabold text-2xl md:text-3xl text-zinc-900 dark:text-white text-center tracking-tight">
          {t("Our Process")}
        </h2>
        <p className="max-w-2xl mx-auto text-center text-zinc-600 dark:text-zinc-300 mt-3 mb-16">
          {t("A transparent path from idea to launch—measurable steps, continuous feedback.")}
        </p>

        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-full w-[3px] rounded bg-gradient-to-b from-indigo-300 via-sky-400 to-cyan-400 opacity-40" />

        <ol className="relative grid gap-16 md:gap-20">
          {processSteps.map((s, i) => {
            const right = i % 2 === 1;
            const shape = ["rounded-xl", "rounded-2xl", "rounded-3xl"][i % 3];
            const tone = [
              "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200/60 dark:border-indigo-800/60",
              "bg-sky-50 dark:bg-sky-950/20 border-sky-200/60 dark:border-sky-800/60",
              "bg-fuchsia-50 dark:bg-fuchsia-950/20 border-fuchsia-200/60 dark:border-fuchsia-800/60",
            ][i % 3];
            const imgTone = [
              "border-indigo-200 dark:border-indigo-900",
              "border-sky-200 dark:border-sky-900",
              "border-fuchsia-200 dark:border-fuchsia-900",
            ][i % 3];
            const chip = ["bg-indigo-600", "bg-sky-600", "bg-fuchsia-600"][i % 3];
            const toneGrad = [
              "from-indigo-500 to-indigo-400",
              "from-sky-500 to-sky-400",
              "from-fuchsia-500 to-fuchsia-400",
            ][i % 3];
            const rotBase = [-1.5, 0, 1.5][i % 3];
            const WatermarkIcon = [Users, Pencil, Code2, ShieldCheck, Rocket][i % 5];
            const highlightChip = ["bg-indigo-600", "bg-sky-600", "bg-fuchsia-600"][i % 3];

            const progressLabels = [
              t("Discovery"),
              t("Blueprint"),
              t("Development"),
              t("UAT & Launch"),
              t("Growth"),
            ];

            const badgeLabels = s.features?.slice(0, 2) ?? s.artifacts?.slice(0, 2) ?? [];

            return (
              <motion.li
                key={s.title}
                custom={i}
                variants={processItemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className={`relative grid items-stretch gap-6 md:gap-10 ${right ? "md:grid-cols-[1.1fr_.9fr]" : "md:grid-cols-[.9fr_1.1fr]"}`}
              >
                {/* timeline node */}
                <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white dark:bg-zinc-900 ring-2 ring-sky-400/70 shadow" />
                <ConnectorArc right={right} />

                {/* Text Card */}
                <div className={`${right ? "" : "order-2"} flex`}>
                  <div className={`relative w-full ${shape} border ${tone} shadow-xl overflow-hidden`}>
                    <div className={`absolute inset-x-0 -top-px h-[3px] bg-gradient-to-r ${toneGrad}`} />
                    <WatermarkIcon className="pointer-events-none absolute -right-3 -top-3 w-24 h-24 text-zinc-400/40 dark:text-zinc-600/40" />
                    <div className="absolute inset-0 pointer-events-none opacity-[.12] dark:opacity-[.08] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,.25)_1px,transparent_1.5px)] [background-size:14px_14px]" />

                    <div className={`relative h-full ${shape} bg-white/90 dark:bg-zinc-900/85 backdrop-blur p-6 md:p-8`}>
                      <div className="flex items-center gap-3 mb-5">
                        <span className={`inline-flex items-center gap-2 ${chip} text-white px-3 py-1 rounded-full text-xs font-semibold`}>{t(s.note)}</span>
                      </div>

                      <h3 className="text-2xl md:text-[1.7rem] font-bold text-zinc-900 dark:text-white leading-tight">{t(s.title)}</h3>
                      <p className="mt-2 text-base md:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">{t(s.desc)}</p>

                      {/* feature pills */}
                      {s.features && (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {s.features.map((f) => (
                            <li
                              key={f}
                              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>{t(f)}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* meta chips */}
                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                        {s.eta && (
                          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 ring-1 ring-zinc-300/70 dark:ring-zinc-700/70">
                            {t(s.eta)}
                          </span>
                        )}
                        {s.artifacts?.slice(0, 3).map((a) => (
                          <span key={a} className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800">
                            {t(a)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Card */}
                <div className={`${right ? "order-2" : ""} relative group`}>
                  <motion.div
                    initial={{ rotate: rotBase }}
                    whileHover={{ rotate: rotBase + (right ? -2 : 2), scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    className={`${shape} overflow-hidden border ${imgTone} shadow-2xl bg-white dark:bg-zinc-900`}
                  >
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-[18rem] md:h-[20rem] object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    {badgeLabels.length > 0 && (
                      <div className="absolute top-3 right-3 flex gap-2">
                        {badgeLabels.map((bl) => (
                          <span key={bl} className="px-2 py-0.5 text-xs font-semibold rounded-full bg-zinc-900/80 text-white backdrop-blur-sm">
                            {t(bl)}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end justify-center p-4">
                      <span className="text-white font-semibold text-sm bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">{t(s.title)}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </section>

      {/* FAQ */}
      <section id="faq" className="pb-20 max-w-3xl mx-auto w-full px-4">
        <h2 className="font-bold text-2xl md:text-3xl mb-10 text-zinc-900 dark:text-white text-center">
          {t("Frequently Asked Questions")}
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.11 + 0.13, type: "spring", stiffness: 100 }}
              className="rounded-2xl bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-base font-medium text-zinc-900 dark:text-white focus:outline-none"
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                aria-expanded={openFAQ === i}
              >
                <span>{t(f.q)}</span>
                <motion.span
                  animate={{ rotate: openFAQ === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3 text-xl text-zinc-400"
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openFAQ === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="px-6 pb-5 text-zinc-600 dark:text-zinc-300 overflow-hidden text-base"
                  >
                    {t(f.a)}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" className="pb-28 max-w-3xl mx-auto w-full px-4">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-sky-600 to-fuchsia-600 border-none px-6 md:px-10 py-12 md:py-16 flex flex-col items-center text-center">
          <h2 className="font-extrabold text-3xl md:text-4xl mb-4 text-white drop-shadow">{t("Ready to get started?")}</h2>
          <div className="text-base md:text-lg text-white/90 mb-8 max-w-xl">
            {t("Book a free consultation and let’s discuss your goals, timelines, and the fastest path to value.")}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:admin@telp.com.au"
              className="bg-white text-indigo-600 font-semibold rounded-full px-7 py-3 shadow-none hover:scale-105 transition-all text-base"
              style={{ minWidth: 160, textAlign: "center" }}
            >
              {t("Email Us")}
            </a>
            <a
              href="#about"
              className="rounded-full px-7 py-3 font-semibold text-white/90 ring-1 ring-white/40 hover:bg-white/10 transition-all"
              style={{ minWidth: 160, textAlign: "center" }}
            >
              {t("Back to Top")}
            </a>
          </div>
        </div>
      </section>

      {/* Minor local styles */}
      <style>{`
        body { overflow-x: hidden !important; }
        .animate-float { animation: floatY 3s ease-in-out infinite alternate; }
        @keyframes floatY { 0%{transform:translateY(0)} 100%{transform:translateY(-14px)} }
        @keyframes floatYSlow { 0%{transform:translateY(0)} 100%{transform:translateY(-10px)} }
        @keyframes floatY_8s_ease-in-out_infinite_alternate { 0%{transform:translateY(0)} 100%{transform:translateY(-22px)} }
      `}</style>
    </MainLayout>
  );
}
