"use client";

import type { ReactNode, PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { fadeUp } from "./motion-variants";

type SpotlightCardProps = {
    children: ReactNode;
    className?: string;
};

export default function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
    const x = useMotionValue(-300);
    const y = useMotionValue(-300);
    const glow = useMotionTemplate`radial-gradient(320px circle at ${x}px ${y}px, rgba(109,101,254,0.18), transparent 70%)`;
    const opacity = useMotionValue(0);

    return (
        <motion.div
            variants={fadeUp}
            className={`group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] ${className}`}
            onPointerMove={(e: PointerEvent<HTMLDivElement>) => {
                if (e.pointerType !== "mouse") return;
                const r = e.currentTarget.getBoundingClientRect();
                x.set(e.clientX - r.left);
                y.set(e.clientY - r.top);
                opacity.set(1);
            }}
            onPointerLeave={() => opacity.set(0)}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{ background: glow, opacity }}
            />
            <div className="relative h-full">{children}</div>
        </motion.div>
    );
}
