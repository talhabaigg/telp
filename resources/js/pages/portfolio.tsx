import MainLayout from "./layouts/main.layout";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const sections = [
  { name: "Portfolio", id: "portfolio" },
  { name: "Tech Stack", id: "stack" },
  { name: "Contact", id: "contact" },
];

const portfolioItems = [
  {
    title: "Mobile Banking",
    desc: "Fintech super-app, secure & beautiful UI.",
    img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "HR Dashboard",
    desc: "HRIS with analytics & integrated payroll.",
    img: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Smart Device IoT",
    desc: "Real-time IoT platform for urban living.",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Portfolio() {
  const { t } = useTranslation();

  return (
    <MainLayout headerProps={{ sections }}>
      <section id="portfolio" className="pt-32 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="font-extrabold text-3xl md:text-5xl text-zinc-900 dark:text-white mb-6 text-center"
        >
          {t("Portfolio")}
        </motion.h1>
        <div className="flex flex-wrap gap-8 justify-center">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={i}
              className="max-w-[340px] bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.13, type: "spring" }}
            >
              <img src={item.img} alt={item.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h2 className="font-bold text-xl text-zinc-800 dark:text-white mb-2">{item.title}</h2>
                <p className="text-zinc-500 dark:text-zinc-300">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section id="stack" className="py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-bold text-2xl md:text-3xl text-zinc-900 dark:text-white mb-7"
        >
          {t("Tech Stack")}
        </motion.h2>
        <div className="flex flex-wrap gap-8 justify-center">
          {["React", "Laravel", "Tailwind", "Inertia", "Shadcn", "Radix UI"].map((stack, i) => (
            <motion.div
              key={stack}
              className="bg-zinc-200/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-100 rounded-lg px-5 py-3 shadow-md font-bold text-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {stack}
            </motion.div>
          ))}
        </div>
      </section>
      <section id="contact" className="pb-10 flex flex-col items-center">
        <h2 className="font-bold text-2xl md:text-3xl mb-4 text-zinc-900 dark:text-white">{t("Interested?")}</h2>
        <a
          href="mailto:hello@telp.co.id"
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-3 font-semibold shadow transition"
        >
          {t("Contact Me")}
        </a>
      </section>
    </MainLayout>
  );
}
