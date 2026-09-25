import PageDecorations from "./PageDecorations";
import PageHeading from "./PageHeading";

type PageHeroProps = {
    breadcrumb: string;
    label: string;
    title?: string;
    highlightedText?: string;
    description?: string;
    maxWidth?: string;
    fontSize?: string;
    className?: string;
};

export default function PageHero({
    breadcrumb,
    label,
    title,
    highlightedText,
    description,
    maxWidth,
    fontSize,
    className = "",
}: PageHeroProps) {
    return (
        <section
            className={`
                relative
                overflow-hidden
                ${className}
            `}
        >
            <PageDecorations />

            <div
                className="
                    container
                    relative
                    pt-[calc(var(--nav-height)+48px)]
                    pb-16
                    lg:pt-[calc(var(--nav-height)+58px)]
                    lg:pb-20
                "
            >
                <PageHeading
                    breadcrumb={breadcrumb}
                    label={label}
                    title={title}
                    highlightedText={highlightedText}
                    description={description}
                    maxWidth={maxWidth}
                // fontSize={fontSize}
                />
            </div>
            <div className="divider" />
        </section>
    );
}