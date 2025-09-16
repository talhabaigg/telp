import { ThemeProvider } from "@/hooks/useTheme";
import HeaderLayout from "./header.layout";
import FooterLayout from "./footer.layout";
import { getTelpSvg } from "@/components/icon";
import { Head } from "@inertiajs/react";
import type { ComponentProps, ReactNode, JSX } from "react";

interface MainLayoutProps {
  children: ReactNode;
  headerProps?: ComponentProps<typeof HeaderLayout>;
}

function HeadIcons(): JSX.Element {
  const svg = encodeURIComponent(getTelpSvg({ withTagline: false, zoom: 2 }));
  const svgMono = encodeURIComponent(getTelpSvg({ withTagline: false, mono: true, zoom: 2 }));

  return (
    <Head>
      <link rel="icon" type="image/svg+xml" href={`data:image/svg+xml;utf8,${svg}`} />
      <link rel="mask-icon" href={`data:image/svg+xml;utf8,${svgMono}`} color="#5b21b6" />
      <meta name="theme-color" content="#0b1020" />
      <meta name="application-name" content="Telp" />
      <meta
        name="description"
        content="Tech solutions for custom enterprise. Build faster. Scale safely. Operate with clarity."
      />
    </Head>
  );
}

export default function MainLayout({ children, headerProps }: MainLayoutProps): JSX.Element {
  return (
    <ThemeProvider>
      <HeadIcons />
      <div className="relative min-h-screen flex flex-col pb-28 text-zinc-900 dark:text-white bg-gradient-to-b from-white to-zinc-100 dark:from-[#191925] dark:to-[#18181b] transition-colors">
        <div className="absolute inset-0 z-0 pointer-events-none bg-white/40 dark:bg-zinc-900/70 backdrop-blur-xl" />
        <HeaderLayout {...(headerProps ?? {})} />
        <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
          {children}
        </main>
        <FooterLayout />
      </div>
    </ThemeProvider>
  );
}
