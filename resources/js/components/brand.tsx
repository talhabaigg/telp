import * as React from "react";
import { motion } from "framer-motion";

/**
 * Props for the Brand component.
 */
export interface BrandProps {
    /**
     * Array of logo image URLs.
     */
    logos: string[];

    /**
     * Duration of one scroll cycle in seconds.
     * @default 22
     */
    speed?: number;

    /**
     * Tailwind spacing class between logos.
     * @default "gap-10"
     */
    gapClassName?: string;

    /**
     * Tailwind height class for the logo images.
     * @default "h-9 md:h-10"
     */
    logoSizeClassName?: string;

    /**
     * Additional Tailwind classes for the container.
     */
    className?: string;
}

/**
 * Brand component displays scrolling client logos in an infinite loop.
 * @param logos Array of logo URLs to be displayed
 * @param speed Scroll animation duration in seconds
 * @param gapClassName Tailwind class for spacing between logos
 * @param logoSizeClassName Tailwind class for logo sizing
 * @param className Additional container classes
 */
export default function Brand({
    logos,
    speed = 22,
    gapClassName = "gap-10",
    logoSizeClassName = "h-9 md:h-10",
    className = "",
}: BrandProps): JSX.Element {
    /**
     * Duplicate the logos to create a seamless loop.
     */
    const track = React.useMemo(() => [...logos, ...logos], [logos]);

    return (
        <div
            className={[
                "relative w-full max-w-4xl overflow-hidden",
                className,
            ].join(" ")}
            style={{
                maskImage:
                    "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
                WebkitMaskImage:
                    "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
            aria-label="Client logos marquee"
        >
            <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                }}
                className={["flex items-center py-2 w-max", gapClassName].join(" ")}
                style={{
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                }}
            >
                {track.map((src, i) => (
                    <img
                        key={`${src}-${i}`}
                        src={src}
                        alt="client logo"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        draggable={false}
                        className={[
                            logoSizeClassName,
                            "w-auto object-contain",
                            "grayscale opacity-80 transition-all duration-300 hover:opacity-100 hover:grayscale-0",
                            "select-none",
                        ].join(" ")}
                        onDragStart={(e) => e.preventDefault()}
                    />
                ))}
            </motion.div>
        </div>
    );
}
