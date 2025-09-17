import { useId, useMemo, useState, useCallback } from "react";
import { Menu as MenuIcon, ChevronUp, Sun, Moon } from "lucide-react";
import TelpIcon from "@/components/icon";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";

type MenuItem = { name: string; href: string };

export default function FooterLayout(): JSX.Element {
  const { t } = useTranslation();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const mobileMenuId = useId();
  const year = useMemo(() => new Date().getFullYear(), []);
  const menus: MenuItem[] = useMemo(
    () => [
      { name: t("Home") },
      { name: t("Portfolio") },
      { name: t("Career") },
      { name: t("Contact") },
    ].map((m) => ({ ...m, href: `/${m.name.toLowerCase() === "home" ? "" : m.name.toLowerCase()}` })),
    [t]
  );

  const handleToggle = useCallback(() => setOpen((v) => !v), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <footer className="pointer-events-none fixed bottom-0 left-0 z-40 w-full px-2 select-none">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 14 }}
        className="pointer-events-auto mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 rounded-t-2xl border-t border-zinc-800 bg-gradient-to-r from-zinc-950/90 via-zinc-900/80 to-zinc-950/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:flex-row"
      >
        <div className="relative flex w-full items-center justify-between gap-3 sm:justify-start">
          <span className="flex items-center gap-2 font-bold">
            <TelpIcon className="h-12 w-50" />
          </span>
          <div className="flex w-full items-center justify-end gap-2 sm:hidden">
            <button
              type="button"
              onClick={handleToggle}
              aria-label={t("Menu")}
              aria-expanded={open}
              aria-controls={mobileMenuId}
              className="z-50 flex items-center gap-2 rounded-lg bg-zinc-900/60 px-3 py-2 text-white transition hover:bg-zinc-800/90"
            >
              <MenuIcon size={18} />
              <span className="font-medium">{t("Menu")}</span>
              <ChevronUp size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            <button
              type="button"
              onClick={toggle}
              title={t("Switch Theme")}
              aria-label={t("Switch Theme")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition hover:bg-indigo-500/20 dark:text-zinc-200 dark:hover:bg-indigo-500/10"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
          <div className="relative sm:hidden">
            <AnimatePresence>
              {open && (
                <motion.nav
                  id={mobileMenuId}
                  role="menu"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 24 }}
                  className="absolute bottom-full right-0 z-[999] mb-10 min-w-[190px] rounded-2xl bg-zinc-900/80 py-2 shadow-2xl backdrop-blur-xl"
                >
                  {menus.map((m) => (
                    <a
                      key={m.href}
                      role="menuitem"
                      href={m.href}
                      className="mx-2 block rounded-xl px-6 py-2 font-semibold text-white transition hover:bg-indigo-500/80 hover:text-white"
                      onClick={handleClose}
                    >
                      {m.name}
                    </a>
                  ))}
                  <div className="mt-2 border-t border-zinc-700 px-6 pt-2">
                    <span className="block whitespace-nowrap text-center text-xs text-white opacity-90">
                      © {year} {t("All rights reserved.")}
                    </span>
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
          <nav className="ml-3 hidden items-center gap-4 sm:flex" aria-label={t("Footer")}>
            {menus.map((m) => (
              <a key={m.href} href={m.href} className="text-[1rem] font-semibold text-white transition hover:text-indigo-400">
                {m.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-2 hidden w-full items-center justify-end gap-2 sm:flex sm:mt-0 sm:w-auto">
          <button
            type="button"
            onClick={toggle}
            title={t("Switch Theme")}
            aria-label={t("Switch Theme")}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition hover:bg-indigo-500/20 dark:text-zinc-300 dark:hover:bg-indigo-500/10"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <span className="ml-3 whitespace-nowrap text-xs text-white opacity-80">© {year} {t("All rights reserved.")}</span>
        </div>
      </motion.div>
    </footer>
  );
}
