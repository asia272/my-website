"use client";

import { useEffect, useState } from "react";
import {
    animate,
    motion,
    useMotionValue,
    useReducedMotion,
    useTransform,
} from "motion/react";
import { usePreloader } from "@/components/providers/PreloaderContext"; // ADDED

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- Settings ---------- */
const HOLD_AT = 92; // progress waits here until the page has fully loaded
const BASE_TIME = 2.2; // seconds to reach HOLD_AT
const MAX_WAIT = 8000; // never block longer than this (ms)
const SHOW_ONCE_PER_SESSION = false; // set true for production

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* Circumference helper for the arc dashes */
const circ = (r: number) => 2 * Math.PI * r;

export default function Preloader() {
    const reduce = !!useReducedMotion();
    const [phase, setPhase] = useState<"loading" | "exit" | "gone">("loading");
    const { setDone } = usePreloader(); // ADDED

    const progress = useMotionValue(0);
    const counter = useTransform(progress, (v) =>
        String(Math.round(v)).padStart(3, "0")
    );
    const barScale = useTransform(progress, [0, 100], [0, 1]);

    // ADDED: tell the rest of the app when the preloader is completely finished
    useEffect(() => {
        if (phase === "gone") setDone(true);
    }, [phase, setDone]);

    // Lock page scroll while the preloader is visible
    useEffect(() => {
        if (phase === "gone") return;
        const prev = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";
        return () => {
            document.documentElement.style.overflow = prev;
        };
    }, [phase]);

    // Loading sequence
    useEffect(() => {
        if (SHOW_ONCE_PER_SESSION && sessionStorage.getItem("preloader-seen")) {
            setPhase("gone");
            return;
        }

        let cancelled = false;
        progress.set(0);

        const loaded = new Promise<void>((resolve) => {
            if (document.readyState === "complete") resolve();
            else window.addEventListener("load", () => resolve(), { once: true });
        });

        const run = async () => {
            await animate(progress, HOLD_AT, {
                duration: reduce ? 0.6 : BASE_TIME,
                ease: [0.4, 0, 0.2, 1],
            });
            await Promise.race([loaded, sleep(MAX_WAIT)]);
            if (cancelled) return;

            await animate(progress, 100, { duration: 0.6, ease: "easeOut" });
            if (cancelled) return;

            await sleep(reduce ? 100 : 350);
            if (cancelled) return;

            if (SHOW_ONCE_PER_SESSION) sessionStorage.setItem("preloader-seen", "1");
            setPhase("exit");
        };

        run();
        return () => {
            cancelled = true;
        };
    }, [progress, reduce]);

    if (phase === "gone") return null;

    const exiting = phase === "exit";

    return (
        <div
            role="status"
            aria-live="polite"
            className="fixed inset-0 z-[9999] overflow-hidden"
        >
            <span className="sr-only">Loading</span>

            {/* Curtain panels (open on exit) */}
            <motion.div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1/2 bg-[#020210]"
                animate={{ y: exiting ? "-100%" : "0%" }}
                transition={{ duration: 0.85, ease: EASE, delay: exiting ? 0.3 : 0 }}
            />
            <motion.div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2 bg-[#020210]"
                animate={{ y: exiting ? "100%" : "0%" }}
                transition={{ duration: 0.85, ease: EASE, delay: exiting ? 0.3 : 0 }}
                onAnimationComplete={() => {
                    if (exiting) setPhase("gone");
                }}
            />

            {/* Content (fades out first, then the curtains open) */}
            <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                animate={
                    exiting
                        ? { opacity: 0, scale: 0.9, filter: "blur(6px)" }
                        : { opacity: 1, scale: 1, filter: "blur(0px)" }
                }
                transition={{ duration: 0.45, ease: "easeInOut" }}
            >
                {/* Soft ambient color */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                    <motion.div
                        className="absolute left-1/2 top-1/2 size-[420px] -translate-x-[80%] -translate-y-[60%] rounded-full bg-[#6d65fe]/15 blur-[110px]"
                        animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
                        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute left-1/2 top-1/2 size-[360px] -translate-x-[20%] -translate-y-[40%] rounded-full bg-[#00afb7]/12 blur-[110px]"
                        animate={reduce ? undefined : { scale: [1.1, 0.95, 1.1] }}
                        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
                    />
                </div>

                {/* ============ Emblem ============ */}
                <motion.div
                    className="relative size-28 sm:size-32"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, ease: EASE }}
                >
                    <svg width="0" height="0" aria-hidden className="absolute">
                        <defs>
                            <linearGradient id="pl-a" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#6d65fe" />
                                <stop offset="100%" stopColor="#9e45b1" />
                            </linearGradient>
                            <linearGradient id="pl-b" x1="1" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#00afb7" />
                                <stop offset="100%" stopColor="#6d65fe" />
                            </linearGradient>
                            <linearGradient id="pl-c" x1="0" y1="1" x2="1" y2="0">
                                <stop offset="0%" stopColor="#9e45b1" />
                                <stop offset="100%" stopColor="#00afb7" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Faint track rings */}
                    <svg viewBox="0 0 120 120" className="absolute inset-0 size-full">
                        {[52, 38, 24].map((r) => (
                            <circle
                                key={r}
                                cx="60"
                                cy="60"
                                r={r}
                                fill="none"
                                stroke="rgba(255,255,255,0.06)"
                                strokeWidth="1"
                            />
                        ))}
                    </svg>

                    {/* Outer arc */}
                    <motion.svg
                        viewBox="0 0 120 120"
                        className="absolute inset-0 size-full"
                        animate={reduce ? undefined : { rotate: 360 }}
                        transition={{ duration: 2.4, ease: "linear", repeat: Infinity }}
                    >
                        <circle
                            cx="60"
                            cy="60"
                            r="52"
                            fill="none"
                            stroke="url(#pl-a)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray={`${circ(52) * 0.3} ${circ(52)}`}
                        />
                    </motion.svg>

                    {/* Middle arc (reverse) */}
                    <motion.svg
                        viewBox="0 0 120 120"
                        className="absolute inset-0 size-full"
                        animate={reduce ? undefined : { rotate: -360 }}
                        transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
                    >
                        <circle
                            cx="60"
                            cy="60"
                            r="38"
                            fill="none"
                            stroke="url(#pl-b)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray={`${circ(38) * 0.3} ${circ(38)}`}
                        />
                    </motion.svg>

                    {/* Inner arc */}
                    <motion.svg
                        viewBox="0 0 120 120"
                        className="absolute inset-0 size-full"
                        animate={reduce ? undefined : { rotate: 360 }}
                        transition={{ duration: 1.3, ease: "linear", repeat: Infinity }}
                    >
                        <circle
                            cx="60"
                            cy="60"
                            r="24"
                            fill="none"
                            stroke="url(#pl-c)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray={`${circ(24) * 0.3} ${circ(24)}`}
                        />
                    </motion.svg>

                    {/* Core */}
                    <div className="absolute inset-0 grid place-items-center">
                        {!reduce && (
                            <motion.span
                                aria-hidden
                                className="absolute size-3 rounded-full border border-[#8b85ff]/60"
                                animate={{ scale: [1, 3.2], opacity: [0.6, 0] }}
                                transition={{ duration: 2, ease: "easeOut", repeat: Infinity }}
                            />
                        )}
                        <motion.span
                            className="size-3 rounded-full"
                            style={{
                                background:
                                    "radial-gradient(circle at 30% 30%, #b6b1ff, #6d65fe 55%, #00afb7)",
                                boxShadow: "0 0 18px 3px rgba(109,101,254,0.55)",
                            }}
                            animate={reduce ? undefined : { scale: [1, 1.35, 1] }}
                            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
                        />
                    </div>
                </motion.div>

                {/* Percentage + bar */}
                <motion.div
                    className="mt-9 flex flex-col items-center gap-3"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
                >
                    <div className="flex items-baseline gap-1">
                        <motion.span className="font-mono text-2xl font-light tabular-nums text-white/90">
                            {counter}
                        </motion.span>
                        <span className="font-mono text-xs text-white/40">%</span>
                    </div>

                    <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                            className="h-full origin-left rounded-full bg-gradient-to-r from-[#6d65fe] via-[#9e45b1] to-[#00afb7]"
                            style={{ scaleX: barScale }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}