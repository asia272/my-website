

export default function PageDecorations() {
    return (
        <>
            {/* Chart 2 glow */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -right-50
                    -top-58
                    h-[800px]
                    w-[800px]
                    rounded-full
                    bg-[radial-gradient(circle,color-mix(in_srgb,var(--chart-2)_13%,transparent)_0%,color-mix(in_srgb,var(--chart-2)_5%,transparent)_30%,transparent_70%)]
                    blur-2xl
                "
            />

            {/* Chart 3 glow */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    h-[420px]
                    w-[700px]
                    -translate-x-1/2
                    bg-[radial-gradient(ellipse,color-mix(in_srgb,var(--chart-3)_8%,transparent)_0%,transparent_70%)]
                "
            />

            {/* Chart 4 glow */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -bottom-40
                    -left-40
                    h-[500px]
                    w-[500px]
                    rounded-full
                    bg-[radial-gradient(circle,color-mix(in_srgb,var(--chart-4)_8%,transparent)_0%,transparent_70%)]
                    blur-2xl
                "
            />
        </>
    );
}