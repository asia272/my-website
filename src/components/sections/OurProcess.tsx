"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useInView } from "motion/react";

import PageHeading from "../shared/PageHeading";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Line draw time (seconds). Nodes are timed against this. */
const LINE_DURATION = 1.6;

/* Glow color (change this to any color you like) */
const GLOW = "255,190,60";
const BORDER = "rgba(109,101,254,0.4)";
const RING = "0 0 0 8px rgba(2,2,16,0.6)";

const NODE_REST = `${RING}, 0 0 0px 0px rgba(${GLOW},0)`;
const NODE_LIT = `${RING}, 0 0 34px 8px rgba(${GLOW},0.55)`;

const PROCESS = [
    {
        title: "Discover",
        description:
            "We learn your goals, audience and requirements before writing any code.",
    },
    {
        title: "Design",
        description:
            "Wireframes and a clean interface that fits your brand and users.",
    },
    {
        title: "Build",
        description:
            "Fast, secure and responsive development with regular progress updates.",
    },
    {
        title: "Launch",
        description:
            "Testing, deployment and ongoing support so your product keeps growing.",
    },
];

/* true on lg screens and up (where the timeline line is visible) */
function useIsDesktop() {
    return useSyncExternalStore(
        (cb) => {
            const mq = window.matchMedia("(min-width: 1024px)");
            mq.addEventListener("change", cb);
            return () => mq.removeEventListener("change", cb);
        },
        () => window.matchMedia("(min-width: 1024px)").matches,
        () => false
    );
}

function ProcessTimelineLine({ active }: { active: boolean }) {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute top-7 right-[12.5%] left-[12.5%] hidden h-px lg:block"
        >
            {/* Base line */}
            <div className="absolute inset-0 bg-white/10" />

            {/* Animated line */}
            <motion.div
                className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-[#6d65fe] via-[#9e45b1] to-[#00afb7] shadow-[0_0_10px_rgba(109,101,254,0.5)]"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                    active
                        ? { scaleX: 1, opacity: 1 }
                        : { scaleX: 0, opacity: 0 }
                }
                transition={{
                    scaleX: {
                        duration: active ? LINE_DURATION : 0.3,
                        ease: "linear",
                    },
                    opacity: { duration: 0.35, ease: "easeOut" },
                }}
            />
        </div>
    );
}

function ProcessStep({
    step,
    index,
    total,
    isDesktop,
    sectionActive,
}: {
    step: (typeof PROCESS)[number];
    index: number;
    total: number;
    isDesktop: boolean;
    sectionActive: boolean;
}) {
    const ref = useRef<HTMLLIElement>(null);
    const itemInView = useInView(ref, { once: true, margin: "-80px" });

    // Desktop: follow the line. Mobile/tablet: reveal each step on its own.
    const active = isDesktop ? sectionActive : itemInView;

    // Moment the line reaches this node
    const arrive = isDesktop ? (index / (total - 1)) * LINE_DURATION : 0;

    return (
        <li ref={ref} className="relative text-center">
            {/* Node */}
            <motion.span
                className="relative z-10 mx-auto grid size-14 place-items-center rounded-full border bg-[#050516] text-lg font-bold text-white"
                initial={{
                    opacity: 0,
                    scale: 0.7,
                    y: 10,
                    borderColor: BORDER,
                    boxShadow: NODE_REST,
                }}
                animate={
                    active
                        ? {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            // light turns on, then fades off
                            borderColor: [
                                BORDER,
                                `rgba(${GLOW},0.95)`,
                                BORDER,
                            ],
                            boxShadow: [NODE_REST, NODE_LIT, NODE_REST],
                        }
                        : {
                            opacity: 0,
                            scale: 0.7,
                            y: 10,
                            borderColor: BORDER,
                            boxShadow: NODE_REST,
                        }
                }
                transition={
                    active
                        ? {
                            opacity: { duration: 0.4, delay: Math.max(0, arrive - 0.12) },
                            scale: { duration: 0.5, delay: Math.max(0, arrive - 0.12), ease: EASE },
                            y: { duration: 0.5, delay: Math.max(0, arrive - 0.12), ease: EASE },
                            borderColor: {
                                duration: 1.6,
                                delay: arrive,
                                times: [0, 0.25, 1],
                                ease: "easeOut",
                            },
                            boxShadow: {
                                duration: 1.6,
                                delay: arrive,
                                times: [0, 0.25, 1],
                                ease: "easeOut",
                            },
                        }
                        : { duration: 0.3 }
                }
                whileHover={{ scale: 1.08 }}
            >
                {index + 1}
            </motion.span>

            {/* Title */}
            <motion.h4
                className="mt-4 font-semibold text-white"
                initial={{ opacity: 0, y: 12 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{
                    duration: active ? 0.65 : 0.3,
                    delay: active ? arrive + 0.15 : 0,
                    ease: EASE,
                }}
            >
                {step.title}
            </motion.h4>

            {/* Description */}
            <motion.p
                className="mx-auto mt-1.5 max-w-[16rem] text-sm leading-relaxed text-white/50"
                initial={{ opacity: 0, y: 10 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{
                    duration: active ? 0.65 : 0.3,
                    delay: active ? arrive + 0.25 : 0,
                    ease: EASE,
                }}
            >
                {step.description}
            </motion.p>
        </li>
    );
}

export default function OurProcess() {
    const listRef = useRef<HTMLOListElement>(null);
    const isDesktop = useIsDesktop();

    // Replays every time the timeline scrolls into view
    const sectionActive = useInView(listRef, {
        once: false,
        margin: "-100px",
    });

    return (
        <div className="mt-20">
            <PageHeading
                label="Our Process"
                title="How we turn ideas into"
                highlightedText="working products."
                description="A simple, transparent workflow that keeps you informed from the first call to launch day."
                isCenter
                fontSize="clamp(1.7rem,3vw,2.11rem)"
                letterSpacing="0.2px"
            />

            <ol
                ref={listRef}
                className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
                <ProcessTimelineLine active={sectionActive} />

                {PROCESS.map((step, index) => (
                    <ProcessStep
                        key={step.title}
                        step={step}
                        index={index}
                        total={PROCESS.length}
                        isDesktop={isDesktop}
                        sectionActive={sectionActive}
                    />
                ))}
            </ol>
        </div>
    );
}