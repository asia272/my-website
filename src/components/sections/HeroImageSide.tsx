"use client";

import Image from "next/image";
import {
    Bot,
    Code2,
    Database,
    Globe2,
    Sparkles,
} from "lucide-react";

export default function ImageLeftSide() {
    return (
        <div className="relative w-full">
            <div className="hero-tech-visual relative mx-auto aspect-[4/3] w-full max-w-[680px]">

                {/* =====================================================
                    BACKGROUND AMBIENT FIELD
                ===================================================== */}

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-1/2
                        z-0
                        size-[78%]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        bg-[var(--chart-2)]/[0.045]
                        blur-[100px]
                    "
                />

                <div
                    aria-hidden="true"
                    className="
                        hero-tech-radial
                        pointer-events-none
                        absolute
                        inset-[4%]
                        z-0
                        rounded-[2.5rem]
                        opacity-40
                    "
                />

                {/* =====================================================
                    TECH GRID
                ===================================================== */}

                <div
                    aria-hidden="true"
                    className="
                        hero-tech-grid
                        pointer-events-none
                        absolute
                        inset-[7%]
                        z-[1]
                        rounded-[2rem]
                        opacity-[0.18]
                    "
                />

                {/* =====================================================
                    NETWORK SYSTEM
                ===================================================== */}

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        z-[2]
                        hidden
                        sm:block
                    "
                >
                    {/* Main square network */}

                    <NetworkConnection
                        className="left-[14%] top-[12%] w-[72%]"
                        direction="horizontal"
                    />

                    <NetworkConnection
                        className="left-[14%] top-[12%] h-[76%]"
                        direction="vertical"
                    />

                    <NetworkConnection
                        className="bottom-[12%] left-[14%] w-[72%]"
                        direction="horizontal"
                    />

                    <NetworkConnection
                        className="right-[14%] top-[12%] h-[76%]"
                        direction="vertical"
                    />

                    {/* Secondary network branches */}

                    <div
                        className="
                            absolute
                            left-[14%]
                            top-[12%]
                            h-[1px]
                            w-[10%]
                            -translate-x-full
                            border-t
                            border-dashed
                            border-white/[0.07]
                        "
                    />

                    <div
                        className="
                            absolute
                            right-[14%]
                            top-[12%]
                            h-[1px]
                            w-[10%]
                            translate-x-full
                            border-t
                            border-dashed
                            border-white/[0.07]
                        "
                    />

                    <div
                        className="
                            absolute
                            bottom-[12%]
                            left-[14%]
                            h-[1px]
                            w-[10%]
                            -translate-x-full
                            border-t
                            border-dashed
                            border-white/[0.07]
                        "
                    />

                    <div
                        className="
                            absolute
                            bottom-[12%]
                            right-[14%]
                            h-[1px]
                            w-[10%]
                            translate-x-full
                            border-t
                            border-dashed
                            border-white/[0.07]
                        "
                    />

                    {/* Extra floating nodes */}

                    <SmallNode className="left-[8%] top-[12%]" />
                    <SmallNode className="right-[8%] top-[12%]" />
                    <SmallNode className="left-[8%] bottom-[12%]" />
                    <SmallNode className="right-[8%] bottom-[12%]" />

                    <SmallNode className="left-[31%] top-[7%]" />
                    <SmallNode className="right-[31%] bottom-[7%]" />
                </div>

                {/* =====================================================
                    IMAGE AURA
                ===================================================== */}

                <div
                    aria-hidden="true"
                    className="
                        hero-image-breathing-glow
                        pointer-events-none
                        absolute
                        inset-[5%]
                        z-[2]
                        rounded-[2rem]
                    "
                />

                {/* =====================================================
                    IMAGE FRAME
                ===================================================== */}

                <div
                    className="
                        group
                        absolute
                        inset-[8%]
                        z-[3]
                        overflow-hidden
                        rounded-[1.75rem]
                        border
                        border-white/[0.10]
                        bg-[#020210]
                        shadow-[0_35px_100px_rgba(0,0,0,0.42)]
                    "
                >
                    {/* Premium inner frame */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            z-40
                            rounded-[1.75rem]
                            border
                            border-white/[0.035]
                        "
                    />

                    {/* Image */}
                    <div className="hero-image-pan absolute inset-[-4%]">
                        <Image
                            src="/images/general/hero.jpg"
                            alt="Modern digital technology workspace"
                            fill
                            priority
                            className="
                                object-cover
                                transition-transform
                                duration-1000
                                ease-out
                                group-hover:scale-[1.025]
                            "
                        />
                    </div>

                    {/* Image color grading */}
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            z-10
                            bg-gradient-to-br
                            from-[var(--chart-2)]/[0.13]
                            via-transparent
                            to-[var(--chart-3)]/[0.12]
                        "
                    />

                    {/* Cinematic vignette */}
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            z-10
                            bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,2,16,0.42)_100%)]
                        "
                    />

                    {/* Bottom depth */}
                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            inset-x-0
                            bottom-0
                            z-10
                            h-[30%]
                            bg-gradient-to-t
                            from-black/[0.42]
                            to-transparent
                        "
                    />

                    {/* =================================================
                        CENTER CORE
                    ================================================= */}

                    <div
                        className="
                            hero-center-core
                            absolute
                            left-1/2
                            top-1/2
                            z-40
                            flex
                            size-[62px]
                            -translate-x-1/2
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-[18px]
                            border
                            border-white/[0.14]
                            bg-black/[0.28]
                            shadow-[0_0_45px_rgba(109,101,254,0.22)]
                            backdrop-blur-xl
                        "
                    >
                        <div
                            className="
                                flex
                                size-10
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-[var(--chart-2)]/[0.18]
                                bg-[var(--chart-2)]/[0.09]
                                text-[var(--chart-2)]
                            "
                        >
                            <Sparkles
                                size={19}
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    MOVING TECHNOLOGY CARDS
                ===================================================== */}

                <TechCard
                    className="hero-orbit-1"
                    color="chart-1"
                    icon={<Code2 />}
                    title="Full-Stack"
                    subtitle="Web Development"
                />

                <TechCard
                    className="hero-orbit-2"
                    color="chart-2"
                    icon={<Globe2 />}
                    title="Modern Web"
                    subtitle="Next.js & React"
                />

                <TechCard
                    className="hero-orbit-3"
                    color="chart-4"
                    icon={<Database />}
                    title="Scalable"
                    subtitle="Backend Systems"
                />

                <TechCard
                    className="hero-orbit-4"
                    color="chart-3"
                    icon={<Bot />}
                    title="AI Solutions"
                    subtitle="Smart Experiences"
                />
            </div>
        </div>
    );
}


/* =============================================================
   NETWORK CONNECTION
============================================================= */

function NetworkConnection({
    className,
    direction,
}: {
    className: string;
    direction: "horizontal" | "vertical";
}) {
    return (
        <div
            className={`
                hero-connection
                absolute
                ${className}
                ${direction === "vertical" ? "border-l" : "border-t"}
            `}
        >
            <span className="hero-connection-light" />
        </div>
    );
}


/* =============================================================
   SMALL NODE
============================================================= */

function SmallNode({
    className,
}: {
    className: string;
}) {
    return (
        <span
            className={`
                hero-small-network-node
                absolute
                ${className}
            `}
        />
    );
}


/* =============================================================
   TECHNOLOGY CARD
============================================================= */

type TechCardProps = {
    className: string;
    color: "chart-1" | "chart-2" | "chart-3" | "chart-4";
    icon: React.ReactNode;
    title: string;
    subtitle: string;
};

function TechCard({
    className,
    color,
    icon,
    title,
    subtitle,
}: TechCardProps) {
    return (
        <div
            className={`
                hero-tech-card
                ${className}
                absolute
                z-50
                hidden
                sm:block
            `}
        >
            <div
                className={`
                    hero-tech-card-inner
                    hero-accent-${color}
                    relative
                    flex
                    h-[62px]
                    w-[168px]
                    items-center
                    gap-2.5
                    overflow-hidden
                    rounded-[13px]
                    border
                    px-2.5
                    backdrop-blur-2xl
                `}
            >
                {/* Glass highlight */}
                <span
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-x-3
                        top-0
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-white/[0.22]
                        to-transparent
                    "
                />

                {/* Colored ambient field */}
                <span
                    aria-hidden="true"
                    className="hero-card-color-field absolute inset-0"
                />

                {/* Icon */}
                <div className="hero-tech-icon p-2 rounded-full">
                    <span className="size-3">
                        {icon}
                    </span>
                </div>

                {/* Content */}
                <div className="relative z-10 min-w-0">
                    <p
                        className="
                            truncate
                            text-[13px]
                            font-semibold
                            tracking-[0.01em]
                            text-white/[0.92]
                        "
                    >
                        {title}
                    </p>

                    <p
                        className="
                            truncate
                            text-[10px]
                            font-medium
                            tracking-[0.025em]
                            text-white/[0.42]
                        "
                    >
                        {subtitle}
                    </p>
                </div>

                {/* Live indicator */}
                <span className="hero-card-live absolute right-2.5 top-2.5" />

                {/* Bottom glass line */}
                <span
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        inset-x-4
                        bottom-0
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-white/[0.06]
                        to-transparent
                    "
                />
            </div>
        </div>
    );
}