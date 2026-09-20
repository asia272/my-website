import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Particles } from "../ui/particles";
import { ShineBorder } from "../ui/shine-border";

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
                        h-[650px] w-[650px]
                        rounded-full
                        bg-primary/[0.06]
                        blur-[110px]
                    "
                />

                {/* Image-side atmospheric glow */}
                <div
                    className="
                        absolute right-[5%] top-1/2
                        hidden h-[500px] w-[500px]
                        -translate-y-1/2
                        rounded-full
                        bg-[var(--chart-2)]/[0.08]
                        blur-[100px]
                        lg:block
                    "
                />
            </div>

            {/* =====================================================
                HERO CONTENT
            ====================================================== */}

            <div className="container relative z-20 flex min-h-[calc(100svh-var(--nav-height))] w-full items-center py-16 sm:py-20 lg:py-10">
                <div
                    className="
    grid items-center gap-10
    lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]
    lg:gap-12
    xl:gap-16
"
                >
                    {/* =================================================
                        LEFT — CONTENT
                    ================================================== */}

                    <div className="text-center lg:text-left">
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
                            className="
                                mx-auto max-w-4xl
                                text-[clamp(2.75rem,7vw,6.5rem)]
                                font-bold
                                leading-[1.02]
                                tracking-[-0.045em]
                                lg:mx-0
                            "
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
                            className="
                                mx-auto mt-7 max-w-2xl
                                text-base leading-relaxed
                                text-secondary
                                sm:text-lg
                                lg:mx-0
                            "
                        >
                            From high-performance websites to scalable
                            applications, we transform ideas into reliable
                            digital products designed for real business growth.
                        </p>

                        {/* CTA Buttons */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className="
                                mt-9 flex flex-col
                                items-center justify-center
                                gap-3
                                sm:flex-row
                                lg:justify-start
                            "
                        >
                            <Link
                                href="/projects"
                                className="custom-btn-outline group"
                            >
                                <span>Explore Projects</span>

                                <ArrowRight
                                    aria-hidden="true"
                                    className="
                                        ml-2 size-4
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    "
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
                            className="
                                mt-14 flex flex-wrap
                                items-center justify-center
                                gap-x-6 gap-y-3
                                lg:justify-start
                            "
                        >
                            <span className="text-sm text-muted">
                                Modern Technology
                            </span>

                            <span
                                aria-hidden="true"
                                className="
                                    hidden size-1 rounded-full
                                    bg-[var(--border-hover)]
                                    sm:block
                                "
                            />

                            <span className="text-sm text-muted">
                                Scalable Solutions
                            </span>

                            <span
                                aria-hidden="true"
                                className="
                                    hidden size-1 rounded-full
                                    bg-[var(--border-hover)]
                                    sm:block
                                "
                            />

                            <span className="text-sm text-muted">
                                Client-Focused Development
                            </span>
                        </div>
                    </div>

                    {/* =================================================
                        RIGHT — HERO IMAGE
                    ================================================== */}

                    <div
                        data-aos="fade-left"
                        data-aos-delay="200"
                        className="
        relative mx-auto
        w-full max-w-[500px]
        lg:max-w-[520px]
    "
                    >
                        {/* Outer atmospheric glow */}
                        <div
                            aria-hidden="true"
                            className="
            pointer-events-none
            absolute -inset-8
            rounded-[2rem]
            bg-gradient-to-br
            from-[var(--chart-2)]/[0.16]
            via-transparent
            to-[var(--chart-3)]/[0.14]
            blur-3xl
        "
                        />

                        {/* Shared image + border frame */}
                        <div
                            className="
            group relative
            aspect-[5/4]
            rounded-[1.5rem]
            lg:aspect-[4/3]
        "
                        >
                            {/* Shine Border */}
                            <ShineBorder
                                aria-hidden="true"
                                className="
        absolute
        inset-0
        rounded-[1.5rem]
        shadow-[0_0_25px_rgba(109,101,254,0.16)]
        transition-all
        duration-700
        group-hover:rotate-[1deg]
        group-hover:shadow-[0_0_40px_rgba(109,101,254,0.24)]
    "
                                shineColor={[
                                    "var(--chart-2)",
                                    "var(--chart-3)",
                                ]}
                                borderWidth={4}
                                duration={10}
                            />

                            {/* Image */}
                            {/* <div
                                className="
                absolute inset-[1px]
                overflow-hidden
                rounded-[calc(1.5rem-1px)]
                bg-muted
            "
                            >
                                <Image
                                    src="/images/general/hero.jpg"
                                    alt="Asia Ashraf - Full Stack Web Developer"
                                    fill
                                    priority
                                    sizes="
                    (max-width: 1023px) 90vw,
                    (max-width: 1279px) 45vw,
                    520px
                "
                                    className="
                    object-cover
                    object-center
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.025]
                "
                                />


                            </div> */}
                            {/* Image */}
                            <div
                                className="
        absolute inset-[1px]
        overflow-hidden
        rounded-[calc(1.5rem-1px)]
        bg-muted
    "
                            >
                                <Image
                                    src="/images/general/hero.jpg"
                                    alt="Asia Ashraf - Full Stack Web Developer"
                                    fill
                                    priority
                                    sizes="
            (max-width: 1023px) 90vw,
            (max-width: 1279px) 45vw,
            520px
        "
                                    className="
            object-cover
            object-center
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.025]
        "
                                />

                                {/* Image Overlay */}
                                <div
                                    aria-hidden="true"
                                    className="
            pointer-events-none
            absolute inset-0
            bg-gradient-to-br
            from-black/[0.10]
            via-transparent
            to-[var(--chart-3)]/[0.12]
        "
                                />
                                {/* Centered Animated Shine */}
                                <div
                                    aria-hidden="true"
                                    className="
        pointer-events-none
        absolute
        left-1/2
        top-0
        h-[5px]
        w-[80%]
        -translate-x-1/2
        rounded-full
        bg-gradient-to-r
        from-transparent
        via-[var(--chart-2)]
        to-transparent
        shadow-[0_0_5px_var(--chart-2),0_0_10px_var(--chart-2)/30]
        opacity-80
        animate-[heroShine_4s_linear_infinite]
    "
                                />
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {/* =====================================================
                BOTTOM FADE
            ====================================================== */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute
                    bottom-0 left-0 right-0
                    z-30 h-32
                    bg-gradient-to-t
                    from-background
                    to-transparent
                "
            />
        </section>
    );
};

export default HeroSection;