import * as React from "react";
import { motion } from "framer-motion";

export interface BrandProps {
  logos: string[];
  /** Durasi 1 siklus scroll (detik). Default: 22 */
  speed?: number;
  /** Jarak antar logo (Tailwind gap). Default: gap-10 */
  gapClassName?: string;
  /** Tinggi logo. Default: h-9 md:h-10 */
  logoSizeClassName?: string;
  className?: string;
}

export default function Brand({
  logos,
  speed = 22,
  gapClassName = "gap-10",
  logoSizeClassName = "h-9 md:h-10",
  className = "",
}: BrandProps) {
  // Gandakan list supaya bisa geser -50% dan seamless
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
        // Jalan terus dari 0% ke -50% lalu loop
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
