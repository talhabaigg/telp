import MainLayout from "./layouts/main.layout";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const sections = [
  { name: "Contact", id: "contact" },
];

export default function Contact() {
  const { t } = useTranslation();

  return (
    <MainLayout headerProps={{ sections }}>
      <section id="contact" className="pt-32 pb-16 flex flex-col items-center justify-center min-h-[60vh]">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-extrabold text-3xl md:text-5xl text-zinc-900 dark:text-white mb-6 text-center"
        >
          {t("Contact")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.09 }}
          className="text-lg max-w-xl text-center text-zinc-600 dark:text-zinc-300 mb-8"
        >
          {t("Let’s work together. Drop us an email and we'll get back to you within 1x24 hours!")}
        </motion.p>
        <motion.a
          href="mailto:hello@telp.co.id"
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-8 py-3 font-semibold shadow transition"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          {t("Say Hello")}
        </motion.a>
      </section>
    </MainLayout>
  );
}
