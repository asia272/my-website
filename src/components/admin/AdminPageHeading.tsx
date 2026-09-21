type AdminPageHeaderProps = {
    title: string;
    description: string;
    label?: string;
    labelClassName?: string;
};

export default function AdminPageHeading({
    title,
    description,
    label,
    labelClassName = "text-primary",
}: AdminPageHeaderProps) {
    return (
        <div className="mb-8">
            {label && (
                <p
                    className={`text-sm font-medium ${labelClassName}`}
                >
                    {label}
                </p>
            )}

            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                {title}
            </h1>

            <p className="mt-2 text-sm text-secondary">
                {description}
            </p>
        </div>
    );
}