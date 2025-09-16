import { Head } from "@inertiajs/react";
import MainLayout from "./layouts/main.layout";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPinned, ArrowRight, MessageSquareMore } from "lucide-react";

const COPY = {
  headTitle: "Contact",
  nav: { contact: "Contact" },
  hero: {
    title: "Tell us what you are building",
    subtitle: "Share a short brief and we will map a clear path to value",
  },
  form: {
    name: "Full Name",
    email: "Work Email",
    topic: "Topic",
    budget: "Budget",
    timeline: "Timeline",
    message: "Message",
    submit: "Send Message",
    hint: "We reply within one to two business days",
    topics: ["Discovery Call", "System Integration", "App Modernization", "Support & SLA/SLO", "Other"],
    budgets: ["<$10k", "$10k–$30k", "$30k–$75k", "$75k–$150k", ">$150k"],
    timelines: ["ASAP", "1–2 months", "3–4 months", "Flexible"],
  },
  info: {
    title: "Reaches",
    items: [
      { icon: Mail, label: "Email", value: "admin@telp.com.au", href: "mailto:admin@telp.com.au" },
      { icon: Phone, label: "Phone", value: "+61 2 5555 5555", href: "tel:+61255555555" },
      { icon: MapPinned, label: "Office", value: "Australia • Sydney", href: "#" },
    ],
  },
  alerts: {
    ok: "Thanks, your message is in. We will circle back shortly.",
  },
  placeholders: {
    name: "Your full name",
    email: "you@company.com",
    topic: "Choose a topic…",
    budget: "Select budget…",
    timeline: "Select timeline…",
    message: "Describe the problem, the users, and any constraints",
  },
  labels: {
    brief: "Project Brief",
  },
};

export default function Contact(): JSX.Element {
  const { t } = useTranslation();
  const [sending, setSending] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    topic: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      alert(t(COPY.alerts.ok));
      setPayload({ name: "", email: "", topic: "", budget: "", timeline: "", message: "" });
    } finally {
      setSending(false);
    }
  };

  return (
    <MainLayout
      headerProps={{
        sections: [
          { name: t(COPY.nav.contact), id: "contact-hero" },
          { name: t(COPY.info.title), id: "contact-info" },
        ],
      }}
    >
      <Head title={t(COPY.headTitle)} />

      <section id="contact-hero" className="relative max-w-4xl mx-auto px-4 pt-12 md:pt-16 pb-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-10rem] h-[26rem] w-[44rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-400/20 via-sky-400/15 to-fuchsia-400/10 blur-3xl" />
        </div>
        <div className="text-center">
          <h1 className="font-extrabold text-[2.15rem] md:text-[3rem] leading-[1.05] tracking-tight text-zinc-900 dark:text-white">
            {t(COPY.hero.title)}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-zinc-600 dark:text-zinc-300">{t(COPY.hero.subtitle)}</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-24 grid grid-cols-1 md:grid-cols-[1.1fr_.9fr] gap-6">
        <form
          id="contact-form"
          onSubmit={onSubmit}
          className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-900/70 p-6 md:p-8 backdrop-blur shadow-sm"
        >
          <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            <MessageSquareMore className="w-4 h-4" />
            {t(COPY.labels.brief)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">{t(COPY.form.name)}</label>
              <input
                required
                value={payload.name}
                onChange={(e) => setPayload((p) => ({ ...p, name: e.target.value }))}
                className="w-full rounded-xl bg-white/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 shadow-sm transition px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-300/30 dark:focus:ring-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-500"
                placeholder={t(COPY.placeholders.name)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">{t(COPY.form.email)}</label>
              <input
                required
                type="email"
                value={payload.email}
                onChange={(e) => setPayload((p) => ({ ...p, email: e.target.value }))}
                className="w-full rounded-xl bg-white/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 shadow-sm transition px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-300/30 dark:focus:ring-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-500"
                placeholder={t(COPY.placeholders.email)}
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative w-full">
              <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">{t(COPY.form.topic)}</label>
              <select
                required
                value={payload.topic}
                onChange={(e) => setPayload((p) => ({ ...p, topic: e.target.value }))}
                className="w-full appearance-none rounded-xl bg-white/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-indigo-300/30 dark:focus:ring-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-500 hover:border-sky-300 dark:hover:border-sky-500 px-4 py-2.5 pr-10 text-sm"
              >
                <option value="" disabled>
                  {t(COPY.placeholders.topic)}
                </option>
                {COPY.form.topics.map((v) => (
                  <option key={v} value={v}>
                    {t(v)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 bottom-2.5 text-zinc-400 dark:text-zinc-500">▼</div>
            </div>

            <div className="relative w-full">
              <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">{t(COPY.form.budget)}</label>
              <select
                value={payload.budget}
                onChange={(e) => setPayload((p) => ({ ...p, budget: e.target.value }))}
                className="w-full appearance-none rounded-xl bg-white/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-indigo-300/30 dark:focus:ring-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-500 hover:border-sky-300 dark:hover:border-sky-500 px-4 py-2.5 pr-10 text-sm"
              >
                <option value="">{t(COPY.placeholders.budget)}</option>
                {COPY.form.budgets.map((v) => (
                  <option key={v} value={v}>
                    {t(v)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 bottom-2.5 text-zinc-400 dark:text-zinc-500">▼</div>
            </div>

            <div className="relative w-full">
              <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">{t(COPY.form.timeline)}</label>
              <select
                value={payload.timeline}
                onChange={(e) => setPayload((p) => ({ ...p, timeline: e.target.value }))}
                className="w-full appearance-none rounded-xl bg-white/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-indigo-300/30 dark:focus:ring-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-500 hover:border-sky-300 dark:hover:border-sky-500 px-4 py-2.5 pr-10 text-sm"
              >
                <option value="">{t(COPY.placeholders.timeline)}</option>
                {COPY.form.timelines.map((v) => (
                  <option key={v} value={v}>
                    {t(v)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 bottom-2.5 text-zinc-400 dark:text-zinc-500">▼</div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">{t(COPY.form.message)}</label>
            <textarea
              required
              rows={5}
              value={payload.message}
              onChange={(e) => setPayload((p) => ({ ...p, message: e.target.value }))}
              placeholder={t(COPY.placeholders.message)}
              className="w-full rounded-xl bg-white/90 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 shadow-sm transition px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-300/30 dark:focus:ring-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-500"
            />
            <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">{t(COPY.form.hint)}</p>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold bg-gradient-to-r from-indigo-600 via-sky-600 to-fuchsia-600 text-white hover:opacity-95 active:scale-[0.99] transition disabled:opacity-60"
              aria-busy={sending}
            >
              {t(COPY.form.submit)} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <aside
          id="contact-info"
          className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white via-zinc-50 to-indigo-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-indigo-950 p-6 md:p-8"
        >
          <h3 className="font-extrabold text-2xl text-zinc-900 dark:text-white">{t("Reach Us Directly")}</h3>
          <div className="mt-4 space-y-4">
            {COPY.info.items.map((it, i) => {
              const Icon = it.icon;
              return (
                <a
                  key={i}
                  href={it.href}
                  className="group flex items-start gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 p-4 hover:shadow-md transition"
                >
                  <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-300 mt-0.5" />
                  <div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">{t(it.label)}</div>
                    <div className="font-semibold text-zinc-900 dark:text-white group-hover:underline">{it.value}</div>
                  </div>
                </a>
              );
            })}
          </div>
        </aside>
      </section>
    </MainLayout>
  );
}
