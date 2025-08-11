import MainLayout from "./layouts/main.layout";
import Telp from "@/components/telp";
import Brand from "@/components/brand";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Code2, Server, Smartphone, LineChart } from "lucide-react";

// -------------------- DATA -------------------- //
const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
];

const heroTabs = [
  {
    label: "Our Profile",
    text:
      "We create high-impact platforms for brands with vision. From business dashboards to e-commerce and mobile, TELP crafts robust software with speed and style. Let's build something your team (and your clients) will love.",
  },
  {
    label: "Our Vision",
    text:
      "To be the leading force in digital transformation—empowering businesses to scale, connect, and innovate through cutting-edge technology and creative solutions.",
  },
  {
    label: "Our Mission",
    text:
      "Deliver beautifully engineered products that solve real business challenges, provide lasting value, and make technology feel effortless for everyone.",
  },
];

const projects = [
  {
    image: "https://blogcontents.mandalasystem.com/wp-content/uploads/2024/05/farfetch-membership.png",
    title: "E-commerce Loyalty Program",
    desc: "Reward platform for retail—seamless onboarding, voucher automation, and customer engagement analytics.",
    tech: ["Laravel", "React", "MySQL", "Tailwind"],
    rating: 5,
    review:
      "What truly sets TELP apart is their commitment to client satisfaction. They went above and beyond to ensure the final product was not just good, but exceptional.",
    client: "Nikki Pickering",
    position: "COO | Artesian Hospitality",
  },
  {
    image: "https://multiqos.com/blogs/wp-content/uploads/2022/08/The-Complete-Guide-Transportation-_-Logistics-Mobile-App-Development.png",
    title: "Logistics Management App",
    desc: "Track, optimize, and report all your logistics in one place. Built for efficiency and clarity at scale.",
    tech: ["Laravel", "React Native", "AWS"],
    rating: 5,
    review:
      "TELP’s team delivered our system fast and communicated every step. Our day-to-day operations are so much easier.",
    client: "Darren Lee",
    position: "Ops Manager | Bina Raya",
  },
];

const techColors: Record<string, string> = {
  Laravel: "bg-red-50 text-red-600 border border-red-200",
  React: "bg-blue-50 text-blue-600 border border-blue-200",
  "React Native": "bg-cyan-50 text-cyan-600 border border-cyan-200",
  MySQL: "bg-sky-50 text-sky-600 border border-sky-200",
  AWS: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Tailwind: "bg-indigo-50 text-indigo-600 border border-indigo-200",
};

const processSteps = [
  {
    icon: "💬",
    title: "Collaborative Discovery",
    desc: "We start by deeply understanding your business needs, industry, and vision for impact.",
  },
  {
    icon: "🔎",
    title: "Blueprint & Prototyping",
    desc: "See clickable prototypes—test ideas fast, iterate with confidence before we write code.",
  },
  {
    icon: "⚡",
    title: "Agile Development",
    desc: "Fast, transparent build. Weekly progress, demos, and honest feedback—your input is our process.",
  },
  {
    icon: "🌱",
    title: "Growth & Support",
    desc: "Launch is just the beginning—TELP helps you scale, improve, and seize new opportunities.",
  },
];

const faqs = [
  {
    q: "How long to launch a platform?",
    a: "MVPs & landing pages can go live in days. Custom or enterprise systems typically 3–8 weeks, with clear timelines and demos every sprint.",
  },
  {
    q: "Can you help modernize my legacy app?",
    a: "Absolutely! We specialize in upgrades, migration, and refactoring to modern Laravel/React stacks—zero downtime, max results.",
  },
  {
    q: "Is support included after launch?",
    a: "Yes, we offer dedicated support plans, rapid bug fixes, new features, and monthly health checks for all clients.",
  },
  {
    q: "Can you help design & branding too?",
    a: "Yes, our partners cover UI/UX, branding, copywriting, and custom illustration. We’ll assemble the perfect team.",
  },
];

const metrics = [
  { label: "Years of Experience", value: 9 },
  { label: "Happy Clients", value: 500 },
  { label: "Projects Delivered", value: 200 },
  { label: "Awards Won", value: 7 },
];

// -------------------- ANIMATIONS -------------------- //
const bookSheetAnim = {
  hidden: { opacity: 0, rotate: -6, y: 44, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    rotate: i % 2 === 0 ? -6 : 6,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15 + 0.17,
      type: "spring",
      stiffness: 80,
      damping: 16,
    },
  }),
  hover: {
    scale: 1.03,
    rotate: 0,
    boxShadow: "0 8px 32px 0 rgba(123,97,255,0.09)",
  },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// -------------------- LOCAL UI: StepBadge -------------------- //
function StepBadge({ index, icon }: { index: number; icon: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="relative grid place-items-center w-16 h-16 rounded-full p-[2px] bg-[conic-gradient(from_160deg_at_50%_50%,_#6366f1,_#a855f7,_#ec4899,_#6366f1)] shadow-md ring-1 ring-black/5 dark:ring-white/5"
      aria-label={`Step ${index}`}
    >
      <div className="relative grid place-items-center w-full h-full rounded-full bg-white/85 dark:bg-zinc-900/75 backdrop-blur-md">
        {/* inner ring */}
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/60 dark:ring-zinc-800" />
        {/* sheen */}
        <span className="pointer-events-none absolute -top-1 left-1 h-8 w-12 -rotate-12 rounded-full bg-white/60 dark:bg-white/10" />
        {/* icon */}
        <span className="text-2xl font-bold select-none">{icon}</span>
        {/* index badge */}
        <span className="absolute -bottom-1 -right-1 grid place-items-center min-w-[22px] h-[22px] px-1.5 text-[11px] leading-none font-semibold rounded-full text-white bg-gradient-to-r from-indigo-600 to-fuchsia-600 shadow">
          {index}
        </span>
      </div>
    </motion.div>
  );
}

// -------------------- PAGE -------------------- //
export default function Home() {
  const { t } = useTranslation();
  const [tabIdx, setTabIdx] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const heroText = useMemo(() => t(heroTabs[tabIdx].text), [tabIdx, t]);

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
          { name: t("F&Q"), id: "faq" },
        ],
      }}
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-8rem] h-[28rem] w-[44rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-400/25 via-fuchsia-400/20 to-pink-400/10 blur-3xl" />
      </div>

      {/* HERO */}
      <motion.section
        id="about"
        className="pt-24 md:pt-32 pb-14 md:pb-20 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 px-4 items-center"
      >
        <div className="flex flex-col items-center md:items-start">
          <h1 className="font-extrabold text-3xl md:text-5xl text-zinc-900 dark:text-white mb-5 tracking-tight drop-shadow-sm text-center md:text-left">
            TELP IT Solutions
          </h1>

          {/* Tabs */}
          <div className="flex flex-row flex-wrap justify-center md:justify-start gap-2 mb-6">
            {heroTabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setTabIdx(i)}
                className={`rounded-full px-4 md:px-5 py-2 text-sm md:text-[0.95rem] font-semibold border transition ${
                  tabIdx === i
                    ? "bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-500 text-white border-transparent shadow"
                    : "bg-white/90 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-fuchsia-400"
                }`}
              >
                {t(tab.label)}
              </button>
            ))}
          </div>

          {/* Copy */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tabIdx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.22 }}
              className="text-[1.05rem] md:text-[1.25rem] text-zinc-700 dark:text-zinc-100 mb-5 min-h-[170px] md:min-h-[150px] text-center md:text-left font-medium leading-relaxed"
            >
              {heroText}
            </motion.div>
          </AnimatePresence>

          {/* CTA group */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-indigo-700 dark:text-white bg-white/90 dark:bg-zinc-900/80 border border-indigo-200/60 dark:border-zinc-700 transition hover:border-fuchsia-300"
            >
              {t("Start a Project")}
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-indigo-700 dark:text-white bg-white/90 dark:bg-zinc-900/80 border border-indigo-200/60 dark:border-zinc-700 transition hover:border-fuchsia-300"
            >
              {t("See Case Studies")}
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end items-center min-h-[220px]">
          <Telp className="w-56 h-56 md:w-72 md:h-72 drop-shadow-xl animate-float" />
        </div>
      </motion.section>

      {/* CLIENTS */}
      <section id="clients" className="pb-12 max-w-4xl mx-auto w-full flex flex-col items-center px-4">
        <Brand logos={logos} speed={20} />
        <div className="text-xs mt-3 text-zinc-400 dark:text-zinc-500 font-medium text-center">
          {t("Trusted by 500+ organizations & growing")}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="pb-24 w-full max-w-7xl mx-auto px-4">
        <h2 className="font-extrabold text-2xl md:text-3xl mb-10 text-zinc-900 dark:text-white text-center tracking-tight">
          {t("What We Do")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: <Code2 className="h-6 w-6" />, title: "Web Apps",
              desc: "Modern, secure, and scalable web platforms built with Laravel + React.",
            },
            {
              icon: <Smartphone className="h-6 w-6" />, title: "Mobile Apps",
              desc: "iOS & Android with React Native—single codebase, native feel.",
            },
            {
              icon: <Server className="h-6 w-6" />, title: "Cloud & DevOps",
              desc: "Deploy, scale, and observe with AWS best practices.",
            },
            {
              icon: <LineChart className="h-6 w-6" />, title: "Data & Dashboards",
              desc: "Real-time analytics with clean, actionable insights.",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur p-5 shadow hover:shadow-lg transition"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/15 to-pink-500/15 text-indigo-700 dark:text-indigo-300 mb-3">
                {s.icon}
              </div>
              <div className="font-semibold text-zinc-900 dark:text-white mb-1">{t(s.title)}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{t(s.desc)}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="pb-24 max-w-6xl mx-auto w-full px-4">
        <h2 className="font-bold text-2xl md:text-3xl mb-12 text-zinc-900 dark:text-white text-center">
          {t("Our Work & Expertise")}
        </h2>
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center justify-center">
          <div className="flex gap-0 md:gap-6 relative">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                variants={bookSheetAnim}
                viewport={{ once: true, margin: "-80px" }}
                className={`relative z-10 rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-gradient-to-br from-white via-zinc-50 to-indigo-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-indigo-950 w-72 md:w-80 h-[400px] md:h-[440px] p-6 flex flex-col items-center text-center transition-all ${
                  i === 0 ? "-rotate-[7deg] -ml-6" : "rotate-[7deg] -mr-6"
                }`}
                style={{
                  boxShadow:
                    i === 0
                      ? "4px 18px 50px 0 rgba(123,97,255,0.10)"
                      : "-4px 16px 50px 0 rgba(232,121,249,0.09)",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="rounded-xl mb-4 w-full h-40 object-cover border border-zinc-100 dark:border-zinc-800 shadow-sm"
                />
                <div className="font-extrabold text-lg text-zinc-900 dark:text-white mb-1">
                  {t(p.title)}
                </div>
                <div className="text-zinc-600 dark:text-zinc-300 mb-2 text-sm">
                  {t(p.desc)}
                </div>
                <div className="flex flex-wrap justify-center gap-2 my-3">
                  {p.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        techColors[tech] || "bg-zinc-100 text-zinc-500 border"
                      }`}
                    >
                      {t(tech)}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center items-center mb-2">
                  {Array(p.rating)
                    .fill(0)
                    .map((_, j) => (
                      <span key={j} className="text-yellow-400 text-xl">
                        ★
                      </span>
                    ))}
                </div>
                <div className="italic text-zinc-500 text-xs mt-2">
                  {t(p.client)}, <span className="not-italic">{t(p.position)}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pull-out quote */}
          <div className="flex-1 max-w-xl px-2 md:px-0">
            <div className="text-5xl md:text-6xl font-serif text-zinc-200 dark:text-zinc-800 mb-2 select-none">
              “
            </div>
            <div className="text-xl md:text-2xl font-semibold text-zinc-900 dark:text-white mb-5 leading-snug">
              {t(projects[0].review)}
            </div>
            <div className="flex items-center gap-2 mb-3">
              {Array(projects[0].rating)
                .fill(0)
                .map((_, j) => (
                  <span key={j} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
            </div>
            <div className="font-bold text-zinc-700 dark:text-zinc-100">
              {t(projects[0].client)}
            </div>
            <div className="text-sm text-zinc-400 dark:text-zinc-400">
              {t(projects[0].position)}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <a
            href="#work"
            className="inline-block rounded-full bg-white/90 dark:bg-zinc-900/80 text-indigo-700 dark:text-white font-semibold px-8 py-3 border border-indigo-200/70 dark:border-zinc-700 transition hover:border-fuchsia-300 hover:shadow"
          >
            {t("More Projects")}
          </a>
        </div>
      </section>

      {/* METRICS */}
      <section className="pb-16 max-w-5xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-fuchsia-500 to-pink-500 mb-1 drop-shadow">
              {m.value}
            </div>
            <div className="text-base text-zinc-700 dark:text-zinc-300 font-medium">
              {t(m.label)}
            </div>
          </motion.div>
        ))}
      </section>

      {/* PROCESS */}
      <section id="processes" className="pb-24 max-w-2xl mx-auto w-full px-4">
        <h2 className="font-extrabold text-2xl md:text-3xl mb-12 text-zinc-900 dark:text-white text-center tracking-tight">
          {t("Our Process")}
        </h2>
        <div className="relative flex flex-col">
          <div className="absolute left-8 top-7 bottom-7 w-1 bg-gradient-to-b from-indigo-400/40 via-fuchsia-400/10 to-pink-300/0 rounded-full pointer-events-none" />
          <div className="flex flex-col gap-14 relative z-10">
            {processSteps.map((step, i, arr) => (
              <motion.div
                key={i}
                className="relative flex items-start gap-6 group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={i}
                variants={bookSheetAnim}
              >
                <div className="relative z-10">
                  {/* Redesigned step badge */}
                  <StepBadge index={i + 1} icon={step.icon} />
                  {/* connector */}
                  {i !== arr.length - 1 && (
                    <div className="absolute left-1/2 top-[calc(100%+0.25rem)] -translate-x-1/2 w-px h-10 bg-gradient-to-b from-indigo-400/40 via-fuchsia-200/20 to-pink-300/0" />
                  )}
                </div>
                <div className="flex-1 ml-2">
                  <div className="rounded-2xl px-6 py-6 shadow-md border border-indigo-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-[2.5px] transition group-hover:shadow-xl group-hover:border-fuchsia-200/70">
                    <div className="font-semibold text-lg text-zinc-900 dark:text-white mb-1 tracking-tight">
                      {t(step.title)}
                    </div>
                    <div className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-base">
                      {t(step.desc)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
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
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-500 border-none px-6 md:px-10 py-12 md:py-16 flex flex-col items-center text-center">
          <h2 className="font-extrabold text-3xl md:text-4xl mb-4 text-white drop-shadow">
            {t("Ready to get started?")}
          </h2>
          <div className="text-base md:text-lg text-white/90 mb-8 max-w-xl">
            {t(
              "Click the button below to organise a free consultation, where we can discuss your project and determine if we’re the right fit."
            )}
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

      <style>{`
        .animate-float { animation: floatY 3s ease-in-out infinite alternate; }
        @keyframes floatY { 0%{transform:translateY(0)} 100%{transform:translateY(-14px)} }
      `}</style>
    </MainLayout>
  );
}
