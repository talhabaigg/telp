import { Head } from "@inertiajs/react";
import MainLayout from "./layouts/main.layout";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Sparkles, Star, Layers, Trophy, BadgeCheck, SlidersHorizontal, SortAsc, LineChart } from "lucide-react";

const COPY = {
  headTitle: "Portfolio",
  nav: { hero: "Overview", work: "Projects", cases: "Cases" },
  hero: {
    kicker: "Work that ships",
    title: "Enterprise software that feels elegant and performs under pressure",
    subtitle: "Browse a selection of projects with measurable outcomes and crisp execution.",
    cta: "Start a Brief",
  },
  filters: {
    title: "Filters",
    industry: "Industry",
    stack: "Tech Stack",
    result: "Outcome",
    order: "Order",
    all: "All",
    industries: ["Retail", "Logistics", "Finance", "Healthcare", "Hospitality", "Public Sector", "Education", "SaaS"],
    stacks: ["Laravel", "React", "React Native", "AWS", "MySQL", "PostgreSQL", "Tailwind", "Next.js"],
    results: ["Faster Releases", "Cost Reduction", "Operational Clarity", "New Revenue", "Security Uplift"],
    orders: ["Newest", "Oldest", "A–Z", "Z–A", "Featured"],
  },
  grid: { cta: "View details" },
  cases: { title: "Case Studies" },
  ribbons: { featured: "Featured", new: "New", award: "Awarded" },
};

type Project = {
  id: string;
  title: string;
  desc: string;
  cover: string;
  industry: string;
  stack: string[];
  result: string[];
  createdAt: string;
  featured?: boolean;
  new?: boolean;
  award?: boolean;
};

const PROJECTS: Project[] = [
  { id: "p1", title: "Ecommerce Loyalty Engine", desc: "Rewards, tiers, and analytics that grow repeat orders with clear insight for marketing teams.", cover: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=1600&q=80&auto=format&fit=crop", industry: "Retail", stack: ["Laravel", "React", "MySQL", "Tailwind"], result: ["New Revenue", "Operational Clarity"], createdAt: "2024-03-11", featured: true, award: true },
  { id: "p2", title: "Logistics Command Center", desc: "Live routes, exceptions, and SLA/SLO dashboards across mobile devices for field operations.", cover: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80&auto=format&fit=crop", industry: "Logistics", stack: ["React Native", "AWS", "PostgreSQL"], result: ["Faster Releases", "Operational Clarity"], createdAt: "2024-07-02", new: true },
  { id: "p3", title: "Treasury Risk Suite", desc: "Approvals, audit trails, and automated reconciliations with robust controls for finance teams.", cover: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1600&q=80&auto=format&fit=crop", industry: "Finance", stack: ["Laravel", "React", "PostgreSQL", "Tailwind"], result: ["Security Uplift", "Cost Reduction"], createdAt: "2023-12-20", featured: true },
  { id: "p4", title: "Patient Intake and Triage", desc: "Structured workflows speed up triage and clarify handoffs for busy clinics.", cover: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1600&q=80&auto=format&fit=crop", industry: "Healthcare", stack: ["React", "AWS"], result: ["Operational Clarity"], createdAt: "2023-08-05" },
  { id: "p5", title: "Franchise Reporting Hub", desc: "Unified analytics for multi‑brand owners with export‑ready insights and realtime tiles.", cover: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1600&q=80&auto=format&fit=crop", industry: "Hospitality", stack: ["Laravel", "React", "MySQL"], result: ["New Revenue", "Faster Releases"], createdAt: "2024-02-10" },
  { id: "p6", title: "Permit Application Portal", desc: "Public intake, queueing, and transparent status tracking with clear notifications.", cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80&auto=format&fit=crop", industry: "Public Sector", stack: ["React", "Tailwind", "PostgreSQL"], result: ["Operational Clarity", "Cost Reduction"], createdAt: "2023-10-15" },
  { id: "p7", title: "Campus Examination Suite", desc: "Exam scheduling, proctor tools, and auto‑grading with audit trails.", cover: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1600&q=80&auto=format&fit=crop", industry: "Education", stack: ["Laravel", "React", "MySQL"], result: ["Faster Releases", "Operational Clarity"], createdAt: "2024-05-14", featured: true },
  { id: "p8", title: "Usage‑Based Billing for SaaS", desc: "Event ingestion, metering, and invoices that scale with growth.", cover: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=1600&q=80&auto=format&fit=crop", industry: "SaaS", stack: ["Next.js", "AWS", "PostgreSQL"], result: ["New Revenue"], createdAt: "2024-01-28" },
  { id: "p9", title: "Store Ops Tablet", desc: "Task lists, checklists, and manager sign‑offs optimized for retail floors.", cover: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80&auto=format&fit=crop", industry: "Retail", stack: ["React", "Tailwind"], result: ["Operational Clarity", "Cost Reduction"], createdAt: "2023-09-01" },
];

type CaseStudy = { id: string; title: string; summary: string; industry: string; cover: string; metrics: string[] };

const CASES: CaseStudy[] = [
  { id: "c1", title: "Artesian Loyalty Reboot", summary: "Tiered rewards with automated vouchers and uplifted repeat rate.", industry: "Retail", cover: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80&auto=format&fit=crop", metrics: ["+18% repeat orders", "MVP < 5 weeks"] },
  { id: "c2", title: "Fleet ETA Accuracy", summary: "Better routing data and exception handling across hubs.", industry: "Logistics", cover: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1600&q=80&auto=format&fit=crop", metrics: ["-27% late arrivals", "99.9% uptime"] },
  { id: "c3", title: "Risk Controls in Finance", summary: "Automated reconciliations with strong approvals and audit.", industry: "Finance", cover: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1600&q=80&auto=format&fit=crop", metrics: ["sox ready", "zero P1s in 6m"] },
  { id: "c4", title: "Clinic Triage Flow", summary: "Smoother intake and transparent handovers for providers.", industry: "Healthcare", cover: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1600&q=80&auto=format&fit=crop", metrics: ["-35% wait time", "NPS +22"] },
  { id: "c5", title: "Franchise Insights", summary: "Executive tiles for margin, category, and promos at a glance.", industry: "Hospitality", cover: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1600&q=80&auto=format&fit=crop", metrics: ["1 source of truth", "self‑serve exports"] },
  { id: "c6", title: "Citizen Permits", summary: "Digital intake with status tracking and clear communication.", industry: "Public Sector", cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80&auto=format&fit=crop", metrics: ["-40% calls", "SLA/SLO clarity"] },
];

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export default function Portfolio(): JSX.Element {
  const { t } = useTranslation();
  const [industry, setIndustry] = useState<string>("");
  const [stack, setStack] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [order, setOrder] = useState<string>("Newest");

  const filtered = useMemo(() => {
    let rows = PROJECTS.filter((p) => {
      const byInd = !industry || p.industry === industry;
      const byStack = !stack || p.stack.includes(stack);
      const byRes = !result || p.result.includes(result);
      return byInd && byStack && byRes;
    });
    if (order === "Newest") rows = rows.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    if (order === "Oldest") rows = rows.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
    if (order === "A–Z") rows = rows.sort((a, b) => a.title.localeCompare(b.title));
    if (order === "Z–A") rows = rows.sort((a, b) => b.title.localeCompare(a.title));
    if (order === "Featured") rows = rows.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
    return rows;
  }, [industry, stack, result, order]);

  return (
    <MainLayout
      headerProps={{
        sections: [
          { name: t(COPY.nav.hero), id: "portfolio-hero" },
          { name: t(COPY.nav.work), id: "portfolio-grid" },
          { name: t(COPY.nav.cases), id: "portfolio-cases" },
        ],
      }}
    >
      <Head title={t(COPY.headTitle)} />

      <section id="portfolio-hero" className="relative max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-10rem] h-[26rem] w-[44rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-400/20 via-sky-400/15 to-fuchsia-400/10 blur-3xl" />
        </div>
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300">
            <Sparkles className="w-3.5 h-3.5" />
            {t(COPY.hero.kicker)}
          </div>
          <h1 className="mt-3 font-extrabold text-[2.15rem] md:text-[3rem] leading-[1.05] tracking-tight text-zinc-900 dark:text-white">
            {t(COPY.hero.title)}
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-zinc-600 dark:text-zinc-300">{t(COPY.hero.subtitle)}</p>
          <div className="mt-6">
            <a href="#portfolio-grid" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold bg-gradient-to-r from-indigo-600 via-sky-600 to-fuchsia-600 text-white hover:opacity-95 active:scale-[0.99] transition">
              {t(COPY.hero.cta)} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="portfolio-grid" className="max-w-6xl mx-auto px-4 pb-6">
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 p-4 md:p-5 backdrop-blur">
          <div className="flex items-center gap-3 mb-3 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
            <SlidersHorizontal className="w-4 h-4" />
            {t(COPY.filters.title)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative">
              <label className="block mb-1 text-xs font-medium text-zinc-700 dark:text-zinc-200">{t(COPY.filters.industry)}</label>
              <select className="w-full appearance-none rounded-xl bg-white/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-indigo-300/30 dark:focus:ring-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-500 hover:border-sky-300 dark:hover:border-sky-500 px-4 py-2.5 pr-10 text-sm" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                <option value="">{t(COPY.filters.all)}</option>
                {COPY.filters.industries.map((v) => <option key={v} value={v}>{t(v)}</option>)}
              </select>
              <div className="pointer-events-none absolute right-3 bottom-2.5 text-zinc-400 dark:text-zinc-500">▼</div>
            </div>
            <div className="relative">
              <label className="block mb-1 text-xs font-medium text-zinc-700 dark:text-zinc-200">{t(COPY.filters.stack)}</label>
              <select className="w-full appearance-none rounded-xl bg-white/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-indigo-300/30 dark:focus:ring-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-500 hover:border-sky-300 dark:hover:border-sky-500 px-4 py-2.5 pr-10 text-sm" value={stack} onChange={(e) => setStack(e.target.value)}>
                <option value="">{t(COPY.filters.all)}</option>
                {COPY.filters.stacks.map((v) => <option key={v} value={v}>{t(v)}</option>)}
              </select>
              <div className="pointer-events-none absolute right-3 bottom-2.5 text-zinc-400 dark:text-zinc-500">▼</div>
            </div>
            <div className="relative">
              <label className="block mb-1 text-xs font-medium text-zinc-700 dark:text-zinc-200">{t(COPY.filters.result)}</label>
              <select className="w-full appearance-none rounded-xl bg-white/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-indigo-300/30 dark:focus:ring-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-500 hover:border-sky-300 dark:hover:border-sky-500 px-4 py-2.5 pr-10 text-sm" value={result} onChange={(e) => setResult(e.target.value)}>
                <option value="">{t(COPY.filters.all)}</option>
                {COPY.filters.results.map((v) => <option key={v} value={v}>{t(v)}</option>)}
              </select>
              <div className="pointer-events-none absolute right-3 bottom-2.5 text-zinc-400 dark:text-zinc-500">▼</div>
            </div>
            <div className="relative">
              <label className="block mb-1 text-xs font-medium text-zinc-700 dark:text-zinc-200 flex items-center gap-1">{t(COPY.filters.order)} <SortAsc className="w-3.5 h-3.5" /></label>
              <select className="w-full appearance-none rounded-xl bg-white/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-indigo-300/30 dark:focus:ring-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-500 hover:border-sky-300 dark:hover:border-sky-500 px-4 py-2.5 pr-10 text-sm" value={order} onChange={(e) => setOrder(e.target.value)}>
                {COPY.filters.orders.map((v) => <option key={v} value={v}>{t(v)}</option>)}
              </select>
              <div className="pointer-events-none absolute right-3 bottom-2.5 text-zinc-400 dark:text-zinc-500">▼</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((p) => (
              <motion.article key={p.id} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="group rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 backdrop-blur hover:shadow-xl transition">
                <div className="relative">
                  <img src={p.cover} alt={p.title} className="w-full h-52 object-cover" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {p.featured && <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900/80 text-white backdrop-blur px-2.5 py-1 text-xs font-semibold"><BadgeCheck className="w-3.5 h-3.5" />{t(COPY.ribbons.featured)}</span>}
                    {p.new && <span className="inline-flex items-center gap-1 rounded-full bg-white/90 text-zinc-900 px-2.5 py-1 text-xs font-semibold">{t("New")}</span>}
                    {p.award && <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 text-white px-2.5 py-1 text-xs font-semibold"><Trophy className="w-3.5 h-3.5" />{t(COPY.ribbons.award)}</span>}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-1"><Layers className="w-3.5 h-3.5" />{t(p.industry)}</div>
                  <h3 className="font-bold text-zinc-900 dark:text-white">{t(p.title)}</h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{t(p.desc)}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((s) => <span key={s} className="rounded-full px-2.5 py-1 text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">{t(s)}</span>)}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                    {t(COPY.grid.cta)} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <section id="portfolio-cases" className="max-w-6xl mx-auto px-4 pb-24">
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white via-zinc-50 to-indigo-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-indigo-950 p-6 md:p-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            <LineChart className="w-4 h-4" />
            {t(COPY.cases.title)}
          </div>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {CASES.map((c) => (
              <article key={c.id} className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80">
                <img src={c.cover} alt={c.title} className="w-full h-40 object-cover" loading="lazy" decoding="async" />
                <div className="p-5">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">{t(c.industry)}</div>
                  <div className="font-bold text-zinc-900 dark:text-white">{t(c.title)}</div>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{t(c.summary)}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.metrics.map((m) => <span key={m} className="rounded-full px-2.5 py-1 text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">{t(m)}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
