"use client";

import { useRef } from "react";

import Image from "next/image";

import Link from "next/link";

import { motion, MotionConfig, useInView } from "motion/react";

import {
    ArrowRight,
    Clock,
    Cloud,
    Code,
    Layers,
    Lightbulb,
    Lock,
    Megaphone,
    PenTool,
    ShieldCheck,
    Sparkles,
    Users,
    Wrench,
} from "lucide-react";

import Counter from "../animations/Counter";
import DrawCheck from "../animations/DrawCheck";
import Magnetic from "../animations/Magnetic";
import SpotlightCard from "../animations/SpotlightCard";
import { EASE, VIEWPORT, fadeUp, stagger } from "../animations/motion-variants";

import { Marquee } from "../ui/marquee";
import PageHeading from "../shared/PageHeading";

/* =========================================================
   CONTENT (edit text here)
   ========================================================= */

const aboutFeatures = [
    {
        title: "Shaping Tomorrow, Transforming Today",
        text: "Future-ready solutions built around how your business actually works.",
    },
    {
        title: "Innovating Today, Empowering Tomorrow",
        text: "Smart technology that gives your team room to grow and scale.",
    },
];

const aboutStats = [
    { label: "Business Problem Solving", value: 70, caption: "Solved with precision" },
    { label: "Campaign Launches", value: 80, caption: "Launched with impact" },
];

/* Small boxes (right side) — value + suffix are shown with a counter */
const miniStats = [
    { icon: Layers, value: 6, suffix: "", label: "Core Services", color: "var(--chart-1)" }, // gold
    { icon: Wrench, value: 100, suffix: "%", label: "Custom-Built", color: "var(--chart-2)" }, // violet-blue
    { icon: Clock, value: 24, suffix: "h", label: "Reply Time", color: "var(--chart-4)" }, // teal
    { icon: ShieldCheck, value: 0, suffix: "", label: "Hidden Costs", color: "var(--chart-3)" }, // purple
];

/* Marquee skills — each has its own icon, icon color and icon bg color */
const marqueeItems = [
    { label: "Web Development", icon: Code, color: "var(--chart-1)" }, // gold
    { label: "Cloud Solutions", icon: Cloud, color: "var(--blue)" }, // blue
    { label: "Cyber Security", icon: Lock, color: "var(--chart-4)" }, // teal
    { label: "Digital Marketing", icon: Megaphone, color: "var(--chart-3)" }, // purple
    { label: "UI / UX Design", icon: PenTool, color: "var(--chart-2)" }, // violet-blue
    { label: "IT Consulting", icon: Lightbulb, color: "var(--chart-5)" }, // amber-brown
];

/* =========================================================
   RING STAT
   ========================================================= */

function RingStat({
    label,
    value,
    caption,
    index,
}: {
    label: string;
    value: number;
    caption: string;
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, margin: "-60px" });

    return (
        <SpotlightCard>
            <div
                ref={ref}
                className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center sm:p-5"
            >
                <div className="relative size-28 sm:size-32">
                    <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
                        <circle
                            cx="50"
                            cy="50"
                            r="42"
                            fill="none"
                            stroke="var(--secondary)"
                            strokeWidth="6"
                        />
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="42"
                            fill="none"
                            stroke="var(--chart-4)"
                            strokeWidth="6"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: inView ? value / 100 : 0 }}

                            transition={{
                                type: "spring",
                                stiffness: 45,
                                damping: 20,
                                mass: 0.8,
                            }}

                        />
                    </svg>
                    <motion.span
                        aria-hidden="true"
                        className="absolute inset-6 rounded-full bg-[var(--primary)]/10"
                        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.2, 0.6] }}
                        transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
                    />
                    <span className="absolute inset-0 grid place-items-center text-2xl font-semibold tabular-nums text-[var(--foreground)] sm:text-3xl">
                        <Counter value={value} active={inView} />
                    </span>
                </div>
                <div>
                    <h4 className="text-base font-semibold text-[var(--foreground)]">{label}</h4>
                    <p className="mt-0.5 text-sm text-[var(--muted-foreground)]">{caption}</p>
                </div>
            </div>
        </SpotlightCard>
    );
}

/* =========================================================
   MINI STAT (small box)
   ========================================================= */

function MiniStat({
    icon: Icon,
    value,
    suffix,
    label,
    color,
}: {
    icon: typeof Users;
    value: number;
    suffix: string;
    label: string;
    color: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, margin: "-40px" });

    return (
        <SpotlightCard>
            <div
                ref={ref}
                className="group/mini relative flex h-full flex-col items-start gap-2 overflow-hidden rounded-[inherit] p-3.5 sm:p-4"
            >
                {/* Colored glow (unique per box) */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover/mini:opacity-100"
                    style={{
                        background: `radial-gradient(circle at 0% 0%, color-mix(in srgb, ${color} 22%, transparent) 0%, transparent 65%)`,
                    }}
                />
                {/* Colored bottom line on hover */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover/mini:scale-x-100"
                    style={{ background: color }}
                />
                <span
                    className="relative flex size-8 items-center justify-center rounded-lg"
                    style={{
                        background: `color-mix(in srgb, ${color} 18%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${color} 35%, transparent)`,
                        color,
                    }}
                >
                    <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div
                    className="relative flex items-baseline text-xl font-semibold tabular-nums sm:text-2xl"
                    style={{ color }}
                >
                    <Counter value={value} active={inView} />
                    <span>{suffix}</span>
                </div>
                <p className="relative text-xs text-[var(--muted-foreground)] sm:text-sm">{label}</p>
            </div>
        </SpotlightCard>
    );
}

/* =========================================================
   MARQUEE
   ========================================================= */

function SkillsMarquee() {
    return (
        <div
            className="relative overflow-hidden"
            style={{
                maskImage:
                    "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            }}
        >
            {/* Magic UI marquee: pauses when the mouse is over it */}
            <Marquee
                pauseOnHover
                className="py-2 [--duration:36s] [--gap:0.75rem] sm:[--gap:1rem]"
            >
                {marqueeItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.label}
                            className="group/pill flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--card)]/70 py-1.5 pl-1.5 pr-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 sm:gap-3 sm:pr-5"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = `color-mix(in srgb, ${item.color} 55%, transparent)`;
                                e.currentTarget.style.boxShadow = `0 8px 24px color-mix(in srgb, ${item.color} 18%, transparent)`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "";
                                e.currentTarget.style.boxShadow = "";
                            }}
                        >
                            <span
                                className="flex size-8 shrink-0 items-center justify-center rounded-full sm:size-9"
                                style={{
                                    background: `color-mix(in srgb, ${item.color} 18%, transparent)`,
                                    border: `1px solid color-mix(in srgb, ${item.color} 35%, transparent)`,
                                    color: item.color,
                                }}
                            >
                                <Icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
                            </span>
                            <span className="text-sm font-medium text-[var(--foreground)]/85 transition-colors duration-300 group-hover/pill:text-[var(--foreground)] sm:text-base">
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </Marquee>
        </div>
    );
}

/* =========================================================
   ABOUT SECTION
   ========================================================= */

export default function AboutSection() {
    return (
        <MotionConfig reducedMotion="user">
            <section
                id="about"
                aria-label="About us"
                className="relative isolate overflow-hidden py-14 sm:py-16 lg:py-24"
            >
                {/* ---------- Background ---------- */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
                        backgroundSize: "56px 56px",
                        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                        WebkitMaskImage:
                            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
                    }}
                />

                {/* Orbs (static float, no scroll progress) */}
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-32 top-24 -z-10 size-[420px] rounded-full bg-[#6d65fe]/20 blur-[120px]"
                    animate={{ y: ["-6%", "6%", "-6%"] }}
                    transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
                />
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 bottom-10 -z-10 size-[380px] rounded-full bg-[#00afb7]/15 blur-[120px]"
                    animate={{ y: ["6%", "-6%", "6%"] }}
                    transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
                />

                <div className="mx-auto w-full max-w-[var(--container-width)] px-[var(--container-padding)]">
                    {/* =====================================
                        HEADER: PageHeading + button
                       ===================================== */}
                    <motion.div
                        className="grid items-end gap-6 lg:grid-cols-12 lg:gap-10"
                        variants={stagger(0.12)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                    >
                        <motion.div variants={fadeUp} className="min-w-0 lg:col-span-9">
                            <PageHeading
                                label="About Us"
                                title="Unlock Business Growth with Our"
                                highlightedText="Expert IT Solutions"
                                description="We deliver IT services designed to boost efficiency, streamline operations, and help your business scale with confidence."
                                titleMaxWidth="max-w-[680px]"
                                fontSize="clamp(1.7rem,3vw,2.11rem)"
                                className="max-w-none"
                                letterSpacing="0.2px"
                                lineHeight="1.5"
                            />
                        </motion.div>

                        <motion.div
                            variants={fadeUp}
                            className="flex lg:col-span-3 lg:justify-end lg:pb-2"
                        >
                            <Magnetic>
                                <Link href="/contact" className="group custom-btn-outline">
                                    <span>Get In Touch</span>
                                    <ArrowRight
                                        className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                                        strokeWidth={1.8}
                                        aria-hidden="true"
                                    />
                                </Link>
                            </Magnetic>
                        </motion.div>
                    </motion.div>

                    {/* =====================================
                        CONTENT: image (left) + cards (right)
                       ===================================== */}
                    <motion.div
                        className="mt-10 grid items-stretch gap-4 sm:mt-12 lg:grid-cols-12"
                        variants={stagger(0.12, 0.05)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VIEWPORT}
                    >
                        {/* ---------- Image ---------- */}
                        <motion.div
                            variants={fadeUp}
                            className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-lg)] sm:min-h-[440px] lg:col-span-5 lg:min-h-[520px]"
                        >
                            {/* Image: always visible, gentle zoom-in only */}
                            <motion.div
                                className="absolute inset-0"
                                initial={{ scale: 1.08 }}
                                whileInView={{ scale: 1 }}
                                viewport={VIEWPORT}
                                transition={{ duration: 1.6, ease: EASE }}
                            >
                                <Image
                                    src="/images/general/about.jpg"
                                    alt="IT professional working on digital technology solutions"
                                    fill
                                    priority
                                    sizes="(max-width: 1023px) 100vw, 560px"
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                />
                            </motion.div>

                            {/* Overlay */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020210]/70 via-[#020210]/10 to-transparent"
                            />

                            {/* Rotating text badge */}
                            <div className="absolute right-4 top-4 z-10 size-24 sm:size-28">
                                <motion.svg
                                    viewBox="0 0 100 100"
                                    className="absolute inset-0 size-full text-white"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 22, ease: "linear", repeat: Infinity }}
                                    aria-hidden="true"
                                >
                                    <defs>
                                        <path
                                            id="about-orbit"
                                            d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                                        />
                                    </defs>
                                    <text
                                        fontSize="8.5"
                                        fontWeight="600"
                                        fill="currentColor"
                                        textLength="228"
                                        lengthAdjust="spacing"
                                    >
                                        <textPath href="#about-orbit">
                                            EXPERT IT SOLUTIONS • BUILT TO SCALE •{" "}
                                        </textPath>
                                    </text>
                                </motion.svg>

                                <div
                                    className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                                    style={{
                                        background: "var(--gradient-primary)",
                                        color: "var(--primary-foreground)",
                                    }}
                                >
                                    <Sparkles className="size-4" strokeWidth={1.8} aria-hidden="true" />
                                </div>
                            </div>

                            {/* Floating chip */}
                            <motion.div
                                className="absolute bottom-5 left-5 right-5 z-10 sm:right-auto"
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={VIEWPORT}
                                transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
                            >
                                <motion.div
                                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[rgba(10,9,34,0.78)] px-4 py-3 backdrop-blur-xl"
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
                                >
                                    <div
                                        className="flex size-9 shrink-0 items-center justify-center rounded-lg"
                                        style={{
                                            background: "var(--gradient-primary)",
                                            color: "var(--primary-foreground)",
                                        }}
                                    >
                                        <Sparkles className="size-4" strokeWidth={1.8} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
                                            Digital Solutions
                                        </p>
                                        <p className="mt-0.5 text-sm font-semibold text-white">
                                            Built for growth
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* ---------- Right column ---------- */}
                        <div className="flex min-w-0 flex-col gap-4 lg:col-span-7">
                            {/* Stats: two equal cards */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                {aboutStats.map((stat, index) => (
                                    <RingStat
                                        key={stat.label}
                                        label={stat.label}
                                        value={stat.value}
                                        caption={stat.caption}
                                        index={index}
                                    />
                                ))}
                            </div>

                            {/* Small boxes */}
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {miniStats.map((item) => (
                                    <MiniStat
                                        key={item.label}
                                        icon={item.icon}
                                        value={item.value}
                                        suffix={item.suffix}
                                        label={item.label}
                                        color={item.color}
                                    />
                                ))}
                            </div>

                            {/* Features: fills the remaining height */}
                            <SpotlightCard className="flex-1">
                                <motion.ul
                                    className="grid h-full divide-y divide-[var(--border)] sm:grid-cols-2 sm:divide-x sm:divide-y-0"
                                    variants={stagger(0.2, 0.2)}
                                >
                                    {aboutFeatures.map((feature, i) => (
                                        <motion.li
                                            key={feature.title}
                                            className="relative flex flex-col justify-center gap-3 p-4 sm:p-5"
                                            whileHover="hover"
                                        >
                                            <div className="flex items-center justify-between">
                                                <motion.span
                                                    variants={{ hover: { scale: 1.15, rotate: 8 } }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 14 }}
                                                >
                                                    <DrawCheck />
                                                </motion.span>
                                                <span className="text-sm font-semibold tabular-nums text-[var(--muted-foreground)]/60">
                                                    0{i + 1}
                                                </span>
                                            </div>

                                            <h4 className="text-base font-semibold leading-snug text-[var(--foreground)] sm:text-lg">
                                                {feature.title}
                                            </h4>

                                            <p className="text-sm leading-6 text-[var(--muted-foreground)]">
                                                {feature.text}
                                            </p>

                                            <motion.span
                                                aria-hidden="true"
                                                className="absolute bottom-0 left-5 right-5 h-px origin-left"
                                                style={{ background: "var(--gradient-primary)", scaleX: 0 }}
                                                variants={{ hover: { scaleX: 1 } }}
                                                transition={{ duration: 0.45, ease: EASE }}
                                            />
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </SpotlightCard>
                        </div>

                        {/* ---------- Marquee ---------- */}
                        <motion.div variants={fadeUp} className="mt-2 min-w-0 sm:mt-14 lg:col-span-12">
                            <SkillsMarquee />
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </MotionConfig>
    );
}