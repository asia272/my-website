export function PageDecorations() {
    return (
        <>
            {/* Decorative glow */}
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
                    bg-[radial-gradient(circle,rgba(245,185,66,0.13)_0%,rgba(245,185,66,0.05)_30%,transparent_70%)]
                    blur-2xl
                "
            />

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
                    bg-[radial-gradient(ellipse,rgba(245,185,66,0.06)_0%,transparent_70%)]
                "
            />
        </>
    );
}