import Link from "next/link";
import { TextAnimate } from "../ui/text-animate";

type PageHeadingProps = {
    breadcrumb?: string;
    label: string;
    title?: string;
    highlightedText?: string;
    description?: string;

    /**
     * Tailwind max-width class for the heading wrapper.
     * Default: max-w-4xl
     */
    maxWidth?: string;

    /**
     * Tailwind max-width class for the title.
     * Default: max-w-2xl
     */
    titleMaxWidth?: string;

    /**
     * CSS font-size value.
     * Default: clamp(1rem, 5vw, 3.8rem)
     */
    fontSize?: string;

    className?: string;
    letterSpacing?: string;
};

export default function PageHeading({
    breadcrumb,
    label,
    title,
    highlightedText,
    description,
    maxWidth = "max-w-4xl",
    titleMaxWidth = "max-w-2xl",
    fontSize = "clamp(1rem,5vw,3.8rem)",
    letterSpacing = "-0.055em",
    className = "",
}: PageHeadingProps) {
    return (
        <div className={`${maxWidth} ${className}`}>
            {/* Breadcrumb */}
            {breadcrumb && (
                <div
                    className="
                        mb-9
                        flex
                        items-center
                        gap-3
                        text-[11px]
                        font-medium
                        uppercase
                        tracking-[0.22em]
                        text-muted-foreground
                    "
                >
                    <Link
                        href="/"
                        className="
                            transition-colors
                            hover:text-chart-1
                        "
                    >
                        Home
                    </Link>

                    <span
                        aria-hidden="true"
                        className="text-primary/50"
                    >
                        /
                    </span>

                    <span className="text-primary">
                        {breadcrumb}
                    </span>
                </div>
            )}

            {/* Page Label */}
            <p className="section-label">
                {label}
            </p>

            {/* Page Title */}
            <h2
                className={`
                    mt-6
                    mb-6
                    ${titleMaxWidth}
                    font-bold
                    // leading-[1.5]
                    
                `}
                style={{
                    fontSize,
                    letterSpacing
                }}
            >
                {title && (
                    <TextAnimate
                        animation="slideLeft" by="character"
                        className="leading-[1.5]"
                    >
                        {title}
                    </TextAnimate>
                )}



                {highlightedText && (

                    <TextAnimate animation="slideLeft" by="character"
                        className="text-gradient font-medium ">
                        {highlightedText}
                    </TextAnimate>

                )}
            </h2>

            {/* Description */}
            {description && (
                <TextAnimate animation="fadeIn" by="line" as="p"
                    className="
                        max-w-2xl
        text-lg
        leading-7
        text-secondary
        sm:text-xl
        sm:leading-8
                    "
                >
                    {description}
                </TextAnimate>
            )}
        </div>
    );
}