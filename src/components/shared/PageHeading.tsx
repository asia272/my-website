type PageHeadingProps = {
    breadcrumb?: string;
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
    breadcrumb,
    label,
    title,
    highlightedText,
    description,
    maxWidth = "max-w-4xl",
    fontSize = "clamp(1rem,5vw,3.8rem)",
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
                    <span>
                        Home
                    </span>

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
            </h2>

            {/* Description */}
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