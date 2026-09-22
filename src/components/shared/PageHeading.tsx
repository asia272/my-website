type PageHeadingProps = {
    label: string;
    title: string;
    highlightedText?: string;
    description?: string;

    /**
     * Tailwind max-width class.
     * Default: max-w-4xl
     */
    maxWidth?: string;

    /**
     * CSS font-size value.
     * Default: clamp(2.8rem, 7vw, 5.8rem)
     */
    fontSize?: string;

    className?: string;
};

export default function PageHeading({
    label,
    title,
    highlightedText,
    description,
    maxWidth = "max-w-4xl",
    fontSize = "clamp(2.8rem,7vw,5.8rem)",
    className = "",
}: PageHeadingProps) {
    return (
        <div className={`${maxWidth} ${className}`}>
            <p className="section-label">
                {label}
            </p>

            <h1
                className="
                    mt-7
                    font-bold
                    leading-[0.98]
                    tracking-[-0.055em]
                "
                style={{
                    fontSize,
                }}
            >
                {title}

                {highlightedText && (
                    <>
                        <br />

                        <span className="text-gradient">
                            {highlightedText}
                        </span>
                    </>
                )}
            </h1>

            {description && (
                <p
                    className="
                        mt-7
                        max-w-2xl
                        text-base
                        leading-7
                        text-secondary
                        sm:text-lg
                        sm:leading-8
                    "
                >
                    {description}
                </p>
            )}
        </div>
    );
}