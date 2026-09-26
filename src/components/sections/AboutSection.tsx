import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    Headphones,
    Sparkles,
} from "lucide-react";

import PageHeading from "../shared/PageHeading";
import { Lens } from "../ui/lens";

/* =========================================================
   ABOUT SECTION DATA
   ========================================================= */

const aboutFeatures = [
    {
        title: "Shaping Tomorrow, Transforming Today",
    },
    {
        title: "Innovating Today, Empowering Tomorrow",
    },
];

const aboutStats = [
    {
        label: "Business Problem Solving",
        value: 70,
    },
    {
        label: "Campaign Launches",
        value: 80,
    },
];

/* =========================================================
   ABOUT SECTION
   ========================================================= */

export default function AboutSection() {
    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="
                relative
                overflow-hidden
                py-20
                sm:py-24
                lg:py-32
                xl:py-36
            "
        >
            {/* =================================================
                BACKGROUND DECORATION
               ================================================= */}

            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    -left-40
                    top-1/3
                    h-180
                    w-80
                    rounded-full
                    opacity-40
                    blur-[980px]
                "
                style={{
                    background: "var(--chart-3)",
                }}
            />


            {/* =================================================
                MAIN CONTAINER
               ================================================= */}

            <div
                className="
                    relative
                    mx-auto
                    w-full
                    max-w-[var(--container-width)]
                    px-[var(--container-padding)]
                "
            >
                {/* =================================================
                    TWO COLUMN LAYOUT
                   ================================================= */}

                <div
                    className="
                        grid
                        items-center
                        gap-12
                        lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]
                        lg:gap-16
                        xl:gap-20
                    "
                >
                    {/* =================================================
                        LEFT — IMAGE
                       ================================================= */}



                    <div
                        className="
        relative
        order-1
        w-full "
                        data-aos="zoom-in"
                    >
                        {/* Image glow */}
                        <div
                            aria-hidden="true"
                            className="
            absolute
            -inset-4
            -z-10
            rounded-[2rem]
            opacity-50
            blur-3xl
        "
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(245,185,66,0.16), transparent 70%)",
                            }}
                        />

                        {/* Gold accent */}
                        <div
                            aria-hidden="true"
                            className="
            absolute
            -left-3
            top-10
            z-10
            hidden
            h-24
            w-[3px]
            rounded-full
            lg:block
        "
                            style={{
                                background: "var(--gradient-primary)",
                            }}
                        />

                        {/* Image */}
                        <div
                            className="
            group
            relative
            aspect-square
            w-full
            overflow-hidden
            rounded-[1.25rem]
            border
            border-[var(--border)]
            bg-[var(--card)]
            shadow-[var(--shadow-lg)]
            sm:rounded-[1.5rem]
            lg:rounded-[1.75rem]
        "
                        >
                            <Lens
                                zoomFactor={1.8}
                                lensSize={150}
                                aria-label="Zoom image"
                            >
                                <Image
                                    src="/images/general/about.jpg"
                                    alt="IT professional working on digital technology solutions"
                                    fill
                                    priority
                                    sizes="
                    (max-width: 1023px) 100vw,
                    (max-width: 1279px) 48vw,
                    600px
                "
                                    className="
                    object-cover
                    object-center
                    transition-transform
                    duration-700
                    ease-[var(--ease-smooth)]
                    group-hover:scale-[1.025]
                "
                                />
                            </Lens>

                            {/* Image overlay */}
                            <div
                                aria-hidden="true"
                                className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-[#020210]/30
                via-transparent
                to-transparent
            "
                            />
                        </div>

                        {/* =================================================
        FLOATING DIGITAL SOLUTIONS CARD
       ================================================= */}

                        <div
                            className="
            absolute
            -bottom-5
            left-4
            z-20
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-[var(--border)]
            bg-[rgba(10,9,34,0.88)]
            px-4
            py-3
            shadow-[var(--shadow-md)]
            backdrop-blur-xl
            sm:bottom-6
            sm:left-6
            sm:px-5
            sm:py-4
        "
                        >
                            <div
                                className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
            "
                                style={{
                                    background: "var(--gradient-primary)",
                                    color: "var(--primary-foreground)",
                                }}
                            >
                                <Sparkles
                                    className="h-4 w-4"
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />
                            </div>

                            <div>
                                <p
                                    className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-[var(--muted-foreground)]
                "
                                >
                                    Digital Solutions
                                </p>

                                <p
                                    className="
                    mt-0.5
                    text-sm
                    font-semibold
                    text-[var(--foreground)]
                "
                                >
                                    Built for growth
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        RIGHT — CONTENT
                       ================================================= */}

                    <div
                        className="
                            order-2
                            min-w-0
                        "
                    >
                        {/* Heading */}
                        <PageHeading
                            label="About Us"
                            title="Unlock Business Growth with Our"
                            highlightedText="Expert IT Solutions"
                            description="At BuitinSoft, we deliver IT services designed to boost efficiency, streamline operations, and help your business scale with confidence."
                            titleMaxWidth="max-w-[680px]"
                            fontSize="clamp(1.7rem,3vw,2.11rem)"
                            className="max-w-none"
                            letterSpacing="0.2px"
                            lineHeight="1.5"
                        />

                        {/* =================================================
                            STATS
                           ================================================= */}

                        <div
                            className="
        mt-10
        space-y-6
        sm:mt-11
        sm:space-y-7
    "
                        >
                            {aboutStats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    className="group"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 150}
                                >
                                    {/* Label */}
                                    <div
                                        className="
                    mb-3
                    flex
                    items-center
                    justify-between
                    gap-4
                "
                                    >
                                        <span
                                            className="
                        text-sm
                        font-medium
                        text-[var(--foreground)]
                        sm:text-base
                    "
                                        >
                                            {stat.label}
                                        </span>
                                    </div>

                                    {/* Progress wrapper */}
                                    <div
                                        className="
                    relative
                    h-[7px]
                    w-full
                    rounded-full
                    bg-[var(--secondary)]
                "
                                    >
                                        {/* Animated progress */}
                                        <div
                                            className="
                        absolute
                        left-0
                        top-0
                        h-full
                        rounded-full
                        transition-[width]
                        duration-[1200ms]
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                    "
                                            style={{
                                                width: `${stat.value}%`,
                                                background: "var(--gradient-primary)",
                                            }}
                                        />

                                        {/* Percentage indicator */}
                                        <div
                                            className="
                        absolute
                        -top-1
                        flex
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        border-[var(--background)]
                        bg-[var(--primary)]
                        px-2
                        py-0.5
                        text-[10px]
                        font-bold
                        leading-none
                        text-[var(--primary-foreground)]
                        shadow-[0_0_12px_rgba(245,185,66,0.28)]
                        transition-[left]
                        duration-[1200ms]
                        ease-[cubic-bezier(0.22,1,0.36,1)]
                    "
                                            style={{
                                                left: `${stat.value}%`,
                                                transform: "translate(-50%, -50%)",
                                            }}
                                        >
                                            {stat.value}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* =================================================
                            FEATURE LIST
                           ================================================= */}

                        <div
                            className="
                                mt-9
                                space-y-4
                                sm:mt-10
                                sm:space-y-5
                            "
                        >
                            {aboutFeatures.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 150}
                                    className="
                                        group
                                        flex
                                        items-center
                                        gap-3
                                        text-[var(--foreground)]
                                    "
                                >
                                    {/* Lucide check icon */}
                                    <span
                                        className="
                                            flex
                                            shrink-0
                                            items-center
                                            justify-center
                                            text-[var(--primary)]
                                            transition-transform
                                            duration-300
                                            group-hover:scale-110
                                        "
                                    >
                                        <CheckCircle2
                                            className="
                                            text-green-700
                                                h-5
                                                w-5
                                                sm:h-[22px]
                                                sm:w-[22px]
                                            "
                                            strokeWidth={1.8}
                                            aria-hidden="true"
                                        />
                                    </span>

                                    <span
                                        className="
                                            text-sm
                                            font-semibold
                                            leading-6
                                            text-[var(--foreground)]
                                            sm:text-base
                                            sm:leading-7
                                        "
                                    >
                                        {feature.title}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* =================================================
                            CTA + PHONE
                           ================================================= */}

                        <div
                            className="
                                mt-9
                                flex
                                flex-col
                                gap-5
                                sm:mt-10
                                sm:flex-row
                                sm:items-center
                                sm:gap-6"

                        >
                            {/* CTA */}
                            <Link
                                href="/contact"
                                className="
                                 custom-btn-outline"
                                data-aos="fade-up"
                            >
                                <span>Get In Touch</span>

                                <ArrowRight
                                    className="
                                        ml-2
                                        h-4
                                        w-4
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    "
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />
                            </Link>

                            {/* Phone */}
                            <a
                                href="tel:+923022094272"
                                aria-label="Call us at +92 302 2094272"
                                className="
                                    group
                                    flex
                                    items-center
                                    gap-3
                                    rounded-md
                                    transition-opacity
                                    duration-200
                                    hover:opacity-90
                                "
                                data-aos="fade-up"
                            >
                                <span
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-md
                                        border
                                        border-[var(--border)]
                                        bg-[var(--surface)]
                                        text-[var(--foreground)]
                                        transition-all
                                        duration-300
                                        group-hover:border-[var(--primary)]
                                        group-hover:text-[var(--primary)]
                                    "
                                >
                                    <Headphones
                                        className="h-5 w-5 sm:h-6 sm:w-6"
                                        strokeWidth={1.8}
                                        aria-hidden="true"
                                    />
                                </span>

                                <span className="flex flex-col">
                                    <span
                                        className="
                                            text-xs
                                            font-medium
                                            text-[var(--muted-foreground)]
                                        "
                                    >
                                        Call Any Time
                                    </span>

                                    <span
                                        className="
                                            mt-0.5
                                            text-lg
                                            font-bold
                                            tracking-[-0.02em]
                                            text-[var(--foreground)]
                                            sm:text-xl
                                        "
                                    >
                                        +92 (302) 2094272
                                    </span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}