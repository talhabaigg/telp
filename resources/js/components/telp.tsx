import * as React from "react";

export interface TelpLogoProps {
  className?: string;
  /** Untuk aksesibilitas; default: "TELP Logo" */
  title?: string;
}

export default function TelpLogo({
  className = "w-52 h-16",
  title = "TELP Logo",
}: TelpLogoProps) {
  const titleId = React.useId();

  const letters: Array<{ x: number; text: string; className: string }> = [
    { x: 10, text: "T", className: "fill-blue-700 dark:fill-blue-300" },
    { x: 50, text: "E", className: "fill-orange-500 dark:fill-orange-400" },
    { x: 88, text: "L", className: "fill-orange-500 dark:fill-orange-400" },
    { x: 126, text: "P", className: "fill-blue-700 dark:fill-blue-300" },
  ];

  const dots: Array<{ cx: number; cy: number; r: number; className: string }> = [
    { cx: 185, cy: 30, r: 3, className: "fill-blue-700 dark:fill-blue-300" },
    { cx: 210, cy: 20, r: 5, className: "fill-orange-500 dark:fill-orange-400" },
    { cx: 225, cy: 40, r: 7, className: "fill-blue-700 dark:fill-blue-300" },
    { cx: 205, cy: 58, r: 9, className: "fill-blue-700 dark:fill-blue-300" },
  ];

  return (
    <svg
      viewBox="0 0 300 80"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>{title}</title>

      {/* --- Letters --- */}
      {letters.map(({ x, text, className }) => (
        <text
          key={`${text}-${x}`}
          x={x}
          y={50}
          fontFamily="Montserrat, Arial, sans-serif"
          fontWeight={500}
          fontSize={48}
          className={className}
          style={{ letterSpacing: 2 }}
        >
          {text}
        </text>
      ))}

      {/* --- Dots / Ornaments --- */}
      {dots.map(({ cx, cy, r, className }, i) => (
        <circle key={`${cx}-${cy}-${i}`} cx={cx} cy={cy} r={r} className={className} />
      ))}

      {/* --- Tagline --- */}
      <text
        x={10}
        y={75}
        fontFamily="Montserrat, Arial, sans-serif"
        fontWeight={400}
        fontSize={18}
        className="fill-blue-700 dark:fill-blue-300"
      >
        custom enterprise solution
      </text>
    </svg>
  );
}
