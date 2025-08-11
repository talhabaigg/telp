import { ThemeProvider } from "@/hooks/useTheme";
import HeaderLayout from "./header.layout";
import FooterLayout from "./footer.layout";
import HeadIcons from "@/components/head-icons";
import type { ComponentProps, ReactNode } from "react";

/**
 * Props for the MainLayout component.
 */
interface MainLayoutProps {
    /**
     * Page content to render between the header and footer.
     */
    children: ReactNode;

    /**
     * Optional props to forward to HeaderLayout.
     * This keeps MainLayout decoupled while allowing callers to configure sections, etc.
     */
    headerProps?: ComponentProps<typeof HeaderLayout>;
}

/**
 * MainLayout wraps pages with:
 * - Theme provider (light/dark)
 * - Glassy gradient background
 * - Sticky header and footer
 * - Responsive centered content container
 */
export default function MainLayout({ children, headerProps }: MainLayoutProps): JSX.Element {
    return (
        <ThemeProvider>
            <HeadIcons />
            <div className="relative min-h-screen flex flex-col pb-28 text-zinc-900 dark:text-white bg-gradient-to-b from-white to-zinc-100 dark:from-[#191925] dark:to-[#18181b] transition-colors">
                {/* Subtle glass layer */}
                <div className="absolute inset-0 z-0 pointer-events-none bg-white/40 dark:bg-zinc-900/70 backdrop-blur-xl" />

                {/* Header */}
                <HeaderLayout {...(headerProps ?? {})} />

                {/* Main content */}
                <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
                    {children}
                </main>

                {/* Footer */}
                <FooterLayout />
            </div>
        </ThemeProvider>
    );
}
