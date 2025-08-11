import { useState, useCallback, useEffect, useRef, useLayoutEffect } from "react";
import {
    Github,
    Twitter,
    Linkedin,
    Mail,
    Gitlab,
    Menu as MenuIcon,
    ChevronDown,
    MoreHorizontal,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

import SocialButton, { type SocialButtonProps } from "@/components/social-button";

/**
 * A single section item representing a scroll target on the page.
 */
type Section = {
    /** Localized key/name to display. */
    name: string;
    /** DOM id of the target element to scroll into view. */
    id: string;
};

/**
 * Props for the HeaderLayout component.
 */
interface HeaderLayoutProps {
    /**
     * Ordered list of sections to display in the navbar.
     * When space is limited, later items overflow into a "More" popover.
     */
    sections?: Section[];
}

/**
 * List of social links. The UI adapts to count and available space.
 * Add/remove freely—no layout code changes required.
 */
const SOCIALS: ReadonlyArray<Pick<SocialButtonProps, "Icon" | "href" | "label">> = [
    { Icon: Gitlab, href: "https://gitlab.com/", label: "GitLab" },
    { Icon: Github, href: "https://github.com/", label: "GitHub" },
    { Icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
    { Icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
    { Icon: Mail, href: "mailto:hello@telp.co.id", label: "Email" },
];

/**
 * Compute a fixed-position popover panel anchored to an element (via portal).
 * Positions the panel under the anchor and clamps horizontally to viewport.
 *
 * @param open Whether the popover is visible.
 * @param anchorRef Ref to the anchor element.
 * @param width Desired panel width in pixels.
 * @param align Horizontal alignment—start aligns left edges, end aligns right edges.
 * @returns Absolute viewport coordinates { top, left } for the panel.
 */
function useAnchoredPosition(
    open: boolean,
    anchorRef: React.RefObject<HTMLElement>,
    width = 192,
    align: "start" | "end" = "start"
) {
    const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    useLayoutEffect(() => {
        if (!open || !anchorRef.current) return;

        const update = () => {
            const rect = anchorRef.current!.getBoundingClientRect();
            const top = rect.bottom + 8; // 8px gap below the anchor
            let left = align === "start" ? rect.left : rect.right - width;

            // Clamp to viewport with 8px padding
            left = Math.max(8, Math.min(left, window.innerWidth - width - 8));
            setPos({ top, left });
        };

        update();
        window.addEventListener("resize", update);
        window.addEventListener("scroll", update, true);
        return () => {
            window.removeEventListener("resize", update);
            window.removeEventListener("scroll", update, true);
        };
    }, [open, anchorRef, width, align]);

    return pos;
}

/**
 * Popover container that renders its children in a portal, with a light backdrop
 * to enable outside-click dismissal. Animation is powered by Framer Motion.
 */
function PopoverPortal({
    open,
    onClose,
    anchorRef,
    width = 192,
    align = "start",
    className,
    children,
}: {
    open: boolean;
    onClose: () => void;
    anchorRef: React.RefObject<HTMLElement>;
    width?: number;
    align?: "start" | "end";
    className?: string;
    children: React.ReactNode;
}) {
    const { top, left } = useAnchoredPosition(open, anchorRef, width, align);
    if (!open) return null;

    // Guard for SSR—no portal until DOM exists.
    if (typeof document === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            <>
                {/* Transparent backdrop for click-outside */}
                <motion.div
                    key="backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.08 }}
                    className="fixed inset-0 z-[98]"
                    onMouseDown={onClose}
                />
                <motion.div
                    key="panel"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 6, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    style={{ position: "fixed", top, left, width }}
                    className={(className ?? "") + " z-[99]"}
                    onMouseDown={(e) => e.stopPropagation()}
                    role="dialog"
                >
                    {children}
                </motion.div>
            </>
        </AnimatePresence>,
        document.body
    );
}

/**
 * HeaderLayout renders an adaptive, scroll-linked header:
 * - Desktop: inline section chips, overflow in a popover, adaptive social icons.
 * - Mobile: compact menu with all sections and socials inside a dropdown.
 * - Popovers use portals to avoid clipping and to simplify z-index stacking.
 */
export default function HeaderLayout({ sections = [] }: HeaderLayoutProps) {
    const { t } = useTranslation();

    // Mobile menu state
    const [open, setOpen] = useState(false);

    // Desktop popover states
    const [secOpen, setSecOpen] = useState(false);
    const [socOpen, setSocOpen] = useState(false);

    // Anchor refs for popovers
    const secBtnRef = useRef<HTMLButtonElement>(null);
    const socBtnRef = useRef<HTMLButtonElement>(null);

    /**
     * Close popovers on Escape.
     */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSecOpen(false);
                setSocOpen(false);
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    /**
     * Smoothly scroll to a section and close any open menus/popovers.
     */
    const handleScroll = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        setOpen(false);
        setSecOpen(false);
        setSocOpen(false);
    }, []);

    // ================= Adaptive logic (Desktop) =================
    const socialCount = SOCIALS.length;

    // Budgets differ by breakpoint (approximate tablet vs large desktop)
    const DESKTOP_TOTAL_BUDGET_MD = 7;  // md: fewer section chips
    const DESKTOP_TOTAL_BUDGET_LG = 10; // lg+: more section chips

    // Simple match-media without external dependencies
    const [isLg, setIsLg] = useState<boolean>(false);
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const onChange = () => setIsLg(mq.matches);
        onChange();
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    const DESKTOP_TOTAL_BUDGET = isLg ? DESKTOP_TOTAL_BUDGET_LG : DESKTOP_TOTAL_BUDGET_MD;

    // Allowed inline section chips = total budget minus socials, with floor/ceiling
    const allowedSectionChips = Math.max(
        2,
        Math.min(sections.length, DESKTOP_TOTAL_BUDGET - socialCount)
    );

    const inlineSections = sections.slice(0, allowedSectionChips);
    const overflowSections = sections.slice(allowedSectionChips);

    // Socials: show up to cap; remaining go into a "+N" popover
    const DESKTOP_SOCIAL_MAX_MD = 5;
    const DESKTOP_SOCIAL_MAX_LG = 7;
    const DESKTOP_SOCIAL_MAX = isLg ? DESKTOP_SOCIAL_MAX_LG : DESKTOP_SOCIAL_MAX_MD;

    const inlineSocials =
        socialCount > DESKTOP_SOCIAL_MAX ? SOCIALS.slice(0, DESKTOP_SOCIAL_MAX) : SOCIALS;
    const overflowSocials =
        socialCount > DESKTOP_SOCIAL_MAX ? SOCIALS.slice(DESKTOP_SOCIAL_MAX) : [];

    // Size & gap tuning based on total density (sections + socials)
    const density = socialCount + sections.length;
    const desktopGapClass = density >= 11 ? "gap-1.5" : "gap-2";
    const desktopButtonPad = density >= 11 ? "px-3" : "px-4";
    const desktopSocialSize: SocialButtonProps["size"] = density >= 12 ? "sm" : "md";
    const mobileSocialSize: SocialButtonProps["size"] = socialCount >= 6 ? "sm" : "md";

    return (
        <nav className="z-[60] w-full px-2 pt-7 md:pt-10 flex justify-center">
            <div className="relative w-full max-w-5xl">
                {/* Desktop */}
                <div className="hidden md:flex items-center gap-3 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/80 p-2 pl-6 pr-5 shadow-2xl backdrop-blur-xl transition-all overflow-visible">
                    <span className="pr-3 text-base font-extrabold tracking-tight text-indigo-700 dark:text-blue-200">
                        TELP
                    </span>

                    {/* Sections (inline) with horizontal scroll to avoid pushing socials */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                            {inlineSections.map(({ name, id }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => handleScroll(id)}
                                    className={`${desktopButtonPad} py-2 rounded-full text-sm font-medium text-zinc-700 dark:text-zinc-200 transition hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 inline-flex shrink-0`}
                                >
                                    {t(name)}
                                </button>
                            ))}

                            {/* Overflow sections → "More" (portal popover) */}
                            {overflowSections.length > 0 && (
                                <div className="relative">
                                    <button
                                        type="button"
                                        aria-haspopup="dialog"
                                        aria-expanded={secOpen}
                                        ref={secBtnRef}
                                        onClick={() => setSecOpen((v) => !v)}
                                        className={`${desktopButtonPad} py-2 rounded-full text-sm font-semibold text-zinc-700 dark:text-zinc-200 transition hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 inline-flex items-center gap-1 shrink-0`}
                                    >
                                        <MoreHorizontal className="h-4 w-4" /> {t("More")}
                                    </button>

                                    <PopoverPortal
                                        open={secOpen}
                                        onClose={() => setSecOpen(false)}
                                        anchorRef={secBtnRef}
                                        width={192}
                                        align="start"
                                        className="min-w-[12rem] rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white/95 dark:bg-zinc-900/95 shadow-2xl backdrop-blur p-2"
                                    >
                                        <div className="flex flex-col gap-1">
                                            {overflowSections.map(({ name, id }) => (
                                                <button
                                                    key={id}
                                                    type="button"
                                                    onClick={() => handleScroll(id)}
                                                    className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20"
                                                >
                                                    {t(name)}
                                                </button>
                                            ))}
                                        </div>
                                    </PopoverPortal>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Socials (adaptive) */}
                    <div className={`ml-auto relative flex items-center ${desktopGapClass} shrink-0`}>
                        {inlineSocials.map((s) => (
                            <SocialButton
                                key={s.label}
                                Icon={s.Icon}
                                href={s.href}
                                label={s.label}
                                size={desktopSocialSize}
                            />
                        ))}

                        {overflowSocials.length > 0 && (
                            <div className="relative">
                                <button
                                    type="button"
                                    aria-haspopup="dialog"
                                    aria-expanded={socOpen}
                                    ref={socBtnRef}
                                    onClick={() => setSocOpen((v) => !v)}
                                    className="inline-flex items-center justify-center rounded-full h-9 w-9 bg-zinc-100 dark:bg-zinc-900/70 border border-transparent dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 text-sm font-semibold transition hover:bg-indigo-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
                                    title={t("More")}
                                >
                                    +{overflowSocials.length}
                                </button>

                                <PopoverPortal
                                    open={socOpen}
                                    onClose={() => setSocOpen(false)}
                                    anchorRef={socBtnRef}
                                    width={192}
                                    align="end"
                                    className="w-48 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white/95 dark:bg-zinc-900/95 shadow-2xl backdrop-blur p-2"
                                >
                                    <div className="flex flex-wrap gap-2">
                                        {overflowSocials.map((s) => (
                                            <SocialButton
                                                key={s.label}
                                                Icon={s.Icon}
                                                href={s.href}
                                                label={s.label}
                                                size="sm"
                                            />
                                        ))}
                                    </div>
                                </PopoverPortal>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile */}
                <div className="md:hidden flex items-center justify-between rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/80 px-3 py-2 shadow-2xl backdrop-blur-xl">
                    <span className="text-base font-extrabold tracking-tight text-indigo-700 dark:text-blue-200">
                        TELP
                    </span>

                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Menu"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        className="flex items-center gap-1 px-2 py-2 rounded-lg text-zinc-700 dark:text-zinc-200 transition hover:bg-indigo-100/40 dark:hover:bg-indigo-500/10"
                    >
                        <MenuIcon size={20} />
                        <ChevronDown
                            size={16}
                            className={`transition-transform ${open ? "rotate-180" : ""}`}
                        />
                    </button>

                    <AnimatePresence>
                        {open && (
                            <motion.div
                                id="mobile-menu"
                                role="menu"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 16 }}
                                className="absolute right-0 top-[110%] z-[70] w-72 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/95 p-3 shadow-2xl"
                            >
                                {/* Sections: show ALL in mobile */}
                                <div className="mb-3 flex flex-col gap-1">
                                    {sections.map(({ name, id }) => (
                                        <button
                                            key={id}
                                            type="button"
                                            role="menuitem"
                                            onClick={() => handleScroll(id)}
                                            className="px-4 py-2 rounded-xl text-left text-sm font-semibold text-zinc-700 dark:text-zinc-200 transition hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20"
                                        >
                                            {t(name)}
                                        </button>
                                    ))}
                                </div>

                                {/* Socials: wrap & autosize */}
                                <div className="mt-1 flex flex-wrap items-center gap-2">
                                    {SOCIALS.map((s) => (
                                        <SocialButton
                                            key={s.label}
                                            Icon={s.Icon}
                                            href={s.href}
                                            label={s.label}
                                            size={mobileSocialSize}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
}
