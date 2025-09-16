// resources/js/Pages/career.tsx
import { Head } from "@inertiajs/react";
import MainLayout from "./layouts/main.layout";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Briefcase, MapPin, Timer, Heart, Sparkles, ArrowRight, ArrowUpRight, UsersRound, Award, SlidersHorizontal, SortAsc, Rocket } from "lucide-react";

const COPY = {
  headTitle: "Careers",
  nav: { overview: "Overview", positions: "Positions", teams: "Teams", steps: "Steps" },
  hero: {
    kicker: "Join the builders",
    title: "Ship real software and own meaningful outcomes",
    subtitle: "We are a focused team that moves with clarity. Fewer layers. Better work. Faster growth.",
    cta: "See Positions",
  },
  filters: {
    title: "Filters",
    team: "Team",
    location: "Location",
    type: "Work Type",
    order: "Order",
    all: "All",
    teams: ["Engineering", "Mobile", "DevOps", "Design", "QA"],
    locations: ["Remote", "Jakarta", "Singapore", "Sydney"],
    types: ["Full-time", "Contract", "Internship"],
    orders: ["Newest", "A–Z", "Z–A"],
  },
  positions: { title: "Positions" },
  teams: { title: "Teams" },
  steps: {
    title: "Steps",
    items: [
      { n: 1, title: "Intro", desc: "Short chat to align on goals and expectations." },
      { n: 2, title: "Practical Task", desc: "Small exercise mirroring day to day." },
      { n: 3, title: "Deep Dive", desc: "Tradeoffs, roadmap, and growth path." },
      { n: 4, title: "Offer", desc: "Clear terms and a smooth start." },
    ],
  },
  perks: [
    { icon: Heart, title: "Flexible and Remote Friendly", desc: "Work from anywhere with async rhythm and clear ownership." },
    { icon: Timer, title: "Lean Process", desc: "Short loops, fast feedback, and decisions that unblock delivery." },
    { icon: Sparkles, title: "Learning Budget", desc: "Courses, books, and certifications fully supported." },
  ],
};

type Role = { id: string; title: string; location: string; type: string; team: string; tags: string[]; brief: string; createdAt: string };

const ROLES: Role[] = [
  { id: "r1", title: "Senior Laravel Engineer", location: "Remote", type: "Full-time", team: "Engineering", tags: ["Laravel", "MySQL", "Redis"], brief: "Own services, reviews, and delivery in a compact squad.", createdAt: "2024-07-06" },
  { id: "r2", title: "React or React Native Developer", location: "Jakarta", type: "Contract", team: "Mobile", tags: ["React", "React Native", "Tailwind"], brief: "Build mobile first experiences with clean interaction.", createdAt: "2024-06-25" },
  { id: "r3", title: "DevOps Engineer", location: "Singapore", type: "Full-time", team: "DevOps", tags: ["AWS", "CI/CD", "Observability"], brief: "Design pipelines and keep systems healthy at scale.", createdAt: "2024-06-10" },
  { id: "r4", title: "Product Designer", location: "Sydney", type: "Full-time", team: "Design", tags: ["Figma", "Design Systems", "Prototyping"], brief: "Shape flows, push clarity, and validate with users.", createdAt: "2024-05-19" },
  { id: "r5", title: "QA Engineer", location: "Remote", type: "Internship", team: "QA", tags: ["Testing", "Cypress", "Playwright"], brief: "Automate checks and champion reliability.", createdAt: "2024-07-01" },
];

type Member = { id: string; name: string; role: string; bio: string; photo: string; location: string; badges?: string[] };

const TEAM: Member[] = [
  { id: "m1", name: "Alya Hartono", role: "Engineering Lead", location: "Jakarta", bio: "Keeps services reliable and teams unblocked. Loves clean architecture and weekend cycling.", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop", badges: ["Laravel", "DDD", "CI/CD"] },
  { id: "m2", name: "Ravi Narayan", role: "Product Designer", location: "Singapore", bio: "Turns fuzzy briefs into smooth flows. Figma power user and keen on microcopy.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", badges: ["Design Systems", "Prototyping"] },
  { id: "m3", name: "Sienna Cole", role: "Mobile Engineer", location: "Remote", bio: "Ships native‑feel experiences with attention to detail and offline resilience.", photo: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop", badges: ["React Native", "Testing"] },
  { id: "m4", name: "Kenji Watanabe", role: "DevOps", location: "Sydney", bio: "Automates repeatable work and keeps rollouts calm with solid observability.", photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop", badges: ["AWS", "Terraform", "Grafana"] },
];

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export default function Career(): JSX.Element {
  const { t } = useTranslation();
  const [team, setTeam] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [order, setOrder] = useState<string>("Newest");

  const filtered = useMemo(() => {
    let rows = ROLES.filter((r) => {
      const byTeam = !team || r.team === team;
      const byLoc = !location || r.location === location;
      const byType = !type || r.type === type;
      return byTeam && byLoc && byType;
    });
    if (order === "Newest") rows = rows.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    if (order === "A–Z") rows = rows.sort((a, b) => a.title.localeCompare(b.title));
    if (order === "Z–A") rows = rows.sort((a, b) => b.title.localeCompare(a.title));
    return rows;
  }, [team, location, type, order]);

  return (
    <MainLayout
      headerProps={{
        sections: [
          { name: t(COPY.nav.overview), id: "career-hero" },
          { name: t(COPY.nav.positions), id: "career-positions" },
          { name: t(COPY.nav.teams), id: "career-teams" },
          { name: t(COPY.nav.steps), id: "career-steps" },
        ],
      }}
    >
      <Head title={t(COPY.headTitle)} />

      {/* HERO */}
      <section id="career-hero" className="relative max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-10rem] h-[26rem] w-[44rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-400/20 via-sky-400/15 to-fuchsia-400/10 blur-3xl" />
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300">
            <Briefcase className="w-3.5 h-3.5" />
            {t(COPY.hero.kicker)}
          </div>
          <h1 className="mt-3 font-extrabold text-[2.15rem] md:text-[3rem] leading-[1.05] tracking-tight text-zinc-900 dark:text-white">
            {t(COPY.hero.title)}
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-zinc-600 dark:text-zinc-300">
            {t(COPY.hero.subtitle)}
          </p>
          <div className="mt-6">
            {/* GRADIENT CTA */}
            <a
              href="#career-positions"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold bg-gradient-to-r from-indigo-600 via-sky-600 to-fuchsia-600 text-white hover:opacity-95 active:scale-[0.99] transition"
            >
              {t(COPY.hero.cta)} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Perks */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {COPY.perks.map((p, i) => {
            const Icon = p.icon as any;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur px-4 py-5"
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white">{t(p.title)}</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-300">{t(p.desc)}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* POSITIONS */}
      <section id="career-positions" className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 p-4 md:p-5 backdrop-blur">
          <div className="flex items-center gap-3 mb-3 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
            <SlidersHorizontal className="w-4 h-4" />
            {t(COPY.filters.title)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Team */}
            <div className="relative">
              <label className="block mb-1 text-xs font-medium text-zinc-700 dark:text-zinc-200">
                {t(COPY.filters.team)}
              </label>
              <select
                className="w-full appearance-none rounded-xl bg-white/90 dark:bg-zinc-900/80
                           border border-zinc-200 dark:border-zinc-700
                           text-zinc-800 dark:text-zinc-100 shadow-sm transition
                           focus:outline-none focus:ring-4 focus:ring-indigo-300/30 dark:focus:ring-indigo-500/20
                           focus:border-indigo-400 dark:focus:border-indigo-500
                           hover:border-sky-300 dark:hover:border-sky-500
                           px-4 py-2.5 pr-10 text-sm"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              >
                <option value="">{t(COPY.filters.all)}</option>
                {COPY.filters.teams.map((v) => (
                  <option key={v} value={v}>
                    {t(v)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 bottom-2.5 text-zinc-400 dark:text-zinc-500">▼</div>
            </div>

            {/* Location */}
            <div className="relative">
              <label className="block mb-1 text-xs font-medium text-zinc-700 dark:text-zinc-200">
                {t(COPY.filters.location)}
              </label>
              <select
                className="w-full appearance-none rounded-xl bg-white/90 dark:bg-zinc-900/80
                           border border-zinc-200 dark:border-zinc-700
                           text-zinc-800 dark:text-zinc-100 shadow-sm transition
                           focus:outline-none focus:ring-4 focus:ring-indigo-300/30 dark:focus:ring-indigo-500/20
                           focus:border-indigo-400 dark:focus:border-indigo-500
                           hover:border-sky-300 dark:hover:border-sky-500
                           px-4 py-2.5 pr-10 text-sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">{t(COPY.filters.all)}</option>
                {COPY.filters.locations.map((v) => (
                  <option key={v} value={v}>
                    {t(v)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 bottom-2.5 text-zinc-400 dark:text-zinc-500">▼</div>
            </div>

            {/* Type */}
            <div className="relative">
              <label className="block mb-1 text-xs font-medium text-zinc-700 dark:text-zinc-200">
                {t(COPY.filters.type)}
              </label>
              <select
                className="w-full appearance-none rounded-xl bg-white/90 dark:bg-zinc-900/80
                           border border-zinc-200 dark:border-zinc-700
                           text-zinc-800 dark:text-zinc-100 shadow-sm transition
                           focus:outline-none focus:ring-4 focus:ring-indigo-300/30 dark:focus:ring-indigo-500/20
                           focus:border-indigo-400 dark:focus:border-indigo-500
                           hover:border-sky-300 dark:hover:border-sky-500
                           px-4 py-2.5 pr-10 text-sm"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">{t(COPY.filters.all)}</option>
                {COPY.filters.types.map((v) => (
                  <option key={v} value={v}>
                    {t(v)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 bottom-2.5 text-zinc-400 dark:text-zinc-500">▼</div>
            </div>

            {/* Order */}
            <div className="relative">
              <label className="block mb-1 text-xs font-medium text-zinc-700 dark:text-zinc-200 flex items-center gap-1">
                {t(COPY.filters.order)} <SortAsc className="w-3.5 h-3.5" />
              </label>
              <select
                className="w-full appearance-none rounded-xl bg-white/90 dark:bg-zinc-900/80
                           border border-zinc-200 dark:border-zinc-700
                           text-zinc-800 dark:text-zinc-100 shadow-sm transition
                           focus:outline-none focus:ring-4 focus:ring-indigo-300/30 dark:focus:ring-indigo-500/20
                           focus:border-indigo-400 dark:focus:border-indigo-500
                           hover:border-sky-300 dark:hover:border-sky-500
                           px-4 py-2.5 pr-10 text-sm"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              >
                {COPY.filters.orders.map((v) => (
                  <option key={v} value={v}>
                    {t(v)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 bottom-2.5 text-zinc-400 dark:text-zinc-500">▼</div>
            </div>
          </div>
        </div>

        {/* Roles */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((r) => (
            <motion.article
              key={r.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-900/70 p-5 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <MapPin className="w-3.5 h-3.5" />
                {t(r.location)} • {t(r.type)} • {t(r.team)}
              </div>
              <h3 className="mt-1 font-bold text-zinc-900 dark:text-white">{t(r.title)}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{t(r.brief)}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {r.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2.5 py-1 text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                  >
                    {t(tag)}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                {/* GRADIENT Apply */}
                <a
                  href={`mailto:admin@telp.com.au?subject=${encodeURIComponent("Apply: " + r.title)}`}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                >
                  {t("Apply now")} <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#career-teams"
                  className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300"
                >
                  {t("Meet the team")} <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* TEAMS */}
      <section id="career-teams" className="max-w-6xl mx-auto px-4 pb-16">
        <div className="mb-4 text-center text-sm font-semibold text-zinc-700 dark:text-zinc-200">
          {t(COPY.teams.title)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {TEAM.map((m) => (
            <motion.article
              key={m.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80"
            >
              <div className="relative h-48">
                <img src={m.photo} alt={m.name} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-70 transition" />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 text-zinc-900 px-2.5 py-1 text-[11px] font-semibold">
                  <UsersRound className="w-3.5 h-3.5" />
                  {m.location}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-zinc-900 dark:text-white">{m.name}</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 text-white px-2 py-0.5 text-[10px] font-semibold">
                    <Award className="w-3 h-3" />
                    Core
                  </span>
                </div>
                <div className="text-sm text-indigo-700 dark:text-indigo-300 font-semibold">{m.role}</div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{m.bio}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.badges?.map((b) => (
                    <span
                      key={b}
                      className="rounded-full px-2.5 py-1 text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section id="career-steps" className="max-w-5xl mx-auto px-4 pb-24">
        <h2 className="font-extrabold text-2xl md:text-3xl text-zinc-900 dark:text-white text-center">
          {t(COPY.steps.title)}
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          {COPY.steps.items.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-900/70 p-5 text-center"
            >
              <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
                {s.n}
              </div>
              <div className="font-semibold text-zinc-900 dark:text-white">{t(s.title)}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-300">{t(s.desc)}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
