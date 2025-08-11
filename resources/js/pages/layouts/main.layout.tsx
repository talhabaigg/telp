import { ThemeProvider } from "@/hooks/useTheme";
import HeaderLayout from "./header.layout";
import FooterLayout from "./footer.layout";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  headerProps?: Record<string, unknown>;
}

export default function MainLayout({ children, headerProps }: MainLayoutProps) {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen flex flex-col pb-28 text-zinc-900 dark:text-white bg-gradient-to-b from-white to-zinc-100 dark:from-[#191925] dark:to-[#18181b] transition-colors">
        <div className="absolute inset-0 z-0 pointer-events-none bg-white/40 dark:bg-zinc-900/70 backdrop-blur-xl" />
        
        <HeaderLayout {...(headerProps || {})} />
        
        <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
          {children}
        </main>
        
        <FooterLayout />
      </div>
    </ThemeProvider>
  );
}
