import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
    return (
        <section
            id="home"
            className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden"
        >
            {/* Background glow */}
            <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-3xl"
            />

            <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                <div className="mx-auto max-w-4xl text-center">
                    {/* Badge */}
                    <div
                        data-aos="fade-down"
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 backdrop-blur-sm"
                    >
                        <Sparkles className="size-4" />

                        <span>Building digital experiences that matter</span>
                    </div>

                    {/* Heading */}
                    <h1
                        data-aos="fade-up"
                        data-aos-delay="100"
                        className="text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
                    >
                        We build{" "}
                        <span className="text-white/50">
                            modern digital solutions
                        </span>{" "}
                        for ambitious businesses.
                    </h1>

                    {/* Description */}
                    <p
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-white/60 sm:text-lg"
                    >
                        From high-performance websites to scalable applications, we
                        transform ideas into reliable digital products designed for real
                        business growth.
                    </p>

                    {/* CTA */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="300"
                        className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
                    >
                        <Link
                            href="/projects"
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105"
                        >
                            Explore Projects

                            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>

                        <Link href="/contact" className="custom-btn">
                            Start a Conversation
                        </Link>
                    </div>

                    {/* Trust line */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="400"
                        className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/40 sm:text-sm"
                    >
                        <span>Modern Technology</span>
                        <span className="hidden size-1 rounded-full bg-white/20 sm:block" />
                        <span>Scalable Solutions</span>
                        <span className="hidden size-1 rounded-full bg-white/20 sm:block" />
                        <span>Client-Focused Development</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;