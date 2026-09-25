import Link from "next/link";
import { TextAnimate } from "../ui/text-animate";
import WaveText from "./WaveText";

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
    lineHeight?: string;

};

export default function PageHeading({
    breadcrumb,
    label,
    title,
    highlightedText,
    description,
    maxWidth = "max-w-4xl",
    titleMaxWidth = "max-w-2xl",
    fontSize = "clamp(2rem, 5vw, 3.8rem)",
    letterSpacing = "-0.055em",
    lineHeight = "1.1",
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
            <p className="section-label" data-aos="zoom-in">
                {label}
            </p>

            {/* Page Title */}
            {(title || highlightedText) && (
                <h2
                    className={`
            mt-6
            mb-6
            ${titleMaxWidth}
            font-bold
        `}
                    style={{
                        fontSize,
                        letterSpacing,
                        lineHeight,
                    }}
                >
                    {title && (
                        <>
                            <WaveText
                                as="span"
                                delay={0.1}
                                stagger={0.035}
                                duration={0.65}
                                amplitude={14}
                                wavelength={2.5}
                            >
                                {title}
                            </WaveText>
                            {" "}</>

                    )}

                    {highlightedText && (
                        <WaveText
                            as="span"
                            characterClassName="text-gradient"
                            delay={
                                title
                                    ? 0.1 + title.length * 0.035
                                    : 0.1
                            }
                            stagger={0.035}
                            duration={0.65}
                            amplitude={14}
                            wavelength={2.5}
                        >
                            {highlightedText}
                        </WaveText>
                    )}
                </h2>
            )}






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