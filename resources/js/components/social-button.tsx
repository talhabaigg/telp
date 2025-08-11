import * as React from "react";

/**
 * Type definition for the icon component.
 * It accepts optional `size` and `className` props.
 */
type IconType = React.ComponentType<{
    size?: number;
    className?: string;
}>;

/**
 * Supported button sizes.
 */
type Size = "sm" | "md" | "lg";

/**
 * Tailwind height/width classes per size option.
 */
const SIZE_CLASS: Record<Size, string> = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
    lg: "h-10 w-10",
};

/**
 * Icon pixel size per size option.
 */
const ICON_PX: Record<Size, number> = {
    sm: 16,
    md: 18,
    lg: 20,
};

/**
 * Props for the SocialButton component.
 */
export interface SocialButtonProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
    /**
     * Icon component to render inside the button.
     */
    Icon: IconType;

    /**
     * Destination URL for the button.
     */
    href: string;

    /**
     * Accessible label for screen readers.
     */
    label: string;

    /**
     * Size of the button. Defaults to "md".
     */
    size?: Size;
}

/**
 * SocialButton renders a circular icon button with accessibility and
 * external link detection support.
 *
 * @param Icon Icon component to display
 * @param href Destination URL
 * @param label ARIA label and screen reader description
 * @param size Button size (sm, md, lg)
 * @param className Additional Tailwind classes
 * @param target Optional override for link target
 * @param rel Optional override for link rel
 */
const SocialButton = React.forwardRef<HTMLAnchorElement, SocialButtonProps>(
    ({ Icon, href, label, size = "md", className = "", target, rel, ...rest }, ref) => {
        const sizeClass = SIZE_CLASS[size];
        const iconPx = ICON_PX[size];

        const isExternal =
            /^https?:\/\//i.test(href) || href.startsWith("mailto:");
        const _target = target ?? (isExternal ? "_blank" : undefined);
        const _rel = rel ?? (isExternal ? "noopener noreferrer" : undefined);

        return (
            <a
                ref={ref}
                href={href}
                aria-label={label}
                target={_target}
                rel={_rel}
                className={[
                    "inline-flex items-center justify-center rounded-full",
                    sizeClass,
                    "bg-zinc-100 dark:bg-zinc-900/70",
                    "border border-transparent dark:border-zinc-800",
                    "transition-all duration-150 hover:bg-indigo-500/10",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60",
                    "focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900",
                    className,
                ].join(" ")}
                {...rest}
            >
                <Icon
                    size={iconPx}
                    className="text-zinc-600 dark:text-zinc-200 transition-colors duration-150 hover:text-indigo-500"
                />
                <span className="sr-only">{label}</span>
            </a>
        );
    }
);

SocialButton.displayName = "SocialButton";

export default SocialButton;
