import { useId, useMemo } from "react";
import { Sun, Moon } from "lucide-react";
import TelpIcon from "@/components/icon";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";

type MenuItem = { name: string; href: string };

export default function FooterLayout(): JSX.Element {
  const { t } = useTranslation();
  const { theme, toggle } = useTheme();
  const footerNavId = useId();

  const year = useMemo(() => new Date().getFullYear(), []);
  const menus: MenuItem[] = useMemo(
    () =>
      [
        { name: t("Home") },
        { name: t("Portfolio") },
        { name: t("Career") },
        { name: t("Contact") },
      ].map((m) => ({
        ...m,
        href: `/${m.name.toLowerCase() === "home" ? "" : m.name.toLowerCase()}`,
      })),
    [t]
  );

  return (
    <footer className="fixed bottom-0 left-0 z-40 w-full px-2 select-none overflow-x-hidden">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 14 }}
        className="pointer-events-auto mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 rounded-t-2xl border-t border-zinc-800 bg-gradient-to-r from-zinc-950/90 via-zinc-900/80 to-zinc-950/90 px-4 py-3 shadow-lg sm:shadow-2xl backdrop-blur-xl sm:flex-row"
      >
        {/* Left: Logo + Nav */}
        <div className="relative flex w-full items-center gap-3 min-w-0">
          {/* Logo (non-stretch, responsive) */}
          <a href="/" className="inline-flex items-center gap-2 font-bold shrink-0">
            <TelpIcon className="h-9 sm:h-10 md:h-12 w-auto max-w-[180px] md:max-w-[200px]" />
          </a>

          {/* Nav: always visible, wraps when needed */}
          <nav
            id={footerNavId}
            aria-label={t("Footer")}
            className="ml-3 flex flex-wrap items-center gap-x-4 gap-y-1"
          >
            {menus.map((m) => (
              <a
                key={m.href}
                href={m.href}
                className="text-[1rem] font-semibold text-white transition hover:text-indigo-400"
              >
                {m.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Right: Theme switch + copyright */}
        <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
          <button
            type="button"
            onClick={toggle}
            title={t("Switch Theme")}
            aria-label={t("Switch Theme")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition hover:bg-indigo-500/20 dark:text-zinc-200 dark:hover:bg-indigo-500/10"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <span className="whitespace-nowrap text-xs text-white/80">
            © {year} {t("All rights reserved.")}
          </span>
        </div>
      </motion.div>
    </footer>
  );
}
