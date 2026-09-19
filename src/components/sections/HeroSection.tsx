import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
    return (
        <section
            id="home"
            aria-labelledby="hero-heading"
            className="section relative isolate flex min-h-[calc(100svh-var(--nav-height))] items-center overflow-hidden"
        >
            {/* =====================================================
                BACKGROUND DECORATION
            ====================================================== */}

            <div
                aria-hidden="true"
                className="glow left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
            >
                {/* Subtle center radial light */}
                <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(245,185,66,0.035)] blur-3xl" />

                {/* Top ambient glow */}
                <div className="absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-[rgba(245,185,66,0.025)] blur-3xl" />
            </div>

            {/* =====================================================
                CONTENT
            ====================================================== */}

            <div className="container w-full py-24 sm:py-28 lg:py-32">
                <div className="mx-auto max-w-5xl text-center">

                    {/* =================================================
                        EYEBROW
                    ================================================== */}

                    <div
                        data-aos="fade-down"
                        className="mb-7"
                    >
                        <span className="section-label">
                            <Sparkles
                                aria-hidden="true"
                                className="size-4"
                            />

                            Building Digital Experiences
                        </span>
                    </div>

                    {/* =================================================
                        MAIN HEADING
                    ================================================== */}

                    <h1
                        id="hero-heading"
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="mx-auto max-w-5xl text-[clamp(2.75rem,7vw,6.5rem)] font-bold leading-[1.02] tracking-[-0.045em]"
                    >
                        We build{" "}
                        <span className="text-gradient">
                            modern digital solutions
                        </span>{" "}
                        for ambitious businesses.
                    </h1>

                    {/* =================================================
                        DESCRIPTION
                    ================================================== */}

                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg"
                    >
                        From high-performance websites to scalable applications,
                        we transform ideas into reliable digital products designed
                        for real business growth.
                    </p>

                    {/* =================================================
                        CTA BUTTONS
                    ================================================== */}

                    <div
                        data-aos="fade-up"
                        data-aos-delay="300"
                        className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
                    >
                        <Link
                            href="/projects"
                            className="custom-btn-outline group"
                        >
                            <span>Explore Projects</span>

                            <ArrowRight
                                aria-hidden="true"
                                className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1"
                            />
                        </Link>

                        <Link
                            href="/contact"
                            className="custom-btn"
                        >
                            Start a Conversation
                        </Link>
                    </div>

                    {/* =================================================
                        TRUST / VALUE POINTS
                    ================================================== */}

                    <div
                        data-aos="fade-up"
                        data-aos-delay="400"
                        className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
                    >
                        <span className="text-sm text-muted">
                            Modern Technology
                        </span>

                        <span
                            aria-hidden="true"
                            className="hidden size-1 rounded-full bg-[var(--border-hover)] sm:block"
                        />

                        <span className="text-sm text-muted">
                            Scalable Solutions
                        </span>

                        <span
                            aria-hidden="true"
                            className="hidden size-1 rounded-full bg-[var(--border-hover)] sm:block"
                        />

                        <span className="text-sm text-muted">
                            Client-Focused Development
                        </span>
                    </div>
                </div>
            </div>

            {/* =====================================================
                BOTTOM FADE
            ====================================================== */}

            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent"
            />
        </section>
    );
};

export default HeroSection;