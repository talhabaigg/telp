import * as React from "react";

export interface TelpLogoProps {
  className?: string;
  title?: string;
}

export function getTelpSvg(options?: {
  withTagline?: boolean;
  primary?: string;
  accent?: string;
  tagline?: string;
  mono?: boolean;
  zoom?: number;
}): string {
  const {
    withTagline = true,
    primary = "#1d4ed8",
    accent = "#f97316",
    tagline = "#1d4ed8",
    mono = false,
    zoom = 1.6,
  } = options ?? {};

  const p = mono ? "#000000" : primary;
  const a = mono ? "#000000" : accent;
  const t = mono ? "#000000" : tagline;

  const translateX = -(zoom - 1) * 10;
  const translateY = -(zoom - 1) * 20;

  return `
<svg viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="TELP Logo">
  <g transform="translate(${translateX}, ${translateY}) scale(${zoom})">
    <g font-family="Montserrat, Arial, sans-serif" font-weight="500" font-size="48">
      <text x="10"  y="50" fill="${p}" letter-spacing="2">T</text>
      <text x="50"  y="50" fill="${a}" letter-spacing="2">E</text>
      <text x="88"  y="50" fill="${a}" letter-spacing="2">L</text>
      <text x="126" y="50" fill="${p}" letter-spacing="2">P</text>
    </g>
    <g>
      <circle cx="185" cy="30" r="3"  fill="${p}" />
      <circle cx="210" cy="20" r="5"  fill="${a}" />
      <circle cx="225" cy="40" r="7"  fill="${p}" />
      <circle cx="205" cy="58" r="9"  fill="${p}" />
    </g>
    ${withTagline ? `<text x="10" y="75" font-family="Montserrat, Arial, sans-serif" font-weight="400" font-size="18" fill="${t}">tech solutions for custom enterprise</text>` : ``}
  </g>
</svg>`.trim();
}

export default function TelpLogo({ className = "w-52 h-16", title = "TELP Logo" }: TelpLogoProps) {
  const titleId = React.useId();
  const letters = [
    { x: 10, text: "T", className: "fill-blue-700 dark:fill-blue-300" },
    { x: 50, text: "E", className: "fill-orange-500 dark:fill-orange-400" },
    { x: 88, text: "L", className: "fill-orange-500 dark:fill-orange-400" },
    { x: 126, text: "P", className: "fill-blue-700 dark:fill-blue-300" },
  ];
  const dots = [
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
      {dots.map(({ cx, cy, r, className }, i) => (
        <circle key={`${cx}-${cy}-${i}`} cx={cx} cy={cy} r={r} className={className} />
      ))}
      <text
        x={10}
        y={75}
        fontFamily="Montserrat, Arial, sans-serif"
        fontWeight={400}
        fontSize={18}
        className="fill-blue-700 dark:fill-blue-300"
      >
        tech solutions for custom enterprise
      </text>
    </svg>
  );
}
