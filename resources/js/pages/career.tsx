import MainLayout from "./layouts/main.layout";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const sections = [
  { name: "Career", id: "career" },
  { name: "Values", id: "values" },
  { name: "Contact", id: "contact" },
];

const jobs = [
  {
    title: "Frontend Engineer",
    desc: "React/Tailwind. Full Remote. Build beautiful interfaces.",
    img: "https://images.unsplash.com/photo-1465101178521-c1a9136a37b4?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Backend Developer",
    desc: "Laravel, Node.js, Cloud. Empower scalable backend systems.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
];

export default function Career() {
  const { t } = useTranslation();

  return (
    <MainLayout headerProps={{ sections }}>
      <section id="career" className="pt-32 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.07 }}
          className="font-extrabold text-3xl md:text-5xl text-zinc-900 dark:text-white mb-8 text-center"
        >
          {t("Join Our Team")}
        </motion.h1>
        <div className="flex flex-wrap gap-8 justify-center">
          {jobs.map((item, i) => (
            <motion.div
              key={i}
              className="max-w-[350px] bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.13, type: "spring" }}
            >
              <img src={item.img} alt={item.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h2 className="font-bold text-xl text-zinc-800 dark:text-white mb-2">{item.title}</h2>
                <p className="text-zinc-500 dark:text-zinc-300">{item.desc}</p>
                <a
                  href="mailto:hello@telp.co.id"
                  className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded px-4 py-2 font-semibold shadow transition"
                >
                  {t("Apply")}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section id="values" className="py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-bold text-2xl md:text-3xl text-zinc-900 dark:text-white mb-7"
        >
          {t("Our Values")}
        </motion.h2>
        <div className="flex flex-wrap gap-8 justify-center">
          {["Growth", "Trust", "Innovation", "Balance"].map((val, i) => (
            <motion.div
              key={val}
              className="bg-zinc-200/80 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-100 rounded-lg px-5 py-3 shadow-md font-bold text-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {t(val)}
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
