import { Particles } from "../ui/particles";


export default function PageDecorations() {
    return (
        <>
            <div aria-hidden="true">
                {/* Base background */}
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/[0.06]" />

                {/* Full Hero Grid */}
                <div className="hero-grid absolute inset-0" />



                {/* Main atmospheric glow */}
                <div
                    className="
                                   absolute left-1/2 top-[35%]
                                   h-[700px] w-[900px]
                                   -translate-x-1/2 -translate-y-1/2
                                   rounded-full
                                   bg-[var(--chart-2)]/[0.10]
                                   blur-[120px]
                               "
                />

                {/* Top glow */}
                <div
                    className="
                                   absolute left-1/2 top-[-180px]
                                   h-[500px] w-[900px]
                                   -translate-x-1/2
                                   rounded-full
                                   bg-[var(--chart-3)]/[0.10]
                                   blur-[110px]
                               "
                />

                {/* Left ambient light */}
                <div
                    className="
                                   absolute -left-48 top-[25%]
                                   h-[500px] w-[500px]
                                   rounded-full
                                   bg-primary/[0.055]
                                   blur-[120px]
                               "
                />

                {/* Right ambient light */}
                <div
                    className="
                                   absolute -right-48 bottom-[5%]
                                   h-[500px] w-[500px]
                                   rounded-full
                                   bg-primary/[0.06]
                                   blur-[100px]
                               "
                />

                {/* Image-side atmospheric glow */}
                <div
                    className="
                                   absolute right-[4%] top-1/2
                                   hidden h-[400px] w-[400px]
                                   -translate-y-1/2
                                   rounded-full
                                   bg-[var(--chart-2)]/[0.08]
                                   blur-[100px]
                                   lg:block
                               "
                />

            </div>
            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute
                    bottom-0 left-0 right-0
                    z-30 h-22
                    bg-gradient-to-t
                    from-background
                    to-transparent
                    blur-[30px]
                "
            />
        </>
    );
}