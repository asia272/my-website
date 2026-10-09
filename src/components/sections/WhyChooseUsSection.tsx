"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
    Check,
    Headset,
    Palette,
    Rocket,
    ShieldCheck,
    TrendingUp,
    type LucideIcon,
} from "lucide-react";

import PageHeading from "../shared/PageHeading";
import Reveal from "../animations/Reveal";
import AnimatedBackground from "../animations/AnimatedBackground";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Time each topic stays active (ms) */
const AUTOPLAY = 5000;

/* Orbit radius as % of the container (nodes sit on this circle) */
const RADIUS = 36;

type Reason = {
    id: string;
    short: string; // label shown on the ring
    title: string;
    badge: string;
    description: string;
    points: string[];
    icon: LucideIcon;
    color: string; // "r,g,b" -> each topic has its own color
};

/* Edit / add / remove topics here (4 to 5 works best) */
const REASONS: Reason[] = [
    {
        id: "delivery",
        short: "Fast Delivery",
        title: "Fast, on-time delivery",
        badge: "Launch in weeks",
        description:
            "We plan tightly and ship in clear milestones, so you see real progress early instead of waiting months for a big reveal.",
        points: [
            "Clear milestones and deadlines",
            "Weekly progress updates",
            "No surprise delays or costs",
        ],
        icon: Rocket,
        color: "109,101,254",
    },
    {
        id: "secure",
        short: "Secure Code",
        title: "Secure and reliable code",
        badge: "Built to last",
        description:
            "Clean, tested and well-structured code that stays stable as your product grows and your traffic increases.",
        points: [
            "Best-practice security",
            "Clean, maintainable codebase",
            "Tested before every release",
        ],
        icon: ShieldCheck,
        color: "0,175,183",
    },
    {
        id: "design",
        short: "Pro Design",
        title: "Modern, pixel-perfect design",
        badge: "Modern UI",
        description:
            "Interfaces that look sharp on every screen and feel smooth to use, designed around your brand and your customers.",
        points: [
            "Fully responsive layouts",
            "Smooth, purposeful animations",
            "Consistent brand identity",
        ],
        icon: Palette,
        color: "158,69,177",
    },
    {
        id: "support",
        short: "Real Support",
        title: "Support that stays with you",
        badge: "Always reachable",
        description:
            "We do not disappear after launch. You get direct communication and quick help whenever you need a fix or a change.",
        points: [
            "Direct, fast communication",
            "Post-launch maintenance",
            "Friendly, jargon-free help",
        ],
        icon: Headset,
        color: "255,190,60",
    },
    {
        id: "scale",
        short: "Scalable",
        title: "Built to scale with you",
        badge: "Future-ready",
        description:
            "Solutions designed so adding features, users and pages later is simple, not a rebuild from scratch.",
        points: [
            "Flexible architecture",
            "SEO and performance focused",
            "Easy to extend later",
        ],
        icon: TrendingUp,
        color: "52,211,153",
    },
];

const STEP = 360 / REASONS.length;

const rgba = (color: string, alpha: number) => `rgba(${color},${alpha})`;

/* ---------------------------------- Orbit --------------------------------- */

function OrbitDecor({ color, reduce }: { color: string; reduce: boolean }) {
    return (
        <>
            {/* Outer dashed ring (continuous spin) */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-white/10"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            >
                <span
                    className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-700"
                    style={{
                        background: rgba(color, 1),
                        boxShadow: `0 0 14px 3px ${rgba(color, 0.7)}`,
                    }}
                />
            </motion.div>

            {/* Orbit track (nodes sit on this) */}
            <div
                aria-hidden
                className="pointer-events-none absolute rounded-full border border-white/10"
                style={{ inset: `${50 - RADIUS}%` }}
            />

            {/* Inner ring (continuous reverse spin) */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-[27%] rounded-full border border-white/[0.07]"
                animate={reduce ? undefined : { rotate: -360 }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            >
                <span
                    className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/60 transition-colors duration-700"
                    style={{ background: rgba(color, 0.9) }}
                />
            </motion.div>
        </>
    );
}

function OrbitHub({ active }: { active: Reason }) {
    const Icon = active.icon;

    return (
        <div className="absolute left-1/2 top-1/2 z-20 size-[26%] -translate-x-1/2 -translate-y-1/2">
            {/* Ripples */}
            {[0, 1].map((i) => (
                <motion.span
                    key={i}
                    aria-hidden
                    className="absolute inset-0 rounded-full border transition-colors duration-700"
                    style={{ borderColor: rgba(active.color, 0.5) }}
                    animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                    transition={{
                        duration: 2.8,
                        ease: "easeOut",
                        repeat: Infinity,
                        delay: i * 1.4,
                    }}
                />
            ))}

            {/* Core */}
            <div
                className="relative grid size-full place-items-center rounded-full border bg-[#050516] transition-[box-shadow,border-color] duration-700"
                style={{
                    borderColor: rgba(active.color, 0.5),
                    boxShadow: `0 0 50px 6px ${rgba(active.color, 0.28)}, inset 0 0 24px ${rgba(active.color, 0.18)}`,
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.span
                        key={active.id}
                        initial={{ opacity: 0, scale: 0.4, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.4, rotate: 90 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        style={{ color: `rgb(${active.color})` }}
                    >
                        <active.icon className="size-[38%] min-h-8 min-w-8" />
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
}

function OrbitNode({
    reason,
    index,
    isActive,
    turn,
    reduce,
    onSelect,
}: {
    reason: Reason;
    index: number;
    isActive: boolean;
    turn: number;
    reduce: boolean;
    onSelect: () => void;
}) {
    const angle = (index * STEP * Math.PI) / 180;
    const Icon = reason.icon;

    return (
        <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
                left: `${50 + RADIUS * Math.cos(angle)}%`,
                top: `${50 + RADIUS * Math.sin(angle)}%`,
            }}
        >
            {/* Counter-rotate so the label always stays upright */}
            <motion.div
                animate={{ rotate: turn * STEP }}
                transition={
                    reduce ? { duration: 0 } : { duration: 1.2, ease: EASE }
                }
            >
                <button
                    type="button"
                    onClick={onSelect}
                    aria-label={reason.title}
                    aria-pressed={isActive}
                    className={`relative flex items-center gap-2 rounded-full border p-1.5 backdrop-blur-md transition-all duration-500 sm:pr-4 ${isActive
                        ? "scale-110"
                        : "border-white/10 bg-[#050516]/80 hover:border-white/25"
                        }`}
                    style={
                        isActive
                            ? {
                                borderColor: rgba(reason.color, 0.7),
                                background: rgba(reason.color, 0.16),
                                boxShadow: `0 0 30px ${rgba(reason.color, 0.4)}`,
                            }
                            : undefined
                    }
                >
                    {/* Pulsing ring on the active node only */}
                    {isActive && (
                        <motion.span
                            aria-hidden
                            className="pointer-events-none absolute -inset-1 rounded-full border"
                            style={{ borderColor: rgba(reason.color, 0.6) }}
                            animate={{ scale: [1, 1.25], opacity: [0.7, 0] }}
                            transition={{
                                duration: 1.6,
                                ease: "easeOut",
                                repeat: Infinity,
                            }}
                        />
                    )}

                    <span
                        className="grid size-9 shrink-0 place-items-center rounded-full"
                        style={{
                            background: rgba(reason.color, 0.18),
                            color: `rgb(${reason.color})`,
                        }}
                    >
                        <Icon className="size-4" />
                    </span>

                    <span
                        className={`hidden whitespace-nowrap text-xs font-medium transition-colors duration-500 sm:block ${isActive ? "text-white" : "text-white/50"
                            }`}
                    >
                        {reason.short}
                    </span>
                </button>
            </motion.div>
        </div>
    );
}

function Orbit({
    active,
    activeIndex,
    turn,
    reduce,
    onSelect,
}: {
    active: Reason;
    activeIndex: number;
    turn: number;
    reduce: boolean;
    onSelect: (index: number) => void;
}) {
    return (
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <OrbitDecor color={active.color} reduce={reduce} />

            {/* Beam from the hub to the active node (it always faces the content) */}
            <motion.div
                key={active.id}
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-px origin-left"
                style={{
                    width: `${RADIUS}%`,
                    background: `linear-gradient(to right, ${rgba(active.color, 0.9)}, ${rgba(active.color, 0)})`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            />

            {/* Rotating orbit with the topic nodes */}
            <motion.div
                className="absolute inset-0 z-10"
                animate={{ rotate: -turn * STEP }}
                transition={
                    reduce ? { duration: 0 } : { duration: 1.2, ease: EASE }
                }
            >
                {REASONS.map((reason, index) => (
                    <OrbitNode
                        key={reason.id}
                        reason={reason}
                        index={index}
                        isActive={index === activeIndex}
                        turn={turn}
                        reduce={reduce}
                        onSelect={() => onSelect(index)}
                    />
                ))}
            </motion.div>

            <OrbitHub active={active} />
        </div>
    );
}

/* --------------------------------- Content -------------------------------- */

const contentVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
    exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: EASE },
    },
    exit: {
        opacity: 0,
        y: -10,
        filter: "blur(4px)",
        transition: { duration: 0.25 },
    },
};

function ReasonContent({
    active,
    activeIndex,
    turn,
    paused,
}: {
    active: Reason;
    activeIndex: number;
    turn: number;
    paused: boolean;
}) {
    const Icon = active.icon;

    return (
        <div
            className="relative flex min-h-[410px] flex-col overflow-hidden rounded-3xl border bg-white/[0.03] p-6 backdrop-blur-md transition-colors duration-700 sm:p-8"
            style={{ borderColor: rgba(active.color, 0.25) }}
        >
            {/* Color glow that follows the active topic */}
            <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full blur-3xl transition-colors duration-700"
                style={{ background: rgba(active.color, 0.22) }}
            />

            <AnimatePresence mode="wait">
                <motion.div
                    key={active.id}
                    variants={contentVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="relative flex flex-1 flex-col"
                >
                    {/* Icon + counter */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-start justify-between"
                    >
                        <span
                            className="grid size-16 place-items-center rounded-2xl border"
                            style={{
                                background: rgba(active.color, 0.14),
                                borderColor: rgba(active.color, 0.4),
                                color: `rgb(${active.color})`,
                                boxShadow: `0 10px 40px ${rgba(active.color, 0.3)}`,
                            }}
                        >
                            <Icon className="size-8" />
                        </span>

                        <span className="text-xs font-semibold tracking-[0.2em] text-white/30">
                            {String(activeIndex + 1).padStart(2, "0")} /{" "}
                            {String(REASONS.length).padStart(2, "0")}
                        </span>
                    </motion.div>

                    {/* Badge */}
                    <motion.span
                        variants={itemVariants}
                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
                        style={{
                            background: rgba(active.color, 0.12),
                            borderColor: rgba(active.color, 0.35),
                            color: `rgb(${active.color})`,
                        }}
                    >
                        <span
                            className="size-1.5 rounded-full"
                            style={{ background: `rgb(${active.color})` }}
                        />
                        {active.badge}
                    </motion.span>

                    {/* Title */}
                    <motion.h3
                        variants={itemVariants}
                        className="mt-4 text-2xl font-bold text-white sm:text-3xl"
                    >
                        {active.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="mt-3 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base"
                    >
                        {active.description}
                    </motion.p>

                    {/* Points */}
                    <ul className="mt-6 space-y-3">
                        {active.points.map((point) => (
                            <motion.li
                                key={point}
                                variants={itemVariants}
                                className="flex items-center gap-3 text-sm text-white/75"
                            >
                                <span
                                    className="grid size-5 shrink-0 place-items-center rounded-full"
                                    style={{
                                        background: rgba(active.color, 0.18),
                                        color: `rgb(${active.color})`,
                                    }}
                                >
                                    <Check className="size-3" />
                                </span>
                                {point}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </AnimatePresence>

            {/* Autoplay progress */}
            <div className="relative mt-8 h-px w-full bg-white/10">
                <motion.div
                    key={turn}
                    className="absolute inset-y-0 left-0 w-full origin-left transition-colors duration-700"
                    style={{ background: `rgb(${active.color})` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused ? 0 : 1 }}
                    transition={{
                        duration: paused ? 0.3 : AUTOPLAY / 1000,
                        ease: "linear",
                    }}
                />
            </div>
        </div>
    );
}

/* --------------------------------- Section -------------------------------- */

const WhyChooseUsSection = () => {
    const reduce = !!useReducedMotion();

    // `turn` only ever increases, so the ring always keeps spinning forward
    const [turn, setTurn] = useState(0);
    const [paused, setPaused] = useState(false);

    const activeIndex = turn % REASONS.length;
    const active = REASONS[activeIndex];

    // Autoplay (restarts after every change, pauses on hover)
    useEffect(() => {
        if (paused) return;

        const id = setTimeout(() => setTurn((t) => t + 1), AUTOPLAY);
        return () => clearTimeout(id);
    }, [turn, paused]);

    // Clicking a node rotates forward to it
    const handleSelect = (index: number) => {
        const delta = (index - activeIndex + REASONS.length) % REASONS.length;
        if (delta === 0) return;
        setTurn((t) => t + delta);
    };

    return (
        <section
            id="why-choose-us"
            className="section relative isolate overflow-hidden"
        >
            {/* <AnimatedBackground />
<AnimatedBackground palette="teal" density={1.3} /> */}
            <AnimatedBackground opacity={0.6} pulses={false} glow={false} />
            <div className="container">
                {/* Heading (aligned start) */}
                <Reveal>
                    <PageHeading
                        label="Why Choose Us"
                        title="Reasons clients"
                        highlightedText="trust us with their projects."
                        description="Quality, speed and honest communication, from the first idea to long after launch."
                        fontSize="clamp(1.7rem,3vw,2.11rem)"
                        letterSpacing="0.2px"
                    />
                </Reveal>

                <div
                    className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {/* Left: animated ring */}
                    <Reveal direction="right">
                        <Orbit
                            active={active}
                            activeIndex={activeIndex}
                            turn={turn}
                            reduce={reduce}
                            onSelect={handleSelect}
                        />
                    </Reveal>

                    {/* Right: active content (one at a time) */}
                    <Reveal direction="left" delay={0.1}>
                        <ReasonContent
                            active={active}
                            activeIndex={activeIndex}
                            turn={turn}
                            paused={paused}
                        />
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUsSection;