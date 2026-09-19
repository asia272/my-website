import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Particles } from "../ui/particles";



const HeroSection = () => {
    return (
        <section
            id="home"
            aria-labelledby="hero-heading"
            className="section relative isolate flex min-h-[calc(100svh-var(--nav-height))] items-center overflow-hidden"
        >
            {/* =====================================================
                HERO BACKGROUND
            ====================================================== */}

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                {/* Base background */}
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/[0.06]" />

                {/* Full Hero Grid */}
                <div className="hero-grid absolute inset-0" />

                {/* Magic UI Particles */}
                <Particles
                    className="absolute inset-0 z-10"
                    quantity={20}
                    ease={80}
                    color="#9e45b1"
                    refresh
                    size={0.6}

                />
                <Particles
                    className="absolute inset-0 z-10"
                    quantity={10}
                    ease={80}
                    color="#6d65fe"
                    size={0.6}
                    refresh
                />
                <Particles
                    className="absolute inset-0 z-10"
                    quantity={5}
                    ease={80}
                    color="#f5b942"
                    vx={0.15}
                    vy={0.05}
                    size={0.6}
                    refresh
                />
                {/* Main atmospheric glow */}
                <div
                    className="absolute left-1/2 top-[35%] h-[700px] w-[900px]
    -translate-x-1/2 -translate-y-1/2 rounded-full
    bg-[var(--chart-2)]/[0.10] blur-[120px]"
                />

                {/* Top glow */}
                <div
                    className="absolute left-1/2 top-[-180px] h-[500px] w-[900px]
    -translate-x-1/2 rounded-full
    bg-[var(--chart-3)]/[0.10] blur-[110px]"
                />

                {/* Left ambient light */}
                <div
                    className="absolute -left-48 top-[25%] h-[500px] w-[500px]
                    rounded-full bg-primary/[0.055] blur-[120px]"
                />

                {/* Right ambient light */}
                <div
                    className="absolute -right-48 bottom-[5%] h-[650px] w-[650px]
                    rounded-full bg-primary/[0.06] blur-[110px]"
                />
            </div>

            {/* =====================================================
                HERO CONTENT
            ====================================================== */}

            <div className="container relative z-20 w-full py-24 sm:py-28 lg:py-32">
                <div className="mx-auto max-w-5xl text-center">

                    {/* Eyebrow */}
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

                    {/* Main heading */}
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

                    {/* Description */}
                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg"
                    >
                        From high-performance websites to scalable applications,
                        we transform ideas into reliable digital products designed
                        for real business growth.
                    </p>

                    {/* CTA Buttons */}
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

                    {/* Trust / Value Points */}
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
                className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-32 bg-gradient-to-t from-background to-transparent"
            />
        </section>
    );
};

export default HeroSection;