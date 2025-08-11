import { Head } from "@inertiajs/react";
import { getTelpSvg } from "@/Components/icon";

/**
 * Injects favicon, mask-icon, and theme-color using TELP SVG data URLs.
 * Add PNG fallbacks in Blade if you need iOS "apple-touch-icon".
 */
export default function HeadIcons(): JSX.Element {
    const svg = encodeURIComponent(getTelpSvg({ withTagline: false }));
    const svgMono = encodeURIComponent(getTelpSvg({ withTagline: false, mono: true }));

    return (
        <Head>
            <link rel="icon" type="image/svg+xml" href={`data:image/svg+xml;utf8,${svg}`} />
            <link rel="mask-icon" href={`data:image/svg+xml;utf8,${svgMono}`} color="#5b21b6" />
            <meta name="theme-color" content="#0b1020" />
        </Head>
    );
}
